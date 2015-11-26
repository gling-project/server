myApp.controller('WelcomeCtrl', function($rootScope, $scope, publicationService, $location, businessService) {
  $scope.LAST_BUSINESS_NB = 5;
  $scope.descriptionLimitBase = 120;
  $scope.navigateTo = function(publication) {
    return $location('/business/' + publication.businessId + '/publication/' + publication.id);
  };
  $scope.goTo = function(url) {
    return $location(url);
  };
  $(window).scrollTop(0);
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  publicationService.loadByIds([1, 5, 16], function(list) {
    return $scope.publications = list;
  });
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
});