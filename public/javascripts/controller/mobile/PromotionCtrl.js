myApp.controller('PromotionCtrl', function ($rootScope, $scope, accountService,$flash,translationService,facebookService,modalService) {


    $scope.publicationFormParam = {
        dto: null,
        business: accountService.getMyBusiness()
    };

    $scope.success = function (data) {

        modalService.closeLoadingModal();
        $scope.loading = false;

        $scope.close();
        callback();
    };

    $scope.save = function (share) {

        if (!$scope.publicationFormParam.isValid) {
            $scope.publicationFormParam.displayErrorMessage = true;
        }
        else {

            if ($scope.publicationFormParam.minimalQuantity > $scope.publicationFormParam.quantity) {
                $flash.error(translationService.get('--.promotion.validation.minimalQuantityMustBeLowerThanQuantity'))
            }
            else if($scope.loading===false){

                modalService.openLoadingModal();
                $scope.loading = true;
                if ($scope.update) {
                    promotionService.edit($scope.publicationFormParam.dto, function (data) {
                            $scope.success(data);
                        },
                        function () {
                            modalService.closeLoadingModal();
                            $scope.loading = false;
                        });
                }
                else {
                    promotionService.add($scope.publicationFormParam.dto, function (data) {
                            if(share) {
                                facebookService.sharePublication($scope.publicationFormParam.business.id, data.id);
                            }
                            $scope.success(data);
                        },
                        function () {
                            modalService.closeLoadingModal();
                            $scope.loading = false;
                        });
                }
            }
        }
    }

});