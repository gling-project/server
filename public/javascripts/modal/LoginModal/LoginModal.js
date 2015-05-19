myApp.controller('LoginModalCtrl', function ($scope, $http, $flash, facebookService, translationService, $modal, $modalInstance, accountService, $location,modalService) {

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

        if ($scope.loginFormParam.isValid) {

            console.log("$scope.loginFormParam.dto");
            console.log($scope.loginFormParam.dto);

            $scope.loading = true;

            $http({
                'method': "POST",
                'url': "/login",
                'headers': "Content-Type:application/json",
                'data': $scope.loginFormParam.dto
            }).success(function (data, status) {
                accountService.setMyself(data);
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