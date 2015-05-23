myApp.controller('BusinessWelcomeCtrl', function ($scope,accountService,businessService,modalService,promotionService) {

    $scope.model = accountService.model;

    $scope.businessParam={
        disabled: true,
        dto : angular.copy( accountService.getMyself().business)
    };

    $scope.businessCategoryParam={
        disabled: true,
        value : angular.copy($scope.model.myself.business.businessCategories)
    };

    $scope.imageParam = {
        disabled: true,
        dto : angular.copy(accountService.getMyself().business.image)
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

    $scope.imageEdit = function () {
        $scope.imageParam.disabled = false;
    };

    $scope.imageSave = function () {
        $scope.imageParam.disabled = true;
        businessService.editImage($scope.imageParam.dto);
    };

    $scope.imageCancel = function () {
        $scope.imageParam.dto=angular.copy(accountService.getMyself().business.image);
        $scope.imageParam.disabled = true;
    };

    $scope.addPromotion = function(){
        modalService.openPromotionModal(null);
    };

    $scope.loadPromotion = function(){
        promotionService.getAll(function(data){
            $scope.promotions = data;
        });
    };
    $scope.loadPromotion();

    $scope.editPromotion = function(promotion){
        modalService.openPromotionModal(promotion);
    };


});