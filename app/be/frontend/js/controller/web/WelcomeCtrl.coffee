myApp.controller 'WelcomeCtrl', ($rootScope, $scope, publicationService, $location, businessService, constantService, customerInterestService,searchService,$timeout) ->

    #params
    $scope.LAST_BUSINESS_NB = 5
    $scope.descriptionLimitBase = 120
    $scope.currentInterests = []
    $scope.publicationListCtrl =
        data:[]
    $scope.lastChange=null

    $scope.changeInterest = ->
        $timeout ->
            $scope.lastChange = new Date().getTime()
            for key of $scope.currentInterests
                if $scope.currentInterests[key].selected
                    $scope.currentInterests[key].selected=false
                    key = parseFloat(key)
                    if $scope.currentInterests.length-1 > key
                        key = parseFloat(key) +  1
                        $scope.currentInterests[key].selected=true
                    else
                        $scope.currentInterests[0].selected=true
                    break
            $scope.changeInterest()
        ,15000
    $scope.progress =->
        $timeout ->
            $scope.progressPercentage = (new Date().getTime() - $scope.lastChange) / 15000 * 100
            $scope.progress()
        , 100

    #build interest list
    customerInterestService.getAll (interests) ->
        for interest in interests
            if interest.name == 'eat' || interest.name == 'drink'
                $scope.currentInterests.push interest
        $scope.currentInterests[0].selected=true
        $scope.lastChange = new Date().getTime()
        $scope.progress()
        $scope.changeInterest()


    $scope.getInterestClass = (interest) ->
        return 'gling-icon-' + interest.name


    $scope.navigateTo = (publication) ->
        $location '/business/' + publication.businessId + '/publication/' + publication.id

    $scope.goTo = (url) ->
        $location url

    $scope.getBackgroundClass = (publication) ->
        if publication.pictures[0]? && publication.pictures[0].width / publication.pictures[0].height > 1
            return 'picture-horizontal'
        else
            return 'picture-vertical'

    #
    # publication
    #
    $scope.$watch 'currentInterests', (n)->
        if $scope.currentInterests?
            for interest in $scope.currentInterests
                if interest.selected
                    searchService.byInterest 0,interest.id, (data)->
                        $scope.publicationListCtrl.loading = false
                        $scope.publicationListCtrl.data = data
    ,true


    #initialization
    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    #load publications
    publicationService.loadByIds constantService.eventPublicationIds, (list) ->
        $scope.publications = list

    #load businesses
    businessService.loadLastBusiness $scope.LAST_BUSINESS_NB, (data)->
        $scope.businesses = data
        for b in $scope.businesses
            b.descriptionLimit = $scope.descriptionLimitBase