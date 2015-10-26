myApp.controller('AdminStatCtrl', function ($scope, superAdminService, $timeout) {

    $scope.refreshStat = function () {
        superAdminService.getStat(function (data) {
            $scope.stats = data;
        });
    };


    $scope.refreshDetails = function () {
        superAdminService.getUserDetails(function (data) {
            $scope.userDetails = data.list;
            $scope.nbSessionChartParam = {
                title: 'Nombre de session par utilisateur',
                data: data.nbSessions
            };

        });
    };

    $scope.refreshStat();

    $timeout(function () {
        $scope.refreshDetails();
    }, 100);

});