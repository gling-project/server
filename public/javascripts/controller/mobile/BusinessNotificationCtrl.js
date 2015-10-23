myApp.controller('BusinessNotificationCtrl', function ($rootScope, $scope, accountService, $flash, translationService, facebookService, modalService, businessNotificationService, businessService) {

    businessService.getBusiness(accountService.getMyself().businessId, function (business) {

        modalService.closeLoadingModal();
        $scope.business = business;

        $scope.businessNotificationFormParam = {
            dto: null,
            business: $scope.business
        };

        $scope.success = function (data) {

            modalService.closeLoadingModal();

            $scope.navigateTo('/business/' + $scope.business.id);
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
                            $scope.success(data);
                            modalService.successAndShare($scope.businessNotificationFormParam.business.id, data.id);
                        },
                        function () {
                            modalService.closeLoadingModal();
                        });
                }
            }
        }

    });

});