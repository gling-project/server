myApp.controller('LoginModalCtrl', function ($scope, $http, $flash, facebookService, translationService, $modal, $modalInstance, modelService, $location,modalService) {

    $scope.loading = false;

    $scope.loginFormParam = {
        facebookSuccess:function(data){
            $scope.close();
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if ($scope.allFieldValid()) {
            var dto = {
                email: $scope.fields.login.field,
                password: $scope.fields.password.field,
                keepSessionOpen: $scope.fields.openSession.field
            }

            $scope.loading = true;

            $http({
                'method': "POST",
                'url': "/login",
                'headers': "Content-Type:application/json",
                'data': dto
            }).success(function (data, status) {
                modelService.set(modelService.MY_SELF, data);
                $flash.success(translationService.get("--.login.flash.success"));
                $scope.loading = false;
                $scope.close();
                //logout facebook in case
                facebookService.logout();
                if (data.type == 'BUSINESS') {
                    $location.path('/business');
                }
            })
                .error(function (data, status) {
                    $scope.loading = false;
                    $flash.error(data.message);
                });
        }
    };

    $scope.toBusinessRegistration = function(){
        $scope.close();
        modalService.openBusinessRegistrationModal();
    };

    $scope.toCustomerRegistration = function(){
        $scope.close();
        modalService.openCustomerRegistrationModal();
    };

});