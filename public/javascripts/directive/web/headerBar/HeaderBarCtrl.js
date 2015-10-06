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


                    //
                    // POSITION
                    //
                    scope.currentPosition = null;
                    scope.suspendWatching=false;
                    scope.positionBasicData = [
                        {key: 'currentPosition', translation: '--.position.current'},
                        {key: 'createNewAddress', translation: '--.position.newAddress'}
                    ];

                    //the user has selected a new address
                    $rootScope.$on("CHANGE_ADDRESS_SELECTED", function () {
                        if (accountService.getMyself().selectedAddress == null) {
                            if (geolocationService.position == null) {
                                scope.currentPosition = 'default';
                            }
                            else {
                                scope.currentPosition = 'currentPosition';
                            }
                            return;
                        }
                        scope.currentPosition = accountService.getMyself().selectedAddress.name;
                    });

                    $timeout(function () {
                        completePositions();

                        scope.$watch('currentPosition', function (n, o) {
                            console.log(n+'/'+o+"=>"+scope.suspendWatching);
                            if (n != null && o != n && scope.suspendWatching!=true) {
                                scope.suspendWatching=true;
                                if (scope.currentPosition == 'createNewAddress') {
                                    scope.currentPosition = o;
                                    if (accountService.getMyself() != null) {

                                        //open modal to create new address
                                        modalService.addressModal(true, null, false, function (data) {
                                            $timeout(function () {
                                                scope.currentPosition = data.name;
                                            }, 1);
                                        });
                                    }
                                    else {
                                        modalService.openLoginModal(scope.createNewAddress, angular.copy(o), '--.loginModal.help.address');
                                    }
                                }
                                else if (scope.currentPosition == 'currentPosition' && geolocationService.position == null) {
                                    scope.currentPosition = o;
                                    modalService.messageModal('--.message.modal.notLocalised.title', '--.message.modal.notLocalised.content');
                                }
                                else if (scope.currentPosition != scope.positionCurrenltyComputed) {

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
                                $timeout(function () {
                                    scope.suspendWatching = false;
                                }, 1);
                            }
                        });

                        $rootScope.$watch(function () {
                            return accountService.model.myself;
                        }, function watchCallback(newValue, oldValue) {
                            completePositions();
                        });

                    }, 1);

                    $rootScope.$on('POSITION_CHANGED',function(){
                        console.log('je suis POSITION_CHANGED : '+scope.suspendWatching);
                        completePositions();
                    });

                    var completePositions = function () {
                        console.log("---- completePositions : "+geolocationService.position);
                        scope.positions = angular.copy(scope.positionBasicData);
                        if(geolocationService.position == null){
                            scope.positions.splice(0,0,{key: 'default', translation: '--.position.brussel'});
                        }
                        else{
                            if(scope.currentPosition == 'default'){
                                scope.currentPosition ='currentPosition';
                            }
                        }
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
