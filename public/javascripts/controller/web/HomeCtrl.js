myApp.controller('HomeCtrl', function ($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService, $timeout, addressService, $location, $route,$routeParams) {

    //back to the top of the page
    $(window).scrollTop(0);

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.param = $routeParams.param;


    var original = $location.path;
    var path = function () {

        //build path
        var path = '/home';

        if ($scope.followedMode) {
            path+='/following';
        }
        for (var i in $scope.customerInterests) {
            if($scope.customerInterests[i].selected === true){
                path+='/'+$scope.customerInterests[i].name;
            }
        }

        //navigate
        $location.path(path, false);

        var lastRoute = $route.current;
        var un = $rootScope.$on('$locationChangeSuccess', function () {
            $route.current = lastRoute;
            un();
        });
        $rootScope.$broadcast('PROGRESS_BAR_STOP');
        return original.apply($location, [path]);
    };


    $scope.displaySharePositionAdvertissement = function () {
        return geolocationService.sharePosition == false && (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null);
    };
    $rootScope.$watch(function () {
        return geolocationService.sharePosition;
    }, function (n) {
        $scope.sharePosition = n;
    });

    $scope.interestDisplayMax = 12;
    $scope.interestDisplayed = [];
    $scope.interestDisplayed2 = [];
    $scope.computeList = function () {
        $scope.interestDisplayed = $scope.customerInterests.slice(0, $scope.interestDisplayMax);
        $scope.interestDisplayed2 = $scope.customerInterests.slice($scope.interestDisplayMax, $scope.customerInterests.length);
    };

    //variable
    $scope.followedMode = $scope.param != null && $scope.param.indexOf('following')!=-1;
    $scope.businessInfoParam = {};
    $scope.businessListParam = {data: []};
    $scope.accountService = accountService.model;
    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;

        if ($scope.param != null) {
            for (var i in $scope.customerInterests) {
                if ($scope.param.indexOf($scope.customerInterests[i].name)!=-1) {
                    $scope.customerInterests[i].selected = true;
                }
            }
        }

        $scope.computeList();
    });
    $scope.publicationListCtrl = {};
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    $scope.loadSemaphore = false;
    $scope.emptyMessage = null;


    $scope.setFollowedMode = function (n) {
        if (n == null) {
            n = !$scope.followedMode;
        }
        if (accountService.getMyself() == null) {
            modalService.openLoginModal($scope.switchFollowedMode, n, '--.loginModal.help.followMode');
        }
        else {
            $scope.switchFollowedMode(n);
        }
    };

    $scope.switchFollowedMode = function (n) {

        if (n != null) {
            $scope.followedMode = n;
        }
        else {
            $scope.followedMode = !$scope.followedMode;
        }

        path();
    };


    //open registration modal
    $scope.customerRegistration = function () {
        modalService.openCustomerRegistrationModal();
    };

    //functions
    //search by interest
    $scope.searchByInterest = function (interest) {

        if (interest.selected == true) {
            interest.selected = false;
        }
        else {
            for (var i in $scope.customerInterests) {
                $scope.customerInterests[i].selected = false;
            }
            interest.selected = true;
        }
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        $scope.search();

        path();
    };

    //watch on change position
    $scope.$on('POSITION_CHANGED', function () {
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        $scope.search();
    });


    //watch in follow mode
    $scope.$watch('followedMode', function (o, n) {
        if (o != n) {
            $scope.currentPage = 0;
            $scope.allLoaded = false;
            $scope.search();
        }
    });

    $scope.$on('LOGOUT', function () {
        if ($scope.followedMode) {
            $scope.followedMode = false;
        }
    });

    //scrolling
    $(window).on('scroll', function () {
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if ($('.container-content').height() - scrollBottom < 200) {

            if ($scope.loadSemaphore == false) {
                $scope.currentPage = $scope.currentPage + 1;
                $scope.search();
            }
        }
    });


    var success = function (data, callbackEmptyResultFunction) {
        if ($scope.currentPage == 0) {
            $scope.publicationListCtrl.data = [];
        }
        $scope.loadSemaphore = false;
        $scope.publicationListCtrl.loading = false;
        if (data == null || data.length <= 5) {
            $scope.allLoaded = true;


            //if there is no result and this is the first page and there is a callbackFunction,
            //try something else
            if ($scope.currentPage == 0 && callbackEmptyResultFunction != null) {
                callbackEmptyResultFunction();
                if (data.length != 0) {
                    $scope.emptyMessage = 'moreBusiness';
                }
            }
        }
        for (var key in data) {
            $scope.publicationListCtrl.data.push(data[key]);
        }
    };

    var successBusiness = function (data) {
        $scope.businessListParam.data = data;
        $scope.businessListParam.loading = false;
    };


    //search function
    $scope.search = function () {
        if ($scope.allLoaded == false) {

            var interestSelected = null;
            for (var i in $scope.customerInterests) {
                if ($scope.customerInterests[i].selected) {
                    interestSelected = $scope.customerInterests[i];
                }
            }

            $scope.loadSemaphore = true;

            //if this is the first page that asked, remove other publication
            if ($scope.currentPage == 0) {
                $scope.publicationListCtrl.loading = true;
                $scope.emptyMessage = null;
                $scope.publicationListCtrl.data = [];
                $scope.businessListParam.data = [];
            }

            if ($scope.followedMode) {
                if (interestSelected != null) {
                    searchService.byFollowedAndInterest($scope.currentPage, interestSelected.id, function (data) {
                        success(data,
                            function () {
                                $scope.emptyMessage = 'followedWithInterest';
                                $scope.businessListParam.loading = true;
                                searchService.nearBusinessByInterest(interestSelected.id, function (data) {
                                    successBusiness(data);
                                });
                            });
                    });

                }
                else {
                    searchService.byFollowed($scope.currentPage, function (data) {
                        success(data,
                            function () {
                                $scope.emptyMessage = 'followed';
                                $scope.businessListParam.loading = true;
                                searchService.nearBusiness(function (data) {
                                    successBusiness(data);
                                });
                            });
                    });
                }
            }
            else {
                if (interestSelected != null) {
                    searchService.byInterest($scope.currentPage, interestSelected.id, function (data) {
                        success(data,
                            function () {
                                $scope.emptyMessage = 'newsFeedWithInterest';
                                $scope.businessListParam.loading = true;
                                searchService.nearBusinessByInterest(interestSelected.id, function (data) {
                                    successBusiness(data);
                                });
                            });
                    });

                }
                else {
                    searchService.default($scope.currentPage, function (data) {
                        success(data,
                            function () {
                                $scope.emptyMessage = 'newsFeed';
                                $scope.businessListParam.loading = true;
                                searchService.nearBusiness(function (data) {
                                    successBusiness(data);
                                });
                            });
                    });
                }
            }
        }
    };

    $scope.createNewAddress = function () {
        if (accountService.getMyself() != null) {
            $scope.createNewAddressLaunch();
        }
        else {
            modalService.openLoginModal($scope.createNewAddressLaunch, null, '--.loginModal.help.address');
        }
    };

    $scope.createNewAddressLaunch = function () {
        modalService.addressModal(true, null, false, function (data) {
            $timeout(function () {
                addressService.changeAddress(data.name, function (data) {
                    accountService.getMyself().selectedAddress = data;
                    $timeout(function () {
                        $rootScope.$broadcast("CHANGE_ADDRESS_SELECTED");
                    }, 1);
                });
            }, 1);
        });
    };


    //initialize
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    $scope.search();

});