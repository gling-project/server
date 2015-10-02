myApp.controller('HomeCtrl', function ($scope, geolocationService, searchService, customerInterestService, $timeout, accountService, addressService, $rootScope,followService,modalService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');
    modalService.closeLoadingModal();

    $scope.displayMask = true;


    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;
    });

    $scope.$on('DISPLAY_ADVANCED_SEARCH',function(event,params){
        $scope.advancedSearch = params.display;
    });

    //search function
    $scope.publicationListCtrl = {};
    $scope.currentPage = 0;
    $scope.allLoaded = false;
    $scope.loadSemaphore = false;

    //scrolling
    $('.scrollable-content-body').on('scroll', function () {
        var scrollBottom = $('.scrollable-content-body').scrollTop() + $('.scrollable-content-body').height();
        if ($('.scrollable-content-inner').height() - scrollBottom < 200) {

            if ($scope.loadSemaphore == false) {
                $scope.loadSemaphore = true;
                $scope.currentPage = $scope.currentPage + 1;
                $scope.search();
            }
        }
    });

    var success = function (data) {
        if($scope.currentPage==0){
            $scope.publicationListCtrl.data=[];
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
        console.log('SERACH AFTER searchByInterest ');
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        $scope.search();
    };

    //watch on change position
    $scope.$on('POSITION_CHANGED', function () {
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        console.log('SERACH AFTER POSITION_CHANGED');
        $scope.search();
    });

    //watch in follow mode
    $scope.$watch('followedMode', function (o,n) {
        console.log("xatch followedMode")
        if(o!=n) {
            $scope.currentPage = 0;
            $scope.allLoaded = false;
            console.log('SERACH AFTER followedMode');
            $scope.search();
        }
    });

    $scope.positionBasicData =[
        {key: 'currentPosition', translation: '--.position.current'},
        {key: 'createNewAddress', translation: '--.position.newAddress'}
    ];

    //position
    $scope.positions =angular.copy($scope.positionBasicData);

    $scope.currentPositionText = 'currentPosition';

    $scope.selectPosition = function (position) {
        $scope.currentPosition = position;
        $scope.displayPositionDetails = false;
    };

    $timeout(function () {
        completePositions();

        $scope.$watch('currentPosition', function (n, o) {
            if (n != null && o != n) {
                if($scope.currentPosition == 'createNewAddress'){
                    $scope.currentPosition=o;
                    modalService.addressModal(true,null,false,function(data){
                        $timeout(function () {
                            $scope.currentPosition = data.name;
                        },1);
                    });
                }
                else if($scope.currentPosition != $scope.positionCurrenltyComputed) {
                    $scope.positionCurrenltyComputed = $scope.currentPosition;
                    addressService.changeAddress($scope.currentPosition, function (result) {

                        if (result.__type.indexOf('AddressDTO') == -1) {
                            accountService.getMyself().selectedAddress = null;
                        }
                        else {
                            accountService.getMyself().selectedAddress = result;
                        }
                        $timeout(function () {
                            $scope.$broadcast('POSITION_CHANGED');
                        }, 1);
                    });
                }
            }
        });

        $rootScope.$watch(function () {
            return accountService.model.myself;
        }, function watchCallback(newValue, oldValue) {
            completePositions();
        });

    }, 1);

    var completePositions = function () {
        $scope.positions =angular.copy($scope.positionBasicData);
        if (accountService.getMyself() != null) {
            for (var key in accountService.getMyself().addresses) {
                $scope.positions.splice($scope.positions.length - 1 ,0,
                    {
                        key: accountService.getMyself().addresses[key].name,
                        translation: accountService.getMyself().addresses[key].name
                    });
            }
        }
        $scope.currentPosition = geolocationService.getLocationText();
        $scope.positionCurrenltyComputed=$scope.currentPosition;
    };
    //initialisation
    completePositions();

    //position panel
    $scope.displayPositionDetails = false;
    $scope.openPositionDetails = function () {
        $scope.displayPositionDetails = !$scope.displayPositionDetails;
    };

    //favoriteBusiness
    $scope.displayFavoriteBusiness = false;
    $scope.openFavoriteBusiness = function () {
        $scope.displayFavoriteBusiness = !$scope.displayFavoriteBusiness;
    };

    var refreshFollowList = function() {
        followService.getFollows(function (list) {
            $scope.follows = list;
        });
    };
    refreshFollowList();


    //mask
    $scope.$watch('displayPositionDetails', function () {
        $scope.displayMask = $scope.displayPositionDetails || $scope.displayFavoriteBusiness;
        $scope.displayFavoriteBusiness=false;

    });
    $scope.$watch('displayFavoriteBusiness', function () {
        $scope.displayMask = $scope.displayPositionDetails || $scope.displayFavoriteBusiness;
        $scope.displayPositionDetails=false;
    });




    $scope.search = function () {

        console.log('search : '+$scope.currentPage);

        if (geolocationService.position != null) {

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
                    searchService.default($scope.currentPage,function (data) {
                        success(data);
                    });
                }
            }
        }
    };



    //initialize
    if(geolocationService.position!=null){
        $scope.currentPage = 0;
        $scope.allLoaded = false;
        console.log('---- search after INITIALIZE');
        $scope.search();
    }


});