#mobile controller
# home controller
myApp.controller 'HomeCtrl', ($scope, geolocationService, searchService, customerInterestService, $timeout, accountService, $rootScope, followService, modalService) ->

#param
    $scope.publicationListCtrl = {}
    $scope.businessInfoParam = {}
    $scope.businessListParam =
        data: []
    $scope.currentPage = 0
    $scope.allLoaded = false
    $scope.loadSemaphore = false
    $scope.emptyMessage = null

    #sort
    $scope.sortChoices = [
        key: 'distance'
        translation: '--.home.sort.distance'
    ,
        key: 'date'
        translation: '--.home.sort.date'
    ]
    $scope.sortChoose = 'date';

    #get the selected interest
    $scope.getSelectedInterest = ->
        if(!$scope.customerInterests?)
            return null
        for interest in $scope.customerInterests
            if interest.selected
                return interest
        null

    #select an interest
    $scope.selectInterest = ->
        modalService.interestSelection $scope.customerInterests, (target) ->
            $scope.loadPublicationByInterest target


    #scrolling
    #load new publications by scrolling
    $('.scrollable-content-body').on 'scroll', ->
        scrollBottom = $('.scrollable-content-body').scrollTop() + $('.scrollable-content-body').height()
        if $('.scrollable-content-inner').height() - scrollBottom < 200
            if $scope.loadSemaphore == false
                $scope.loadSemaphore = true
                $scope.currentPage = $scope.currentPage + 1
                $scope.loadPublication()

    #loading success
    loadingPublicationSuccess = (data, callbackEmptyResultFunction) ->
        if $scope.currentPage == 0
            $scope.publicationListCtrl.data = []
        $scope.loadSemaphore = false
        $scope.publicationListCtrl.loading = false
        if data == null or data.length <= 5
            $scope.allLoaded = true
            #if there is no result and this is the first page and there is a callbackFunction,
            #try something else
            if $scope.currentPage == 0 and callbackEmptyResultFunction?
                callbackEmptyResultFunction()
                if data.length != 0
                    $scope.emptyMessage = 'moreBusiness'
        for d in data
            $scope.publicationListCtrl.data.push d
        return

    #loading business success
    loadingBusinessSuccess = (data) ->
        $scope.businessListParam.data = data
        $scope.businessListParam.loading = false

    #loadPublication by interest
    $scope.loadPublicationByInterest = (selectedInterest) ->
        if selectedInterest == null
#dis-select all interests
            for interest in $scope.customerInterests
                interest.selected = false
        else
#select interest
            if selectedInterest.selected == true
                selectedInterest.selected = false
            else
                for interest in $scope.customerInterests
                    interest.selected = false
                selectedInterest.selected = true
        console.log 'LOAD PUBLICATION AFTER searchByInterest '
        $scope.currentPage = 0
        $scope.allLoaded = false
        #launch loadPublication
        $scope.loadPublication()

    #watch on change position
    $scope.$on 'POSITION_CHANGED', ->
        $scope.currentPage = 0
        $scope.allLoaded = false
        console.log 'LOAD PUBLICATION AFTER POSITION_CHANGED'
        $scope.loadPublication()

    #watch in follow mode
    $scope.$watch 'followingMode', (o, n) ->
        if o != n
            $scope.currentPage = 0
            $scope.allLoaded = false
            console.log 'LOAD PUBLICATION AFTER followingMode'
            $scope.loadPublication()

    #sort option watcher
    $scope.$watch 'sortChoose', (n, o) ->
        if n != o
            $scope.loadPublication()

    #load publication
    $scope.loadPublication = ->
        interestSelected = $scope.getSelectedInterest()

        #if this is the first page that asked, remove other publication
        if $scope.currentPage == 0
            $scope.publicationListCtrl.loading = true
            $scope.publicationListCtrl.data = []
        #load by criteria
        if $scope.followingMode
            if interestSelected?
                searchService.byFollowedAndInterest $scope.currentPage, $scope.sortChoose, interestSelected.id, (data) ->
                    loadingPublicationSuccess data, ->
                        $scope.emptyMessage = 'followedWithInterest'
                        $scope.businessListParam.loading = true
                        searchService.nearBusinessByInterest interestSelected.id, (data) ->
                            loadingBusinessSuccess data
            else
                searchService.byFollowed $scope.currentPage, $scope.sortChoose, (data) ->
                    loadingPublicationSuccess data, ->
                        $scope.emptyMessage = 'followed'
                        $scope.businessListParam.loading = true
                        searchService.nearBusiness (data) ->
                            loadingBusinessSuccess data
        else
            if interestSelected?
                searchService.byInterest $scope.currentPage, $scope.sortChoose, interestSelected.id, (data) ->
                    loadingPublicationSuccess data, ->
                        $scope.emptyMessage = 'newsFeedWithInterest'
                        $scope.businessListParam.loading = true
                        searchService.nearBusinessByInterest interestSelected.id, (data) ->
                            loadingBusinessSuccess data
            else
                searchService.default $scope.currentPage, $scope.sortChoose, (data) ->
                    loadingPublicationSuccess data, ->
                        $scope.emptyMessage = 'newsFeed'
                        $scope.businessListParam.loading = true
                        searchService.nearBusiness (data) ->
                            loadingBusinessSuccess data

    #set following mode
    $scope.setFollowingMode = (n) ->
# if there a no value, just use the opposite the following mode
        if n == null
            n = !$scope.followingMode
        else
            $scope.followingMode = !$scope.followingMode

    #initialize
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'
    modalService.closeLoadingModal()

    $scope.currentPage = 0
    $scope.allLoaded = false
    $scope.loadPublication()

    #load all customer interests
    customerInterestService.getAll (value) ->
        $scope.customerInterests = value
