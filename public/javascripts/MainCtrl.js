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
myApp.controller('MainCtrl', function ($rootScope, $scope, $locale, translationService, $window, facebookService, languageService, $location, modalService, accountService, $timeout, constantService,customerInterestService) {


    //catch url
    if ($location.url().indexOf("customerRegistration") != -1) {
        modalService.openCustomerRegistrationModal();
    }
    else if ($location.url().indexOf("businessRegistration") != -1) {
        modalService.openBusinessRegistrationModal();
    }


    $scope.navigateTo = function (target) {
        $location.path(target);
    };

    //
    // initialize translations
    // load from data var and insert into into translationService
    //
    if ("data" in window && data != undefined && data != null) {
        translationService.set(data.translations);
        constantService.fileBucketUrl = data.fileBucketUrl;
        constantService.urlBase = data.urlBase;
        customerInterestService.setAll(data.customerInterests);
    }

    //import data
    //store the current user into the model
    accountService.setMyself(data.mySelf);
    facebookService.facebookAppId = data.appId;
    languageService.setLanguages(lang, languages);

    //
    //facebook initialization
    //
    facebookService.ini();
    if (accountService.getMyself() == null) {
        facebookService.getLoginStatus();
    }
    else {
        facebookService.recover();
    }


    //
    // help functionalities
    //
    $scope.helpDisplayed = false;

    $scope.displayHelp = function () {
        $scope.helpDisplayed = true;
    };

    $scope.maskHelp = function () {
        $scope.helpDisplayed = false;
    };

    $scope.openHelp = function (message) {
        modalService.openHelpModal(message);
    };

    //
    // progress bar
    //
    $scope.progressBarWidth = 0;
    var progressBarMultiplicator = 2;

    $scope.progressBarCss = {
        width: $scope.progressBarWidth + "%"
    };

    $rootScope.$on('PROGRESS_BAR_START', function () {
        $scope.progress();
    });

    $scope.progress = function () {
        $scope.progressBarWidth++;
        if ($scope.progressBarWidth < 50 * progressBarMultiplicator) {
            $timeout(function () {
                $scope.progress();
            }, 1000 / 100 * progressBarMultiplicator);
        }
        else if ($scope.progressBarWidth < 75 * progressBarMultiplicator) {
            $timeout(function () {
                $scope.progress();
            }, 3000 / 100 * progressBarMultiplicator);
        }
        else if ($scope.progressBarWidth < 100 * progressBarMultiplicator) {
            $timeout(function () {
                $scope.progress();
            }, 10000 / 100 * progressBarMultiplicator);
        }
    };

    $rootScope.$on('PROGRESS_BAR_STOP', function () {
        $scope.progressBarWidth = 100 * progressBarMultiplicator;
        $timeout(function () {
            $scope.progressBarWidth = 0;
        }, 500);
    });

    $scope.$watch('progressBarWidth', function () {
        $scope.progressBarCss.width = ($scope.progressBarWidth / progressBarMultiplicator) + '%';
    });


});