myApp.controller('FollowedBusinessPageCtrl', function($rootScope, $scope, businessService, ngTableParams, $filter, followService) {
  $scope.businessListParams = {
    loading: true
  };
  businessService.getFollowedBusinesses(function(data) {
    $scope.businesses = data;
    $scope.$watch('filter.$', function(o, n) {
      if (n !== o) {
        return $scope.tableParams.reload();
      }
    });
    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 10,
      sorting: {
        name: 'asc'
      }
    }, {
      counts: [],
      total: $scope.businesses.length,
      getData: function($defer, params) {
        var filteredData, orderedData;
        filteredData = $filter('filter')($scope.businesses, $scope.filter);
        orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
        return $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });
    $scope.checkAll = function(check) {
      var business, _i, _len, _ref, _results;
      _ref = $scope.businesses;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        business = _ref[_i];
        _results.push(business.followingNotification !== check ? (business.followingNotification = check, $scope.setNotification(business)) : void 0);
      }
      return _results;
    };
    $scope.setNotification = function(business) {
      return followService.setNotification(business.id, business.followingNotification);
    };
    return $scope.stopFollow = function(business) {
      return followService.addFollow(false, business.id, function() {
        var key;
        for (key in $scope.businesses) {
          if ($scope.businesses[key] === business) {
            $scope.businesses.splice(key, 1);
          }
        }
        return $scope.tableParams.reload();
      });
    };
  }, function() {
    $scope.loading = false;
    return $scope.displayError = true;
  });
  $(window).scrollTop(0);
  return $rootScope.$broadcast('PROGRESS_BAR_STOP');
});