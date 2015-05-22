myApp.controller('LoginModalCtrl', function ($scope, $flash, facebookService, translationService, $modal, $modalInstance, accountService, $location, modalService) {

    $scope.loading = false;

    $scope.loginFormParam = {
        facebookSuccess: function (data) {
            $scope.close();
        },
        forgotPassword: function(email){
            modalService.openForgotPasswordModal(email);
            $scope.close();
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if ($scope.loginFormParam.isValid) {

            console.log("$scope.loginFormParam.dto");
            console.log($scope.loginFormParam.dto);

            $scope.loading = true;

            accountService.login($scope.loginFormParam.dto,
                function () {

                    $flash.success(translationService.get("--.login.flash.success"));
                    $scope.loading = false;
                    $scope.close();
                    //logout facebook in case
                    facebookService.logout();
                    if (accountService.getMyself().type == 'BUSINESS') {
                        $location.path('/business');
                    }
                },
                function () {
                    $scope.loading = false;
                });
        }
    };

    $scope.toBusinessRegistration = function () {
        $scope.close();
        modalService.openBusinessRegistrationModal();
    };

    $scope.toCustomerRegistration = function () {
        $scope.close();
        modalService.openCustomerRegistrationModal();
    };

});