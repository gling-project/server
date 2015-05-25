myApp.controller('LoginCtrl', function ($scope,accountService,facebookService,$location,$flash,translationService) {

    $scope.loading = false;

    $scope.loginFormParam = {
        facebookSuccess: function (data) {
            $location.path('/');
        },
        forgotPassword: function (email) {
            modalService.openForgotPasswordModal(email);
        }
    };

    $scope.save = function () {

        if ($scope.loginFormParam.isValid) {

            $scope.loading = true;

            accountService.login($scope.loginFormParam.dto,
                function () {

                    $flash.success(translationService.get("--.login.flash.success"));
                    $scope.loading = false;
                    //logout facebook in case
                    facebookService.logout();
                    $location.path('/');
                },
                function () {
                    $scope.loading = false;
                });
        }
        else{
            $scope.loginFormParam.displayErrorMessage = true;
        }
    };


});