myApp.controller('AddressModalCtrl', function ($scope, $flash, $modalInstance, accountService, translationService, addName, dto) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.addressParam = {
        addName: addName,
        dto: angular.copy(dto)
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if (!$scope.addressParam.isValid) {
            $scope.addressParam.displayErrorMessage = true;
        }
        else {
            $scope.loading = true;
            if ($scope.update) {
                accountService.editAddress($scope.addressParam.dto, function () {
                        $scope.loading = false;
                        $scope.close();
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
            else {
                accountService.addAddress($scope.addressParam.dto, function () {
                        $scope.loading = false;
                        $scope.close();
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
        }
    }


});