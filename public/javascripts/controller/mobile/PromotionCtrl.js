myApp.controller('PromotionCtrl', function ($rootScope, $scope, accountService, $flash, translationService, facebookService, modalService, promotionService) {


    $scope.publicationFormParam = {
        dto: null,
        business: accountService.getMyBusiness()
    };

    $scope.success = function (data) {

        modalService.closeLoadingModal();

        $scope.navigateTo('/business/' + accountService.getMyBusiness().id);
    };

    $scope.save = function (share) {

        if (!$scope.publicationFormParam.isValid) {
            $scope.publicationFormParam.displayErrorMessage = true;
        }
        else {

            if ($scope.publicationFormParam.minimalQuantity > $scope.publicationFormParam.quantity) {
                $flash.error(translationService.get('--.promotion.validation.minimalQuantityMustBeLowerThanQuantity'))
            }
            else {

                modalService.openLoadingModal();
                if ($scope.update) {

                    promotionService.edit($scope.publicationFormParam.dto, function (data) {
                            $scope.success(data);
                        },
                        function () {
                            modalService.closeLoadingModal();
                        });
                }
                else {
                    promotionService.add($scope.publicationFormParam.dto, function (data) {
                            $scope.success(data);
                        },
                        function () {
                            modalService.closeLoadingModal();
                        });
                }
            }
        }
    }

});