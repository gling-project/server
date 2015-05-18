myApp.controller('BusinessRegistrationCtrl', function ($scope, $modal) {


    $scope.businessRegistration = function(){
        $modal.open({
            templateUrl: "/assets/javascripts/modal/BusinessRegistrationModal/view.html",
            controller: "BusinessRegistrationModalCtrl",
            size: "lg"
        });
    }

    //login open modal
    $scope.login = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/LoginModal/view.html",
            controller: "LoginModalCtrl",
            size: "l"
        });
    };

});