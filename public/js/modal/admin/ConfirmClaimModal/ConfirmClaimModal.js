myApp.controller('ConfirmClaimModalCtrl', function($scope, $flash, $modal, $modalInstance, business, callback, superAdminService) {
  $scope.close = function() {
    return $modalInstance.close();
  };
  $scope.business = business;
  return $scope.confirm = function() {
    $scope.loading = true;
    return superAdminService.confirmClaim(business.id, function() {
      $flash.success('Le commerçant est maintenant propriétaire de son commerce');
      $scope.loading = false;
      business.hasOwner = false;
      business.claimBusiness = null;
      return $scope.close();
    }, function() {
      return $scope.loading = false;
    });
  };
});