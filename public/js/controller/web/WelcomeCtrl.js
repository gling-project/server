myApp.controller('WelcomeCtrl', function($rootScope, $scope, publicationService, $location, businessService, constantService, customerInterestService, searchService, $timeout, accountService) {
  $scope.LAST_BUSINESS_NB = 5;
  $scope.MAX_PUBLICATION = 4;
  $scope.descriptionLimitBase = 120;
  $scope.publicationListCtrl = {
    data: []
  };
  $scope.lastChange = null;
  $scope.myself = accountService.getMyself();
  $scope.maps = [
    {
      name: 'Chaussée de Wavre',
      src: "/assets/images/map/1160.png",
      position: {
        x: 50.815060,
        y: 4.425933
      }
    }, {
      name: 'Rue des Tongres',
      src: "/assets/images/map/tongres.png",
      position: {
        x: 50.840479,
        y: 4.401033
      }
    }, {
      name: 'Place Flagey',
      src: "/assets/images/map/flagey.png",
      position: {
        x: 50.827821,
        y: 4.372452
      }
    }, {
      name: 'Bailly & Châtelain',
      src: "/assets/images/map/bailly.png",
      position: {
        x: 50.824614,
        y: 4.358858
      }
    }
  ];
  $scope.openMap = function(map) {
    console.log(map);
    return $scope.goTo('/map', map.position);
  };
  $scope.getInterestClass = function(interest) {
    return 'gling-icon-' + interest.name;
  };
  $scope.navigateTo = function(publication) {
    return $location.path('/business/' + publication.businessId + '/publication/' + publication.id);
  };
  $scope.goTo = function(url, params) {
    return $location.path(url).search(params);
  };
  $scope.getBackgroundClass = function(publication) {
    if ((publication.pictures[0] != null) && publication.pictures[0].width / publication.pictures[0].height > 1) {
      return 'picture-horizontal';
    } else {
      return 'picture-vertical';
    }
  };
  $scope.$on('POSITION_CHANGED', function() {
    return $scope.loadBusiness();
  });
  $scope.loadBusiness = function() {
    return businessService.loadLastBusiness($scope.LAST_BUSINESS_NB, function(data) {
      var b, _i, _len, _ref, _results;
      $scope.businesses = data;
      _ref = $scope.businesses;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        _results.push(b.descriptionLimit = $scope.descriptionLimitBase);
      }
      return _results;
    });
  };
  searchService.lastOnes($scope.MAX_PUBLICATION, function(data) {
    $scope.publicationListCtrl.loading = false;
    return $scope.publicationListCtrl.data = data;
  });
  $scope.goToPublication = function(publication) {
    return $scope.goTo('/business/' + publication.businessId + '/publication/' + publication.id);
  };
  $timeout(function() {
    return FB.XFBML.parse();
  }, 1);
  $(window).scrollTop(0);
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  $scope.loadBusiness();
  console.log(constantService.eventPublicationIds);
  publicationService.loadByIds(constantService.eventPublicationIds, function(data) {
    console.log('------------------------------------------');
    console.log(data);
    return $scope.eventPublications = data;
  });
  return;
});