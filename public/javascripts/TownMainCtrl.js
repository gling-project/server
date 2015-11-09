//
// initialization external modules
//


//
// initialize routes
//
//
// main ctrl
//
myApp.controller('TownMainCtrl', function ($rootScope, $scope, $locale, translationService,$location,townService,constantService) {

    $scope.navigateTo = function (target) {
        $location.path(target);
    };

    townService.getInitialization(function(data){
        translationService.set(data.translations);

        //add constants
        for (var key in data.constants) {
            constantService[key] = data.constants[key];
        }
    });

});