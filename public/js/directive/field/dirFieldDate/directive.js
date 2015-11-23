myApp.directive("dirFieldDate", function (directiveService, $filter, generateId) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/field/dirFieldDate/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    directiveService.autoScopeImpl(scope);
                    scope.id = generateId.generate();
                    return scope.idHtag = '#' + scope.id;
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);
                    scope.result = null;


                    if (scope.getInfo().field[scope.getInfo().fieldName] != null) {
                        scope.result = new Date(Number(scope.getInfo().field[scope.getInfo().fieldName]));
                        if (scope.getInfo().minimalDelay == 'day') {
                            scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd');
                        }
                        else {
                            scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd HH:mm');
                        }
                    }

                    scope.$watch('result', function (n, o) {
                        if (n != o) {
                            if (scope.result != null) {
                                scope.getInfo().field[scope.getInfo().fieldName] = scope.result.getTime();
                            } else {
                                scope.getInfo().field[scope.getInfo().fieldName] = null;
                            }
                            scope.isValid();
                            if (scope.getInfo().minimalDelay == 'day') {
                                scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd');
                            }
                            else {
                                scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd HH:mm');
                            }
                        }
                    });

                    scope.isActive = function () {

                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                        if (n != o) {
                            if (scope.getInfo().field[scope.getInfo().fieldName] != null) {
                                return scope.result = new Date(Number(scope.getInfo().field[scope.getInfo().fieldName]));
                            }
                            scope.isValid();
                        }
                    });

                    scope.isValid = function () {

                        var isValid;
                        if (scope.getInfo().disabled === true || scope.isActive() === false) {
                            scope.getInfo().isValid = true;
                            return;
                        }
                        isValid = true;
                        if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                            isValid = false;
                        }
                        if (scope.getInfo().validationFct != null) {
                            isValid = isValid && scope.getInfo().validationFct();
                        }
                        scope.getInfo().isValid = isValid;
                    };


                    scope.isValid();

                    scope.logField = function () {
                        return console.log(scope.getInfo());
                    };

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };
                }
            };
        }
    };
});
