myApp.controller('ForgotPasswordCtrl', function($rootScope, $scope, facebookService, accountService, $location, $filter, $flash, modalService) {
  $scope.loading = false;
  $scope.dto = {};
  $scope.fields = {
    email: {
      fieldType: 'email',
      name: 'email',
      fieldTitle: '--.changeEmailModal.email',
      validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      validationMessage: '--.generic.validation.email',
      focus: function() {
        return true;
      },
      disabled: function() {
        return $scope.loading;
      },
      field: $scope.dto,
      fieldName: 'email'
    }
  };
  $scope.$watch('fields', (function() {
    var obj, validation, _i, _len, _ref;
    validation = true;
    _ref = $scope.fields;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obj = _ref[_i];
      if ($scope.fields.hasOwnProperty(key) && (obj.isValid === null || obj.isValid === false)) {
        obj.firstAttempt = !$scope.displayErrorMessage;
        validation = false;
      }
    }
    return $scope.isValid = validation;
  }), true);
  $scope.$watch('displayErrorMessage', function() {
    var obj, _i, _len, _ref, _results;
    _ref = $scope.fields;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obj = _ref[_i];
      _results.push(obj.firstAttempt = !$scope.displayErrorMessage);
    }
    return _results;
  });
  $scope.save = function() {
    if ($scope.isValid) {
      $scope.loading = true;
      return accountService.forgotPassword($scope.dto, (function() {
        $flash.success($filter('translateText')('--.forgotPassword.success'));
        $scope.loading = false;
        return $location.path('/');
      }), function() {
        return $scope.loading = false;
      });
    } else {
      return $scope.displayErrorMessage = true;
    }
  };
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  return modalService.closeLoadingModal();
});