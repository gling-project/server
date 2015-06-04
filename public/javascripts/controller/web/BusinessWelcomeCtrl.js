myApp.controller('BusinessWelcomeCtrl', function ($scope,accountService,businessService,modalService,promotionService,$rootScope,businessNotificationService,$timeout) {

    $scope.model = accountService.model;
    //

    //
    // businessParam
    //
    $scope.businessParam={
        disabled: true,
        dto : angular.copy( accountService.getMyself().business)
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

    //
    // businessParam
    //
    $scope.editAddress = function (address) {
        modalService.addressModal(false, address);
    };

    //
    // business category
    //
    $scope.businessCategoryParam={
        disabled: true,
        value : angular.copy($scope.model.myself.business.businessCategories)
    };

    //
    // illustration
    //
    $scope.illustrationDisable = true;
    $scope.illustrationParam = {
        fieldTitle: "--.generic.image",
        validationMessage: '--.error.validation.image',
        size: 60,
        disabled: function(){
            return $scope.illustrationDisable;
        },
        field: angular.copy(accountService.getMyself().business.illustration)
    };


    $scope.illustrationEdit = function () {
        $scope.illustrationDisable = false;
    };

    $scope.illustrationSave = function () {
        $scope.illustrationDisable = true;
        businessService.editIllustration($scope.illustrationParam.field);
    };

    $scope.illustrationCancel = function () {
        $scope.illustrationParam.dto=angular.copy(accountService.getMyself().business.illustration);
        $scope.illustrationDisable = true;
    };

    //
    // promotion
    //
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
        promotionService.delete(promotion,function(){
            $scope.loadPromotion();
        });
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
    $timeout(function () {
        $scope.loadBusinessNotification();
    },100);

    $rootScope.$on(businessNotificationService.REFRESH_BUSINESS_NOTIFICAITON,function(){
        $scope.loadBusinessNotification();
    });

    $scope.editBusinessNotification = function(businessNotification){
        modalService.openBusinessNotificationModal(businessNotification);
    };

    $scope.deleteBusinessNotification = function(businessNotification){
        businessNotificationService.delete(businessNotification,function(){
            $scope.loadBusinessNotification();
        });
    }


});