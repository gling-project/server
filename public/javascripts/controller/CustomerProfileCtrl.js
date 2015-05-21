myApp.controller('CustomerProfileCtrl', function ($scope, modalService, accountService, accountService) {


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
    }

    $scope.personalEdit = function () {
        $scope.accountParam.disabled = false;
    };

    $scope.personalSave = function () {
        console.log($scope.accountParam.dto);
        $scope.accountParam.disabled = true;
        accountService.editAccount($scope.accountParam.dto);
    };

    $scope.personalCancel = function () {
        $scope.accountParam.dto=angular.copy(accountService.getMyself());
        $scope.accountParam.disabled = true;
    };


    $scope.model = accountService.model;

    $scope.addAddress = function () {
        modalService.addressModal(true, null);
    };

    $scope.editAddress = function (address) {
        modalService.addressModal(true, address);
    };

});