myApp.controller('SearchPageCtrl', function ($scope, searchService, $routeParams, searchBarService) {

    var param = $routeParams.param;
    searchBarService.setCurrentSearch(param);

    $scope.businessTab = {};
    $scope.categoryTab = {};
    $scope.publicationTab = {};

    $scope.results = null;

    $scope.publicationParams={};
    $scope.businessParams={};



    searchService.searchByString(param, function (result) {


        var selectedCounter = 0;
        for (var i in searchBarService.searchCriteria) {
            if (searchBarService.searchCriteria[i].selected) {
                if (searchBarService.searchCriteria[i].key == 'business') {
                    $scope.businessTab.display = true;
                    if (selectedCounter == 0) {
                        $scope.businessTab.active = true;
                    }
                }
                else if (searchBarService.searchCriteria[i].key == 'category') {
                    $scope.categoryTab.display = true;
                    if (selectedCounter == 0) {
                        $scope.categoryTab.active = true;
                    }
                }
                else if (searchBarService.searchCriteria[i].key == 'publication') {
                    $scope.publicationTab.display = true;
                    if (selectedCounter == 0) {
                        $scope.publicationTab.active = true;
                    }
                }
                selectedCounter++;
            }
        }


        console.log(result);
        $scope.results = result;

        //business
        $scope.businessParams.data = $scope.results.businesses;
        $scope.businessParams.loading=false;

        //publication
        $scope.publicationParams.data = $scope.results.publications;
        $scope.publicationParams.loading=false;

        if (selectedCounter == 0) {
            $scope.displayBusiness = true;
            $scope.businessTab.display = true;
            $scope.categoryTab.display = true;
            $scope.publicationTab.display = true;
        }
    });
});