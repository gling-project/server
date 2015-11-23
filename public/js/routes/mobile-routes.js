var test = function (accountService) {
    var myself = accountService.getMyself();
    if (myself == null) {
        console.log('ROUTES NOT_CONNECTED');
        return 'NOT_CONNECTED';
    }
    else {
        console.log('ROUTES CONNECTED');
        return myself.type;
    }
};


var initializeCommonRoutes = function () {
    myApp
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/assets/js/view/mobile/welcome.html',
                    controller: 'WelcomeCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) != 'NOT_CONNECTED') {
                                console.log('FROM ROUTES WELCOME');
                                $location.path('/home');
                            }
                        }
                    }
                })
                .when('/home', {
                    templateUrl: '/assets/js/view/mobile/home.html',
                    controller: 'HomeCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                console.log('FROM ROUTES HOME');
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/customer_registration', {
                    templateUrl: '/assets/js/view/mobile/customer_registration.html',
                    controller: 'CustomerRegistrationCtrl',
                    resolve: {
                        a: function (accountService, $location) {
                            if (test(accountService) != 'NOT_CONNECTED') {
                                console.log('FROM ROUTES CUST');
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/promotion', {
                    templateUrl: '/assets/js/view/mobile/promotion.html',
                    controller: 'PromotionCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            if (test(accountService) == 'NOT_CONNECTED' || accountService.getMyself().businessId == null) {
                                console.log('FROM ROUTES PROM');
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/businessNotification', {
                    templateUrl: '/assets/js/view/mobile/businessNotification.html',
                    controller: 'BusinessNotificationCtrl',
                    resolve: {
                        a: function (accountService, $location) {
                            if (test(accountService) == 'NOT_CONNECTED' || accountService.getMyself().businessId == null) {
                                console.log('FROM ROUTES NOT');
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/profile', {
                    templateUrl: '/assets/js/view/mobile/profile.html',
                    controller: 'ProfileCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                console.log('FROM ROUTES PROFILE');
                                $location.path('/');
                            }
                        }
                    }
                }).when('/business/:businessId', {
                    templateUrl: '/assets/js/view/mobile/business.html',
                    controller: 'BusinessCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                }).when('/business/:businessId/publication/:publicationId', {
                    templateUrl: '/assets/js/view/mobile/business.html',
                    controller: 'BusinessCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                }).when('/search/:param', {
                    templateUrl: '/assets/js/view/mobile/search_page.html',
                    controller: 'SearchPageCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                console.log('FROM ROUTES BUSINES');
                                $location.path('/');
                            }
                        }
                    }
                }).when('/my-businesses', {
                    templateUrl: '/assets/js/view/mobile/followed_business_page.html',
                    controller: 'FollowedBusinessPageCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                console.log('FROM ROUTES FOLLOW');
                                $location.path('/');
                            }
                        }
                    }
                }).when('/forgot_password', {
                    templateUrl: '/assets/js/view/mobile/forgotPassword.html',
                    controller: 'ForgotPasswordCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            //$rootScope.$broadcast('PROGRESS_BAR_START');
                            //modalService.openLoadingModal();
                            if (test(accountService) != 'NOT_CONNECTED') {
                                console.log('FROM ROUTES FORGOT');
                                $location.path('/');
                            }
                        }
                    }
                }).when('/legal/', {
                    templateUrl: '/assets/js/view/mobile/legal.html',
                    controller: 'LegalCtrl'
                }).when('/help/', {
                    resolve: {
                        a: function ($rootScope) {
                            window.location.replace('/help/');
                        }
                    }
                }).otherwise({
                    redirectTo: '/'
                });
        });
};