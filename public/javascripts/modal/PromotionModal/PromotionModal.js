myApp.controller('PromotionModalCtrl', function ($scope, $flash, $modalInstance, translationService, dto, promotionService, callback,facebookService) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.promotionParam = {
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

        $scope.loading = false;

        if (share) {
            facebookService.sharePublication(data);
        }

        $scope.close();
        callback();
    };

    $scope.save = function (share) {

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
                    promotionService.edit($scope.promotionParam.dto, function (data) {
                            $scope.success(data, share);
                        },
                        function () {
                            $scope.loading = false;
                        });
                }
                else {
                    promotionService.add($scope.promotionParam.dto, function (data) {
                            $scope.success(data, share);
                        },
                        function () {
                            $scope.loading = false;
                        });
                }
            }
        }
    }


});