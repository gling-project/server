myApp.directive('publicationWidgetCtrl', function($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/publicationWidget/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          var isEmpty;
          directiveService.autoScopeImpl(scope);
          scope.descriptionLimit = 200;
          scope.descriptionLimitBase = scope.descriptionLimit;
          scope.navigateTo = function(target) {
            return $location.path(target);
          };
          scope.getInterestClass = function(publication) {
            if (publication.interest != null) {
              return 'gling-icon-' + publication.interest.name;
            }
            return null;
          };
          isEmpty = function(val) {
            return val === void 0 || val === null || val === '';
          };
          scope.descriptionIsEmpty = function(publication) {
            return publication.type !== 'PROMOTION' && isEmpty(publication.description);
          };
          scope.openGallery = function(image, publication) {
            return modalService.galleryModal(image, publication.pictures);
          };
          scope.getIllustrationClass = function(picture) {
            if (picture !== void 0 && picture.height > picture.width) {
              return 'publication-illustration-high';
            } else {
              return 'publication-illustration';
            }
          };
          return scope.$watch('getInfo().publication.following', function(n, o) {
            if (n !== o && (scope.getInfo().changeInterestCallback != null)) {
              return scope.getInfo().changeInterestCallback(scope.getInfo().publication.businessId, n);
            }
          });
        }
      };
    }
  };
});