myApp.controller('MenuCtrl', function ($rootScope,$scope,facebookService,accountService,$location) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.logout = function () {
        if (facebookService.isConnected()) {
            facebookService.logout();
        }
        $scope.$broadcast('LOGOUT');
        accountService.logout(function () {
            $location.path('/');
        });
    };


});