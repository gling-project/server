myApp.controller('PromotionCtrl', function ($rootScope, $scope, accountService) {

    console.log("accountService.getMyBusiness()");
    console.log(accountService.getMyBusiness());


    $scope.publicationFormParam = {
        dto: {},
        business: accountService.getMyBusiness()
    };

});