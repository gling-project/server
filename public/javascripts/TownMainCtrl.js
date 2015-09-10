//
// initialization external modules
//


//
// initialize routes
//
//
// main ctrl
//
myApp.controller('TownMainCtrl', function ($rootScope, $scope, $locale, translationService,$location,townService) {

    $scope.navigateTo = function (target) {
        $location.path(target);
    };

    console.log('TownMainCtrl');
    townService.getTranslations(function(data){
        console.log('insert');
        console.log(data);
        translationService.set(data);
    });

});