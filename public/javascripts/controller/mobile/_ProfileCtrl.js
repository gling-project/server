myApp.controller('ProfileCtrl', function ($rootScope,$scope, modalService, accountService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');
    modalService.closeLoadingModal();

    $scope.model = accountService.model;

    $scope.activeTab = 'personal';

    $scope.setActiveTab = function(tab){
        $scope.activeTab = tab;
    };


    $scope.accountParam = {
        updateMode: true,
        dto: angular.copy(accountService.getMyself()),
        disabled: true
    };

    $scope.editPassword = function(){
        modalService.openEditPasswordModal();
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

    //interest
    $scope.interestParam = {
        result: angular.copy(accountService.getMyself().customerInterests),
        disabled: true
    };

    $scope.interestEdit = function(){
        $scope.interestParam.disabled=false;
    };

    $scope.interestCancel = function(){
        $scope.interestParam.disabled=true;
    };

    $scope.interestSave = function(){
        accountService.editCustomerInterest(
            {customerInterests:$scope.interestParam.result},
            function () {
                accountService.getMyself().customerInterests = $scope.interestParam.result;
                $scope.interestParam.disabled=true;
                $scope.loading = false;
            },
            function () {
                $scope.loading = false;
            });
    };

});