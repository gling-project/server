myApp.controller('BusinessCreationModalCtrl', function($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, businessService, $location) {
  $scope.businessRegistrationParams = {
    callbackSuccess: function(data) {
      accountService.setMyself(data);
      $location.path('/business/' + accountService.getMyself().businessId);
      return $scope.close();
    },
    callbackFail: function() {
      return;
    }
  };
  return $scope.close = function() {
    return $modalInstance.close();
  };
});