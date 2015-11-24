myApp.controller('MenuCtrl', function($rootScope, $scope, facebookService, accountService, $location, $timeout, geolocationService, modalService, addressService) {
  var completePositions;
  $scope.showmenu = false;
  $scope.myBusiness = null;
  $scope.currentPosition = null;
  $scope.semaphoreComputeAddress = false;
  $scope.positionBasicData = [
    {
      key: 'currentPosition',
      translation: '--.position.current'
    }, {
      key: 'createNewAddress',
      translation: '--.position.newAddress'
    }
  ];
  if ((accountService.getMyself() != null) && (accountService.getMyself().businessId != null)) {
    $scope.myBusiness = accountService.getMyself().businessId;
  }
  $scope.$watch((function() {
    return (accountService.getMyself() != null) && accountService.getMyself().businessId;
  }), (function() {
    return $scope.myBusiness = (accountService.getMyself() != null) && accountService.getMyself().businessId;
  }));
  $scope.$on('toggleMenu', function() {
    return $scope.showmenu = $scope.showmenu ? false : true;
  });
  $scope.closeMenu = function() {
    return $scope.showmenu = false;
  };
  $scope.navigateTo = function(target) {
    $scope.showmenu = false;
    if ($location.path().indexOf(target) === -1) {
      $rootScope.$broadcast('PROGRESS_BAR_START');
      modalService.openLoadingModal();
      $rootScope.$broadcast('SEARCH_CLEAN');
      return $timeout((function() {
        return $location.path(target);
      }), 1);
    }
  };
  $scope.logout = function() {
    $scope.$broadcast('LOGOUT');
    return accountService.logout(function() {
      $location.path('/');
      return $scope.closeMenu();
    });
  };
  $rootScope.$on('CHANGE_ADDRESS_SELECTED', function() {
    if (accountService.getMyself().selectedAddress === null) {
      if (geolocationService.position === null) {
        $scope.currentPosition = 'default';
      } else {
        $scope.currentPosition = 'currentPosition';
      }
    }
    return $scope.currentPosition = accountService.getMyself().selectedAddress.name;
  });
  $rootScope.$on('POSITION_CHANGED', function() {
    console.log('je suis POSITION_CHANGED : ' + $scope.suspendWatching);
    return completePositions();
  });
  completePositions = function() {
    var address, _i, _len, _ref;
    $scope.positions = angular.copy($scope.positionBasicData);
    if (geolocationService.position === null) {
      $scope.positions.splice(0, 0, {
        key: 'default',
        translation: '--.position.brussel'
      });
    } else {
      if ($scope.currentPosition === 'default') {
        $scope.currentPosition = 'currentPosition';
      }
    }
    if (accountService.getMyself() != null) {
      _ref = accountService.getMyself().addresses;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        address = _ref[_i];
        $scope.positions.splice($scope.positions.length - 1, 0, {
          key: address.name,
          translation: address.name
        });
      }
    }
    return $scope.currentPosition = geolocationService.getLocationText();
  };
  $rootScope.$watch((function() {
    return accountService.model.myself;
  }), (function(n, o) {
    completePositions();
    return;
  }), true);
  return $timeout((function() {
    completePositions();
    $scope.$watch('currentPosition', function(n, o) {
      var address, _i, _len, _ref;
      if ((n != null) && (o != null) && !$scope.semaphoreComputeAddress) {
        $scope.semaphoreComputeAddress = true;
        if ($scope.currentPosition === 'createNewAddress') {
          $scope.currentPosition = o;
          if (accountService.getMyself() != null) {
            modalService.addressModal(true, null, false, function(data) {
              return $timeout((function() {
                return $scope.currentPosition = data.name;
              }), 1);
            });
          } else {
            modalService.openLoginModal($scope.createNewAddress, angular.copy(o), '--.loginModal.help.address');
          }
        } else if ($scope.currentPosition === 'currentPosition' && !(geolocationService.currentPosition != null)) {
          $scope.currentPosition = o;
          modalService.messageModal('--.message.modal.notLocalised.title', '--.message.modal.notLocalised.content');
        } else if ($scope.currentPosition !== $scope.positionCurrenltyComputed) {
          $scope.positionCurrenltyComputed = $scope.currentPosition;
          if (accountService.getMyself() !== null && ((accountService.getMyself().selectedAddress === null && $scope.currentPosition !== 'currentPosition' && $scope.currentPosition !== 'default') || (accountService.getMyself().selectedAddress !== null && accountService.getMyself().selectedAddress.name !== $scope.currentPosition))) {
            if ($scope.currentPosition === 'default' || $scope.currentPosition === 'currentPosition') {
              accountService.getMyself().selectedAddress = null;
            } else {
              _ref = accountService.getMyself().addresses;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                address = _ref[_i];
                if (address.name === $scope.currentPosition) {
                  accountService.getMyself().selectedAddress = address;
                }
              }
            }
            $timeout((function() {
              return $rootScope.$broadcast('POSITION_CHANGED');
            }), 1);
            addressService.changeAddress($scope.currentPosition);
          }
        }
        $timeout((function() {
          return $scope.semaphoreComputeAddress = false;
        }), 1);
      }
      return;
    });
    return $rootScope.$watch((function() {
      return accountService.model.myself;
    }), function() {
      return completePositions();
    });
  }), 1);
});