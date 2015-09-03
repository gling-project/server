myApp.directive("headerBarCtrl", function (accountService, $rootScope, languageService, $location, accountService, facebookService, modalService, $timeout, geolocationService, addressService) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/web/headerBar/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    //use the model
                    scope.myself = accountService.getMyself();
                    scope.accountService = accountService;


                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };


                    scope.$on('DISPLAY_ADVANCED_SEARCH', function (event, params) {
                        scope.advancedSearch = params.display;
                    });


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
                        scope.$broadcast('LOGOUT');
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


                    scope.positionBasicData =[
                        {key: 'currentPosition', translation: '--.position.current'},
                        {key: 'createNewAddress', translation: '--.position.newAddress'}
                    ];

                    scope.positions =angular.copy(scope.positionBasicData);

                    scope.currentPositionText = 'currentPosition';

                    $timeout(function () {
                        completePositions();

                        scope.$watch('currentPosition', function (n,o) {
                            if (n != null && o != n) {
                                if(scope.currentPosition == 'createNewAddress'){
                                    scope.currentPosition=o;
                                    modalService.addressModal(true,null,false,function(data){
                                        $timeout(function () {
                                            scope.currentPosition = data.name;
                                        },1);
                                    });
                                }
                                else if(scope.currentPosition != scope.positionCurrenltyComputed){
                                    scope.positionCurrenltyComputed = scope.currentPosition;
                                    addressService.changeAddress(scope.currentPosition, function (result) {

                                        if (result.__type.indexOf('AddressDTO') == -1) {
                                            accountService.getMyself().selectedAddress = null;
                                        }
                                        else {
                                            accountService.getMyself().selectedAddress = result;
                                        }
                                        $timeout(function () {
                                            $rootScope.$broadcast('POSITION_CHANGED');
                                            console.log("POSITION_CHANGED");
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
                                scope.positions.splice(scope.positions.length - 1 ,0,
                                    {
                                        key: accountService.getMyself().addresses[key].name,
                                        translation: accountService.getMyself().addresses[key].name
                                    });
                            }
                        }
                        scope.currentPosition = geolocationService.getLocationText();
                        scope.positionCurrenltyComputed=scope.currentPosition;
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
