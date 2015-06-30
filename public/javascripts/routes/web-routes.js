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
    myApp
        .config(function ($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: '/assets/javascripts/view/web/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    a: function (accountService) {
                        var status = test(accountService);
                    }
                }
            }).when('/business_old', {
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
            }).when('/business/:businessId', {
                templateUrl: '/assets/javascripts/view/web/business.html',
                controller: 'BusinessCtrl'
            }).otherwise({
                redirectTo: '/'
            });
        });
};