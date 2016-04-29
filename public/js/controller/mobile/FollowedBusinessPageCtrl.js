myApp.controller('FollowedBusinessPageCtrl', function($rootScope, $scope, businessService, ngTableParams, $filter, followService, modalService) {
  $scope.businessListParams = {
    loading: true
  };
  businessService.getFollowedBusinesses(function(data) {
    $scope.businesses = data;
    $scope.setNotification = function(business) {
      business.followingNotification = !business.followingNotification;
      return followService.setNotification(business.id, business.followingNotification);
    };
    return $scope.stopFollow = function(business) {
      var key;
      for (key in $scope.businesses) {
        if ($scope.businesses[key] === business) {
          $scope.businesses.splice(key, 1);
        }
      }
      return followService.addFollow(false, business.id);
    };
  });
  $(window).scrollTop(0);
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  return modalService.closeLoadingModal();
});