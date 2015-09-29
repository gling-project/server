myApp.controller('MenuCtrl', function ($rootScope, $scope, facebookService, accountService, $location, $timeout, geolocationService, modalService, addressService) {



    //mobile menu
    //default the menu to not show
    $scope.showmenu = false;

    //this is the toggle function
    $scope.$on('toggleMenu', function () {
        console.log('je suis toggleMenu')
        $scope.showmenu = ($scope.showmenu) ? false : true;
    });

    $scope.navigateTo = function (target) {
        $scope.showmenu=false;
        $location.path(target);
    };


    $scope.logout = function () {
        if (facebookService.isConnected()) {
            facebookService.logout();
        }
        $scope.$broadcast('LOGOUT');
        accountService.logout(function () {
            $location.path('/');
        });
    };

    $scope.currentPosition = null;
    $scope.positionBasicData = [
        {key: 'currentPosition', translation: '--.position.current'},
        {key: 'createNewAddress', translation: '--.position.newAddress'}
    ];

    $scope.positions = angular.copy($scope.positionBasicData);

    $scope.currentPositionText = 'currentPosition';

    //$scope.$broadcast('CHANGE_ADDRESS',{address:data});

    $rootScope.$on('CHANGE_ADDRESS', function (data) {
        $scope.currentPosition = data.address.name;
    });

    $scope.createNewAddress = function (o) {
        $scope.currentPosition = o;
        modalService.addressModal(true, null, false, function (data) {
            $timeout(function () {
                $scope.currentPosition = data.name;
            }, 1);
        });
    };

    $rootScope.$on("CHANGE_ADDRESS_SELECTED", function () {
        if (accountService.getMyself().selectedAddress == null) {
            $scope.currentPosition = 'currentPosition';
            return;
        }
        $scope.currentPosition = accountService.getMyself().selectedAddress.name;
    });

    $timeout(function () {
        completePositions();

        $scope.$watch('currentPosition', function (n, o) {
            if (n != null && o != n) {
                if ($scope.currentPosition == 'createNewAddress') {
                    if (accountService.getMyself(o) != null) {
                        $scope.createNewAddress();
                    }
                    else {
                        modalService.openLoginModal($scope.createNewAddress, o, '--.loginModal.help.address');
                    }
                }
                if ($scope.currentPosition != $scope.positionCurrenltyComputed) {
                    $scope.positionCurrenltyComputed = $scope.currentPosition;
                    addressService.changeAddress($scope.currentPosition, function (result) {

                        if (accountService.getMyself() != null) {
                            if (result.__type.indexOf('AddressDTO') == -1) {
                                accountService.getMyself().selectedAddress = null;
                            }
                            else {
                                accountService.getMyself().selectedAddress = result;
                            }
                        }
                        $timeout(function () {
                            $rootScope.$broadcast('POSITION_CHANGED');
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
        $scope.positions = angular.copy($scope.positionBasicData);
        if (accountService.getMyself() != null) {
            for (var key in accountService.getMyself().addresses) {
                $scope.positions.splice($scope.positions.length - 1, 0,
                    {
                        key: accountService.getMyself().addresses[key].name,
                        translation: accountService.getMyself().addresses[key].name
                    });
            }
        }
        $scope.currentPosition = geolocationService.getLocationText();
        $scope.showmenu=false;
    };

    $rootScope.$watch(function () {
        return accountService.model.myself;
    }, function watchCallback(n, o) {
        completePositions();
    }, true);


});