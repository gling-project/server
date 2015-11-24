myApp.directive('publicationListCtrl', function($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/publicationList/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.getInfo().loading = true;
          scope.changeInterestCallback = function(businessId, value) {
            var publication, _i, _len, _ref, _results;
            _ref = scope.publications;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              publication = _ref[_i];
              _results.push(publication.businessId === businessId ? publication.following = value : void 0);
            }
            return _results;
          };
          return scope.$watch('getInfo().data', function(n) {
            var publication, _i, _len, _ref, _results;
            if (n != null) {
              scope.publications = n;
              _ref = scope.publications;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                publication = _ref[_i];
                _results.push(publication.interval = publication.endDate - (new Date));
              }
              return _results;
            }
          });
        }
      };
    }
  };
});