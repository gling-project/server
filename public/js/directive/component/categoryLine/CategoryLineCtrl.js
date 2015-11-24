myApp.directive('categoryLineCtrl', function($rootScope, directiveService, $location) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/categoryLine/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          return scope.searchCat = function(categoryName) {
            return $location.path('/search/category:' + categoryName);
          };
        }
      };
    }
  };
});