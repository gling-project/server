myApp.controller('PromotionCtrl', function ($rootScope, $scope, accountService, $flash, translationService, facebookService, modalService, promotionService, businessService, $compile) {

    businessService.getBusiness(accountService.getMyself().businessId, function (business) {

        modalService.closeLoadingModal();
        $scope.business = business;

        $scope.publicationFormParam = {
            dto: null,
            business: $scope.business
        };

        //inject directive
        var directive = $compile("<promotion-form-ctrl ng-info='publicationFormParam'></promotion-form-ctrl>")($scope);

        $('.inject-box').append(directive);

        $scope.success = function (data) {

            modalService.closeLoadingModal();

            $scope.navigateTo('/business/' + $scope.business.id);
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
                                modalService.successAndShare($scope.publicationFormParam.business.id, data.id);
                            },
                            function () {
                                modalService.closeLoadingModal();
                            });
                    }
                }
            }
        }

    });


});