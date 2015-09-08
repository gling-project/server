myApp.controller('BusinessNotificationModalCtrl', function ($scope, $flash, $modalInstance, translationService, dto, businessNotificationService, callback) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.businessNotificationParam = {
        dto: angular.copy(dto)
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.success = function (data, share) {
        console.log(data);

        $scope.loading = false;

        if (share) {
            console.log('plop');
            var url = 'http://lynk-test.herokuapp.com/business/' + data.businessId + '/publication/' + data.id;

            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, "Share on Facebook", "width=500,height=500");
        }

        $scope.close();
        callback();
    };

    $scope.save = function (share) {

        if (!$scope.businessNotificationParam.isValid) {
            $scope.businessNotificationParam.displayErrorMessage = true;
        }
        else {
            $scope.loading = true;
            if ($scope.update) {
                businessNotificationService.edit($scope.businessNotificationParam.dto, function (data) {
                        $scope.success(data, share);
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
            else {
                businessNotificationService.add($scope.businessNotificationParam.dto, function (data) {
                        $scope.success(data, share);
                    },
                    function () {
                        $scope.loading = false;
                    });
            }

        }
    }


});