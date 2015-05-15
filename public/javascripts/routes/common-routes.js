var initializeCommonRoutes = function() {
    //angular.module('app').run(function($rootScope, $location) {
    //    $rootScope.onFormPath = function(period, scope) {
    //        return $location.path($rootScope.getFormPath() + '/' + period + '/' + scope);
    //    };
    //    return $rootScope.getDefaultRoute = function() {
    //        return '/driver';
    //    };
    //});
    myApp
        .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/assets/javascripts/view/home.html',
            controller: 'HomeCtrl'
        }).otherwise({
            redirectTo: '/'
        });
    });
};