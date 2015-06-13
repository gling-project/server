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
        modalService.addressModal(false, address,true);
    };

    //
    // business category
    //
    $scope.businessCategoryParam={
        disabled: true,
        value : angular.copy($scope.model.myself.business.businessCategories)
    };

    $scope.businessCategoryEdit = function () {
        $scope.businessCategoryParam.disabled = false;
    };

    $scope.businessCategorySave = function () {
        $scope.businessCategoryParam.disabled = true;
        console.log($scope.businessCategoryParam.value);
        var business = angular.copy($scope.model.myself.business);
        business.businessCategories = $scope.businessCategoryParam.value;
        businessService.editBusinessCategory(business);
    };

    $scope.businessCategoryCancel = function () {
        $scope.businessCategoryParam.value= angular.copy($scope.model.myself.business.businessCategories);
        $scope.businessCategoryParam.disabled = true;
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
        field: accountService.getMyself().business,
        fieldName:'illustration'
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

    //
    // businessParam
    //
    $scope.businessScheduleParam={
        disabled : true,
        dto:angular.copy(accountService.getMyself().business.schedules)
    };

    $scope.businessScheduleEdit = function () {
        $scope.businessScheduleParam.disabled = false;
    };

    $scope.businessScheduleSave = function () {
        $scope.businessScheduleParam.disabled = true;
        var businessTmp = angular.copy(accountService.getMyself().business)
        businessTmp.schedules = $scope.businessScheduleParam.dto;
        console.log("businessTmp");
        console.log(businessTmp);
        businessService.createSchedule(businessTmp);
    };

    $scope.businessScheduleCancel = function () {
        $scope.businessScheduleParam.dto=angular.copy(accountService.getMyself().business.schedules);
        $scope.businessScheduleParam.disabled = true;
    };


});