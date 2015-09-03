myApp.controller('AddressModalCtrl', function ($scope, $flash, $modalInstance,businessService, accountService, translationService, addName, dto,isBusiness,callback) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.addressParam = {
        addName: addName,
        dto: angular.copy(dto)
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.success = function(data){
        $scope.loading = false;
        $scope.close();

        if(callback!=null && callback != undefined){
            callback(data);
        }
    };

    $scope.save = function () {

        if (!$scope.addressParam.isValid) {
            $scope.addressParam.displayErrorMessage = true;
        }
        else {
            $scope.loading = true;
            if ($scope.update) {
                if(isBusiness){
                    businessService.editAddress($scope.addressParam.dto, function (data) {
                            $scope.success(data);
                        },
                        function () {
                            $scope.loading = false;
                        });
                }
                else {
                    accountService.editAddress($scope.addressParam.dto, function (data) {
                            $scope.success(data);
                        },
                        function () {
                            $scope.loading = false;
                        });
                }
            }
            else {
                accountService.addAddress($scope.addressParam.dto, function (data) {
                        $scope.success(data);
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
        }
    }


});