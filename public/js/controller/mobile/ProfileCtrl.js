myApp.controller('ProfileCtrl', function($rootScope, $scope, modalService, accountService, facebookService, $flash, translationService, $location, constantService) {
  var access_token;
  $scope.model = accountService.model;
  $scope.activeTab = 'personal';
  $scope.facebookAppId = facebookService.facebookAppId;
  $scope.facebookAuthorization = facebookService.facebookAuthorization;
  $scope.basic_url = location.host + '/profile';
  if ($scope.basic_url.indexOf('http') === -1) {
    if ($scope.basic_url.indexOf('localhost') !== -1) {
      $scope.basic_url = 'http://' + $scope.basic_url;
    } else {
      $scope.basic_url = 'https://' + $scope.basic_url;
    }
  }
  $scope.accountParam = {
    updateMode: true,
    dto: angular.copy(accountService.getMyself()),
    disabled: true
  };
  $scope.interestParam = {
    result: angular.copy(accountService.getMyself().customerInterests),
    disabled: true
  };
  $scope.editPassword = function() {
    return modalService.openEditPasswordModal();
  };
  $scope.accountSave = function() {
    $scope.accountParam.disabled = true;
    return accountService.editAccount($scope.accountParam.dto);
  };
  $scope.accountCancel = function() {
    $scope.accountParam.dto = angular.copy(accountService.getMyself());
    return $scope.accountParam.disabled = true;
  };
  $scope.addAddress = function() {
    return modalService.addressModal(true, null, false);
  };
  $scope.editAddress = function(address) {
    return modalService.addressModal(true, address, false);
  };
  $scope.deleteAddress = function(address) {
    accountService.deleteAddress(address);
    if (constantService.compareNumber((accountService.getMyself().selectedAddress != null) && accountService.getMyself().selectedAddress.id, address.id)) {
      return accountService.getMyself().selectedAddress = null;
    }
  };
  $scope.interestSave = function() {
    return accountService.editCustomerInterest($scope.interestParam.result, (function() {
      accountService.getMyself().customerInterests = $scope.interestParam.result;
      $scope.interestParam.disabled = true;
      return $scope.loading = false;
    }), function() {
      return $scope.loading = false;
    });
  };
  $scope.facebookSuccess = function(data) {
    accountService.setMyself(data);
    return $flash.success(translationService.get('--.profile.linkFacebook.success'));
  };
  $scope.fb_login = function() {
    var url;
    $scope.loading = true;
    if (facebookService.isConnected()) {
      return facebookService.linkToAccount(null, function(data) {
        $scope.facebookSuccess(data);
        return $scope.loading = false;
      }, function() {
        return $scope.loading = false;
      });
    } else {
      url = 'https://www.facebook.com/dialog/oauth/?scope=' + facebookService.facebookAuthorization + '&client_id=' + $scope.facebookAppId + '&redirect_uri=' + $scope.basic_url + '/&state=BELGIUM&scope=' + $scope.facebookAuthorization + '&response_type=token';
      return window.open(url, '_self');
    }
  };
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
  if (location.href.indexOf('access_token') !== -1) {
    access_token = $scope.getUrlParam('access_token', location.href);
    if (access_token != null) {
      $scope.loading = true;
      facebookService.linkToAccount(access_token, function(data) {
        return $scope.facebookSuccess(data);
      }, function() {
        return $scope.loading = false;
      });
    }
    $location.url($location.path());
  }
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  modalService.closeLoadingModal();
  return;
});