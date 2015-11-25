myApp.controller('LoginModalCtrl', function($scope, $flash, $filter, facebookService, translationService, $modal, $modalInstance, accountService, $location, modalService, fctToExecute, fctToExecuteParams, helpMessage) {
  $scope.fctToExecute = fctToExecute;
  $scope.helpMessage = helpMessage;
  $scope.loginFormParam = {
    facebookSuccess: function(data) {
      if (fctToExecute != null) {
        fctToExecute(fctToExecuteParams);
      }
      return $scope.close();
    },
    loading: false
  };
  $scope.close = function() {
    return $modalInstance.close();
  };
  $scope.save = function() {
    if (!$scope.loginFormParam.isValid) {
      $scope.loginFormParam.displayErrorMessage = true;
      return $flash.error(translationService.get('--.generic.error.complete.fields'));
    } else {
      $scope.loginFormParam.loading = true;
      return accountService.login($scope.loginFormParam.dto, function() {
        $flash.success(translationService.get('--.login.flash.success'));
        $scope.loading = false;
        $scope.close();
        if (accountService.getMyself().type === 'BUSINESS') {
          $location.path('/business/' + accountService.getMyself().businessId);
        }
        if (fctToExecute != null) {
          return fctToExecute(fctToExecuteParams);
        }
      }, function() {
        return $scope.loginFormParam.loading = false;
      });
    }
  };
  $scope.toForgotPassword = function() {
    modalService.openForgotPasswordModal($scope.loginFormParam.dto.email);
    $scope.close();
    return;
  };
  $scope.toBusinessRegistration = function() {
    $scope.close();
    return modalService.openBusinessRegistrationModal();
  };
  return $scope.toCustomerRegistration = function() {
    $scope.close();
    return modalService.openCustomerRegistrationModal(fctToExecute, fctToExecuteParams);
  };
});