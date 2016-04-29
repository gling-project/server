myApp.controller('WelcomeCtrl', function($rootScope, $scope, $location, accountService, $flash, translationService, $timeout, modalService, languageService) {
  $scope.$watch('lang', function() {
    if (!angular.isUndefined($scope.lang)) {
      return languageService.changeLanguage($scope.lang);
    }
  });
  $scope.languageService = languageService;
  $scope.loginFormParam = {
    dto: {},
    mobileVersion: true,
    facebookSuccess: function(data) {
      return $location.url('/news');
    }
  };
  $scope.login = function() {
    if ($scope.loginFormParam.isValid) {
      $scope.setLoading(true);
      return accountService.login($scope.loginFormParam.dto, (function() {
        return $timeout((function() {
          $scope.setLoading(false);
          $flash.success(translationService.get('--.login.flash.success'));
          return $location.url('/welcome');
        }), 1);
      }), function() {
        return $scope.setLoading(false);
      });
    } else {
      return $scope.loginFormParam.displayErrorMessage = true;
    }
  };
  $scope.setLoading = function(b) {
    if (b === true) {
      return modalService.openLoadingModal();
    } else {
      return modalService.closeLoadingModal();
    }
  };
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  return modalService.closeLoadingModal();
});