myApp.controller('HomeCtrl', function ($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService, $timeout, addressService) {

    //back to the top of the page
    $(window).scrollTop(0);

    $rootScope.$broadcast('PROGRESS_BAR_STOP');


    $scope.displaySharePositionAdvertissement = function () {
        return geolocationService.sharePosition == false && (accountService.getMyself()==null || accountService.getMyself().selectedAddress == null);
    };
    $rootScope.$watch(function () {
        return geolocationService.sharePosition;
    }, function (n) {
        $scope.sharePosition = n;
    });

    $scope.computeList = function () {
        $scope.interestDisplayed = $scope.customerInterests.slice($scope.interestDisplayFirst, $scope.interestDisplayMax + $scope.interestDisplayFirst);
    };

    //variable
    $scope.followedMode = false;
    $scope.businessInfoParam = {};
    $scope.businessListParam = {data: []};
    $scope.accountService = accountService.model;
    $scope.interestDisplayed = [];
    $scope.interestDisplayFirst = 0;
    $scope.interestDisplayMax = 12;
    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;

        $scope.computeList();
    });
    $scope.publicationListCtrl = {};
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    $scope.loadSemaphore = false;
    $scope.displayEmptyHelpMessage = false;
    $scope.displayEmptyHelpMessageWithInterest = false;


    //selection mode
    $scope.left = function () {
        if ($scope.interestDisplayFirst > 0) {
            $scope.interestDisplayFirst--;
            $scope.computeList();
        }
    };

    $scope.right = function () {
        if ($scope.interestDisplayFirst < $scope.customerInterests.length - $scope.interestDisplayMax) {
            $scope.interestDisplayFirst++;
            $scope.computeList();
        }
    };

    $scope.setFollowedMode = function (n) {
        if (n == null) {
            n = !$scope.followedMode;
        }
        if (accountService.getMyself() == null) {
            modalService.openLoginModal($scope.switchFollowedMode, n);
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
        console.log('---- search after searchByInterest');
        $scope.search();
    };

    //watch on change position
    $scope.$on('POSITION_CHANGED', function () {
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        console.log('---- search after POSITION_CHANGED');
        $scope.search();
    });


    //watch in follow mode
    $scope.$watch('followedMode', function (o, n) {
        if (o != n) {
            $scope.currentPage = 0;
            $scope.allLoaded = false;
            console.log('---- search after followedMode');
            $scope.search();
        }
    });

    $scope.$on('LOGOUT', function () {
        console.log('logout');
        if ($scope.followedMode) {
            $scope.followedMode = false;
        }
    });

    //scrolling
    $(window).on('scroll', function () {
        var scrollBottom = $(window).scrollTop() + $(window).height();
        if ($('.container-content').height() - scrollBottom < 200) {

            if ($scope.loadSemaphore == false) {
                $scope.loadSemaphore = true;
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
        if (data == null || data.length == 0) {
            $scope.allLoaded = true;

            //if there is no result and this is the first page and there is a callbackFunction,
            //try something else
            if ($scope.currentPage == 0 && callbackEmptyResultFunction != null) {
                callbackEmptyResultFunction();
            }
        }
        else {
            for (var key in data) {
                $scope.publicationListCtrl.data.push(data[key])
            }
        }
    };

    var successBusiness = function (data) {
        $scope.businessListParam.data = data;
        $scope.businessListParam.loading = false;
    };


    //search function
    $scope.search = function () {
        if (geolocationService.position != null && $scope.allLoaded == false) {

            var interestSelected = null;
            for (var i in $scope.customerInterests) {
                if ($scope.customerInterests[i].selected) {
                    interestSelected = $scope.customerInterests[i];
                }
            }


            //if this is the first page that asked, remove other publication
            if ($scope.currentPage == 0) {
                $scope.publicationListCtrl.loading = true;
                $scope.displayEmptyHelpMessage = false;
                $scope.displayEmptyHelpMessageWithInterest = false;
                $scope.publicationListCtrl.data = [];
                $scope.businessListParam.data = [];
            }

            if ($scope.followedMode) {
                if (interestSelected != null) {
                    searchService.byFollowedAndInterest($scope.currentPage, interestSelected.id, function (data) {
                        success(data,
                            function () {
                                $scope.displayEmptyHelpMessageWithInterest = true;
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
                                $scope.displayEmptyHelpMessage = true;
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
                        success(data);
                    });

                }
                else {
                    searchService.default($scope.currentPage, function (data) {
                        success(data);
                    });
                }
            }
        }
    };

    $scope.createNewAddress = function () {
        console.log('CREATE NEW ADDRESS');
        if (accountService.getMyself() != null) {
            $scope.createNewAddressLaunch();
        }
        else {
            modalService.openLoginModal($scope.createNewAddressLaunch);
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
    if (geolocationService.position != null) {
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        console.log('---- search after INITIALIZE');
        $scope.search();
    }

});