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

    //
    // facebook connection
    //
    $scope.fb_login = function () {
        $scope.loading = true;
        facebookService.login(function (data) {
                accountService.setMyself(data);

                if (data.type == 'BUSINESS') {
                    $location.path('/business/'+accountService.getMyself().businessId);
                }

                $scope.loading = false;
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

            $scope.loading = true;
            accountService.registration(dto, function () {
                    $scope.loading = false;
                    $flash.success(translationService.get("--.login.flash.success"));
                    if (fctToExecute != null) {
                        fctToExecute(fctToExecuteParams);
                    }
                    $scope.close();
                },
                function () {
                    $scope.loading = false;
                });
        }
    }

});