myApp.directive('headerBarCtrl', function(addressService, $rootScope, languageService, $location, accountService, facebookService, modalService, $timeout, geolocationService, addressService) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/assets/js/directive/web/headerBar/template.html',
    replace: true,
    compile: function() {
      return {
        post: function(scope) {
          var completePositions;
          scope.currentLang = languageService.currentLang;
          scope.languageService = languageService;
          scope.myself = accountService.getMyself();
          scope.accountService = accountService;
          scope.testPath = function(url) {
            return $location.path().indexOf(url) > -1;
          };
          scope.goTo = function(url) {
            return $location.path(url);
          };
          scope.goToHome = function() {
            $(window).scrollTop(0);
            return scope.navigateTo('/shopnews');
          };
          scope.navigateTo = function(target) {
            return $location.path(target);
          };
          scope.login = function() {
            return modalService.openLoginModal();
          };
          scope.registration = function() {
            return modalService.openCustomerRegistrationModal();
          };
          scope.editProfile = function() {
            return modalService.openEditProfileModal();
          };
          scope.logout = function() {
            $rootScope.$broadcast('LOGOUT');
            return accountService.logout(function() {
              return $location.path('/');
            });
          };
          scope.$watch('lang', function() {
            if (!angular.isUndefined(scope.lang)) {
              return languageService.changeLanguage(scope.lang);
            }
          });
          scope.currentPosition = null;
          scope.suspendWatching = false;
          scope.positionBasicData = [
            {
              key: 'currentPosition',
              translation: '--.position.current'
            }, {
              key: 'createNewAddress',
              translation: '--.position.newAddress'
            }
          ];
          $rootScope.$on('CHANGE_ADDRESS_SELECTED', function() {
            if (!(accountService.getMyself().selectedAddress != null)) {
              if (!(geolocationService.position != null)) {
                scope.currentPosition = 'default';
              } else {
                scope.currentPosition = 'currentPosition';
              }
            }
            return scope.currentPosition = accountService.getMyself().selectedAddress.name;
          });
          $timeout(function() {
            completePositions();
            scope.$watch('currentPosition', function(n, o) {
              console.log(n + '/' + o + '=>' + scope.suspendWatching);
              if ((n != null) && o !== n && scope.suspendWatching !== true) {
                scope.suspendWatching = true;
                if (scope.currentPosition === 'createNewAddress') {
                  scope.currentPosition = o;
                  if (accountService.getMyself() != null) {
                    modalService.addressModal(true, null, false, function(data) {
                      return $timeout(function() {
                        return scope.currentPosition = data.name;
                      }, 1);
                    });
                  } else {
                    modalService.openLoginModal(scope.createNewAddress, angular.copy(o), '--.loginModal.help.address');
                  }
                } else if (scope.currentPosition === 'currentPosition' && !(geolocationService.position != null)) {
                  scope.currentPosition = o;
                  modalService.messageModal('--.message.modal.notLocalised.title', '--.message.modal.notLocalised.content');
                } else if (scope.currentPosition !== scope.positionCurrenltyComputed) {
                  scope.positionCurrenltyComputed = scope.currentPosition;
                  addressService.changeAddress(scope.currentPosition, function(result) {
                    if (accountService.getMyself() != null) {
                      if (result.__type.indexOf('AddressDTO') === -1) {
                        accountService.getMyself().selectedAddress = null;
                      } else {
                        accountService.getMyself().selectedAddress = result;
                      }
                    }
                    return $timeout(function() {
                      return $rootScope.$broadcast('POSITION_CHANGED');
                    }, 1);
                  });
                }
                return $timeout(function() {
                  return scope.suspendWatching = false;
                }, 1);
              }
            });
            return $rootScope.$watch(function() {
              return accountService.model.myself;
            }, function() {
              return completePositions();
            });
          }, 1);
          $rootScope.$on('POSITION_CHANGED', function() {
            return completePositions();
          });
          completePositions = function() {
            var key;
            scope.positions = angular.copy(scope.positionBasicData);
            if (!(geolocationService.position != null)) {
              scope.positions.splice(0, 0, {
                key: 'default',
                translation: '--.position.brussel'
              });
            } else {
              if (scope.currentPosition === 'default') {
                scope.currentPosition = 'currentPosition';
              }
            }
            if (accountService.getMyself() != null) {
              for (key in accountService.getMyself().addresses) {
                scope.positions.splice(scope.positions.length - 1, 0, {
                  key: accountService.getMyself().addresses[key].name,
                  translation: accountService.getMyself().addresses[key].name
                });
              }
            }
            return scope.currentPosition = geolocationService.getLocationText();
          };
          return $rootScope.$watch(function() {
            return accountService.model.myself;
          }, function() {
            return completePositions();
          }, true);
        }
      };
    }
  };
});