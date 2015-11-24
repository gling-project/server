myApp.controller('PromotionCtrl', function($rootScope, $scope, accountService, $flash, translationService, facebookService, modalService, promotionService, businessService, $compile) {
  return businessService.getBusiness(accountService.getMyself().businessId, function(business) {
    var directive;
    $scope.publicationFormParam = {
      dto: null,
      business: $scope.business
    };
    directive = $compile('<promotion-form-ctrl ng-info=\'publicationFormParam\'></promotion-form-ctrl>')($scope);
    $('.inject-box').append(directive);
    $scope.save = function(share) {
      if (!$scope.publicationFormParam.isValid) {
        return $scope.publicationFormParam.displayErrorMessage = true;
      } else if ($scope.publicationFormParam.minimalQuantity > $scope.publicationFormParam.quantity) {
        return $flash.error(translationService.get('--.promotion.validation.minimalQuantityMustBeLowerThanQuantity'));
      } else {
        modalService.openLoadingModal();
        return promotionService.add($scope.publicationFormParam.dto, (function(data) {
          modalService.closeLoadingModal();
          $scope.navigateTo('/business/' + $scope.business.id);
          return modalService.successAndShare($scope.publicationFormParam.business.id, data.id);
        }), function() {
          return modalService.closeLoadingModal();
        });
      }
    };
    modalService.closeLoadingModal();
    return $scope.business = business;
  });
});