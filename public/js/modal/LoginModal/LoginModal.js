myApp.controller('LoginModalCtrl', function ($scope, $flash, facebookService, translationService, $modal, $modalInstance, accountService, $location, modalService, fctToExecute, fctToExecuteParams,helpMessage) {

    $scope.fctToExecute=fctToExecute;
    $scope.helpMessage=helpMessage;

    $scope.loginFormParam = {
        facebookSuccess: function (data) {
            if (fctToExecute != null) {
                fctToExecute(fctToExecuteParams);
            }
            $scope.close();
        },
        loading:false
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if ($scope.loginFormParam.isValid) {

            $scope.loginFormParam.loading = true;

            accountService.login($scope.loginFormParam.dto,
                function () {

                    $flash.success(translationService.get("--.login.flash.success"));
                    $scope.loading = false;
                    $scope.close();
                    if (accountService.getMyself().type == 'BUSINESS') {
                        $location.path('/business/'+accountService.getMyself().businessId);
                    }
                    if (fctToExecute != null) {
                        fctToExecute(fctToExecuteParams);
                    }
                },
                function () {
                    $scope.loginFormParam.loading = false;
                });
        }
        else {
            $scope.loginFormParam.displayErrorMessage = true;
        }
    };

    $scope.toForgotPassword = function () {
        modalService.openForgotPasswordModal($scope.loginFormParam.dto.email);
        $scope.close();
    };

    $scope.toBusinessRegistration = function () {
        $scope.close();
        modalService.openBusinessRegistrationModal();
    };

    $scope.toCustomerRegistration = function () {
        $scope.close();
        modalService.openCustomerRegistrationModal(fctToExecute, fctToExecuteParams);
    };

});