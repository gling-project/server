myApp.controller('CustomerRegistrationModalCtrl', function ($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, modalService, fctToExecute, fctToExecuteParams) {

    var facebookAuthentication = null;

    $scope.accountParam = {};

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.toBusinessRegistration = function () {
        $scope.close();
        modalService.openBusinessRegistrationModal();
    };

    //loading
    $scope.setLoading = function(b) {
        $scope.loading = b;
        $scope.accountParam.disabled = b;
    }

    //
    // facebook connection
    //
    $scope.fb_login = function () {
        $scope.setLoading(true);
        facebookService.login(function (data) {
                accountService.setMyself(data);

                if (data.type == 'BUSINESS') {
                    $location.path('/business/'+accountService.getMyself().businessId);
                }

                $scope.setLoading(false);
                $scope.close();
            },
            function(data){
                $flash.error(data.message);
            });
    };

    $scope.save = function () {

        if (!$scope.accountParam.isValid) {
            $scope.accountParam.displayErrorMessage = true;
        }
        else {
            var dto = {
                accountRegistration: $scope.accountParam.dto,
                facebookAuthentication: facebookAuthentication
            };

            $scope.setLoading(true);
            accountService.registration(dto, function () {
                    $scope.setLoading(false);
                    $flash.success(translationService.get("--.login.flash.success"));
                    if (fctToExecute != null) {
                        fctToExecute(fctToExecuteParams);
                    }
                    $scope.close();
                },
                function () {
                    $scope.setLoading(false);
                });
        }
    }

});