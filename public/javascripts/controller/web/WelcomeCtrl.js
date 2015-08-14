myApp.controller('WelcomeCtrl', function ($scope, languageService, $location, accountService, facebookService, modalService, $timeout, searchService, searchBarService, geolocationService, addressService, $rootScope) {


    $scope.advancedSearch = false;

    $scope.displayAdvancedSearch = function () {
        $scope.advancedSearch = !$scope.advancedSearch;
    };

    $scope.searchBarService = searchBarService;

    $scope.searchResultParam = {
        display: false,
        cleanSearch: function () {
            searchBarService.currentSearch = "";
        }
    };

    $scope.$watch('searchBarService.currentSearch', function (o, n) {
        if (searchBarService.displaySearchResult && o != n && searchBarService.currentSearch != "" && searchBarService.currentSearch.length >= 2) {
            var searchS = angular.copy(searchBarService.currentSearch);
            $timeout(function () {
                if (searchS == searchBarService.currentSearch) {

                    if ((searchBarService.currentSearch.indexOf(":") != -1 && searchBarService.currentSearch.split(":")[1].length > 0) ||
                        (searchBarService.currentSearch.indexOf(":") == -1 && searchBarService.currentSearch.length > 0)) {
                        searchService.searchByStringLittle(searchBarService.currentSearch, function (result) {
                            $scope.searchResultParam.result = result;
                            $scope.searchResultParam.display = true;
                        });
                    }
                }
            }, 500);
        }
    });


    $scope.search = function () {
    };

    //use the model
    $scope.myself = accountService.getMyself();
    $scope.accountService = accountService;


    //login open modal
    $scope.login = function () {
        modalService.openLoginModal();
    };

    //registration open modal
    $scope.registration = function () {
        modalService.openCustomerRegistrationModal();
    };

    //edit profile
    $scope.editProfile = function () {
        modalService.openEditProfileModal();

    };

    //log out
    $scope.logout = function () {
        if (facebookService.isConnected()) {
            facebookService.logout();
        }
        $scope.$broadcast('LOGOUT');
        accountService.logout(function () {
            $location.path('/');
        });
    };

    //
    // change lang
    //
    $scope.$watch('lang', function () {
        if (!angular.isUndefined($scope.lang)) {
            languageService.changeLanguage($scope.lang);
        }
    });

    $scope.languageService = languageService;


    $scope.positions = [
        {key: 'currentPosition', translation: '--.position.current'}
    ];

    $scope.currentPositionText = 'currentPosition';

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

    $rootScope.$watch(function () {
        return accountService.model.myself;
    }, function watchCallback(n, o) {
        completePositions();
    }, true);


});