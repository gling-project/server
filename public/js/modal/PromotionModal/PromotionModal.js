myApp.controller('PromotionModalCtrl', function ($scope, $flash, $modalInstance, translationService, dto, promotionService, callback,facebookService,business,modalService,superAdminService,accountService) {

    $scope.loading = false;



    $scope.update = (dto != null);

    $scope.promotionParam = {
        dto: angular.copy(dto),
        business:business
    };


    $scope.getHeight = function(){
        var h = {height:($(window).height() - 190)+'px'};
        return h;
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


    $scope.success = function (data) {

        $scope.loading = false;

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
            else if($scope.loading===false){

                $scope.loading = true;
                if ($scope.update) {
                    promotionService.edit($scope.promotionParam.dto, function (data) {
                            $scope.success(data);
                        },
                        function () {
                            $scope.loading = false;
                        });
                }
                else {
                    if(accountService.getMyself().role == 'SUPERADMIN'){

                        superAdminService.createPromotion(business.id,$scope.promotionParam.dto, function (data) {
                                $scope.success(data);
                                modalService.successAndShare($scope.promotionParam.business.id, data.id);
                            },
                            function () {
                                $scope.loading = false;
                            });
                    }
                    else{
                        promotionService.add($scope.promotionParam.dto, function (data) {
                                $scope.success(data);
                                modalService.successAndShare($scope.promotionParam.business.id, data.id);
                            },
                            function () {
                                $scope.loading = false;
                            });
                    }
                }
            }
        }
    }


});