myApp.controller('WelcomeCtrl', function($rootScope, $scope, publicationService, $location, businessService, constantService, customerInterestService, searchService, $timeout) {
  $scope.LAST_BUSINESS_NB = 5;
  $scope.descriptionLimitBase = 120;
  $scope.publicationListCtrl = {
    data: []
  };
  $scope.lastChange = null;
  $scope.getInterestClass = function(interest) {
    return 'gling-icon-' + interest.name;
  };
  $scope.navigateTo = function(publication) {
    return $location.path('/business/' + publication.businessId + '/publication/' + publication.id);
  };
  $scope.goTo = function(url) {
    return $location.path(url);
  };
  $scope.getBackgroundClass = function(publication) {
    if ((publication.pictures[0] != null) && publication.pictures[0].width / publication.pictures[0].height > 1) {
      return 'picture-horizontal';
    } else {
      return 'picture-vertical';
    }
  };
  $(window).scrollTop(0);
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  businessService.loadLastBusiness($scope.LAST_BUSINESS_NB, function(data) {
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
  searchService.lastOnes(3, function(data) {
    $scope.publicationListCtrl.loading = false;
    return $scope.publicationListCtrl.data = data;
  });
  return $timeout(function() {
    return FB.XFBML.parse();
  }, 1);
});