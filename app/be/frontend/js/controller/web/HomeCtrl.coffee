myApp.controller 'HomeCtrl', ($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService, $timeout, addressService, $location, $route, $routeParams) ->

    #params
    $scope.param = $routeParams.param
    original = $location.path

    $scope.interestDisplayMax = 12
    $scope.interestDisplayed = []
    $scope.interestDisplayed2 = []
    $scope.followingMode = $scope.param? and $scope.param.indexOf('following') != -1
    $scope.businessInfoParam = {}
    $scope.businessListParam =
        data: []
    $scope.accountService = accountService.model
    $scope.publicationListCtrl = {}
    $scope.currentPage = 0
    $scope.allLoaded = false
    $scope.loadSemaphore = false
    $scope.emptyMessage = null

    #write path by interests and follow
    path = ->
        #build path
        path = '/shopnews'
        if $scope.followingMode
            path += '/following'
        for i of $scope.customerInterests
            if $scope.customerInterests[i].selected == true
                path += '/' + $scope.customerInterests[i].name
        #navigate
        $location.path path, false
        $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    # display share position warning
    $scope.displaySharePositionWarning = ->
        geolocationService.sharePosition == false and (!accountService.getMyself()? or !accountService.getMyself().selectedAddress?)

    # watch position
    $rootScope.$watch (->
        geolocationService.sharePosition
    ), (n) ->
        $scope.sharePosition = n

    #set following mode
    $scope.setFollowedMode = (n) ->
        console.log 'setFollowedMode:'+n
        if !n?
            n = !$scope.followingMode
        if !accountService.getMyself()?
            modalService.openLoginModal $scope.switchFollowedMode, n, '--.loginModal.help.followMode'
        else
            $scope.switchFollowedMode n

    # switch followed mode
    $scope.switchFollowedMode = (n) ->
        console.log 'switchFollowedMode:'+n
        $scope.followingMode = n
        path()

    #open registration modal
    $scope.customerRegistration = ->
        modalService.openCustomerRegistrationModal()

    #functions
    #search by interest
    $scope.searchByInterest = (interest) ->
        if interest.selected == true
            interest.selected = false
        else
            for i of $scope.customerInterests
                $scope.customerInterests[i].selected = false
            interest.selected = true
        $scope.currentPage = 0
        $scope.allLoaded = false
        $scope.search()
        path()


    #watch on change position
    $scope.$on 'POSITION_CHANGED', ->
        $scope.currentPage = 0
        $scope.allLoaded = false
        $scope.search()

    #watch in follow mode
    $scope.$watch 'followingMode', (n,o) ->
        if o != n
            $scope.currentPage = 0
            $scope.allLoaded = false
            $scope.search()

    #logout user
    $scope.$on 'LOGOUT', ->
        if $scope.followingMode
            $scope.followingMode = false

    #scrolling
    $(window).on 'scroll', ->
        scrollBottom = $(window).scrollTop() + $(window).height()
        if $('.container-content').height() - scrollBottom < 200
            if $scope.loadSemaphore == false
                $scope.currentPage = $scope.currentPage + 1
                $scope.search()

    # called after publication loading succes
    successLoadingPublications = (data, callbackEmptyResultFunction) ->
        if $scope.currentPage == 0
            $scope.publicationListCtrl.data = []
        $scope.loadSemaphore = false
        $scope.publicationListCtrl.loading = false
        if !data? or data.length <= 5
            $scope.allLoaded = true
            #if there is no result and this is the first page and there is a callbackFunction,
            #try something else
            if $scope.currentPage == 0 and callbackEmptyResultFunction?
                callbackEmptyResultFunction()
                if data.length != 0
                    $scope.emptyMessage = 'moreBusiness'
        for d in data
            $scope.publicationListCtrl.data.push d

    # called after business loading succes
    successLoadingBusiness = (data) ->
        $scope.businessListParam.data = data
        $scope.businessListParam.loading = false

    #search function
    $scope.search = ->
        if $scope.allLoaded == false
            interestSelected = null
            for i of $scope.customerInterests
                if $scope.customerInterests[i].selected
                    interestSelected = $scope.customerInterests[i]
            $scope.loadSemaphore = true
            #if this is the first page that asked, remove other publication
            if $scope.currentPage == 0
                $scope.publicationListCtrl.loading = true
                $scope.emptyMessage = null
                $scope.publicationListCtrl.data = []
                $scope.businessListParam.data = []
            if $scope.followingMode
                if interestSelected?
                    searchService.byFollowedAndInterest $scope.currentPage, interestSelected.id, (data) ->
                        successLoadingPublications data, ->
                            $scope.emptyMessage = 'followedWithInterest'
                            $scope.businessListParam.loading = true
                            searchService.nearBusinessByInterest interestSelected.id, (data) ->
                                successLoadingBusiness data
                else
                    searchService.byFollowed $scope.currentPage, (data) ->
                        successLoadingPublications data, ->
                            $scope.emptyMessage = 'followed'
                            $scope.businessListParam.loading = true
                            searchService.nearBusiness (data) ->
                                successLoadingBusiness data
            else
                if interestSelected?
                    searchService.byInterest $scope.currentPage, interestSelected.id, (data) ->
                        successLoadingPublications data, ->
                            $scope.emptyMessage = 'newsFeedWithInterest'
                            $scope.businessListParam.loading = true
                            searchService.nearBusinessByInterest interestSelected.id, (data) ->
                                successLoadingBusiness data
                else
                    searchService.default $scope.currentPage, (data) ->
                        successLoadingPublications data, ->
                            $scope.emptyMessage = 'newsFeed'
                            $scope.businessListParam.loading = true
                            searchService.nearBusiness (data) ->
                                successLoadingBusiness data

    #create a new address
    # test if the user is logged
    $scope.createNewAddress = ->
        if accountService.getMyself()?
            createNewAddress()
        else
            modalService.openLoginModal createNewAddress, null, '--.loginModal.help.address'

    # open the address modal
    createNewAddress = ->
        modalService.addressModal true, null, false, (data) ->
            $timeout ->
                addressService.changeAddress data.name, (data) ->
                    accountService.getMyself().selectedAddress = data
                    $timeout ->
                        $rootScope.$broadcast 'CHANGE_ADDRESS_SELECTED'
                    , 1
            , 1

    #initialize
    # back to the top of the page
    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    $scope.currentPage = 0
    $scope.allLoaded = false

    #load all interests
    customerInterestService.getAll (value) ->
        $scope.customerInterests = value
        if $scope.param?
            for i of $scope.customerInterests
                if $scope.param.indexOf($scope.customerInterests[i].name) != -1
                    $scope.customerInterests[i].selected = true
        $scope.interestDisplayed = $scope.customerInterests.slice(0, $scope.interestDisplayMax)
        $scope.interestDisplayed2 = $scope.customerInterests.slice($scope.interestDisplayMax, $scope.customerInterests.length)

    #start search
    $scope.search()