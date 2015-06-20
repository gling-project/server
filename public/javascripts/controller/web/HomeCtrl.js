myApp.controller('HomeCtrl', function ($scope, modalService) {


//login open modal
    $scope.customerRegistration = function () {
        modalService.openCustomerRegistrationModal();
    };

    $scope.businessInfoParam = {};

    $scope.promotionListParam = {
        displayBusiness: function (businessId) {
            $scope.businessInfoParam.businessId = function () {
                return businessId;
            }
        }
    }

});