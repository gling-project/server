myApp.controller 'WelcomeCtrl', ($rootScope, $scope, publicationService, $location, businessService, constantService, customerInterestService,searchService,$timeout) ->

    #params
    $scope.LAST_BUSINESS_NB = 5
    $scope.descriptionLimitBase = 120
    $scope.publicationListCtrl =
        data:[]
    $scope.lastChange=null

    $scope.getInterestClass = (interest) ->
        return 'gling-icon-' + interest.name


    $scope.navigateTo = (publication) ->
        $location.path '/business/' + publication.businessId + '/publication/' + publication.id

    $scope.goTo = (url,params) ->

        $location.path(url).search(params)

    $scope.getBackgroundClass = (publication) ->
        if publication.pictures[0]? && publication.pictures[0].width / publication.pictures[0].height > 1
            return 'picture-horizontal'
        else
            return 'picture-vertical'

    #load businesses
    $scope.$on 'POSITION_CHANGED', ->
        $scope.loadBusiness()
    $scope.loadBusiness = ->
        businessService.loadLastBusiness $scope.LAST_BUSINESS_NB, (data)->
            $scope.businesses = data
            for b in $scope.businesses
                b.descriptionLimit = $scope.descriptionLimitBase

    # load publication
    searchService.lastOnes 3, (data)->
        $scope.publicationListCtrl.loading = false
        $scope.publicationListCtrl.data = data

    #initialization
    $timeout ->
        FB.XFBML.parse();
    ,1

    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    $scope.loadBusiness()