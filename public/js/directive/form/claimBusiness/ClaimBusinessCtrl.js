myApp.directive('claimBusinessCtrl', function($flash, facebookService, translationService, directiveService, $timeout, accountService, $location, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/form/claimBusiness/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.fields = {
            phone: {
              name: 'phone',
              fieldTitle: "--.generic.phone",
              validationRegex: /^[0-9. *-+\/]{6,16}$/,
              validationMessage: '--.validation.dto.phone',
              disabled: function() {
                return scope.getInfo().disabled;
              },
              field: scope.getInfo().dto,
              fieldName: 'phone'
            },
            vta: {
              name: 'vta',
              fieldTitle: "--.business.vta",
              validationRegex: /^[a-zA-Z0-9\.\- ]{6,20}$/,
              validationMessage: '--.validation.dto.vta',
              disabled: function() {
                return scope.getInfo().disabled || (scope.getInfo().status != null) === 'PUBLISHED';
              },
              field: scope.getInfo().dto
            }
          };
          scope.setLoading = function(b) {
            if (scope.getInfo().mobileVersion) {
              if (b === true) {
                return modalService.openLoadingModal();
              } else {
                return modalService.closeLoadingModal();
              }
            } else {
              return scope.getInfo().loading = b;
            }
          };
          scope.$watch('fields', (function() {
            var key, obj, validation;
            validation = true;
            for (key in scope.fields) {
              obj = scope.fields[key];
              if (scope.fields.hasOwnProperty(key) && (!(obj.isValid != null) || obj.isValid === false)) {
                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                validation = false;
              }
            }
            return scope.getInfo().isValid = validation;
          }), true);
          return scope.$watch('getInfo().displayErrorMessage', function() {
            var key, obj, _results;
            _results = [];
            for (key in scope.fields) {
              obj = scope.fields[key];
              _results.push(obj.firstAttempt = !scope.getInfo().displayErrorMessage);
            }
            return _results;
          });
        }
      };
    }
  };
});