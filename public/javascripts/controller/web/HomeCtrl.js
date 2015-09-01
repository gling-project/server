myApp.controller('HomeCtrl', function ($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService, $timeout, addressService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    //variable
    $scope.followedMode = false;
    $scope.businessInfoParam = {};
    $scope.accountService = accountService.model;
    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;
    });
    $scope.publicationListCtrl = {};
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    $scope.loadSemaphore = false;

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
    };

    //watch on change position
    $scope.$on('POSITION_CHANGED', function () {
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        $scope.search();
    });

    //watch in follow mode
    $scope.$watch('followedMode', function () {
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        $scope.search();
    });

    $scope.$on('LOGOUT', function () {
        if ($scope.followedMode) {
            $scope.followedMode = false;
        }
    });

    //scrolling
    $('.main-body').on('scroll', function () {
        var scrollBottom = $('.main-body').scrollTop() + $('.main-body').height();
        if ($('.global-content-container').height() - scrollBottom < 200) {
            $scope.currentPage = $scope.currentPage + 1;
            $scope.search();
        }
    });


    var success = function(data){
        $scope.loadSemaphore=false;
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
            else {
                if($scope.loadSemaphore){
                    return;
                }
                $scope.loadSemaphore = true;
            }

            if ($scope.followedMode) {
                if (interestSelected != null) {
                    searchService.byFollowedAndInterest($scope.currentPage,interestSelected.id, function (data) {
                        success(data);
                    });

                }
                else {
                    searchService.byFollowed($scope.currentPage,function (data) {
                        success(data);
                    });
                }
            }
            else {
                if (interestSelected != null) {
                    searchService.byInterest($scope.currentPage,interestSelected.id, function (data) {
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

});