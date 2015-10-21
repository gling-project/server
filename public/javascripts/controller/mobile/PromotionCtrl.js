myApp.controller('PromotionCtrl', function ($rootScope, $scope, accountService,$flash,translationService,facebookService,modalService,promotionService) {


    $scope.publicationFormParam = {
        dto: null,
        business: accountService.getMyBusiness()
    };

    $scope.success = function (data) {

        console.log('SCUCESS');

        modalService.closeLoadingModal();
        //$scope.loading = false;

        $scope.navigateTo('/business/'+accountService.getMyBusiness().id);
        $flash.success('--.generic.success');
        callback();
    };

    $scope.save = function (share) {

        console.log('1');

        if (!$scope.publicationFormParam.isValid) {
            $scope.publicationFormParam.displayErrorMessage = true;
        }
        else {

            console.log('2');
            console.log('2E : '+$scope.publicationFormParam.minimalQuantity +'/'+ $scope.publicationFormParam.quantity);
            if ($scope.publicationFormParam.minimalQuantity > $scope.publicationFormParam.quantity) {


                $flash.error(translationService.get('--.promotion.validation.minimalQuantityMustBeLowerThanQuantity'))
            }
            //else if($scope.loading===false){

                console.log('3');

                modalService.openLoadingModal();
                //$scope.loading = true;
                if ($scope.update) {

                    console.log('4');

                    promotionService.edit($scope.publicationFormParam.dto, function (data) {
                            $scope.success(data);
                        },
                        function () {
                            console.log('4E');

                            modalService.closeLoadingModal();
                            //$scope.loading = false;
                        });
                }
                else {

                    console.log('5');
                    promotionService.add($scope.publicationFormParam.dto, function (data) {
                            if(share) {
                                facebookService.sharePublication($scope.publicationFormParam.business.id, data.id);
                            }
                            $scope.success(data);
                        },
                        function () {

                            console.log('5E');
                            modalService.closeLoadingModal();
                            //$scope.loading = false;
                        });
                }
            //}
        }
    }

});