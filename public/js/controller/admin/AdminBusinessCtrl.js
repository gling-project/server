myApp.controller('AdminBusinessCtrl', function($scope, superAdminService, ngTableParams, $filter, $window, modalService, $flash, $timeout) {
  $scope.displayMap = false;
  $scope.importBusinessInput = '';
  $scope.importBusinessLoading = false;
  $scope.mapData = {
    center: {},
    zoom: 11
  };
  $scope.displayMap = false;
  $scope.refresh = function() {
    $scope.businesses = [];
    $scope.businessListLoading = true;
    return superAdminService.getAllBusinesses(function(data) {
      $scope.businessListLoading = false;
      $scope.businesses = data.list;
      $scope.tableParams = new ngTableParams({
        page: 1,
        count: 50,
        sorting: {
          creationDate: 'desc'
        }
      }, {
        total: $scope.businesses.length,
        getData: function($defer, params) {
          var orderedData;
          console.log('params');
          console.log(params.$params.page);
          orderedData = params.sorting() ? $filter('orderBy')($scope.businesses, params.orderBy()) : $scope.businesses;
          return $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
      });
      return $scope.generateMapMarkers();
    });
  };
  $scope.displayMapFct = function(value) {
    $scope.displayMap = value;
    $scope.mapData.center.latitude = 50.8471417;
    $scope.mapData.center.longitude = 4.3528959;
    return $timeout(function() {
      return google.maps.event.trigger($scope.map, 'resize');
    }, 1000);
  };
  $scope.startAnimation = function(business, inthere) {
    var marker, _i, _len, _ref, _results;
    if (inthere) {
      _ref = $scope.mks;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        marker = _ref[_i];
        _results.push(marker.id === business.id ? marker.setAnimation(google.maps.Animation.BOUNCE) : void 0);
      }
      return _results;
    } else {
      return $timeout(function() {
        var marker, _i, _len, _ref, _results;
        _ref = $scope.mks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          marker = _ref[_i];
          _results.push(marker.id === business.id ? marker.setAnimation(null) : void 0);
        }
        return _results;
      }, 2000);
    }
  };
  $scope.mks = [];
  $scope.generateMapMarkers = function() {
    var business, marker, _i, _len, _ref, _results;
    if (($scope.map != null) && ($scope.businesses != null)) {
      _ref = $scope.businesses;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        business = _ref[_i];
        _results.push(business.address != null ? (marker = new google.maps.Marker({}), marker.id = business.id, marker.setPosition(new google.maps.LatLng(business.address.posx, business.address.posy)), marker.setTitle(business.name), business.businessStatus === 'WAITING_CONFIRMATION' ? marker.setIcon('/assets/images/google-map-marker/marker_orange.png') : business.businessStatus === 'NOT_PUBLISHED' ? marker.setIcon('/assets/images/google-map-marker/marker_red.png') : business.businessStatus === 'PUBLISHED' ? business.hasOwner ? marker.setIcon('/assets/images/google-map-marker/marker_green_light.png') : marker.setIcon('/assets/images/google-map-marker/marker_black.png') : void 0, marker.setMap($scope.map), $scope.mks.push(marker)) : void 0);
      }
      return _results;
    }
  };
  $scope.toBusiness = function(businessId) {
    return $window.open('/#business/' + businessId, '_blank');
  };
  $scope.confirmPublication = function(business) {
    return modalService.messageModal('--.admin.business.confirmPublication.modal.title', '--.admin.business.confirmPublication.modal.message', function(close) {
      close();
      return superAdminService.confirmPublication(business.id, function() {
        return business.businessStatus = 'PUBLISHED';
      });
    });
  };
  $scope.confirmClaim = function(business) {
    return modalService.openClaimBusiness(business, function() {
      $flash.success('Le commerçant est maintenant propriétaire de son commerce');
      return business.hasOwner = true;
    });
  };
  $scope.createPromotion = function(business) {
    return modalService.openPromotionModal(null, business, function() {
      return $flash.success('La promotion a bien été créée');
    });
  };
  $scope.createNotification = function(business) {
    return modalService.openBusinessNotificationModal(null, business, function() {
      return $flash.success('La notification a bien été créée');
    });
  };
  $scope.importBusinessStart = function() {
    var urlEncoded;
    $scope.importBusinessLoading = true;
    urlEncoded = encodeURIComponent($scope.importBusinessInput);
    return superAdminService.importBusiness(urlEncoded, (function() {
      $scope.importBusinessLoading = false;
      $flash.success('le commerce a bien été importé');
      return $scope.refresh();
    }), function() {
      return $scope.importBusinessLoading = false;
    });
  };
  return $scope.refresh();
});