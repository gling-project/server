myApp.controller('WelcomeCtrl', function ($scope, $modal, $window, $flash, $http, facebookService, modelService,languageService) {


    //use the model
    $scope.model = modelService.model;
    $scope.myself = modelService.get(modelService.MY_SELF);


    //login open modal
    $scope.login = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/LoginModal/view.html",
            controller: "LoginModalCtrl",
            size: "l"
        });
    };

    //registration open modal
    $scope.registration = function () {

        $modal.open({
            templateUrl: "/assets/javascripts/modal/RegistrationModal/view.html",
            controller: "RegistrationModalCtrl",
            size: "l"
        });
    };

    //edit profile
    $scope.editProfile = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/EditProfileModal/view.html",
            controller: "EditProfileModalCtrl",
            size: "l"
        });
    };

    //log out
    $scope.logout = function () {
        $http({
            'method': "GET",
            'url': "logout",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            modelService.remove(modelService.MY_SELF);
        })
            .error(function (data, status) {
                $flash.error(data.message);
            });
        if (facebookService.isConnected()) {
            facebookService.logout();
        }
    };

    //
    // change lang
    //
    $scope.$watch('lang', function () {
        if(!angular.isUndefined($scope.lang)) {
            languageService.changeLanguage($scope.lang);
        }
    });

});