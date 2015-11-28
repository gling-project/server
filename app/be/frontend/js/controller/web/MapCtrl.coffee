#business controller
#display map
#can create a business page from a facebook profile
#can change the status of the business
myApp.controller 'MapCtrl', ($scope, $rootScope, mapService, customerInterestService, $compile, $timeout, geolocationService, $location) ->


    #params
    $scope.mapDataBusinesses = null
    $scope.map = null
    $scope.interests = null
    $scope.markers = []
    $scope.currentMarker = null
    $scope.listDisplayedBusiness = []
    $scope.displayList = true
    $scope.initialPos=
        lat: 50.8471417
        lng: 4.3528959
        force:false
        zoom:12

    #watch position
    $scope.$watch ->
        return geolocationService.position
    , (n)->
        if n? && $scope.initialPos.force==false
            $scope.centerToPosition()

    $scope.centerToPosition = ->
        if geolocationService.position? && $scope.map? && $scope.initialPos.force==false
            $scope.map.setCenter {lat: geolocationService.position.x, lng: geolocationService.position.y}
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

    #get a marker by business
    getMarker = (business) ->
        for marker in $scope.markers
            if marker.id == business.id
                return marker
        null

    #get a business by businessId
    getBusiness = (id) ->
        for mapDataBusiness in $scope.mapDataBusinesses
            if mapDataBusiness.id == id
                return mapDataBusiness
        null

    #filters
    $scope.$watch 'filters', ->
        $scope.computeFilters()
    , true

    #watch interest
    $scope.$watch 'interests', ->
        $scope.computeFilters()
    , true

    $scope.computeFilters = ->
        if $scope.mapDataBusinesses?
            for mapDataBusiness in $scope.mapDataBusinesses
                visible = true
                marker = getMarker mapDataBusiness
                #test attendance
                if $scope.filters.open && !mapDataBusiness.attendance?
                    visible = false
                    #test following
                else if $scope.filters.following && !mapDataBusiness.following
                    visible = false
                    #test interest
                else if !testInterests mapDataBusiness
                    visible = false

                #result
                mapDataBusiness.visible = visible
                if visible
                    if !marker.getMap()?
                        marker.setMap $scope.map
                else if marker.getMap()?
                    marker.setMap null

            #compute list
            $scope.computeList()

    #test if one of the business interest is selected
    testInterests = (mapDataBusiness) ->

        #recover the marker
        marker = getMarker mapDataBusiness

        #other interest
        for interest in $scope.interests
            if interest.name == 'empty'
                if !mapDataBusiness.interests? || mapDataBusiness.interests.length == 0
                    if interest.selected == true
                        return true
                    else
                        return false
            else
                for interestToTest in mapDataBusiness.interests
                    if interest.name == interestToTest.name && interest.selected == true
                        return true
        return false


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
                    mapDataBusiness.visible = true

                    addListener marker, mapDataBusiness
        $scope.computeList()

    getIcon = (business) ->
        name = '/assets/images/google-map-marker/marker_'
        if business.following
            name += 'bell_'

        if business.attendance == 'LIGHT' or business.attendance == 'MODERATE' or business.attendance == 'IMPORTANT'
            name += 'green_light.png'
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

    #compute position
    urlParam = $location.search()
    if $location.search().hasOwnProperty('x') && $location.search().hasOwnProperty('y')
        $scope.initialPos.lat= parseFloat(urlParam.x)
        $scope.initialPos.lng= parseFloat(urlParam.y)
        $scope.initialPos.force=true
        $scope.initialPos.zoom=16

    $timeout ->
        console.log $scope.initialPos
        $scope.map = new google.maps.Map document.getElementById('map'), {
            center:
                lat: $scope.initialPos.lat
                lng: $scope.initialPos.lng
            zoom: $scope.initialPos.zoom
            mapTypeControl: false
            streetViewControl: false
        }

        #create displayable marker
        $scope.map.addListener 'center_changed', ->
            $scope.lastMove = new Date().getTime()
            if $scope.promise?
                $timeout.cancel($scope.promise)
            $scope.promise = $timeout ->
                $scope.computeList()
            , 500
        $scope.computeList = ->
            $scope.listDisplayedBusiness = []
            for marker in $scope.markers
                if getBusiness(marker.id).visible && $scope.map.getBounds()? && $scope.map.getBounds().contains(marker.getPosition())
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
        $scope.centerToPosition()
    , 1



