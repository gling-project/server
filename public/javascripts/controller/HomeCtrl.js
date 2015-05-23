myApp.controller('HomeCtrl', function ($scope, modalService,$http) {


//login open modal
    $scope.customerRegistration = function () {
        modalService.openCustomerRegistrationModal();
    };
});