myApp.controller('AdminMapCtrl', function($scope, superAdminService) {
  $scope.positions = null;
  $scope.map = null;
  $scope.mapData = {
    center: {
      latitude: 50.8471417,
      longitude: 4.3528959
    },
    zoom: 11
  };
  $scope.GenerateMapMarkers = function() {
    var marker, position, _i, _len, _ref, _results;
    if (($scope.map != null) && ($scope.positions != null)) {
      _ref = $scope.positions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        position = _ref[_i];
        marker = new google.maps.Marker({});
        marker.setPosition(new google.maps.LatLng(position.x, position.y));
        _results.push(marker.setMap($scope.map));
      }
      return _results;
    }
  };
  superAdminService.getCustomerPositions(function(data) {
    $scope.positions = data;
    return $scope.GenerateMapMarkers();
  });
  return $scope.$watch('map', function(n) {
    return $scope.GenerateMapMarkers();
  });
});