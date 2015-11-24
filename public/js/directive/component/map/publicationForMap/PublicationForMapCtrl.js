myApp.directive('publicationForMapCtrl', function($rootScope, businessService, geolocationService, directiveService, $timeout) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/map/publicationForMap/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          return;
        }
      };
    }
  };
});