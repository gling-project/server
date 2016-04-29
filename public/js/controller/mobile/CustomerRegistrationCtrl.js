myApp.controller('CustomerRegistrationCtrl', function($rootScope, $scope, $flash, accountService, facebookService, translationService, modalService, $location) {
  var access_token;
  $scope.facebookAppId = facebookService.facebookAppId;
  $scope.facebookAuthorization = facebookService.facebookAuthorization;
  $scope.basic_url = location.host;
  $scope.getUrlParam = function(name, url) {
    var regex, regexS, results;
    if (!url) {
      url = location.href;
    }
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    regexS = '[\\?&]' + name + '=([^&#]*)';
    regex = new RegExp(regexS);
    results = regex.exec(url);
    if (results === null) {
      return null;
    } else {
      return results[1];
    }
  };
  $scope.setLoading = function(b) {
    if (b === true) {
      modalService.openLoadingModal();
    } else {
      modalService.closeLoadingModal();
    }
    return;
  };
  $scope.facebookSuccess = function(data) {
    accountService.setMyself(data);
    if (data.type === 'BUSINESS') {
      $location.path('/business/' + accountService.getMyself().businessId);
    } else {
      $location.path('/');
    }
    return $scope.setLoading(false);
  };
  $scope.fb_login = function() {
    var failed, success, url;
    success = function(data) {
      $scope.facebookSuccess(data);
      return $scope.setLoading(false);
    };
    failed = function(data) {
      $flash.error(data.message);
      $scope.setLoading(false);
      return $scope.$apply();
    };
    $scope.setLoading(true);
    if (facebookService.isConnected()) {
      return facebookService.loginToServer(success, failed);
    } else {
      url = 'https://www.facebook.com/dialog/oauth/?scope=' + facebookService.facebookAuthorization + '&client_id=' + $scope.facebookAppId + '&redirect_uri=' + $scope.basic_url + '/&state=BELGIUM&$scope=' + $scope.facebookAuthorization + '&response_type=token';
      return window.open(url, '_self');
    }
  };
  if (location.href.indexOf('access_token') !== -1) {
    access_token = $scope.getUrlParam('access_token', location.href);
    if (access_token !== null) {
      $scope.setLoading(true);
      facebookService.loginToServerSimple(access_token, (function(data) {
        return $scope.facebookSuccess(data);
      }), function(data, status) {
        return $scope.setLoading(false);
      });
    }
  }
  $scope.save = function() {
    if (!$scope.accountParam.isValid) {
      return $scope.accountParam.displayErrorMessage = true;
    } else {
      $scope.setLoading(true);
      return accountService.registration($scope.accountParam.dto, (function() {
        $scope.setLoading(false);
        $flash.success(translationService.get('--.login.flash.success'));
        return $location.url('/');
      }), function() {
        return $scope.setLoading(false);
      });
    }
  };
  if ($scope.basic_url.indexOf('http') === -1) {
    $scope.basic_url = 'http://' + $scope.basic_url;
  }
  $scope.accountParam = {
    mobileVersion: true
  };
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  return modalService.closeLoadingModal();
});