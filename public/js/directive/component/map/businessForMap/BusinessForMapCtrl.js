myApp.directive('businessForMapCtrl', function($rootScope, businessService, geolocationService, directiveService, $location) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/map/businessForMap/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.$watch('getInfo().business.following', function(n, o) {
            if ((n != null) && (o != null) && n !== o) {
              return scope.getInfo().followingCallback(scope.getInfo().business);
            }
          });
          scope.goTo = function(target) {
            return $location.path(target);
          };
          return;
        }
      };
    }
  };
});