myApp.controller('ConfirmClaimModalCtrl', function($scope, $flash, $modal, $modalInstance, claimBusiness, callback, superAdminService) {
  $scope.close = function() {
    return $modalInstance.close();
  };
  $scope.claimBusiness = claimBusiness;
  return $scope.save = function() {
    $scope.loading = true;
    return superAdminService.confirmClaim(business.id, function() {
      $flash.success('Le commerçant est maintenant propriétaire de son commerce');
      $scope.loading = false;
      return callback();
    }, function() {
      return $scope.loading = false;
    });
  };
});