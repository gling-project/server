myApp.directive('searchBarCtrl', function ($rootScope, businessService, geolocationService, directiveService,  searchService,searchBarService,$timeout,$location,modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/component/searchBar/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.advancedSearch = false;

                    scope.displayAdvancedSearch = function () {
                        scope.advancedSearch = !scope.advancedSearch;
                        $rootScope.$broadcast('DISPLAY_ADVANCED_SEARCH',{display:scope.advancedSearch});
                    };

                    scope.searchBarService = searchBarService;

                    scope.searchResultParam = {
                        mobile:scope.getInfo().mobile,
                        display: false,
                        cleanSearch: function () {
                            searchBarService.currentSearch = "";
                        }
                    };

                    scope.$watch('searchBarService.currentSearch', function (o, n) {

                        if (searchBarService.displaySearchResult && o != n && searchBarService.currentSearch != "" && searchBarService.currentSearch.length >= 2) {
                            var searchS = angular.copy(searchBarService.currentSearch);

                            scope.searchResultParam.waitingBeforeStartSearch=true;

                            $timeout(function () {
                                if (scope.searchResultParam.waitingBeforeStartSearch && searchS == searchBarService.currentSearch) {



                                    if ((searchBarService.currentSearch.indexOf(":") != -1 && searchBarService.currentSearch.split(":")[1].length > 0) ||
                                        (searchBarService.currentSearch.indexOf(":") == -1 && searchBarService.currentSearch.length > 0)) {


                                        scope.searchResultParam.promise = searchService.searchByStringLittle(searchBarService.currentSearch, function (result) {
                                            scope.searchResultParam.result = result;
                                            scope.searchResultParam.display = true;
                                        });
                                    }
                                }
                            }, 500);
                        }
                    });


                    scope.search = function () {
                        scope.searchResultParam.waitingBeforeStartSearch = false;
                        scope.navigateTo('search/' + searchBarService.currentSearch);
                    };

                    scope.navigateTo = function (target) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        modalService.openLoadingModal();
                        $rootScope.$broadcast('SEARCH_CLEAN');
                        $timeout(function(){
                            $location.path(target);
                        },1);
                    };
                    
                }
            }
        }
    }
});