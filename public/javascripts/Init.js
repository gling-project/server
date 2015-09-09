var myApp = angular.module('app', [
        'ngAnimate',
        'ui.bootstrap',
        'ui.bootstrap.datetimepicker',
        "angucomplete",
        'angularFileUpload',
        'ngRoute',
        'ngTable',
        'geolocation',
        'timer',
        'uiGmapgoogle-maps',
        'djds4rce.angular-socialshare'
        //,'ezfb'
    ]
);

app.config(['$locationProvider', function ($locationProvider) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);