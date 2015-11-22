#business controller
#display map
#can create a business page from a facebook profile
#can change the status of the business
myApp.controller 'MapCtrl', ($scope, $rootScope, mapService, customerInterestService, $compile, $timeout, geolocationService) ->


    #params
    $scope.mapDataBusinesses = null
    $scope.map = null
    $scope.interests = null
    $scope.markers = []
    $scope.currentMarker = null
    $scope.listDisplayedBusiness = []
    $scope.displayList=true

    #watch position
    $scope.$watch ->
        return geolocationService.position
    , (n)->
        if n?
            $scope.map.setCenter {lat:geolocationService.position.x,lng:geolocationService.position.y}
            $scope.map.setZoom 15
            google.maps.event.trigger $scope.map, 'resize'
            if !$scope.currentMarker?
                $scope.currentMarker = new (google.maps.Marker)({})
            $scope.currentMarker.setPosition new (google.maps.LatLng)(geolocationService.position.x,
                geolocationService.position.y)
            $scope.currentMarker.setTitle 'Ma position'
            $scope.currentMarker.setMap $scope.map

    #compute window height
    $scope.height = $(window).height() - 140
    window.addEventListener 'resize', ->
        $scope.height = $(window).height() - 140

    $scope.infowindow = new google.maps.InfoWindow
        content: '<div class="info-window-inject"></div>'

    $scope.windowParam = {}
    $scope.filters =
        open: false
        following: false

    getMarker = (business) ->
        for marker in $scope.markers
            if marker.id == business.id
                return marker
        null

    getBusiness = (id) ->
        for mapDataBusiness in $scope.mapDataBusinesses
            if mapDataBusiness.id == id
                return mapDataBusiness
        null

    #filters
    $scope.$watch 'filters', ->
        if $scope.mapDataBusinesses?
            for mapDataBusiness in $scope.mapDataBusinesses
                marker = getMarker mapDataBusiness
                if $scope.filters.open && !mapDataBusiness.attendance?
                    marker.setMap null
                else if $scope.filters.following && !mapDataBusiness.following
                    marker.setMap null
                else if !marker.getMap()?
                    marker.setMap $scope.map
    , 1

    #test if one of the business interest is selected
    testInterests = (mapDataBusiness) ->

        #recover the marker
        marker = getMarker mapDataBusiness

        #other interest
        for interest in $scope.interests
            if interest.name == 'empty'
                if !mapDataBusiness.interests? || mapDataBusiness.interests.length == 0
                    if interest.selected == true
                        if !marker.getMap()?
                            marker.setMap $scope.map
                    else
                        marker.setMap null
                    return
            else
                for interestToTest in mapDataBusiness.interests
                    if interest.name == interestToTest.name && interest.selected == true
                        if !marker.getMap()?
                            marker.setMap $scope.map
                        return

        #not found ? remove
        marker.setMap null

    #watch interest
    $scope.$watch 'interests', ->
        if $scope.mapDataBusinesses?
            for mapDataBusiness in $scope.mapDataBusinesses
                testInterests mapDataBusiness
    , true


    #interest list select / dis-select all
    $scope.selectAllInterest = (all) ->
        for interest in $scope.interests
            interest.selected = all


    #generate map marker
    $scope.generateMapMarkers = ->
        if $scope.map? and $scope.mapDataBusinesses?
            #called when the ngMap is initialized AND the positions are loaded
            for key of $scope.mapDataBusinesses
                mapDataBusiness = $scope.mapDataBusinesses[key]
                if mapDataBusiness.address?
                    marker = new (google.maps.Marker)({})
                    marker.id = mapDataBusiness.id
                    marker.setPosition new (google.maps.LatLng)(mapDataBusiness.address.posx,
                        mapDataBusiness.address.posy)
                    marker.setTitle mapDataBusiness.name

                    marker.setIcon getIcon mapDataBusiness

                    marker.setMap $scope.map
                    $scope.markers.push marker

                    addListener marker, mapDataBusiness

    getIcon = (business) ->
        name = '/assets/images/google-map-marker/marker_'
        if business.following
            name += 'bell_'

        if business.attendance == 'LIGHT'
            name += 'green_light.png'
        else if business.attendance == 'MODERATE'
            name += 'orange.png'
        else if business.attendance == 'IMPORTANT'
            name += 'red.png'
        else if business.attendance == 'APPOINTMENT'
            name += 'blue_light.png'
        else
            name += 'black.png'
        return name;

    $scope.refreshMarkerIcon = (business) ->
        marker = getMarker business
        marker.setIcon getIcon business

    #add listener to maker
    addListener = (marker, mapDataBusiness) ->
        marker.addListener 'click', ()->

            #remove window from current marker
            if $scope.infowindow?
                $scope.infowindow.close()

            #refresh param of directive
            $scope.windowParam = mapDataBusiness

            #inject directive
            if !$scope.directive?
                $scope.directive = $compile("<business-for-map-ctrl ng-info=\"{business:windowParam,followingCallback:refreshMarkerIcon}\"/></business-for-map-ctrl>")($scope)
                $timeout ->
                    $('.info-window-inject').append($scope.directive)
                , 1
            #inject window into marker
            $scope.infowindow.open $scope.map, marker;

    #start animation
    $scope.startAnimation = (business, inthere) ->
        if inthere
            for marker in $scope.markers
                if marker.id == business.id
                    marker.setAnimation google.maps.Animation.BOUNCE
        else
            $timeout ->
                for marker in $scope.markers
                    if marker.id == business.id
                        marker.setAnimation null
            , 1000



    #intialization
    mapService.loadMapDataBusiness (data)->
        $scope.mapDataBusinesses = data
        $scope.generateMapMarkers()
    customerInterestService.getAll (data) ->
        $scope.interests = angular.copy data
        $scope.interests.push {
            name: 'empty'
            translationName: 'Sans intérêt particulier'
        }
        for interest in $scope.interests
            interest.selected = true

    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    $scope.map = new google.maps.Map document.getElementById('map'), {
        center:
            lat: 50.8471417
            lng: 4.3528959
        zoom: 12
        mapTypeControl: false
        streetViewControl:false
    }

    #create displayable marker
    $scope.map.addListener 'center_changed', ->
        $scope.listDisplayedBusiness=[]
        for marker in $scope.markers
            if $scope.map.getBounds().contains(marker.getPosition())
                $scope.listDisplayedBusiness.push getBusiness marker.id



    mapStyle = [
        {
            featureType: "poi"
            stylers: [
                visibility: "off"
            ]
        },
        {
            featureType: "transit"
            stylers: [
                visibility: "off"
            ]
        }
    ]

    $scope.map.setOptions({styles: mapStyle});

    $scope.generateMapMarkers()



