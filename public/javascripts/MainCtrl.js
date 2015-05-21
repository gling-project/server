
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
myApp.controller('MainCtrl', function ($scope,$locale,translationService,$window,facebookService,languageService,$location,modalService,accountService) {


    //$scope.mm='en';

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
    accountService.setMyself(data.mySelf);
    facebookService.facebookAppId = data.appId;
    languageService.setLanguages(lang,languages);

    //
    //facebook initialization
    //
    facebookService.ini();
    if(accountService.getMyself() == null){
        facebookService.getLoginStatus();
    }
    else{
        //facebookService.recover();
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