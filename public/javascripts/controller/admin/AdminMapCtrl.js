myApp.controller('AdminMapCtrl', function ($scope, superAdminService) {

    $scope.positions = null;
    $scope.map = null;
    superAdminService.getCustomerPositions(function (data) {
        $scope.positions = data;
        $scope.GenerateMapMarkers();
    });


    $scope.mapData = {
        center: {
            latitude: 50.8471417,
            longitude: 4.3528959
        },
        zoom: 11
    };

    $scope.GenerateMapMarkers = function () {
        if ($scope.map != null && $scope.positions != null) {
            for (var key in $scope.positions) {
                var position = $scope.positions[key];
                var marker = new google.maps.Marker({
                    //title: "Hi marker " + i
                });
                marker.setPosition(new google.maps.LatLng(position.x, position.y));
                marker.setMap($scope.map)
            }
        }
    };

    $scope.$watch('map', function (n) {
        $scope.GenerateMapMarkers();
    });


});