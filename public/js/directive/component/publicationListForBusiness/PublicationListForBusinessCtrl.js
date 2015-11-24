myApp.directive('publicationListForBusinessCtrl', function($rootScope, directiveService, searchService, $timeout, publicationService, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/publicationListForBusiness/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          var isEmpty;
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
            if (scope.getInfo().scrollTo != null) {
              $timeout((function() {
                var target;
                target = '#publication' + scope.getInfo().scrollTo;
                $(window).scrollTop($(target).offset().top - 70);
                scope.getInfo().scrollTo = null;
                return scope.$apply();
              }), 1);
            }
            return scope.loading = false;
          };
          $(window).on('scroll', function() {
            var scrollBottom;
            scrollBottom = $(window).scrollTop() + $(window).height();
            if ($('.container-content').height() - scrollBottom < 200) {
              if (scope.loadSemaphore === false) {
                scope.loadSemaphore = true;
                scope.currentPage = scope.currentPage + 1;
                console.log('-- from scrolling');
                return scope.search();
              }
            }
          });
          scope.getInfo().refresh = function(type) {
            scope.currentPage = 0;
            scope.publications = [];
            if (scope.type !== type) {
              return scope.type = type;
            } else {
              scope.allLoaded = false;
              console.log('-- from refresh');
              return scope.search();
            }
          };
          scope.search = function() {
            if (scope.allLoaded === true) {
              return;
            }
            scope.loading = true;
            if ((scope.type != null) && scope.type !== void 0 && scope.type === 'ARCHIVE') {
              return searchService.byBusinessArchived(scope.currentPage, scope.getInfo().businessId, scope.success);
            } else if ((scope.type != null) && scope.type !== void 0 && scope.type === 'PREVISUALIZATION') {
              return searchService.byBusinessPrevisualization(scope.currentPage, scope.getInfo().businessId, scope.success);
            } else {
              return searchService.byBusiness(scope.currentPage, scope.getInfo().businessId, scope.success);
            }
          };
          scope.$watch('type', function(n, o) {
            if (n !== o) {
              scope.allLoaded = false;
              return scope.search();
            }
          });
          console.log('-- SERACH FROM initialization');
          scope.search();
          scope.removePublication = function(publication) {
            return modalService.messageModal('--.business.publication.remove.confirmationModal.title', '--.business.publication.remove.confirmationModal.body', function(close) {
              return publicationService["delete"](publication, function() {
                $rootScope.$broadcast('RELOAD_PUBLICATION');
                return close();
              });
            });
          };
          scope.editPublication = function(publication) {
            if (publication.type === 'PROMOTION') {
              return modalService.openPromotionModal(publication, scope.getInfo().business, function() {
                return $rootScope.$broadcast('RELOAD_PUBLICATION');
              });
            } else {
              return modalService.openBusinessNotificationModal(publication, scope.getInfo().business, function() {
                return $rootScope.$broadcast('RELOAD_PUBLICATION');
              });
            }
          };
          scope.getInterestClass = function(publication) {
            if (publication.interest != null) {
              return 'gling-icon-' + publication.interest.name;
            }
            return null;
          };
          isEmpty = function(val) {
            return !(val != null) || val === '';
          };
          scope.descriptionIsEmpty = function(publication) {
            return publication.type !== 'PROMOTION' && isEmpty(publication.description);
          };
          scope.openGallery = function(image, publication) {
            return modalService.galleryModal(image, publication.pictures);
          };
          return scope.getIllustrationClass = function(picture) {
            if (picture !== void 0 && picture.height > picture.width) {
              return 'publication-illustration-high';
            } else {
              return 'publication-illustration';
            }
          };
        }
      };
    }
  };
});