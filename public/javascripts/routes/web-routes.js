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
        .config(function ($routeProvider,$locationProvider) {
            $routeProvider.when('/', {
                templateUrl: '/assets/javascripts/view/web/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    a: function (accountService) {
                        var status = test(accountService);
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
            }).when('/search/:param', {
                templateUrl: '/assets/javascripts/view/web/search_page.html',
                controller: 'SearchPageCtrl'
            }).when('/business/:businessId', {
                templateUrl: '/assets/javascripts/view/web/business.html',
                controller: 'BusinessCtrl'
            }).when('/business/:businessId/publication/:publicationId', {
                templateUrl: '/assets/javascripts/view/web/business.html',
                controller: 'BusinessCtrl'
            }).otherwise({
                redirectTo: '/'
            });


            // use the HTML5 History API
            $locationProvider.html5Mode(true);
        });
};