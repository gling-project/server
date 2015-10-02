var test = function (accountService) {
    var myself = accountService.getMyself();
    if (myself == null) {
        return 'NOT_CONNECTED';
    }
    else {
        return myself.type;
    }
};


var initializeCommonRoutes = function () {
    //angular.module('app').run(function($rootScope, $location) {
    //    $rootScope.onFormPath = function(period, scope) {
    //        return $location.path($rootScope.getFormPath() + '/' + period + '/' + scope);
    //    };
    //    return $rootScope.getDefaultRoute = function() {
    //        return '/driver';
    //    };
    //});
    myApp
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/assets/javascripts/view/mobile/welcome.html',
                    controller: 'WelcomeCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) != 'NOT_CONNECTED') {
                                $location.path('/home');
                            }
                        }
                    }
                })
                .when('/home', {
                    templateUrl: '/assets/javascripts/view/mobile/home.html',
                    controller: 'HomeCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/customer_registration', {
                    templateUrl: '/assets/javascripts/view/mobile/customer_registration.html',
                    controller: 'CustomerRegistrationCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) != 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/profile', {
                    templateUrl: '/assets/javascripts/view/mobile/profile.html',
                    controller: 'ProfileCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                }).when('/business/:businessId', {
                    templateUrl: '/assets/javascripts/view/mobile/business.html',
                    controller: 'BusinessCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                }).when('/business/:businessId/publication/:publicationId', {
                    templateUrl: '/assets/javascripts/view/mobile/business.html',
                    controller: 'BusinessCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                }).when('/search/:param', {
                    templateUrl: '/assets/javascripts/view/mobile/search_page.html',
                    controller: 'SearchPageCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                }).when('/my-businesses', {
                    templateUrl: '/assets/javascripts/view/mobile/followed_business_page.html',
                    controller: 'FollowedBusinessPageCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                }).when('/forgot_password', {
                    templateUrl: '/assets/javascripts/view/mobile/forgotPassword.html',
                    controller: 'ForgotPasswordCtrl',
                    resolve: {
                        a: function (accountService, $location,$rootScope,modalService) {
                            $rootScope.$broadcast('PROGRESS_BAR_START');
                            modalService.openLoadingModal();
                            if (test(accountService) != 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                }).when('/legal/', {
                    templateUrl: '/assets/javascripts/view/mobile/legal.html',
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