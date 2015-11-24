myApp.controller('ProfileCtrl', function($scope, modalService, accountService, $rootScope, $window, businessService, facebookService, translationService, $flash) {
  $scope.model = accountService.model;
  $scope.accountParam = {
    updateMode: true,
    dto: angular.copy(accountService.getMyself()),
    disabled: true
  };
  $scope.editPassword = function() {
    return modalService.openEditPasswordModal();
  };
  $scope.interestEdit = function() {
    return modalService.openEditCustomerInterest();
  };
  $scope.personalEdit = function() {
    $scope.oldLang = angular.copy($scope.accountParam.dto.lang);
    return $scope.accountParam.disabled = false;
  };
  $scope.personalSave = function() {
    $scope.accountParam.disabled = true;
    return accountService.editAccount($scope.accountParam.dto, function() {
      if ($scope.oldLang.code !== $scope.accountParam.dto.lang.code) {
        return $window.location.reload();
      }
    });
  };
  $scope.personalCancel = function() {
    $scope.accountParam.dto.firstname = accountService.getMyself().firstname;
    $scope.accountParam.dto.lastname = accountService.getMyself().lastname;
    $scope.accountParam.dto.email = accountService.getMyself().email;
    $scope.accountParam.dto.gender = accountService.getMyself().gender;
    return $scope.accountParam.disabled = true;
  };
  $scope.addAddress = function() {
    return modalService.addressModal(true, null, false);
  };
  $scope.editAddress = function(address) {
    return modalService.addressModal(true, address, false);
  };
  $scope.deleteAddress = function(address) {
    return accountService.deleteAddress(address);
  };
  $scope.createBusiness = function() {
    return businessService.createBusiness(accountService.getMyself().id, $scope.businessName, function(data) {
      return accountService.setMyself(data);
    });
  };
  $scope.facebookSuccess = function(data) {
    accountService.setMyself(data);
    return $flash.success(translationService.get('--.profile.linkFacebook.success'));
  };
  $scope.fb_login = function() {
    $scope.loading = true;
    return facebookService.linkToAccount(null, function(data) {
      $scope.facebookSuccess(data);
      return $scope.loading = false;
    }, function(data) {
      $scope.loading = false;
      return failed(data);
    });
  };
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  $(window).scrollTop(0);
  return $rootScope.$broadcast('PROGRESS_BAR_STOP');
});