myApp.controller('LoginModalCtrl', function ($scope, $flash, facebookService, translationService, $modal, $modalInstance, accountService, $location, modalService,fctToExecute,fctToExecuteParams) {

    $scope.loading = false;

    $scope.loginFormParam = {
        facebookSuccess: function (data) {
            if(fctToExecute!=null){
                fctToExecute(fctToExecuteParams);
            }
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
                    if(fctToExecute!=null){
                        fctToExecute(fctToExecuteParams);
                    }
                },
                function () {
                    $scope.loading = false;
                });
        }
        else{
            $scope.loginFormParam.displayErrorMessage = true;
        }
    };

    $scope.toBusinessRegistration = function () {
        $scope.close();
        modalService.openBusinessRegistrationModal();
    };

    $scope.toCustomerRegistration = function () {
        $scope.close();
        modalService.openCustomerRegistrationModal(fctToExecute,fctToExecuteParams);
    };

});