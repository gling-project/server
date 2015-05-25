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
            $routeProvider.when('/', {
                templateUrl: '/assets/javascripts/view/web/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    a: function (accountService) {
                        var status = test(accountService);
                        console.log("status : " + status);
                    }
                }
            }).when('/business', {
                templateUrl: '/assets/javascripts/view/web/business_welcome.html',
                controller: 'BusinessWelcomeCtrl',
                resolve: {
                    a: function (accountService, $location) {
                        if (test(accountService) != 'BUSINESS') {
                            $location.path('/');
                        }
                    }
                }
            }).when('/profile', {
                templateUrl: '/assets/javascripts/view/web/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    a: function (accountService, $location) {
                        if (test(accountService) == 'NOT_CONNECTED') {
                            $location.path('/');
                        }
                    }
                }
            }).when('/business_registration', {
                templateUrl: '/assets/javascripts/view/web/business_registration.html',
                controller: 'BusinessRegistrationCtrl',
                resolve: {
                    a: function (accountService, $location) {
                        if (test(accountService) == 'BUSINESS') {
                            $location.path('/business');
                        }
                    }
                }
            }).otherwise({
                redirectTo: '/'
            });
        });
};