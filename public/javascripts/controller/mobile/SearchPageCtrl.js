myApp.controller('SearchPageCtrl', function ($rootScope,$scope, searchService, $routeParams, searchBarService,geolocationService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    var param = $routeParams.param;
    searchBarService.setCurrentSearch(param);

    $scope.businessTab = {};
    $scope.categoryTab = {};
    $scope.publicationTab = {};

    $scope.results = null;

    $scope.publicationParams = {};
    $scope.businessParams = {};


    $scope.search = function () {
        searchService.searchByString(0,param, function (result) {


            var selectedCounter = 0;
            for (var i in searchBarService.searchCriteria) {
                if (searchBarService.searchCriteria[i].selected) {
                    if (searchBarService.searchCriteria[i].key == 'business') {
                        $scope.businessTab.display = true;
                    }
                    else if (searchBarService.searchCriteria[i].key == 'category') {
                        $scope.categoryTab.display = true;
                    }
                    else if (searchBarService.searchCriteria[i].key == 'publication') {
                        $scope.publicationTab.display = true;
                    }
                    selectedCounter++;
                }
            }
            if (selectedCounter == 0) {
                $scope.businessTab.display = true;
                $scope.categoryTab.display = true;
                $scope.publicationTab.display = true;
            }

            $scope.results = result;

            //compute tabs
            var alreadyOneTabActive = false;
            if ($scope.businessTab.display) {
                $scope.businessTab.total = $scope.results.businesses.length;
                if ($scope.results.businesses.length == 20) {
                    $scope.businessTab.total += "+";
                }
                if (!alreadyOneTabActive && $scope.businessTab.total > 0) {
                    $scope.businessTab.active = true;
                    alreadyOneTabActive = true;
                }
            }
            if ($scope.publicationTab.display) {
                $scope.publicationTab.total = $scope.results.publications.length;
                if ($scope.results.publications.length == 20) {
                    $scope.publicationTab.total += "+";
                }
                if (!alreadyOneTabActive && $scope.publicationTab.total > 0) {
                    $scope.publicationTab.active = true;
                    alreadyOneTabActive = true;
                }
            }
            if ($scope.categoryTab.display) {
                $scope.categoryTab.total = $scope.results.categoriesMap.length;
                if ($scope.categoryTab.total >= 20) {
                    $scope.categoryTab.total += "+";
                }
                if (!alreadyOneTabActive && $scope.categoryTab.total > 0) {
                    $scope.categoryTab.active = true;
                    alreadyOneTabActive = true;
                }
            }


            //business
            $scope.businessParams.data = $scope.results.businesses;
            $scope.businessParams.loading = false;

            //publication
            $scope.publicationParams.data = $scope.results.publications;
            $scope.publicationParams.loading = false;


        });
    };

    if (geolocationService.position != null) {
        $scope.search();
    }

    $scope.$on('POSITION_CHANGED', function () {
        $scope.search();
    });
});