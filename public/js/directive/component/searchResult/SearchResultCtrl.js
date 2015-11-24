myApp.directive('searchResultCtrl', function(directiveService, $location, searchBarService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/searchResult/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        pre: function(scope) {},
        post: function(scope) {
          var counter, removeCriteria;
          directiveService.autoScopeImpl(scope);
          counter = -1;
          scope.getInfo().indexSelected = null;
          scope.$watch('getInfo().result', function() {
            var business, category, publication, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
            if (scope.getInfo().result != null) {
              counter = -1;
              _ref = scope.getInfo().result.businesses;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                business = _ref[_i];
                business.index = ++counter;
              }
              if ((scope.getInfo().result.businesses != null) && scope.getInfo().result.businesses.length > 0 && scope.getInfo().mobile !== true) {
                scope.seeMoreBusinessIndex = ++counter;
              }
              _ref2 = scope.getInfo().result.publications;
              for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                publication = _ref2[_j];
                publication.index = ++counter;
              }
              if ((scope.getInfo().result.publications != null) && scope.getInfo().result.publications.length > 0 && scope.getInfo().mobile !== true) {
                scope.seeMorePublicationIndex = ++counter;
              }
              _ref3 = scope.getInfo().result.categories;
              for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                category = _ref3[_k];
                category.index = ++counter;
              }
              if ((scope.getInfo().result.categories != null) && scope.getInfo().result.categories.length > 0 && scope.getInfo().mobile !== true) {
                scope.seeMoreCategoryIndex = ++counter;
              }
              scope.seeMoreIndex = ++counter;
            } else {
              scope.getInfo().display = false;
            }
            return scope.getInfo().indexSelected = null;
          });
          $(document).keydown(function(e) {
            var business, category, publication, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
            if (e.keyCode === 40) {
              if (scope.getInfo().indexSelected === null || scope.getInfo().indexSelected === counter) {
                scope.getInfo().indexSelected = 0;
              } else {
                scope.getInfo().indexSelected++;
              }
              return scope.$apply();
            } else if (e.keyCode === 38) {
              if (scope.getInfo().indexSelected === null || scope.getInfo().indexSelected === 0) {
                scope.getInfo().indexSelected = counter;
              } else {
                scope.getInfo().indexSelected--;
              }
              return scope.$apply();
            } else if (e.keyCode === 13) {
              if ((scope.getInfo().result != null) && (scope.getInfo().indexSelected != null)) {
                _ref = scope.getInfo().result.businesses;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  business = _ref[_i];
                  if (scope.getInfo().indexSelected === business.index) {
                    console.log('goToBusiness');
                    scope.goToBusiness(business);
                    break;
                  }
                }
                _ref2 = scope.getInfo().result.categories;
                for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                  category = _ref2[_j];
                  if (scope.getInfo().indexSelected === category.index) {
                    console.log('goToCategory ');
                    scope.goToCategory(category);
                    break;
                  }
                }
                _ref3 = scope.getInfo().result.publications;
                for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                  publication = _ref3[_k];
                  if (scope.getInfo().indexSelected === publication.index) {
                    console.log('goToPublication');
                    scope.goToPublication(publication);
                    break;
                  }
                }
                return scope.$apply();
              }
            } else if (e.keyCode === 27) {
              scope.getInfo().display = false;
              scope.getInfo().indexSelected = null;
              return scope.$apply();
            }
          });
          $(document).click(function() {
            if (!$('#searchContainer').is(':hover')) {
              scope.getInfo().display = false;
              scope.getInfo().indexSelected = null;
              return scope.$apply();
            }
          });
          scope.select = function(index) {
            return scope.getInfo().indexSelected = index;
          };
          scope.seeAll = function() {
            return scope.navigateTo('search/' + searchBarService.currentSearch);
          };
          scope.goToPublication = function(publication) {
            return scope.navigateTo('business/' + publication.businessId + '/publication/' + publication.id);
          };
          scope.goToBusiness = function(business) {
            return scope.navigateTo('business/' + business.id);
          };
          scope.seeAllPublication = function() {
            return scope.navigateTo('search/publication:' + removeCriteria(searchBarService.currentSearch));
          };
          scope.seeAllBusiness = function() {
            return scope.navigateTo('search/business:' + removeCriteria(searchBarService.currentSearch));
          };
          scope.seeAllCategory = function() {
            return scope.navigateTo('search/category:' + removeCriteria(searchBarService.currentSearch));
          };
          scope.goToCategory = function(category) {
            var target;
            target = null;
            if (category.subSubCategory != null) {
              target = category.subSubCategory.translationName;
            } else if (category.subCategory != null) {
              target = category.subCategory.translationName;
            } else {
              target = category.category.translationName;
            }
            return scope.navigateTo('search/category:' + removeCriteria(target));
          };
          removeCriteria = function(s) {
            if (s.indexOf(':') !== -1) {
              return s.split(':')[1];
            } else {
              return s;
            }
          };
          scope.navigateTo = function(target) {
            $location.path(target);
            return scope.$broadcast('SEARCH_CLEAN');
          };
          return scope.$on('SEARCH_CLEAN', function() {
            scope.getInfo().display = false;
            return scope.getInfo().cleanSearch();
          });
        }
      };
    }
  };
});