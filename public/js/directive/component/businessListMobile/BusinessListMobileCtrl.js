myApp.directive('businessListMobileCtrl', function($rootScope, businessService, geolocationService, directiveService, searchService, $location) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/businessListMobile/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.descriptionLimitBase = 200;
          scope.descriptionLimit = scope.descriptionLimitBase;
          scope.getInfo().loading = true;
          scope.navigateTo = function(target) {
            return $location.path(target);
          };
          return scope.$watch('getInfo().data', function() {
            return scope.businesses = scope.getInfo().data;
          });
        }
      };
    }
  };
});