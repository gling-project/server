myApp.directive('businessNotificationFormCtrl', function ($flash, directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/businessNotification/template.html",
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
                        scope.getInfo().dto = {
                            startDate: new Date()
                        };
                    }

                    scope.fields = {
                        description: {
                            fieldTitle: "--.generic.description",
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        startDate: {
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        endDate: {
                            fieldTitle: "--.promotion.endDate",
                            validationMessage: '--.promotion.validation.endDateBeforeStartDate',
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            validationFct: function () {
                                return scope.fields.endDate.field >= scope.fields.startDate.field;
                            }
                        },
                        illustration: {
                            fieldTitle: "--.generic.image",
                            validationMessage: '--.error.validation.image',
                            size: 60,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        }
                    };

                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            console.log(obj.field);
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                            else {
                                scope.getInfo().dto[key] = obj.field;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);

                    scope.$watch('getInfo().dto', function () {
                        console.log('$watch info !! ');
                        if (scope.getInfo().dto.description != null)scope.fields.description.field = scope.getInfo().dto.description;
                        if (scope.getInfo().dto.startDate != null)scope.fields.startDate.field = scope.getInfo().dto.startDate;
                        if (scope.getInfo().dto.endDate != null)scope.fields.endDate.field = scope.getInfo().dto.endDate;
                        if (scope.getInfo().dto.illustration != null)scope.fields.illustration.field = scope.getInfo().dto.illustration;
                        console.log('binding !! ');
                        console.log(scope.getInfo().dto);
                    });

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


})
;