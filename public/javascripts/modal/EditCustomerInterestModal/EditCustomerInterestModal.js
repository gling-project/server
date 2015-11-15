myApp.controller('EditCustomerInterestModalCtrl', function ($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, modalService) {


    $scope.customerInterestParam = {
        result : accountService.getMyself().customerInterests
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {
        $scope.loading=true;
        accountService.editCustomerInterest(
            $scope.customerInterestParam.result,
            function () {
                $scope.loading = false;
                $scope.close();
            },
            function () {
                $scope.loading = false;
            });
    }

});