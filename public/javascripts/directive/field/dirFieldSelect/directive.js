myApp.directive("dirFieldSelect", function (directiveService, $timeout, modalService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldSelect/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {

                    directiveService.autoScopeImpl(scope);

                    if (scope.getInfo().autoCompleteValue == undefined) {
                        scope.getInfo().autoCompleteValue = [];
                    }

                    scope.isActive = function () {

                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    scope.errorMessage = "";
                    scope.hideIsValidIcon = !!scope.getInfo().hideIsValidIcon;
                    scope.fieldType = (scope.getInfo().fieldType != null) ? scope.getInfo().fieldType : "text";

                    scope.isValid = function () {

                        var isValid;
                        if (scope.getInfo().disabled === true || scope.isActive() === false) {
                            scope.getInfo().isValid = true;
                            return;
                        }

                        isValid = scope.getInfo().optional === true || scope.getInfo().field[scope.getInfo().fieldName] != null;

                        scope.getInfo().isValid = isValid;
                    };

                    scope.isValid();

                    scope.$watch('getInfo().options', function (n, o) {
                        scope.computeResult();
                        return scope.isValid();
                    });

                    scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                        if (n != o) {
                            scope.computeResult();
                        }
                        return scope.isValid();
                    });

                    scope.computeResult = function () {
                        if (scope.getInfo().comparableFct != undefined && scope.getInfo().field[scope.getInfo().fieldName] != null) {
                            for (var key in scope.getInfo().options) {
                                if (scope.getInfo().comparableFct(scope.getInfo().options[key].key, scope.getInfo().field[scope.getInfo().fieldName])) {
                                    scope.getInfo().field[scope.getInfo().fieldName] = scope.getInfo().options[key].key;
                                }
                            }
                        }
                    };

                    scope.logField = function () {
                        return console.log(scope.getInfo());
                    };
                    scope.setErrorMessage = function (errorMessage) {
                        scope.errorMessage = errorMessage;
                        if (scope.lastTimeOut != null) {
                            $timeout.cancel(scope.lastTimeOut);
                        }
                        return scope.lastTimeOut = $timeout(function () {
                            scope.errorMessage = "";
                            return scope.lastTimeOut = null;
                        }, 2000);
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
