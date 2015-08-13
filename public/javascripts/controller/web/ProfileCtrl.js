myApp.controller('ProfileCtrl', function ($scope, modalService, accountService, accountService) {

    $scope.model = accountService.model;

    $scope.accountParam = {
        updateMode: true,
        dto: angular.copy(accountService.getMyself()),
        disabled: true
    };

    $scope.editPassword = function(){
        modalService.openEditPasswordModal();
    };

    $scope.interestEdit = function(){
        modalService.openEditCustomerInterest();
    };

    $scope.personalEdit = function () {
        $scope.accountParam.disabled = false;
    };

    $scope.personalSave = function () {
        $scope.accountParam.disabled = true;
        accountService.editAccount($scope.accountParam.dto);
    };

    $scope.personalCancel = function () {
        $scope.accountParam.dto=angular.copy(accountService.getMyself());
        $scope.accountParam.disabled = true;
    };




    $scope.addAddress = function () {
        modalService.addressModal(true, null,false);
    };

    $scope.editAddress = function (address) {
        modalService.addressModal(true, address,false);
    };

    $scope.deleteAddress = function (address) {
        accountService.deleteAddress(address);
    };

});