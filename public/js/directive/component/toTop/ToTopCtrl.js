myApp.directive('toTopCtrl', function($window) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '/assets/js/directive/component/toTop/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          scope.toTop = function() {
            return $(window).scrollTop(0);
          };
          scope.displayToTopButton = $(window).scrollTop() > 100;
          return angular.element($window).bind('scroll', function() {
            scope.displayToTopButton = $(window).scrollTop() > 100;
            return scope.$apply();
          });
        }
      };
    }
  };
});