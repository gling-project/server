myApp.directive('businessRegistrationFormCtrl', function($flash, facebookService, translationService, directiveService, $timeout, accountService, businessService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/form/businessRegistrationForm/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.business = {};
          scope.businessNameField = {
            name: 'name',
            fieldTitle: "--.generic.name",
            validationRegex: "^.{2,50}$",
            validationMessage: ['--.generic.validation.size', '2', '250'],
            field: scope.business,
            disabled: function() {
              return scope.loading;
            },
            fieldName: 'name'
          };
          scope.importFromFacebookParam = {
            name: 'facebookUrl',
            validationRegex: "^($|https://www.facebook\.com/.*$)",
            validationMessage: '--.generic.validation.facebook',
            fieldTitle: "Facebook",
            field: scope.business,
            disabled: function() {
              return scope.loading;
            },
            fieldName: 'facebookUrl'
          };
          scope.setLoading = function(b) {
            return scope.loading = b;
          };
          scope.save = function() {
            if (!scope.businessNameField.isValid) {
              scope.businessNameField.displayErrorMessage = true;
              return $flash.error(translationService.get('--.generic.error.complete.fields'));
            } else {
              scope.setLoading(true);
              return businessService.createBusiness(accountService.getMyself().id, scope.business.name, function(data) {
                return scope.getInfo().callbackSuccess(data);
              }, function() {
                scope.loading = false;
                return scope.getInfo().callbackFail();
              });
            }
          };
          return scope.importBusinessFromFacebook = function() {
            var urlEncoded;
            if (!scope.importFromFacebookParam.isValid) {
              scope.importFromFacebookParam.displayErrorMessage = true;
              return $flash.error($filter('translateText')('--.generic.error.complete.fields'));
            } else {
              scope.setLoading(true);
              urlEncoded = encodeURIComponent(scope.business.facebookUrl);
              return businessService.importBusinessFormFacebook(urlEncoded, function(data) {
                return scope.getInfo().callbackSuccess(data);
              }, function() {
                scope.setLoading(false);
                return scope.getInfo().callbackFail();
              });
            }
          };
        }
      };
    }
  };
});