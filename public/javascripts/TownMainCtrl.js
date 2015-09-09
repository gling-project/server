//
// initialization external modules
//


//
// initialize routes
//
//
// main ctrl
//
myApp.controller('TownMainCtrl', function ($rootScope, $scope, $locale, translationService,$location) {

    $scope.navigateTo = function (target) {
        $location.path(target);
    };

    //
    // initialize translations
    // load from data var and insert into into translationService
    //
    if ("translations" in window && translations != undefined && translations != null) {
        translationService.set(translations);
    }

});