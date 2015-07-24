myApp.controller('BusinessNotificationModalCtrl', function ($scope, $flash, $modalInstance,  translationService, dto,businessNotificationService,callback) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.businessNotificationParam= {
        dto: angular.copy(dto)
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if (!$scope.businessNotificationParam.isValid) {
            $scope.businessNotificationParam.displayErrorMessage = true;
        }
        else {
            $scope.loading = true;
            if ($scope.update) {
                businessNotificationService.edit($scope.businessNotificationParam.dto, function () {
                        $scope.loading = false;
                        $scope.close();
                        callback();
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
            else {
                businessNotificationService.add($scope.businessNotificationParam.dto, function () {
                        $scope.loading = false;
                        $scope.close();
                        callback();
                    },
                    function () {
                        $scope.loading = false;
                    });
            }

        }
    }


});