myApp.controller('BusinessWelcomeCtrl', function ($scope,accountService,businessService) {

    $scope.model = accountService.model;

    $scope.businessParam={
        disabled: true,
        dto : angular.copy( accountService.getMyself().business)
    };

    $scope.businessCategoryParam={
        disabled: true,
        value : angular.copy($scope.model.myself.business.businessCategories)
    };

    $scope.editAddress = function (address) {
        modalService.addressModal(true, address);
    };

    $scope.businessEdit = function () {
        $scope.businessParam.disabled = false;
    };

    $scope.businessSave = function () {
        $scope.businessParam.disabled = true;
        businessService.edit($scope.businessParam.dto);
    };

    $scope.businessCancel = function () {
        $scope.businessParam.dto=angular.copy(accountService.getMyself().business);
        $scope.businessParam.disabled = true;
    };
});