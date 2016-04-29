myApp.directive('businessListCtrl', function($rootScope, businessService, geolocationService, directiveService, searchService, $location) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/businessList/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          console.log('et merde encore 2');
          scope.descriptionLimitBase = 200;
          scope.descriptionLimit = scope.descriptionLimitBase;
          scope.getInfo().loading = true;
          scope.navigateTo = function(target) {
            return $location.path(target);
          };
          return scope.$watch('getInfo().data', function(n) {
            if (n != null) {
              return scope.businesses = n;
            }
          });
        }
      };
    }
  };
});