myApp.controller('BusinessWelcomeCtrl', function ($scope,accountService,businessService,modalService,promotionService,$rootScope,businessNotificationService) {

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
        modalService.addressModal(false, address);
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
        promotionService.getMine(function(data){
            $scope.promotions = data;
        });
    };
    $scope.loadPromotion();

    $rootScope.$on('$refreshPromotion',function(){
       $scope.loadPromotion();
    });

    $scope.editPromotion = function(promotion){
        modalService.openPromotionModal(promotion);
    };

    $scope.deletePromotion = function(promotion){
        promotionService.delete(promotion);
    };

    //
    // business notification
    //
    $scope.addBusinessNotification = function(){
        modalService.openBusinessNotificationModal(null);
    };

    $scope.loadBusinessNotification = function(){
        businessNotificationService.getMine(function(data){
            $scope.businessNotifications = data;
        });
    };
    $scope.loadBusinessNotification();

    $rootScope.$on(businessNotificationService.REFRESH_BUSINESS_NOTIFICAITON,function(){
        $scope.loadBusinessNotification();
    });

    $scope.editBusinessNotification = function(businessNotification){
        modalService.openBusinessNotificationModal(businessNotification);
    };

    $scope.deleteBusinessNotification = function(businessNotification){
        businessNotificationService.delete(businessNotification);
    }


});