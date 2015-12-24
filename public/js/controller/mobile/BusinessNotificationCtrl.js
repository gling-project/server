myApp.controller('BusinessNotificationCtrl', function($rootScope, $scope, accountService, $flash, translationService, facebookService, modalService, businessNotificationService, businessService, $compile) {
  return businessService.getBusiness(accountService.getMyself().businessId, function(business) {
    var directive;
    $scope.business = business;
    $scope.businessNotificationFormParam = {
      dto: null,
      business: $scope.business
    };
    modalService.closeLoadingModal();
    directive = $compile('<business-notification-form-ctrl ng-info=\'businessNotificationFormParam\'></business-notification-form-ctrl>')($scope);
    $('.inject-box').append(directive);
    return $scope.save = function(share) {
      if (!$scope.businessNotificationFormParam.isValid) {
        return $scope.businessNotificationFormParam.displayErrorMessage = true;
      } else {
        modalService.openLoadingModal();
        return businessNotificationService.add($scope.businessNotificationFormParam.dto, (function(data) {
          modalService.closeLoadingModal();
          $scope.navigateTo('/business/' + $scope.business.id);
          return modalService.successAndShare(data);
        }), function() {
          return modalService.closeLoadingModal();
        });
      }
    };
  });
});