myApp.directive("headerBarCtrl", function (addressService, $rootScope, languageService, $location, accountService, facebookService, modalService, $timeout, geolocationService, addressService) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/web/headerBar/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.currentLang = languageService.currentLang;


                    //use the model
                    scope.myself = accountService.getMyself();
                    scope.accountService = accountService;


                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };


                    //login open modal
                    scope.login = function () {
                        modalService.openLoginModal();
                    };

                    //registration open modal
                    scope.registration = function () {
                        modalService.openCustomerRegistrationModal();
                    };

                    //edit profile
                    scope.editProfile = function () {
                        modalService.openEditProfileModal();

                    };

                    //log out
                    scope.logout = function () {
                        if (facebookService.isConnected()) {
                            facebookService.logout();
                        }
                        $rootScope.$broadcast('LOGOUT');
                        accountService.logout(function () {
                            $location.path('/');
                        });
                    };

                    //
                    // change lang
                    //
                    scope.$watch('lang', function () {
                        if (!angular.isUndefined(scope.lang)) {
                            languageService.changeLanguage(scope.lang);
                        }
                    });

                    scope.languageService = languageService;


                    scope.positionBasicData = [
                        {key: 'currentPosition', translation: '--.position.current'},
                        {key: 'createNewAddress', translation: '--.position.newAddress'}
                    ];

                    scope.positions = angular.copy(scope.positionBasicData);

                    scope.currentPositionText = 'currentPosition';

                    //$scope.$broadcast('CHANGE_ADDRESS',{address:data});

                    $rootScope.$on('CHANGE_ADDRESS', function (data) {
                        scope.currentPosition = data.address.name;
                    });

                    scope.createNewAddress = function (o) {
                        scope.currentPosition = o;
                        modalService.addressModal(true, null, false, function (data) {
                            $timeout(function () {
                                scope.currentPosition = data.name;
                            }, 1);
                        });
                    };

                    $rootScope.$on("CHANGE_ADDRESS_SELECTED", function () {
                        if (accountService.getMyself().selectedAddress == null) {
                            scope.currentPosition = 'currentPosition';
                            return;
                        }
                        scope.currentPosition = accountService.getMyself().selectedAddress.name;
                    });

                    $timeout(function () {
                        completePositions();

                        scope.$watch('currentPosition', function (n, o) {
                            if (n != null && o != n) {
                                if (scope.currentPosition == 'createNewAddress') {
                                    if (accountService.getMyself(o) != null) {
                                        scope.createNewAddress();
                                    }
                                    else {
                                        modalService.openLoginModal(scope.createNewAddress, o, '--.loginModal.help.address');
                                    }
                                }
                                if (scope.currentPosition != scope.positionCurrenltyComputed) {
                                    scope.positionCurrenltyComputed = scope.currentPosition;
                                    addressService.changeAddress(scope.currentPosition, function (result) {

                                        if (accountService.getMyself() != null) {
                                            if (result.__type.indexOf('AddressDTO') == -1) {
                                                accountService.getMyself().selectedAddress = null;
                                            }
                                            else {
                                                accountService.getMyself().selectedAddress = result;
                                            }
                                        }
                                        $timeout(function () {
                                            $rootScope.$broadcast('POSITION_CHANGED');
                                        }, 1);
                                    });
                                }
                            }
                        });

                        $rootScope.$watch(function () {
                            return accountService.model.myself;
                        }, function watchCallback(newValue, oldValue) {
                            completePositions();
                        });

                    }, 1);

                    var completePositions = function () {
                        scope.positions = angular.copy(scope.positionBasicData);
                        if (accountService.getMyself() != null) {
                            for (var key in accountService.getMyself().addresses) {
                                scope.positions.splice(scope.positions.length - 1, 0,
                                    {
                                        key: accountService.getMyself().addresses[key].name,
                                        translation: accountService.getMyself().addresses[key].name
                                    });
                            }
                        }
                        scope.currentPosition = geolocationService.getLocationText();
                        //scope.positionCurrenltyComputed = scope.currentPosition;
                    };

                    $rootScope.$watch(function () {
                        return accountService.model.myself;
                    }, function watchCallback(n, o) {
                        completePositions();
                    }, true);
                }
            }
        }
    }
});
