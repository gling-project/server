myApp.controller('AdminStatCtrl', function ($scope, superAdminService, $timeout) {

    $scope.refreshStat = function () {
        superAdminService.getStat(function (data) {
            $scope.stats = data;
        });
    };

    $scope.nbSessionChartParam=null;
    $scope.nbFollowChartParam=null;
    $scope.nbAddressChartParam = null;

    $scope.refreshDetails = function () {
        superAdminService.getUserDetails(function (data) {
            $scope.userDetails = data.list;
            $scope.nbSessionChartParam = {
                title: 'Nombre de session par utilisateur',
                data: data.nbSessions
            };
            $scope.nbFollowChartParam = {
                title: 'Nombre de suivit par utilisateur',
                data: data.nbFollows
            };
            $scope.nbAddressChartParam = {
                title: 'Nombre d\'adresse par utilisateur',
                data: data.nbAddresses
            }

        });
    };

    $scope.refreshStat();

    $timeout(function () {
        $scope.refreshDetails();
    }, 100);

});