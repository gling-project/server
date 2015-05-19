myApp.directive('businessFormCtrl', function ($http, $flash, directiveService,$timeout) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/business/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {};
                    }


                    scope.fields = {
                        name: {
                            fieldTitle: "--.generic.name",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '250'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto.name
                        },
                        description: {
                            fieldTitle: "--.generic.desc",
                            fieldType:'textarea',
                            validationRegex: "^.{2,1500}$",
                            validationMessage: ['--.generic.validation.size', '2', '1500'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto.description
                        },
                        phone: {
                            fieldTitle: "--.generic.phone",
                            validationRegex: "^[0-9. *-]{6,16}$",
                            validationMessage: '--.validation.dto.notNull',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto.phone
                        }
                    };

                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                            else {
                                scope.getInfo().dto[key] = scope.fields[key].field;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);

                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });

                    $timeout(function() {
                        scope.loadingFinish = true;
                    },500);
                }
            }
        }
    }


});