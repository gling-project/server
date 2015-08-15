myApp.controller('MenuCtrl', function ($scope,facebookService,accountService,$location) {

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