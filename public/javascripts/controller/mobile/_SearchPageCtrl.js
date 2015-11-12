myApp.controller('SearchPageCtrl', function ($rootScope, $scope, searchService, $routeParams, searchBarService, geolocationService, modalService) {

    //back to the top of the page
    $(window).scrollTop(0);

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    var param = $routeParams.param;
    searchBarService.setCurrentSearch(param);

    $scope.businessTab = {currentPage: 0};
    $scope.categoryTab = {currentPage: 0};
    $scope.publicationTab = {currentPage: 0};

    $scope.results = null;

    //$scope.publicationParams = {};
    //$scope.businessParams = {};


    $scope.search = function () {
        searchService.searchByString(0, param, function (result) {

            modalService.closeLoadingModal();

            //compute witch tab must be displayed
            $scope.businessTab.display = false;
            $scope.categoryTab.display = false;
            $scope.publicationTab.display = false;

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
                if (!alreadyOneTabActive && $scope.businessTab.total > 0) {
                    $scope.businessTab.active = true;
                    alreadyOneTabActive = true;
                }
                $scope.businessTab.totalToDisplay = $scope.businessTab.total;
                if ($scope.results.businesses.length == 20) {
                    $scope.businessTab.totalToDisplay += "+";
                }
            }
            if ($scope.publicationTab.display) {
                $scope.publicationTab.total = $scope.results.publications.length;

                if (!alreadyOneTabActive && $scope.publicationTab.total > 0) {
                    $scope.publicationTab.active = true;
                    alreadyOneTabActive = true;
                }
                $scope.publicationTab.totalToDisplay = $scope.publicationTab.total;
                if ($scope.results.publications.length == 20) {
                    $scope.publicationTab.totalToDisplay += "+";
                }

            }

            if ($scope.categoryTab.display) {
                $scope.categoryTab.total = 0;
                for (var cat in $scope.results.categoriesMap) {
                    for (var cat2 in $scope.results.categoriesMap[cat]) {
                        for (var cat3 in $scope.results.categoriesMap[cat][cat2]) {
                            $scope.categoryTab.total += $scope.results.categoriesMap[cat][cat2][cat3].length;
                            if ($scope.results.categoriesMap[cat][cat2][cat3].length == 20) {
                                $scope.categoryTab.loadCategory = true;
                            }
                        }
                    }
                }
                if (!alreadyOneTabActive && $scope.categoryTab.total > 0) {
                    $scope.categoryTab.active = true;
                    alreadyOneTabActive = true;
                }
                $scope.categoryTab.totalToDisplay = $scope.categoryTab.total;
                if ($scope.categoryTab.total >= 20) {
                    $scope.categoryTab.totalToDisplay += "+";
                }
            }


            //business
            $scope.businessTab.data = $scope.results.businesses;
            //$scope.businessParams.loading = false;

            //publication
            $scope.publicationTab.data = $scope.results.publications;
            //$scope.publicationParams.data = $scope.results.publications;
            //$scope.publicationParams.loading = false;

            //category
            $scope.categoryTab.data = $scope.results.categoriesMap;

            $scope.loadSemaphore = false;

            //scrolling
            $(window).on('scroll', function () {
                var scrollBottom = $(window).scrollTop() + $(window).height();
                if ($('.container-content').height() - scrollBottom < 200) {

                    $scope.search();
                }
            });

            $scope.search = function () {

                if ($scope.loadSemaphore == false) {
                    $scope.loadSemaphore = true;

                    var tabToLoad;

                    if ($scope.businessTab.active) {
                        tabToLoad = $scope.businessTab;
                        console.log('business load more...');
                    }
                    else if ($scope.publicationTab.active) {
                        tabToLoad = $scope.publicationTab;
                        console.log('business load more...');
                    }
                    else if ($scope.categoryTab.active) {
                        tabToLoad = $scope.categoryTab;
                        console.log('business load more...');
                    }


                    if (tabToLoad.total == 20 && tabToLoad.allLoaded != true) {
                        //if (tabToLoad.currentPage == 0) {
                        //    tabToLoad.data = [];
                        //}


                        var s = searchBarService.currentSearch;
                        if (s.indexOf(':') != -1) {
                            s = s.split(':')[1];
                        }
                        tabToLoad.currentPage++;

                        if ($scope.businessTab.active) {
                            s = 'business:' + s;
                            searchService.searchByString(tabToLoad.currentPage, s, function (data) {
                                $scope.loadSemaphore = false;
                                if (data.businesses.length == 0) {
                                    tabToLoad.allLoaded = true;
                                }
                                else {
                                    for (var key in data.businesses) {
                                        tabToLoad.data.push(data.businesses[key])
                                    }
                                }
                            });
                        }
                        else if ($scope.publicationTab.active) {
                            s = 'publication:' + s;
                            searchService.searchByString(tabToLoad.currentPage, s, function (data) {
                                $scope.loadSemaphore = false;
                                if (data.publications.length == 0) {
                                    tabToLoad.allLoaded = true;
                                }
                                else {
                                    for (var key in data.publications) {
                                        tabToLoad.data.push(data.publications[key])
                                    }
                                }
                            });
                        }
                        else if ($scope.categoryTab.active && $scope.categoryTab.loadCategory === true) {
                            s = 'category:' + s;
                            searchService.searchByString(tabToLoad.currentPage, s, function (data) {
                                $scope.loadSemaphore = false;
                                var total = $scope.fusionCategories(data.categoriesMap);
                                if (total == 0) {
                                    tabToLoad.allLoaded = true;
                                }
                            });
                        }

                    }
                }

            };


        });
    };

    $scope.fusionCategories = function (newMap) {

        var totalToAdd = 0;

        for (var newCat in newMap) {
            var catFounded = false;
            for (var cat in $scope.results.categoriesMap) {
                if (cat == newCat) {
                    catFounded = true;
                    break;
                }
            }

            if (!catFounded) {
                $scope.results.categoriesMap.newCat = newMap[newCat];
            }
            else {
                for (var newSCat in newMap[newCat]) {
                    var sCatFounded = false;
                    for (var sCat in $scope.results.categoriesMap[newCat]) {
                        if (sCat == newSCat) {
                            sCatFounded = true;
                            break;
                        }
                    }

                    if (!sCatFounded) {
                        $scope.results.categoriesMap[newCat].newSCat = newMap[newCat][newSCat];
                    }
                    else {
                        for (var newSSCat in newMap[newCat][newSCat]) {
                            var ssCatFounded = false;
                            for (var ssCat in $scope.results.categoriesMap[newCat][newSCat]) {
                                if (ssCat == newSSCat) {
                                    ssCatFounded = true;
                                    break;
                                }
                            }

                            if (!ssCatFounded) {
                                $scope.results.categoriesMap[newCat][newSCat].newSSCat = newMap[newCat][newSCat][newSSCat];
                            }
                            else {
                                for (var b in newMap[newCat][newSCat][newSSCat]) {
                                    $scope.results.categoriesMap[newCat][newSCat][newSSCat].push(newMap[newCat][newSCat][newSSCat][b]);
                                    totalToAdd++;
                                }
                            }
                        }
                    }
                }
            }
        }
        return totalToAdd;
    };

    //initilization
    $scope.search();

    $scope.$on('POSITION_CHANGED', function () {
        $scope.search();
    });
});