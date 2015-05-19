
//
// initialization external modules
//


//
// initialize routes
//
initializeCommonRoutes();

//
// main ctrl
//
myApp.controller('MainCtrl', function ($scope,$locale,translationService,$window,facebookService,modelService,languageService,$location,modalService) {

    $scope.navigateTo = function(target){
        $location.path(target);
    };

    //
    // initialize translations
    // load from data var and insert into into translationService
    //
    if ("data" in window && data!=undefined && data!=null) {
        translationService.set(data.translations);
    }

    //import data
    //store the current user into the model
    modelService.set(modelService.MY_SELF, data.mySelf);
    modelService.set(modelService.APP_ID, data.appId);
    languageService.setLanguages(lang,languages);

    //
    //facebook initialization
    //
    facebookService.ini();
    if(modelService.get(modelService.MY_SELF)==null){
        facebookService.getLoginStatus();
    }

    //
    // help functionalities
    //
    $scope.helpDisplayed=false;

    $scope.displayHelp = function(){
        $scope.helpDisplayed = true;
    };

    $scope.maskHelp = function(){
        $scope.helpDisplayed = false;
    };

    $scope.openHelp = function(message){
        modalService.openHelpModal(message);
    };
});