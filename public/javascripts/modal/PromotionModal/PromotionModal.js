myApp.controller('PromotionModalCtrl', function ($scope, $flash, $modalInstance, translationService, dto, promotionService, callback) {

    $scope.loading = false;

    $scope.update = (dto != null);

    $scope.promotionParam = {
        dto: angular.copy(dto)
    };


    $scope.close = function () {
        $modalInstance.close();
    };


    $scope.success = function (data, share) {

        $scope.loading = false;

        if (share) {
            var url = 'https://lynk-test.herokuapp.com/business/' + data.businessId + '/publication/' + data.id;
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, "Share on Facebook", "width=500,height=500");




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