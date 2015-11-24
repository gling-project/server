myApp.directive('publicationWidgetCtrl', function($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService, $timeout) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/publicationWidgetForMobile/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.descriptionLimitBase = 250;
          scope.descriptionLimit = scope.descriptionLimitBase;
          scope.getInterestClass = function(publication) {
            if (publication.interest != null) {
              return 'gling-icon-' + publication.interest.name;
            }
            return null;
          };
          scope.navigateTo = function(target) {
            $rootScope.$broadcast('PROGRESS_BAR_START');
            modalService.openLoadingModal();
            return $timeout((function() {
              return $location.path(target);
            }), 1);
          };
          scope.openGallery = function(image, publication) {
            return $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY', {
              list: publication.pictures,
              first: image
            });
          };
          scope.getInfo().loading = true;
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