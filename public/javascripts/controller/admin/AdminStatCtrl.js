myApp.controller('AdminStatCtrl', function ($scope, superAdminService, $timeout) {

    $scope.tab = 'main';

    $scope.refreshStat = function () {
        superAdminService.getStat(function (data) {
            $scope.stats = data;
        });
    };

    $scope.details = [];

    $scope.refreshDetails = function () {
        $scope.details = [];
        superAdminService.getUserDetails(function (data) {
            $scope.completeObj('Aujourd\'hui', data.today);
            $scope.completeObj('7 derniers jours', data.week);
            $scope.completeObj('Tout', data.all);

        });
    };

    $scope.refreshInterest = function () {
        $scope.interestStat = [];
        superAdminService.getInterestStats(function (data) {
            console.log('succes !! ');
            console.log(data);

            $scope.interestGraph1 = {
                title: 'Intérêts sélectionnés sur les dernières 24 heures',
                data: data.from1
            };
            $scope.interestGraph7 = {
                title: 'Intérêts sélectionnés sur les derniers 7 jours',
                data: data.from7
            };
            $scope.interestGraph14 = {
                title: 'Intérêts sélectionnés sur les derniers 14 jours',
                data: data.from14
            };
            $scope.interestGraph28 = {
                title: 'Intérêts sélectionnés sur les derniers 28 jours',
                data: data.from28
            };

        });
    };

    $scope.completeObj = function (title, data) {

        $scope.details.push({
                title: title,
                total: data.total,
                nbSessionChartParam: {
                    title: 'Nombre de session par utilisateur',
                    data: data.nbSessions
                }
                ,
                nbFollowChartParam: {
                    title: 'Nombre de suivit par utilisateur',
                    data: data.nbFollows
                }, nbAddressChartParam: {
                    title: 'Nombre d\'adresse par utilisateur',
                    data: data.nbAddresses
                }, sharePositionChartParam: {
                    title: 'Partage sa position par utilisateur',
                    data: data.sharePositions
                }
            }
        )
    };

    $scope.setTab = function (tab) {
        $scope.tab = tab;
        if ($scope.tab == 'main') {
            $scope.refreshStat();
        }
        else if ($scope.tab == 'users') {
            $scope.refreshDetails();
        }
        else if ($scope.tab == 'interest') {
            $scope.refreshInterest();
        }
    };

    $scope.refreshStat();

    $timeout(function () {
        $scope.refreshDetails();
    }, 100);

})
;