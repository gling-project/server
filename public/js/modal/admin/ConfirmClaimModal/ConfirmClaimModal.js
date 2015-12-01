myApp.controller('ConfirmClaimModalCtrl', function($scope, $flash, $modal, $modalInstance, business, callback, superAdminService) {
  superAdminService.getClaims(business.id, function(data) {
    return $scope.claims = data;
  });
  $scope.close = function() {
    return $modalInstance.close();
  };
  $scope.business = business;
  return $scope.confirm = function(claim) {
    $scope.loading = true;
    return superAdminService.confirmClaim(business.id, claim.account.id, function() {
      $flash.success('Le commerçant est maintenant propriétaire de son commerce');
      $scope.loading = false;
      business.hasOwner = true;
      business.isClaimed = false;
      return $scope.close();
    }, function() {
      return $scope.loading = false;
    });
  };
});