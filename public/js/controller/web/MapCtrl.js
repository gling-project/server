myApp.controller('MapCtrl', function($scope, $rootScope, mapService, customerInterestService, $compile, $timeout, geolocationService, $location) {
  var addListener, getBusiness, getIcon, getMarker, testInterests, urlParam;
  $scope.mapDataBusinesses = null;
  $scope.map = null;
  $scope.interests = null;
  $scope.markers = [];
  $scope.currentMarker = null;
  $scope.listDisplayedBusiness = [];
  $scope.displayList = true;
  $scope.initialPos = {
    lat: 50.8471417,
    lng: 4.3528959,
    force: false,
    zoom: 12
  };
  $scope.$watch(function() {
    return geolocationService.position;
  }, function(n) {
    if ((n != null) && $scope.initialPos.force === false) {
      return $scope.centerToPosition();
    }
  });
  $scope.centerToPosition = function() {
    if ((geolocationService.position != null) && ($scope.map != null) && $scope.initialPos.force === false) {
      $scope.map.setCenter({
        lat: geolocationService.position.x,
        lng: geolocationService.position.y
      });
      $scope.map.setZoom(15);
      google.maps.event.trigger($scope.map, 'resize');
      if (!($scope.currentMarker != null)) {
        $scope.currentMarker = new google.maps.Marker({});
      }
      $scope.currentMarker.setPosition(new google.maps.LatLng(geolocationService.position.x, geolocationService.position.y));
      $scope.currentMarker.setTitle('Ma position');
      return $scope.currentMarker.setMap($scope.map);
    }
  };
  $scope.height = $(window).height() - 140;
  window.addEventListener('resize', function() {
    return $scope.height = $(window).height() - 140;
  });
  $scope.infowindow = new google.maps.InfoWindow({
    content: '<div class="info-window-inject"></div>'
  });
  $scope.windowParam = {};
  $scope.filters = {
    open: false,
    following: false
  };
  getMarker = function(business) {
    var marker, _i, _len, _ref;
    _ref = $scope.markers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      marker = _ref[_i];
      if (marker.id === business.id) {
        return marker;
      }
    }
    return null;
  };
  getBusiness = function(id) {
    var mapDataBusiness, _i, _len, _ref;
    _ref = $scope.mapDataBusinesses;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      mapDataBusiness = _ref[_i];
      if (mapDataBusiness.id === id) {
        return mapDataBusiness;
      }
    }
    return null;
  };
  $scope.$watch('filters', function() {
    return $scope.computeFilters();
  }, true);
  $scope.$watch('interests', function() {
    return $scope.computeFilters();
  }, true);
  $scope.computeFilters = function() {
    var mapDataBusiness, marker, visible, _i, _len, _ref;
    if ($scope.mapDataBusinesses != null) {
      _ref = $scope.mapDataBusinesses;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        mapDataBusiness = _ref[_i];
        visible = true;
        marker = getMarker(mapDataBusiness);
        if ($scope.filters.open && !(mapDataBusiness.attendance != null)) {
          visible = false;
        } else if ($scope.filters.following && !mapDataBusiness.following) {
          visible = false;
        } else if (!testInterests(mapDataBusiness)) {
          visible = false;
        }
        mapDataBusiness.visible = visible;
        if (visible) {
          if (!(marker.getMap() != null)) {
            marker.setMap($scope.map);
          }
        } else if (marker.getMap() != null) {
          marker.setMap(null);
        }
      }
      return $scope.computeList();
    }
  };
  testInterests = function(mapDataBusiness) {
    var interest, interestToTest, marker, _i, _j, _len, _len2, _ref, _ref2;
    marker = getMarker(mapDataBusiness);
    _ref = $scope.interests;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      interest = _ref[_i];
      if (interest.name === 'empty') {
        if (!(mapDataBusiness.interests != null) || mapDataBusiness.interests.length === 0) {
          if (interest.selected === true) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        _ref2 = mapDataBusiness.interests;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          interestToTest = _ref2[_j];
          if (interest.name === interestToTest.name && interest.selected === true) {
            return true;
          }
        }
      }
    }
    return false;
  };
  $scope.selectAllInterest = function(all) {
    var interest, _i, _len, _ref, _results;
    _ref = $scope.interests;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      interest = _ref[_i];
      _results.push(interest.selected = all);
    }
    return _results;
  };
  $scope.generateMapMarkers = function() {
    var key, mapDataBusiness, marker;
    if (($scope.map != null) && ($scope.mapDataBusinesses != null)) {
      for (key in $scope.mapDataBusinesses) {
        mapDataBusiness = $scope.mapDataBusinesses[key];
        marker = new google.maps.Marker({});
        marker.id = mapDataBusiness.id;
        marker.setPosition(new google.maps.LatLng(mapDataBusiness.posx, mapDataBusiness.posy));
        marker.setTitle(mapDataBusiness.name);
        marker.setIcon(getIcon(mapDataBusiness));
        marker.setMap($scope.map);
        $scope.markers.push(marker);
        mapDataBusiness.visible = true;
        addListener(marker, mapDataBusiness);
      }
    }
    return $scope.computeList();
  };
  getIcon = function(business) {
    var name;
    name = '/assets/images/google-map-marker/marker_';
    if (business.following) {
      name += 'bell_';
    }
    if (business.isOpen) {
      name += 'green_light.png';
    } else {
      name += 'black.png';
    }
    return name;
  };
  $scope.refreshMarkerIcon = function(business) {
    var marker;
    marker = getMarker(business);
    return marker.setIcon(getIcon(business));
  };
  addListener = function(marker, mapDataBusiness) {
    return marker.addListener('click', function() {
      if ($scope.infowindow != null) {
        $scope.infowindow.close();
      }
      $scope.windowParam = mapDataBusiness;
      if (!($scope.directive != null)) {
        $scope.directive = $compile("<business-for-map-ctrl ng-info=\"{business:windowParam,followingCallback:refreshMarkerIcon}\"/></business-for-map-ctrl>")($scope);
        $timeout(function() {
          return $('.info-window-inject').append($scope.directive);
        }, 1);
      }
      return $scope.infowindow.open($scope.map, marker);
    });
  };
  $scope.startAnimation = function(business, inthere) {
    var marker, _i, _len, _ref, _results;
    if (inthere) {
      _ref = $scope.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(marker.id === business.id ? marker.setAnimation(google.maps.Animation.BOUNCE) : void 0);
      }
      return _results;
    } else {
      return $timeout(function() {
        var marker, _i, _len, _ref, _results;
        _ref = $scope.markers;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          marker = _ref[_i];
          _results.push(marker.id === business.id ? marker.setAnimation(null) : void 0);
        }
        return _results;
      }, 1000);
    }
  };
  mapService.loadMapDataBusiness(function(data) {
    $scope.mapDataBusinesses = data;
    return $scope.generateMapMarkers();
  });
  customerInterestService.getAll(function(data) {
    var interest, _i, _len, _ref, _results;
    $scope.interests = angular.copy(data);
    $scope.interests.push({
      name: 'empty',
      translationName: 'Sans intérêt particulier'
    });
    _ref = $scope.interests;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      interest = _ref[_i];
      _results.push(interest.selected = true);
    }
    return _results;
  });
  $(window).scrollTop(0);
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  urlParam = $location.search();
  if ($location.search().hasOwnProperty('x') && $location.search().hasOwnProperty('y')) {
    $scope.initialPos.lat = parseFloat(urlParam.x);
    $scope.initialPos.lng = parseFloat(urlParam.y);
    $scope.initialPos.force = true;
    $scope.initialPos.zoom = 16;
  }
  return $timeout(function() {
    var mapStyle;
    console.log($scope.initialPos);
    $scope.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: $scope.initialPos.lat,
        lng: $scope.initialPos.lng
      },
      zoom: $scope.initialPos.zoom,
      mapTypeControl: false,
      streetViewControl: false
    });
    $scope.map.addListener('center_changed', function() {
      $scope.lastMove = new Date().getTime();
      if ($scope.promise != null) {
        $timeout.cancel($scope.promise);
      }
      return $scope.promise = $timeout(function() {
        return $scope.computeList();
      }, 500);
    });
    $scope.computeList = function() {
      var marker, _i, _len, _ref, _results;
      $scope.listDisplayedBusiness = [];
      _ref = $scope.markers;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(getBusiness(marker.id).visible && ($scope.map.getBounds() != null) && $scope.map.getBounds().contains(marker.getPosition()) ? $scope.listDisplayedBusiness.push(getBusiness(marker.id)) : void 0);
      }
      return _results;
    };
    mapStyle = [
      {
        featureType: "poi",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }, {
        featureType: "transit",
        stylers: [
          {
            visibility: "off"
          }
        ]
      }
    ];
    $scope.map.setOptions({
      styles: mapStyle
    });
    $scope.generateMapMarkers();
    return $scope.centerToPosition();
  }, 1);
});