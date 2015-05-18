var test = function (modelService) {
    var myself = modelService.get(modelService.MY_SELF);
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
                templateUrl: '/assets/javascripts/view/home.html',
                controller: 'HomeCtrl',
                resolve: {
                    a:function(modelService){
                        var status = test(modelService);
                        console.log("status : "+status);
                    }
                }
            }).when('/business', {
                templateUrl: '/assets/javascripts/view/business_welcome.html',
                controller: 'BusinessWelcomeCtrl',
                resolve: {
                    a:function(modelService,$location){
                        if(test(modelService) != 'BUSINESS'){
                            $location.path('/');
                        }
                    }
                }
            }).when('/business_registration', {
                templateUrl: '/assets/javascripts/view/business_registration.html',
                controller: 'BusinessRegistrationCtrl',
                resolve: {
                    a: function (modelService, $location) {
                        if (test(modelService) == 'BUSINESS') {
                            $location.path('/business');
                        }
                    }
                }
            }).otherwise({
                redirectTo: '/'
            });
        });
};