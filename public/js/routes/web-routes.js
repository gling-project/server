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
        .config(function ($routeProvider, $locationProvider) {
            $routeProvider
            .when('/shopnews/:param*?', {
                templateUrl: '/assets/js/view/web/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    a: function (accountService, $rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        var status = test(accountService);
                    }
                }
            }).when('/profile', {
                templateUrl: '/assets/js/view/web/profile.html',
                controller: 'ProfileCtrl',
                resolve: {
                    a: function (accountService, $location, $rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        if (test(accountService) == 'NOT_CONNECTED') {
                            $location.path('/');
                        }
                    }
                }
            }).when('/search/:param?', {
                templateUrl: '/assets/js/view/web/search_page.html',
                controller: 'SearchPageCtrl',
                resolve: {
                    a: function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }
                }
            }).when('/my-businesses', {
                templateUrl: '/assets/js/view/web/followed_business_page.html',
                controller: 'FollowedBusinessPageCtrl',
                resolve: {
                    a: function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }
                }
            }).when('/map', {
                templateUrl: '/assets/js/view/web/map.html',
                controller: 'MapCtrl',
                resolve: {
                    a: function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }
                }
            }).when('/business/:businessId', {
                templateUrl: '/assets/js/view/web/business.html',
                controller: 'BusinessCtrl',
                resolve: {
                    a: function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }
                }
            }).when('/business/:businessId/publication/:publicationId', {
                templateUrl: '/assets/js/view/web/business.html',
                controller: 'BusinessCtrl',
                resolve: {
                    a: function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }
                }
            }).when('/welcome', {
                templateUrl: '/assets/js/view/web/welcome.html',
                controller: 'WelcomeCtrl',
                resolve: {
                    a: function ($rootScope) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                    }
                }
            }).when('/about/', {
                resolve: {
                    a: function ($rootScope) {
                        window.location.replace('/about/');
                    }
                }
            }).when('/legal/', {
                resolve: {
                    a: function ($rootScope) {
                        window.location.replace('/legal/');
                    }
                }
            }).when('/help/', {
                resolve: {
                    a: function ($rootScope) {
                        window.location.replace('/help/');
                    }
                }
            }).otherwise({
                redirectTo: '/welcome/'
            });


            // use the HTML5 History API
            $locationProvider.html5Mode(true);
        });
};