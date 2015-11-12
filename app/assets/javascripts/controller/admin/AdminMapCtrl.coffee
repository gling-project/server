#admin controller
#display a map with positions of all customer sessions
myApp.controller 'AdminMapCtrl', ($scope, superAdminService) ->

    #params
    #list of positions to dispay
    $scope.positions = null
    #this param will be used by ngMap to create map object
    $scope.map = null
    #used to get map params to ngMap
    $scope.mapData =
        center:
            latitude: 50.8471417
            longitude: 4.3528959
        zoom: 11

    #generate positions
    $scope.GenerateMapMarkers = ->
        if $scope.map != null and $scope.positions != null
            #called when the ngMap is initialized AND the positions are loaded
            for position in $scope.positions
                marker = new (google.maps.Marker)({})
                marker.setPosition new (google.maps.LatLng)(position.x, position.y)
                marker.setMap $scope.map

    #call positions
    superAdminService.getCustomerPositions (data) ->
        $scope.positions = data
        $scope.GenerateMapMarkers()

    #watching mao initialization
    $scope.$watch 'map', (n) ->
        $scope.GenerateMapMarkers()