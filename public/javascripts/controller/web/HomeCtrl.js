myApp.controller('HomeCtrl', function ($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService, $window) {

    //back to the top of the page
    $(window).scrollTop(0);

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.computeList = function () {
        $scope.interestDisplayed = $scope.customerInterests.slice($scope.interestDisplayFirst, $scope.interestDisplayMax + $scope.interestDisplayFirst);
    };

    //variable
    $scope.followedMode = false;
    $scope.businessInfoParam = {};
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


    var success = function (data) {
        if ($scope.currentPage == 0) {
            $scope.publicationListCtrl.data = [];
        }
        $scope.loadSemaphore = false;
        $scope.publicationListCtrl.loading = false;
        if (data == null || data.length == 0) {
            $scope.allLoaded = true;
        }
        else {
            for (var key in data) {
                $scope.publicationListCtrl.data.push(data[key])
            }
        }
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
                $scope.publicationListCtrl.data = [];
            }

            if ($scope.followedMode) {
                if (interestSelected != null) {
                    searchService.byFollowedAndInterest($scope.currentPage, interestSelected.id, function (data) {
                        success(data);
                    });

                }
                else {
                    searchService.byFollowed($scope.currentPage, function (data) {
                        success(data);
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

    //initialize
    if (geolocationService.position != null) {
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        console.log('---- search after INITIALIZE');
        $scope.search();
    }

});