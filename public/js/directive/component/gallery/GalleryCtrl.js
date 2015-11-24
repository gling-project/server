myApp.directive('galleryCtrl', function($rootScope, directiveService, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/gallery/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          return scope.openGallery = function(image) {
            return modalService.galleryModal(image, scope.getInfo().images);
          };
        }
      };
    }
  };
});