myApp.controller 'WelcomeCtrl', ($rootScope, $scope, publicationService, $location, businessService, constantService, customerInterestService, searchService, $timeout,accountService) ->

    #params
    $scope.LAST_BUSINESS_NB = 5
    $scope.MAX_PUBLICATION = 4
    $scope.descriptionLimitBase = 120
    $scope.publicationListCtrl =
        data: []
    $scope.lastChange = null

    $scope.myself  = accountService.getMyself()

    #map list
    $scope.maps = [
        name:'Chaussée de Wavre'
        src: "/assets/images/map/1160.png"
        position:
            x: 50.815060
            y: 4.425933
    ,
        name:'Rue des Tongres'
        src: "/assets/images/map/tongres.png"
        position:
            x: 50.840479
            y: 4.401033
    ,
        name:'Place Flagey'
        src: "/assets/images/map/flagey.png"
        position:
            x: 50.827821
            y: 4.372452
    ]

    #open map
    $scope.openMap = (map)->
        console.log map
        $scope.goTo('/map',map.position)


    $scope.getInterestClass = (interest) ->
        return 'gling-icon-' + interest.name


    $scope.navigateTo = (publication) ->
        $location.path '/business/' + publication.businessId + '/publication/' + publication.id

    $scope.goTo = (url, params) ->
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
    searchService.lastOnes $scope.MAX_PUBLICATION, (data)->
        $scope.publicationListCtrl.loading = false
        $scope.publicationListCtrl.data = data

    #initialization
    $timeout ->
        FB.XFBML.parse();
    , 1

    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    $scope.loadBusiness()