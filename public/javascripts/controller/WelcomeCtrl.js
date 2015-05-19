myApp.controller('WelcomeCtrl', function ($scope, $flash, $http, facebookService, modelService,languageService,$location,modalService) {


    //use the model
    $scope.model = modelService.model;
    $scope.myself = modelService.get(modelService.MY_SELF);


    //login open modal
    $scope.login = function () {
        modalService.openLoginModal();
    };

    //registration open modal
    $scope.registration = function () {
        modalService.openCustomerRegistrationModal();
    };

    //edit profile
    $scope.editProfile = function () {
        modalService.openEditProfileModal();

    };

    //log out
    $scope.logout = function () {
        $http({
            'method': "GET",
            'url': "logout",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            modelService.remove(modelService.MY_SELF);
            $location.path('/');
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