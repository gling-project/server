myApp.controller('WelcomeCtrl', function ($rootScope, $scope, $location, accountService, $flash, translationService, $timeout,modalService,languageService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');
    modalService.closeLoadingModal();

    //
    // change lang
    //
    $scope.$watch('lang', function () {
        if (!angular.isUndefined($scope.lang)) {
            languageService.changeLanguage($scope.lang);
        }
    });

    $scope.languageService = languageService;

    $scope.loginFormParam = {
        dto: {},
        mobileVersion: true,
        facebookSuccess: function (data) {
            $location.url('/home');
        }
    };

    $scope.save = function () {

        if ($scope.loginFormParam.isValid) {
            $scope.setLoading(true);

            accountService.login($scope.loginFormParam.dto,
                function () {
                    $timeout(function () {
                        $scope.setLoading(false);
                        $flash.success(translationService.get("--.login.flash.success"));
                        $location.url('/home');
                    }, 1);
                },
                function () {
                    $scope.setLoading(false);
                });
        }
        else {
            $scope.loginFormParam.displayErrorMessage = true;
        }
    };

    $scope.setLoading = function (b) {
        if (b === true) {
            modalService.openLoadingModal();
        }
        else {
            modalService.closeLoadingModal();
        }
    };

});