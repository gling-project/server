myApp.controller('BusinessRegistrationCtrl', function ($scope, modalService) {


    $scope.businessRegistration = function(){
        modalService.openBusinessRegistrationModal();
    };

    //login open modal
    $scope.login = function () {
        modalService.openLoginModal();
    };

});