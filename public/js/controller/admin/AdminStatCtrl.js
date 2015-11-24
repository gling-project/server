myApp.controller('AdminStatCtrl', function($scope, superAdminService, $timeout) {
  $scope.tab = 'main';
  $scope.setTab = function(tab) {
    $scope.tab = tab;
    if ($scope.tab === 'main') {
      $scope.refreshStat();
    } else if ($scope.tab === 'users') {
      $scope.refreshDetails();
    } else if ($scope.tab === 'interest') {
      $scope.refreshInterest();
    }
    return;
  };
  $scope.refreshStat = function() {
    return superAdminService.getStat(function(data) {
      return $scope.stats = data;
    });
  };
  $scope.details = [];
  $scope.refreshDetails = function() {
    $scope.details = [];
    return superAdminService.getUserDetails(function(data) {
      $scope.completeObj('Aujourd\'hui', data.today);
      $scope.completeObj('7 derniers jours', data.week);
      return $scope.completeObj('Tout', data.all);
    });
  };
  $scope.completeObj = function(title, data) {
    return $scope.details.push({
      title: title,
      total: data.total,
      nbSessionChartParam: {
        title: 'Nombre de session par utilisateur',
        data: data.nbSessions
      },
      nbFollowChartParam: {
        title: 'Nombre de suivit par utilisateur',
        data: data.nbFollows
      },
      nbAddressChartParam: {
        title: 'Nombre d\'adresse par utilisateur',
        data: data.nbAddresses
      },
      sharePositionChartParam: {
        title: 'Partage sa position par utilisateur',
        data: data.sharePositions
      }
    });
  };
  $scope.refreshInterest = function() {
    $scope.interestStat = [];
    superAdminService.getInterestStats(function(data) {
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
      return $scope.interestGraph28 = {
        title: 'Intérêts sélectionnés sur les derniers 28 jours',
        data: data.from28
      };
    });
    return;
  };
  return $scope.refreshStat();
});