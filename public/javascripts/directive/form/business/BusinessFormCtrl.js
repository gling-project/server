myApp.directive('businessFormCtrl', function ( $flash, directiveService,$timeout) {

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


                    scope.$watch('getInfo().dto',function(){
                        scope.fields.name.field =scope.getInfo().dto.name;
                        scope.fields.description.field =scope.getInfo().dto.description;
                        scope.fields.phone.field =scope.getInfo().dto.phone;
                    });

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
                            isActive: !scope.getInfo().updateMode
                        },
                        description: {
                            fieldTitle: "--.generic.desc",
                            validationRegex: "^.{0,1500}$",
                            validationMessage: ['--.generic.validation.size', '0', '1500'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode
                        },
                        phone: {
                            fieldTitle: "--.generic.phone",
                            validationRegex: "^[0-9. *-]{6,16}$",
                            validationMessage: '--.validation.dto.notNull',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode
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
                                if (key == 'gender') {
                                    scope.getInfo().dto.male = (scope.fields[key].field == 'male');
                                }
                                else {
                                    scope.getInfo().dto[key] = scope.fields[key].field;
                                }
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
                }
            }
        }
    }


});