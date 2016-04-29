myApp.controller('HomeCtrl', function($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService, $timeout, addressService, $location, $route, $routeParams) {
  var createNewAddress, original, path, successLoadingBusiness, successLoadingPublications;
  $scope.param = $routeParams.param;
  original = $location.path;
  $scope.interestDisplayMax = 12;
  $scope.interestDisplayed = [];
  $scope.interestDisplayed2 = [];
  $scope.followingMode = ($scope.param != null) && $scope.param.indexOf('following') !== -1;
  $scope.businessInfoParam = {};
  $scope.businessListParam = {
    data: []
  };
  $scope.accountService = accountService.model;
  $scope.publicationListCtrl = {};
  $scope.currentPage = 0;
  $scope.allLoaded = false;
  $scope.loadSemaphore = false;
  $scope.emptyMessage = null;
  $scope.sortChoices = [
    {
      key: 'distance',
      translation: '--.home.sort.distance'
    }, {
      key: 'date',
      translation: '--.home.sort.date'
    }
  ];
  $scope.sortChoose = 'date';
  path = function() {
    var i, path;
    path = '/shopnews/';
    if ($scope.followingMode) {
      path += 'following/';
    }
    for (i in $scope.customerInterests) {
      if ($scope.customerInterests[i].selected === true) {
        path += $scope.customerInterests[i].name;
      }
    }
    $location.path(path, false);
    return $rootScope.$broadcast('PROGRESS_BAR_STOP');
  };
  $scope.displaySharePositionWarning = function() {
    return geolocationService.sharePosition === false && (!(accountService.getMyself() != null) || !(accountService.getMyself().selectedAddress != null));
  };
  $rootScope.$watch((function() {
    return geolocationService.sharePosition;
  }), function(n) {
    return $scope.sharePosition = n;
  });
  $scope.setFollowedMode = function(n) {
    console.log('setFollowedMode:' + n);
    if (!(n != null)) {
      n = !$scope.followingMode;
    }
    if (!(accountService.getMyself() != null)) {
      return modalService.openLoginModal($scope.switchFollowedMode, n, '--.loginModal.help.followMode');
    } else {
      return $scope.switchFollowedMode(n);
    }
  };
  $scope.switchFollowedMode = function(n) {
    console.log('switchFollowedMode:' + n);
    $scope.followingMode = n;
    return path();
  };
  $scope.customerRegistration = function() {
    return modalService.openCustomerRegistrationModal();
  };
  $scope.searchByInterest = function(interest) {
    var i;
    if (interest.selected === true) {
      interest.selected = false;
    } else {
      for (i in $scope.customerInterests) {
        $scope.customerInterests[i].selected = false;
      }
      interest.selected = true;
    }
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    $scope.search();
    return path();
  };
  $scope.$on('POSITION_CHANGED', function() {
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    return $scope.search();
  });
  $scope.$watch('followingMode', function(n, o) {
    if (o !== n) {
      $scope.currentPage = 0;
      $scope.allLoaded = false;
      return $scope.search();
    }
  });
  $scope.$on('LOGOUT', function() {
    if ($scope.followingMode) {
      return $scope.followingMode = false;
    }
  });
  $(window).on('scroll', function() {
    var scrollBottom;
    scrollBottom = $(window).scrollTop() + $(window).height();
    if ($('.container-content').height() - scrollBottom < 200) {
      if ($scope.loadSemaphore === false) {
        $scope.currentPage = $scope.currentPage + 1;
        return $scope.search();
      }
    }
  });
  successLoadingPublications = function(data, callbackEmptyResultFunction) {
    var d, _i, _len, _results;
    if ($scope.currentPage === 0) {
      $scope.publicationListCtrl.data = [];
    }
    $scope.loadSemaphore = false;
    $scope.publicationListCtrl.loading = false;
    if (!(data != null) || data.length <= 5) {
      $scope.allLoaded = true;
      if ($scope.currentPage === 0 && (callbackEmptyResultFunction != null)) {
        callbackEmptyResultFunction();
        if (data.length !== 0) {
          $scope.emptyMessage = 'moreBusiness';
        }
      }
    }
    _results = [];
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      _results.push($scope.publicationListCtrl.data.push(d));
    }
    return _results;
  };
  successLoadingBusiness = function(data) {
    $scope.businessListParam.data = data;
    return $scope.businessListParam.loading = false;
  };
  $scope.$watch('sortChoose', function(n, o) {
    if (n !== o) {
      return $scope.search();
    }
  });
  $scope.search = function() {
    var i, interestSelected;
    if ($scope.allLoaded === false) {
      interestSelected = null;
      for (i in $scope.customerInterests) {
        if ($scope.customerInterests[i].selected) {
          interestSelected = $scope.customerInterests[i];
        }
      }
      $scope.loadSemaphore = true;
      if ($scope.currentPage === 0) {
        $scope.publicationListCtrl.loading = true;
        $scope.emptyMessage = null;
        $scope.publicationListCtrl.data = [];
        $scope.businessListParam.data = [];
      }
      if ($scope.followingMode) {
        if (interestSelected != null) {
          return searchService.byFollowedAndInterest($scope.currentPage, $scope.sortChoose, interestSelected.id, function(data) {
            return successLoadingPublications(data, function() {
              $scope.emptyMessage = 'followedWithInterest';
              $scope.businessListParam.loading = true;
              return searchService.nearBusinessByInterest(interestSelected.id, function(data) {
                return successLoadingBusiness(data);
              });
            });
          });
        } else {
          return searchService.byFollowed($scope.currentPage, $scope.sortChoose, function(data) {
            return successLoadingPublications(data, function() {
              $scope.emptyMessage = 'followed';
              $scope.businessListParam.loading = true;
              return searchService.nearBusiness(function(data) {
                return successLoadingBusiness(data);
              });
            });
          });
        }
      } else {
        if (interestSelected != null) {
          return searchService.byInterest($scope.currentPage, $scope.sortChoose, interestSelected.id, function(data) {
            return successLoadingPublications(data, function() {
              $scope.emptyMessage = 'newsFeedWithInterest';
              $scope.businessListParam.loading = true;
              return searchService.nearBusinessByInterest(interestSelected.id, function(data) {
                return successLoadingBusiness(data);
              });
            });
          });
        } else {
          return searchService["default"]($scope.currentPage, $scope.sortChoose, function(data) {
            return successLoadingPublications(data, function() {
              $scope.emptyMessage = 'newsFeed';
              $scope.businessListParam.loading = true;
              return searchService.nearBusiness(function(data) {
                return successLoadingBusiness(data);
              });
            });
          });
        }
      }
    }
  };
  $scope.createNewAddress = function() {
    if (accountService.getMyself() != null) {
      return createNewAddress();
    } else {
      return modalService.openLoginModal(createNewAddress, null, '--.loginModal.help.address');
    }
  };
  createNewAddress = function() {
    return modalService.addressModal(true, null, false, function(data) {
      return $timeout(function() {
        return addressService.changeAddress(data.name, function(data) {
          accountService.getMyself().selectedAddress = data;
          return $timeout(function() {
            return $rootScope.$broadcast('CHANGE_ADDRESS_SELECTED');
          }, 1);
        });
      }, 1);
    });
  };
  $(window).scrollTop(0);
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  $scope.currentPage = 0;
  $scope.allLoaded = false;
  customerInterestService.getAll(function(value) {
    var i;
    $scope.customerInterests = value;
    if ($scope.param != null) {
      for (i in $scope.customerInterests) {
        if ($scope.param.indexOf($scope.customerInterests[i].name) !== -1) {
          $scope.customerInterests[i].selected = true;
        }
      }
    }
    $scope.interestDisplayed = $scope.customerInterests.slice(0, $scope.interestDisplayMax);
    return $scope.interestDisplayed2 = $scope.customerInterests.slice($scope.interestDisplayMax, $scope.customerInterests.length);
  });
  return $scope.search();
});