myApp.controller('AdminStatCtrl', function ($scope, superAdminService, $timeout) {

    $scope.refreshStat = function () {
        superAdminService.getStat(function (data) {
            $scope.stats = data;
        });
    };


    $scope.refreshDetails = function () {
        superAdminService.getUserDetails(function (data) {
            $scope.userDetails = data;
        });
    };

    $scope.refreshStat();

    $timeout(function () {
        $scope.refreshDetails();
    }, 100);

});