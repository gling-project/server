myApp.controller('BusinessNotificationModalCtrl', function ($scope, $flash, $modalInstance, translationService, dto, businessNotificationService, callback,facebookService) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.businessNotificationParam = {
        dto: angular.copy(dto)
    };


    $scope.close = function () {
        $modalInstance.close();
    };


    $scope.getIllustration = function(publication){
        if(publication.pictures.length>0){
            return publication.pictures[O];
        }
        return publication.businessIllustration;
    };

    $scope.success = function (data, share) {
        console.log(data);

        $scope.loading = false;

        if (share) {

            facebookService.sharePublication(data);
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