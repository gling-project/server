myApp.directive('loginFormCtrl', function($flash, facebookService, translationService, directiveService, $timeout, accountService, $location, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/form/login/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          var access_token;
          directiveService.autoScopeImpl(scope);
          scope.facebookAppId = facebookService.facebookAppId;
          scope.facebookAuthorization = facebookService.facebookAuthorization;
          scope.basic_url = location.host;
          if (scope.basic_url.indexOf('http') === -1) {
            if (scope.basic_url.indexOf('localhost') !== -1) {
              scope.basic_url = 'http://' + scope.basic_url;
            } else {
              scope.basic_url = 'https://' + scope.basic_url;
            }
          }
          if (!(scope.getInfo().dto != null)) {
            scope.getInfo().dto = {};
          }
          scope.fields = {
            email: {
              fieldType: 'email',
              name: 'email',
              fieldTitle: '--.registration.form.yourEmail',
              validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              validationMessage: '--.generic.validation.email',
              disabled: function() {
                return scope.getInfo().loading;
              },
              field: scope.getInfo().dto,
              fieldName: 'email'
            },
            password: {
              name: 'password',
              fieldTitle: '--.generic.yourPassword',
              validationRegex: '^[a-zA-Z0-9-_%]{6,18}$',
              validationMessage: '--.generic.validation.password',
              fieldType: 'password',
              disabled: function() {
                return scope.getInfo().loading;
              },
              field: scope.getInfo().dto,
              fieldName: 'password'
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
              if (!(obj.isValid != null) || obj.isValid === false) {
                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                validation = false;
              }
            }
            return scope.getInfo().isValid = validation;
          }), true);
          scope.$watch('getInfo().displayErrorMessage', function() {
            var key, obj, _results;
            _results = [];
            for (key in scope.fields) {
              obj = scope.fields[key];
              _results.push(obj.firstAttempt = !scope.getInfo().displayErrorMessage);
            }
            return _results;
          });
          scope.facebookSuccess = function(data) {
            accountService.setMyself(data);
            if (data.type === 'BUSINESS') {
              $location.path('/business/' + accountService.getMyself().businessId);
            } else if (scope.getInfo().mobileVersion) {
              $location.path('/');
            }
            scope.getInfo().facebookSuccess(data);
            return scope.setLoading(false);
          };
          scope.fb_login = function() {
            var failed, success, url;
            success = function(data) {
              scope.facebookSuccess(data);
              return scope.setLoading(false);
            };
            failed = function(data) {
              $flash.error(data.message);
              scope.setLoading(false);
              return scope.$apply();
            };
            scope.setLoading(true);
            if (scope.getInfo().mobileVersion) {
              if (facebookService.isConnected()) {
                return facebookService.loginToServer(success, failed);
              } else {
                url = 'https://www.facebook.com/dialog/oauth/?scope=' + facebookService.facebookAuthorization + '&client_id=' + scope.facebookAppId + '&redirect_uri=' + scope.basic_url + '/&state=BELGIUM&scope=' + scope.facebookAuthorization + '&response_type=token';
                return window.open(url, '_self');
              }
            } else {
              return facebookService.login((function(data) {
                return success(data);
              }), function(data) {
                return failed(data);
              });
            }
          };
          scope.getUrlParam = function(name, url) {
            var regex, regexS, results;
            if (!url) {
              url = location.href;
            }
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            regexS = '[\\?&]' + name + '=([^&#]*)';
            regex = new RegExp(regexS);
            results = regex.exec(url);
            if (results === null) {
              return null;
            } else {
              return results[1];
            }
          };
          if (location.href.indexOf('access_token') !== -1) {
            access_token = scope.getUrlParam('access_token', location.href);
            if (access_token != null) {
              scope.setLoading(true);
              return facebookService.loginToServerSimple(access_token, (function(data) {
                return scope.facebookSuccess(data);
              }), function(data, status) {
                scope.setLoading(false);
                return $location.path('/customer_registration');
              });
            }
          }
        }
      };
    }
  };
});