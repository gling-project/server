myApp.controller('PromotionModalCtrl', function ($scope, $flash, $modalInstance, translationService, dto, promotionService,callback) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.promotionParam = {
        dto: angular.copy(dto)
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if (!$scope.promotionParam.isValid) {
            $scope.promotionParam.displayErrorMessage = true;
        }
        else {

            if ($scope.promotionParam.minimalQuantity > $scope.promotionParam.quantity) {
                $flash.error(translationService.get('--.promotion.validation.minimalQuantityMustBeLowerThanQuantity'))
            }
            else {

                $scope.loading = true;
                if ($scope.update) {
                    promotionService.edit($scope.promotionParam.dto, function () {
                            $scope.loading = false;
                            $scope.close();
                            callback();
                        },
                        function () {
                            $scope.loading = false;
                        });
                }
                else {
                    promotionService.add($scope.promotionParam.dto, function () {
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
    }


});