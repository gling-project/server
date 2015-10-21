myApp.controller('BusinessNotificationCtrl', function ($rootScope, $scope, accountService, $flash, translationService, facebookService, modalService, businessNotificationService) {


    $scope.businessNotificationFormParam = {
        dto: null,
        business: accountService.getMyBusiness()
    };

    $scope.success = function (data) {

        modalService.closeLoadingModal();

        $scope.navigateTo('/business/' + accountService.getMyBusiness().id);
        $flash.success('--.generic.success');
    };

    $scope.save = function (share) {

        if (!$scope.businessNotificationFormParam.isValid) {
            $scope.businessNotificationFormParam.displayErrorMessage = true;
        }
        else {
            modalService.openLoadingModal();
            if ($scope.update) {

                businessNotificationService.edit($scope.businessNotificationFormParam.dto, function (data) {
                        $scope.success(data);
                    },
                    function () {
                        modalService.closeLoadingModal();
                    });
            }
            else {

                businessNotificationService.add($scope.businessNotificationFormParam.dto, function (data) {
                        if (share) {
                            facebookService.sharePublication($scope.businessNotificationFormParam.business.id, data.id);
                        }
                        $scope.success(data);
                    },
                    function () {
                        modalService.closeLoadingModal();
                    });
            }
        }
    }

});