myApp.controller('BusinessCtrl', function($rootScope, $scope, $routeParams, businessService, geolocationService, addressService, $timeout, $flash, followService, $filter, modalService, accountService, constantService) {
  $scope.loading = true;
  $scope.publicationListParam = {
    businessId: $routeParams.businessId
  };
  $scope.myBusiness = constantService.compareNumber(accountService.getMyself().businessId, $scope.publicationListParam.businessId);
  $scope.descriptionLimitBase = 200;
  $scope.descriptionLimit = $scope.descriptionLimitBase;
  $scope.googleMapParams = {
    staticMap: true
  };
  $scope.displayBack = function() {
    return window.history.length > 0;
  };
  $scope.back = function() {
    return window.history.back();
  };
  $scope.followed = function() {
    $scope.business.following = !$scope.business.following;
    if ($scope.business.following) {
      $flash.success($filter('translateText')('--.followWidget.message.add'));
    } else {
      $flash.success($filter('translateText')('--.followWidget.message.remove'));
    }
    return followService.addFollow($scope.business.following, $scope.business.id);
  };
  $scope.openGallery = function(image) {
    return $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY', {
      list: $scope.business.galleryPictures,
      first: image
    });
  };
  $scope.displaySchedule = function() {
    var schedule, _i, _len, _ref, _ref2;
    if (((_ref = $scope.business) != null ? _ref.schedules : void 0) != null) {
      _ref2 = $scope.business.schedules;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        schedule = _ref2[_i];
        if (schedule.length > 0) {
          return true;
        }
      }
    }
    return false;
  };
  businessService.getBusiness($routeParams.businessId, function(data) {
    $rootScope.$broadcast('PROGRESS_BAR_STOP');
    modalService.closeLoadingModal();
    $scope.loading = false;
    $scope.business = data;
    $scope.tabToDisplay = 'home';
    $scope.categoryLineParams = {
      categories: $scope.business.categories
    };
    $scope.googleMapParams.address = $scope.business.address;
    $scope.googleMapParams.mobile = true;
    $scope.$watch('tabToDisplay', function() {
      if ($scope.tabToDisplay === 'info') {
        return $timeout((function() {
          $scope.googleMapParams.refreshNow();
          return;
        }), 1);
      }
    });
    $scope.displaySocialNetwork = function() {
      var s;
      s = $scope.business.socialNetwork;
      if (!(s != null)) {
        return false;
      }
      return (s.facebookLink != null) || (s.twitterLink != null) || (s.instagramLink != null) || (s.deliveryLink != null) || (s.opinionLink != null) || (s.reservationLink != null);
    };
    $scope.tab = [
      {
        name: 'home',
        translatableName: '--.business.action.home',
        icon: 'gling-icon-home',
        action: function() {
          $scope.tabToDisplay = 'home';
          return;
        },
        display: function() {
          return true;
        }
      }, {
        name: 'info',
        translatableName: '--.business.action.info',
        icon: 'gling-icon-info',
        action: function() {
          $scope.tabToDisplay = 'info';
          return;
        },
        display: function() {
          return true;
        }
      }, {
        name: 'gallery',
        icon: 'gling-icon-images',
        translatableName: '--.business.action.gallery',
        action: function() {
          $scope.tabToDisplay = 'gallery';
          return;
        },
        display: function() {
          return ($scope.business.galleryPictures != null) && $scope.business.galleryPictures.length > 0;
        }
      }
    ];
    $scope.computeDistance = function() {
      return addressService.distance($scope.business.address.id, function(data) {
        return $scope.business.distance = data.distance;
      });
    };
    $scope.$on('POSITION_CHANGED', function() {
      $scope.computeDistance();
      return $scope.$broadcast('RELOAD_PUBLICATION');
    });
    $scope.refreshPublications = function() {
      $scope.tabToDisplay = 'home';
      return $scope.$broadcast('RELOAD_PUBLICATION');
    };
    $scope.$on('RELOAD_PUBLICATION', function() {
      return $scope.publicationListParam.refresh();
    });
    if (geolocationService.currentPosition != null) {
      $scope.$broadcast('RELOAD_PUBLICATION');
    }
    return $scope.computeDistance();
  });
  $scope.createPromotion = function() {
    modalService.openLoadingModal();
    return $scope.navigateTo('/promotion');
  };
  return $scope.createNotification = function() {
    modalService.openLoadingModal();
    return $scope.navigateTo('/businessNotification');
  };
});