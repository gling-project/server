myApp.controller('HomeCtrl', function ($scope, $modal) {


//login open modal
    $scope.customerRegistration = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/CustomerRegistrationModal/view.html",
            controller: "CustomerRegistrationModalCtrl",
            size: "lg"
        });
    };

});