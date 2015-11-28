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

    $scope.goTo = (url) ->
        $location.path url

    $scope.getBackgroundClass = (publication) ->
        if publication.pictures[0]? && publication.pictures[0].width / publication.pictures[0].height > 1
            return 'picture-horizontal'
        else
            return 'picture-vertical'

    #initialization
    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    #load businesses
    businessService.loadLastBusiness $scope.LAST_BUSINESS_NB, (data)->
        $scope.businesses = data
        for b in $scope.businesses
            b.descriptionLimit = $scope.descriptionLimitBase

    # load publication
    searchService.lastOnes 3, (data)->
        $scope.publicationListCtrl.loading = false
        $scope.publicationListCtrl.data = data

    $timeout ->
        FB.XFBML.parse();
    ,1