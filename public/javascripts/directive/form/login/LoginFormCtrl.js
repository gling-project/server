myApp.directive('loginFormCtrl', function ($flash, facebookService, translationService, directiveService, $timeout, accountService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/login/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.facebookAppId = facebookService.facebookAppId;
                    scope.facebookAuthorization = facebookService.facebookAuthorization;
                    scope.basic_url = location.host;
                    if (scope.basic_url.indexOf('http') == -1) {
                        scope.basic_url = 'http://' + scope.basic_url;
                    }

                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {};
                    }

                    scope.fields = {
                        email: {
                            fieldType: "email",
                            name: 'email',
                            fieldTitle: "--.registration.form.yourEmail",
                            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            validationMessage: "--.generic.validation.email",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        password: {
                            name: 'password',
                            fieldTitle: "--.generic.yourPassword",
                            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
                            validationMessage: "--.generic.validation.password",
                            fieldType: 'password',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'password'
                        },
                        keepSessionOpen: {
                            fieldTitle: "--.registration.form.keepSessionOpen",
                            field: false,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return !scope.getInfo().mobileVersion
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'keepSessionOpen'
                        }
                    };

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);


                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });

                    //
                    //facebook success
                    //
                    scope.facebookSuccess = function (data) {
                        accountService.setMyself(data);
                        $flash.success(translationService.get("--.login.flash.success"));
                        scope.getInfo().facebookSuccess(data);
                    };


                    //
                    // facebook connection
                    //not mobile version
                    //
                    scope.fb_login = function () {
                        facebookService.login(function (data) {
                            scope.facebookSuccess(data);
                        });
                    };

                    scope.getUrlParam = function (name, url) {
                        if (!url) url = location.href
                        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                        var regexS = "[\\?&]" + name + "=([^&#]*)";
                        var regex = new RegExp(regexS);
                        var results = regex.exec(url);
                        return results == null ? null : results[1];
                    };

                    //try to catch facebook connection
                    //mobile version
                    if (location.href.indexOf('access_token') != -1) {
                        console.log('facebook con 1');
                        var access_token = scope.getUrlParam('access_token', location.href)

                        console.log('facebook con 2');

                        if (access_token != null) {
                            console.log('facebook con 3');
                            facebookService.loginToServerSimple(access_token, function (data) {
                                    console.log('facebook con 4');
                                    scope.facebookSuccess(data);
                                },
                                function (data, status) {
                                    console.log('facebook con ERROR');
                                    $flash.error(data.message);
                                });
                        }
                    }
                }
            }
        }
    }
});