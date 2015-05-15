
//
// initialization external modules
//
var myApp = angular.module('app', [
    "mobile-angular-ui",
    'ngRoute']);

initializeCommonRoutes();

//
// main ctrl
//
myApp.controller('MainCtrl', function ($scope) {});