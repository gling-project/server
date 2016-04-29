myApp.directive('facebookSharePublicationCtrl', function($rootScope, businessService, geolocationService, directiveService, facebookService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/facebookSharePublication/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          return scope.share = function() {
            return facebookService.sharePublication(scope.getInfo().businessId, scope.getInfo().publicationId);
          };
        }
      };
    }
  };
});