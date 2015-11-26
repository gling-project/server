myApp.controller 'WelcomeCtrl', ($rootScope, $scope,publicationService,$location,businessService) ->

    #params
    $scope.LAST_BUSINESS_NB = 5
    $scope.descriptionLimitBase = 120


    $scope.navigateTo = (publication) ->
        $location '/business/'+publication.businessId+'/publication/'+publication.id

    $scope.goTo = (url) ->
        $location url

    #initialization
    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    #load publications
    publicationService.loadByIds [176,175,174,172], (list) ->
        $scope.publications  = list

    #load businesses
    businessService.loadLastBusiness $scope.LAST_BUSINESS_NB, (data)->
        $scope.businesses = data
        for b in $scope.businesses
            b.descriptionLimit=$scope.descriptionLimitBase