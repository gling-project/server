myApp.controller('ProfileCtrl', function ($scope, modalService, accountService, $rootScope,$window) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

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
        $scope.oldLang = angular.copy($scope.accountParam.dto.lang);
        $scope.accountParam.disabled = false;
    };

    $scope.personalSave = function () {
        $scope.accountParam.disabled = true;
        accountService.editAccount($scope.accountParam.dto,function(){

            if($scope.oldLang != $scope.accountParam.dto.lang){
                $window.location.reload();
            }
        });
    };

    $scope.personalCancel = function () {
        $scope.accountParam.dto.firstname=accountService.getMyself().firstname;
        $scope.accountParam.dto.lastname=accountService.getMyself().lastname;
        $scope.accountParam.dto.email=accountService.getMyself().email;
        $scope.accountParam.dto.gender=accountService.getMyself().gender;
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