myApp.directive('downloadFormCtrl', function ($flash, directiveService, $timeout) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/download/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);
                    
                    scope.fields = {
                        file: {
                            fieldTitle: "generic.file",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            size : scope.getInfo().size
                        }
                    };

                    scope.$watch('getInfo().dto', function (o, n) {
                        scope.fields.file.field = scope.getInfo().dto;
                    });

                    scope.fileCall = null;
                    scope.$watch('fields.file.field', function (n, o) {
                        if (n != null) {
                            scope.fileCall = "/rest/file/" + scope.fields.file.field.id;
                        }
                        scope.getInfo().isValid = n != null;
                        scope.getInfo().dto = scope.fields.file.field;
                    });


                    scope.download = function () {
                        if (scope.fields.file.field != null) {
                            var url = "/rest/file/" + scope.fields.file.field.id;
                            $window.open(url);
                        }
                    };


                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }
});