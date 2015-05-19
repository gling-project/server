myApp.controller('WelcomeCtrl', function ($scope,  languageService,$location,accountService,facebookService,modalService) {


    //use the model
    $scope.myself = accountService.getMyself();
    $scope.accountService = accountService;


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
        facebookService.logout();
        accountService.logout(function(){
            $location.path('/');
        });
    };

    //
    // change lang
    //
    $scope.$watch('lang', function () {
        if(!angular.isUndefined($scope.lang)) {
            languageService.changeLanguage($scope.lang);
        }
    });

    $scope.languageService = languageService;

});