myApp.controller('HomeCtrl', function($scope, geolocationService, searchService, customerInterestService, $timeout, accountService, $rootScope, followService, modalService) {
  var loadingBusinessSuccess, loadingPublicationSuccess;
  $scope.publicationListCtrl = {};
  $scope.businessInfoParam = {};
  $scope.businessListParam = {
    data: []
  };
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
  $scope.getSelectedInterest = function() {
    var interest, _i, _len, _ref;
    if (!($scope.customerInterests != null)) {
      return null;
    }
    _ref = $scope.customerInterests;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      interest = _ref[_i];
      if (interest.selected) {
        return interest;
      }
    }
    return null;
  };
  $scope.selectInterest = function() {
    return modalService.interestSelection($scope.customerInterests, function(target) {
      return $scope.loadPublicationByInterest(target);
    });
  };
  $('.scrollable-content-body').on('scroll', function() {
    var scrollBottom;
    scrollBottom = $('.scrollable-content-body').scrollTop() + $('.scrollable-content-body').height();
    if ($('.scrollable-content-inner').height() - scrollBottom < 200) {
      if ($scope.loadSemaphore === false) {
        $scope.loadSemaphore = true;
        $scope.currentPage = $scope.currentPage + 1;
        return $scope.loadPublication();
      }
    }
  });
  loadingPublicationSuccess = function(data, callbackEmptyResultFunction) {
    var d, _i, _len;
    if ($scope.currentPage === 0) {
      $scope.publicationListCtrl.data = [];
    }
    $scope.loadSemaphore = false;
    $scope.publicationListCtrl.loading = false;
    if (data === null || data.length <= 5) {
      $scope.allLoaded = true;
      if ($scope.currentPage === 0 && (callbackEmptyResultFunction != null)) {
        callbackEmptyResultFunction();
        if (data.length !== 0) {
          $scope.emptyMessage = 'moreBusiness';
        }
      }
    }
    for (_i = 0, _len = data.length; _i < _len; _i++) {
      d = data[_i];
      $scope.publicationListCtrl.data.push(d);
    }
    return;
  };
  loadingBusinessSuccess = function(data) {
    $scope.businessListParam.data = data;
    return $scope.businessListParam.loading = false;
  };
  $scope.loadPublicationByInterest = function(selectedInterest) {
    var interest, _i, _j, _len, _len2, _ref, _ref2;
    if (selectedInterest === null) {
      _ref = $scope.customerInterests;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        interest = _ref[_i];
        interest.selected = false;
      }
    } else {
      if (selectedInterest.selected === true) {
        selectedInterest.selected = false;
      } else {
        _ref2 = $scope.customerInterests;
        for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
          interest = _ref2[_j];
          interest.selected = false;
        }
        selectedInterest.selected = true;
      }
    }
    console.log('LOAD PUBLICATION AFTER searchByInterest ');
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    return $scope.loadPublication();
  };
  $scope.$on('POSITION_CHANGED', function() {
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    console.log('LOAD PUBLICATION AFTER POSITION_CHANGED');
    return $scope.loadPublication();
  });
  $scope.$watch('followingMode', function(o, n) {
    if (o !== n) {
      $scope.currentPage = 0;
      $scope.allLoaded = false;
      console.log('LOAD PUBLICATION AFTER followingMode');
      return $scope.loadPublication();
    }
  });
  $scope.$watch('sortChoose', function(n, o) {
    if (n !== o) {
      return $scope.loadPublication();
    }
  });
  $scope.loadPublication = function() {
    var interestSelected;
    interestSelected = $scope.getSelectedInterest();
    if ($scope.currentPage === 0) {
      $scope.publicationListCtrl.loading = true;
      $scope.publicationListCtrl.data = [];
    }
    if ($scope.followingMode) {
      if (interestSelected != null) {
        return searchService.byFollowedAndInterest($scope.currentPage, $scope.sortChoose, interestSelected.id, function(data) {
          return loadingPublicationSuccess(data, function() {
            $scope.emptyMessage = 'followedWithInterest';
            $scope.businessListParam.loading = true;
            return searchService.nearBusinessByInterest(interestSelected.id, function(data) {
              return loadingBusinessSuccess(data);
            });
          });
        });
      } else {
        return searchService.byFollowed($scope.currentPage, $scope.sortChoose, function(data) {
          return loadingPublicationSuccess(data, function() {
            $scope.emptyMessage = 'followed';
            $scope.businessListParam.loading = true;
            return searchService.nearBusiness(function(data) {
              return loadingBusinessSuccess(data);
            });
          });
        });
      }
    } else {
      if (interestSelected != null) {
        return searchService.byInterest($scope.currentPage, $scope.sortChoose, interestSelected.id, function(data) {
          return loadingPublicationSuccess(data, function() {
            $scope.emptyMessage = 'newsFeedWithInterest';
            $scope.businessListParam.loading = true;
            return searchService.nearBusinessByInterest(interestSelected.id, function(data) {
              return loadingBusinessSuccess(data);
            });
          });
        });
      } else {
        return searchService["default"]($scope.currentPage, $scope.sortChoose, function(data) {
          return loadingPublicationSuccess(data, function() {
            $scope.emptyMessage = 'newsFeed';
            $scope.businessListParam.loading = true;
            return searchService.nearBusiness(function(data) {
              return loadingBusinessSuccess(data);
            });
          });
        });
      }
    }
  };
  $scope.setFollowingMode = function(n) {
    if (n === null) {
      return n = !$scope.followingMode;
    } else {
      return $scope.followingMode = !$scope.followingMode;
    }
  };
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  modalService.closeLoadingModal();
  $scope.currentPage = 0;
  $scope.allLoaded = false;
  $scope.loadPublication();
  return customerInterestService.getAll(function(value) {
    return $scope.customerInterests = value;
  });
});