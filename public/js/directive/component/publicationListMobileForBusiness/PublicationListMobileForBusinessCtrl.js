myApp.directive('publicationListMobileForBusinessCtrl', function($rootScope, businessService, geolocationService, directiveService, searchService, $timeout) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/publicationListMobileForBusiness/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.descriptionLimitBase = 250;
          scope.currentPage = 0;
          scope.allLoaded = false;
          scope.loadSemaphore = false;
          scope.publications = [];
          scope.loading = false;
          scope.isArchived = function(publication) {
            return publication.endDate < (new Date).getTime();
          };
          $('.scrollable-content-body').on('scroll', function() {
            var scrollBottom;
            scrollBottom = $('.scrollable-content-body').scrollTop() + $('.scrollable-content-body').height();
            if ($('.scrollable-content-inner').height() - scrollBottom < 200) {
              if (scope.loadSemaphore === false) {
                console.log('-- SERACH FROM SCROOL');
                scope.loadSemaphore = true;
                scope.currentPage = scope.currentPage + 1;
                return scope.search();
              }
            }
          });
          scope.openGallery = function(image, publication) {
            return $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY', {
              list: publication.pictures,
              first: image
            });
          };
          scope.getInterestClass = function(publication) {
            if (publication.interest != null) {
              return 'gling-icon-' + publication.interest.name;
            }
            return null;
          };
          scope.getInfo().refresh = function(type) {
            scope.currentPage = 0;
            scope.publications = [];
            scope.type = type;
            return scope.search();
          };
          scope.success = function(data) {
            var d, publication, _i, _j, _len, _len2, _ref;
            if (scope.currentPage === 0) {
              scope.publications = [];
            }
            if (data.length === 0) {
              scope.allLoaded = true;
            }
            scope.loadSemaphore = false;
            for (_i = 0, _len = data.length; _i < _len; _i++) {
              d = data[_i];
              scope.publications.push(d);
            }
            _ref = scope.publications;
            for (_j = 0, _len2 = _ref.length; _j < _len2; _j++) {
              publication = _ref[_j];
              publication.descriptionLimit = scope.descriptionLimitBase;
              publication.interval = (publication.endDate - (new Date)) / 1000;
            }
            $timeout((function() {
              if (scope.getInfo().scrollTo != null) {
                $('.main-body').scrollTop($('#publication' + scope.getInfo().scrollTo).offset().top);
                return scope.$apply();
              }
            }), 1);
            return scope.loading = false;
          };
          scope.search = function() {
            if (scope.allLoaded === true) {
              return;
            }
            scope.loading = true;
            return searchService.byBusiness(scope.currentPage, scope.getInfo().businessId, scope.success);
          };
          console.log('-- SERACH FROM initialization');
          return scope.search();
        }
      };
    }
  };
});