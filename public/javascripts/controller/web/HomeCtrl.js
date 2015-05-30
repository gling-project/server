myApp.controller('HomeCtrl', function ($scope, modalService) {


//login open modal
    $scope.customerRegistration = function () {
        modalService.openCustomerRegistrationModal();
    };

    $scope.clock_info = {

    }
});