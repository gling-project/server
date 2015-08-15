myApp.controller('HomeCtrl', function ($scope,geolocationService,searchService,customerInterestService,$timeout,accountService,addressService,$rootScope) {


    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;
    });


    //search function
    $scope.publicationListCtrl = {};
    $scope.search = function () {
        if (geolocationService.position != null) {

            var interestSelected = null;
            for (var i in $scope.customerInterests) {
                if ($scope.customerInterests[i].selected) {
                    interestSelected = $scope.customerInterests[i];
                }
            }

            $scope.publicationListCtrl.loading = true;
            if ($scope.followedMode) {
                if (interestSelected != null) {
                    searchService.byFollowedAndInterest(interestSelected.id,function (data) {
                        $scope.publicationListCtrl.loading = false;
                        $scope.publicationListCtrl.data = data;
                    });

                }
                else {
                    searchService.byFollowed(function (data) {
                        $scope.publicationListCtrl.loading = false;
                        $scope.publicationListCtrl.data = data;
                    });
                }
            }
            else {
                if (interestSelected != null) {
                    searchService.byInterest(interestSelected.id, function (data) {
                        $scope.publicationListCtrl.loading = false;
                        $scope.publicationListCtrl.data = data;
                    });

                }
                else {
                    searchService.default(function (data) {
                        $scope.publicationListCtrl.loading = false;
                        $scope.publicationListCtrl.data = data;
                    });
                }
            }
        }
    };



    //position
    $scope.positions = [
        {key: 'currentPosition', translation: '--.position.current'}
    ];

    $scope.currentPositionText = 'currentPosition';

    $scope.selectPosition = function (position) {
        $scope.currentPosition = position;
    };

    $timeout(function () {
        completePositions();

        $scope.$watch('currentPosition', function (o, n) {
            if (n != null && o != n) {
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
        });

        $rootScope.$watch(function () {
            return accountService.model.myself;
        }, function watchCallback(newValue, oldValue) {
            completePositions();
        });

    }, 1);

    var completePositions = function () {
        $scope.positions = [
            {key: 'currentPosition', translation: '--.position.current'}
        ];
        if (accountService.getMyself() != null) {
            for (var key in accountService.getMyself().addresses) {
                $scope.positions.push(
                    {
                        key: accountService.getMyself().addresses[key].name,
                        translation: accountService.getMyself().addresses[key].name
                    });
            }
        }
        $scope.currentPosition = geolocationService.getLocationText();
    };



});