var myApp = angular.module('app', [
        'ngAnimate',
        'ui.bootstrap',
        "mobile-angular-ui",
        'ui.bootstrap.datetimepicker',
        "angucomplete",
        'angularFileUpload',
        'ngRoute',
        'ngTable',
        'geolocation',
        'timer',
        'ngMap']
);

app.config(['$locationProvider', function ($locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);

app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);