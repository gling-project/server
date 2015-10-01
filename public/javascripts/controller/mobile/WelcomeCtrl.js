myApp.controller('WelcomeCtrl', function ($rootScope, $scope, $location, accountService, $flash, translationService, facebookService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.loginFormParam = {
        dto: {},
        mobileVersion: true,
        facebookSuccess: function (data) {
            $location.url('/home');
        }
    };

    $scope.save = function () {

        if ($scope.loginFormParam.isValid) {

            $scope.loading = true;

            accountService.login($scope.loginFormParam.dto,
                function () {
                    $flash.success(translationService.get("--.login.flash.success"));
                    $scope.loading = false;
                    $location.path('/home');
                },
                function () {
                    $scope.loading = false;
                });
        }
        else {
            $scope.loginFormParam.displayErrorMessage = true;
        }
    };

    $scope.toForgotPassword = function () {

    };

});