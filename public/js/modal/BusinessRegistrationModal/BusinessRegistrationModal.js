myApp.controller('BusinessRegistrationModalCtrl', function($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, businessService, $location) {
  $scope.badgeSelected = 1;
  $scope.accountParam = {};
  $scope.account = null;
  $scope.business = {};
  $scope.businessNameField = {
    name: 'name',
    fieldTitle: "--.generic.name",
    validationRegex: "^.{2,50}$",
    validationMessage: ['--.generic.validation.size', '2', '250'],
    field: $scope.business,
    disabled: function() {
      return $scope.loading;
    },
    fieldName: 'name'
  };
  $scope.importFromFacebookParam = {
    name: 'facebookUrl',
    validationRegex: "^($|https://www.facebook\.com/.*$)",
    validationMessage: '--.generic.validation.facebook',
    fieldTitle: "Facebook",
    field: $scope.business,
    disabled: function() {
      return $scope.loading;
    },
    fieldName: 'facebookUrl'
  };
  $scope.setLoading = function(b) {
    $scope.loading = b;
    return $scope.accountParam.disabled = b;
  };
  $scope.close = function() {
    $modalInstance.close();
    return;
  };
  $scope.toBusinessStep = function() {
    if (accountService.getMyself().type === 'BUSINESS') {
      $flash.success(translationService.get('--.businessRegistration.alreadyBusiness'));
      return $scope.close();
    } else {
      return $scope.badgeSelected = 2;
    }
  };
  $scope.saveSuccess = function(data) {
    accountService.setMyself(data);
    $location.path('/business/' + accountService.getMyself().businessId);
    $scope.close();
    return $scope.setLoading(false);
  };
  $scope.save = function() {
    if (!$scope.businessNameField.isValid) {
      $scope.businessNameField.displayErrorMessage = true;
      return $flash.error(translationService.get('--.generic.error.complete.fields'));
    } else {
      $scope.setLoading(true);
      return businessService.createBusiness(accountService.getMyself().id, $scope.business.name, function(data) {
        return $scope.saveSuccess(data);
      }, function() {
        return $scope.loading = false;
      });
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
  $scope.createAccount = function() {
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
  return $scope.importBusinessFromFacebook = function() {
    var urlEncoded;
    if (!$scope.importFromFacebookParam.isValid) {
      $scope.importFromFacebookParam.displayErrorMessage = true;
      return $flash.error($filter('translateText')('--.generic.error.complete.fields'));
    } else {
      $scope.setLoading(true);
      urlEncoded = encodeURIComponent($scope.business.facebookUrl);
      return businessService.importBusinessFormFacebook(urlEncoded, function(data) {
        return $scope.saveSuccess(data);
      }, function() {
        return $scope.setLoading(false);
      });
    }
  };
});