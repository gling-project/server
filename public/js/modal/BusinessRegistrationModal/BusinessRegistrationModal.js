myApp.controller('BusinessRegistrationModalCtrl', function($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, businessService, $location) {
  $scope.badgeSelected = 1;
  $scope.accountParam = {};
  $scope.account = null;
  $scope.businessRegistrationParams = {
    callbackSuccess: function(data) {
      accountService.setMyself(data);
      $location.path('/business/' + accountService.getMyself().businessId);
      $scope.close();
      return $scope.setLoading(false);
    },
    callbackFail: function() {
      return;
    }
  };
  $scope.setLoading = function(b) {
    $scope.loading = b;
    return $scope.accountParam.disabled = b;
  };
  $scope.close = function() {
    return $modalInstance.close();
  };
  $scope.toBusinessStep = function() {
    if (accountService.getMyself().type === 'BUSINESS') {
      $flash.success(translationService.get('--.businessRegistration.alreadyBusiness'));
      return $scope.close();
    } else {
      return $scope.badgeSelected = 2;
    }
  };
  $scope.fb_login = function() {
    $scope.setLoading(true);
    return facebookService.login((function(data) {
      accountService.setMyself(data);
      $scope.setLoading(false);
      return $scope.toBusinessStep();
    }), function(data) {
      return $flash.error(data.message);
    });
  };
  return $scope.createAccount = function() {
    if (!$scope.accountParam.isValid) {
      $scope.accountParam.displayErrorMessage = true;
      return $flash.error($filter('translateText')('--.generic.error.complete.fields'));
    } else {
      $scope.setLoading(true);
      return accountService.registration($scope.accountParam.dto, (function() {
        $scope.setLoading(false);
        return $scope.toBusinessStep();
      }), function() {
        return $scope.setLoading(false);
      });
    }
  };
});