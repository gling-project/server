myApp.directive('searchBarCtrl', function($rootScope, businessService, geolocationService, directiveService, searchService, searchBarService, $timeout, $location, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/searchBar/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.advancedSearch = false;
          scope.searchBarService = searchBarService;
          scope.searchResultParam = {
            mobile: scope.getInfo().mobile,
            display: false,
            cleanSearch: function() {
              return searchBarService.currentSearch = '';
            }
          };
          scope.$watch('searchBarService.currentSearch', function(o, n) {
            var searchS;
            if (searchBarService.displaySearchResult && o !== n && searchBarService.currentSearch !== '' && searchBarService.currentSearch.length >= 2) {
              searchS = angular.copy(searchBarService.currentSearch);
              if (scope.promise != null) {
                $timeout.cancel(scope.promise);
              }
              return scope.promise = $timeout(function() {
                if (searchBarService.currentSearch.indexOf(':') !== -1 && searchBarService.currentSearch.split(':')[1].length > 0 || searchBarService.currentSearch.indexOf(':') === -1 && searchBarService.currentSearch.length > 0) {
                  return scope.searchResultParam.promise = searchService.searchByStringLittle(searchBarService.currentSearch, function(result) {
                    scope.searchResultParam.result = result;
                    return scope.searchResultParam.display = true;
                  });
                }
              }, 500);
            }
          });
          scope.search = function() {
            if (!(scope.searchResultParam.indexSelected != null)) {
              return scope.navigateTo('search/' + searchBarService.currentSearch);
            }
          };
          return scope.navigateTo = function(target) {
            $rootScope.$broadcast('PROGRESS_BAR_START');
            $rootScope.$broadcast('SEARCH_CLEAN');
            return $timeout((function() {
              return $location.path(target);
            }), 1);
          };
        }
      };
    }
  };
});