myApp.controller('WelcomeCtrl', function ($scope, languageService, $location, accountService, facebookService, modalService, $timeout, searchService, searchBarService) {


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
        console.log(accountService.getMyself());
        if (accountService.getMyself().facebookAccount) {
            facebookService.logout();
        }
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

});