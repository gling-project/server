myApp.directive('loginModalCtrl', function ($http, $flash, facebookService, translationService,directiveService) {
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

                    scope.loading = false;

                    scope.fields = {
                        login: {
                            fieldType: "email",
                            name: 'email',
                            fieldTitle: "--.registration.form.yourEmail",
                            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            validationMessage: "--.generic.validation.email",
                            disabled: function () {
                                return scope.loading;
                            }
                        },
                        password: {
                            name: 'password',
                            fieldTitle: "--.generic.yourPassword",
                            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
                            validationMessage: "--.generic.validation.password",
                            fieldType: 'password',
                            disabled: function () {
                                return scope.loading;
                            }
                        },
                        openSession: {
                            fieldTitle: "--.registration.form.keepSessionOpen",
                            field: false,
                            disabled: function () {
                                return scope.loading;
                            }
                        }
                    };

                    scope.close = function () {
                        $modalInstance.close();
                    };

                    scope.allFieldValid = function () {

                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            console.log(obj);
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = false;
                                validation = false;
                            }
                        }
                        return validation;
                    };

                    scope.save = function () {

                        if (scope.allFieldValid()) {
                            var dto = {
                                email: scope.fields.login.field,
                                password: scope.fields.password.field,
                                keepSessionOpen: scope.fields.openSession.field
                            }

                            scope.loading = true;

                            $http({
                                'method': "POST",
                                'url': "/login",
                                'headers': "Content-Type:application/json",
                                'data': dto
                            }).success(function (data, status) {
                                modelService.set(modelService.MY_SELF, data);
                                $flash.success(translationService.get("--.login.flash.success"));
                                scope.loading = false;
                                scope.close();
                                //logout facebook in case
                                facebookService.logout();
                            })
                                .error(function (data, status) {
                                    scope.loading = false;
                                    $flash.error(data.message);
                                });
                        }
                    }

                    //
                    // facebook connection
                    //
                    scope.fb_login = function () {
                        scope.loading = true;
                        facebookService.login(function (data) {
                                modelService.set(modelService.MY_SELF, data);
                                scope.loading = false;
                                $flash.success(translationService.get("--.login.flash.success"));
                                scope.close();

                            },
                            function (data, status) {
                                if (status == 410) {
                                    scope.fusion(data);
                                }
                                else {
                                    $flash.error(data.message);
                                }
                                scope.loading = false;
                                scope.close();
                            });
                    };

                    scope.fusion = function (accountFusion) {

                        var resolve = {
                            accountFusion: function () {
                                return accountFusion;
                            }
                        };
                        $modal.open({
                            templateUrl: "/assets/javascripts/modal/AccountFusionFacebookModal/view.html",
                            controller: "AccountFusionFacebookModalCtrl",
                            size: "l",
                            resolve: resolve
                        });
                    }


                }
            }
        }
    }
});