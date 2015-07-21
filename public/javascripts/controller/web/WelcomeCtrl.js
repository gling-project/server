myApp.controller('WelcomeCtrl', function ($scope, languageService, $location, accountService, facebookService, modalService, $timeout, searchService) {


    $scope.advancedSearch = false;

    $scope.displayAdvancedSearch = function () {
        $scope.advancedSearch = !$scope.advancedSearch;
    };


    $scope.searchCriteria = data.searchCriterias;

    $scope.$watch('searchCriteria', function () {
        $scope.searchText = "";
        var first = true;
        for (var key in $scope.searchCriteria) {
            if ($scope.searchCriteria[key].selected === true) {
                if (first) {
                    first = false;
                }
                else {
                    $scope.searchText += "|";
                }
                $scope.searchText += $scope.searchCriteria[key].key;
            }
        }
        if (!first) {
            $scope.searchText += ":";
            $(".search-bar").focus();
        }

    }, true);

    $scope.searchResultParam = {
        display: false,
        cleanSearch: function () {
            $scope.searchText = "";
        }
    };

    $scope.$watch('searchText', function (o, n) {
        if (o != n && $scope.searchText != "" && $scope.searchText.length >= 2) {
            var searchS = angular.copy($scope.searchText);
            $timeout(function () {
                if (searchS == $scope.searchText) {
                    console.log($scope.searchText.indexOf(":"));
                    console.log($scope.searchText);

                    if (($scope.searchText.indexOf(":") != -1 && $scope.searchText.split(":")[1].length > 0) ||
                        ($scope.searchText.indexOf(":") == -1 && $scope.searchText.length > 0)) {
                        searchService.searchByStringLittle($scope.searchText, function (result) {
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
        facebookService.logout();
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