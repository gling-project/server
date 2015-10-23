myApp.controller('BusinessNotificationModalCtrl', function ($scope, $flash, $modalInstance, translationService, dto, businessNotificationService, callback, facebookService, business,modalService) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.businessNotificationParam = {
        dto: angular.copy(dto),
        business: business
    };


    $scope.getHeight = function () {
        var h = {height: ($(window).height() - 190) + 'px'};
        return h;
    };


    $scope.close = function () {
        $modalInstance.close();
    };


    $scope.getIllustration = function (publication) {
        if (publication.pictures.length > 0) {
            return publication.pictures[O];
        }
        return publication.businessIllustration;
    };

    $scope.success = function (data) {

        $scope.loading = false;

        $scope.close();
        callback();
    };

    $scope.save = function (share) {

        if (!$scope.businessNotificationParam.isValid) {
            $scope.businessNotificationParam.displayErrorMessage = true;
        }
        else if($scope.loading===false){
            $scope.loading = true;
            if ($scope.update) {
                businessNotificationService.edit($scope.businessNotificationParam.dto, function (data) {
                        $scope.success(data);
                    },
                    function () {
                        $scope.loading = false;
                    });
            }
            else {
                businessNotificationService.add($scope.businessNotificationParam.dto, function (data) {
                        $scope.success(data);
                        modalService.successAndShare($scope.businessNotificationParam.business.id,data.id);
                    },
                    function () {
                        $scope.loading = false;
                    });
            }

        }
    }


});