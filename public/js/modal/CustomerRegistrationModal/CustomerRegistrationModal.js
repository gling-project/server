myApp.controller('CustomerRegistrationModalCtrl', function($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, modalService, fctToExecute, fctToExecuteParams) {
  $scope.accountParam = {};
  $scope.close = function() {
    return $modalInstance.close();
  };
  $scope.toBusinessRegistration = function() {
    $scope.close();
    return modalService.openBusinessRegistrationModal();
  };
  $scope.setLoading = function(b) {
    $scope.loading = b;
    return $scope.accountParam.disabled = b;
  };
  $scope.fb_login = function() {
    $scope.setLoading(true);
    return facebookService.login((function(data) {
      accountService.setMyself(data);
      if (data.type === 'BUSINESS') {
        $location.path('/business/' + accountService.getMyself().businessId);
      }
      $scope.setLoading(false);
      return $scope.close();
    }), function(data) {
      return $flash.error(data.message);
    });
  };
  return $scope.save = function() {
    if (!$scope.accountParam.isValid) {
      return $scope.accountParam.displayErrorMessage = true;
    } else {
      $scope.setLoading(true);
      return accountService.registration($scope.accountParam.dto, (function() {
        $scope.setLoading(false);
        $flash.success(translationService.get('--.login.flash.success'));
        if (fctToExecute != null) {
          fctToExecute(fctToExecuteParams);
        }
        return $scope.close();
      }), function() {
        return $scope.setLoading(false);
      });
    }
  };
});