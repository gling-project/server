myApp.controller('WelcomeCtrl', function ($rootScope,$scope,$location,accountService,$flash,translationService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.loginFormParam = {
        dto: {},
        mobileVersion: true,
        facebookSuccess: function (data) {
            $location.path('/home');
        }
    };

    $scope.save = function () {

        if ($scope.loginFormParam.isValid) {

            console.log('valid')

            $scope.loading = true;

            accountService.login($scope.loginFormParam.dto,
                function () {
                    console.log('success')

                    $flash.success(translationService.get("--.login.flash.success"));
                    $scope.loading = false;
                    //logout facebook in case
                    //facebookService.logout();
                    $location.path('/home');
                },
                function () {
                    console.log('faild')
                    $scope.loading = false;
                });
        }
        else{
            $scope.loginFormParam.displayErrorMessage = true;
        }
    };

    $scope.toForgotPassword = function(){

    };


});