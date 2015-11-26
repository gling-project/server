myApp.controller('WelcomeCtrl', function($rootScope, $scope, publicationService, $location, businessService, constantService, customerInterestService, searchService, $timeout) {
  $scope.LAST_BUSINESS_NB = 5;
  $scope.descriptionLimitBase = 120;
  $scope.currentInterests = [];
  $scope.publicationListCtrl = {
    data: []
  };
  $scope.lastChange = null;
  $scope.changeInterest = function() {
    return $timeout(function() {
      var key;
      $scope.lastChange = new Date().getTime();
      for (key in $scope.currentInterests) {
        if ($scope.currentInterests[key].selected) {
          $scope.currentInterests[key].selected = false;
          key = parseFloat(key);
          if ($scope.currentInterests.length - 1 > key) {
            key = parseFloat(key) + 1;
            $scope.currentInterests[key].selected = true;
          } else {
            $scope.currentInterests[0].selected = true;
          }
          break;
        }
      }
      return $scope.changeInterest();
    }, 15000);
  };
  $scope.progress = function() {
    return $timeout(function() {
      $scope.progressPercentage = (new Date().getTime() - $scope.lastChange) / 15000 * 100;
      return $scope.progress();
    }, 100);
  };
  customerInterestService.getAll(function(interests) {
    var interest, _i, _len;
    for (_i = 0, _len = interests.length; _i < _len; _i++) {
      interest = interests[_i];
      if (interest.name === 'eat' || interest.name === 'drink') {
        $scope.currentInterests.push(interest);
      }
    }
    $scope.currentInterests[0].selected = true;
    $scope.lastChange = new Date().getTime();
    $scope.progress();
    return $scope.changeInterest();
  });
  $scope.getInterestClass = function(interest) {
    return 'gling-icon-' + interest.name;
  };
  $scope.navigateTo = function(publication) {
    return $location('/business/' + publication.businessId + '/publication/' + publication.id);
  };
  $scope.goTo = function(url) {
    return $location(url);
  };
  $scope.getBackgroundClass = function(publication) {
    if ((publication.pictures[0] != null) && publication.pictures[0].width / publication.pictures[0].height > 1) {
      return 'picture-horizontal';
    } else {
      return 'picture-vertical';
    }
  };
  $scope.$watch('currentInterests', function(n) {
    var interest, _i, _len, _ref, _results;
    if ($scope.currentInterests != null) {
      _ref = $scope.currentInterests;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        interest = _ref[_i];
        _results.push(interest.selected ? searchService.byInterest(0, interest.id, function(data) {
          $scope.publicationListCtrl.loading = false;
          return $scope.publicationListCtrl.data = data;
        }) : void 0);
      }
      return _results;
    }
  }, true);
  $(window).scrollTop(0);
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  publicationService.loadByIds(constantService.eventPublicationIds, function(list) {
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