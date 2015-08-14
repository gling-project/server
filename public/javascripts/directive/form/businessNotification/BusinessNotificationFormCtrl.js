myApp.directive('businessNotificationFormCtrl', function ($flash, directiveService, businessService) {

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

                    scope.update = scope.getInfo().dto != null;
                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            startDate: new Date()
                        };
                    }

                    //load interests
                    businessService.getInterests(function (data) {
                        scope.interests = data;
                        if (scope.interests.length > 1) {
                            scope.fields.interests.isActive = function () {
                                return true;
                            };
                            for (var key in scope.interests) {
                                var interest = scope.interests[key];
                                scope.fields.interests.options.push({
                                    key: interest,
                                    value: interest.translationName
                                });
                            }
                        }
                    });

                    scope.fields = {
                        title: {
                            fieldTitle: "--.generic.title",
                            validationRegex: "^.{2,100}$",
                            validationMessage: ['--.generic.validation.size', '2', '100'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'title'
                        },
                        description: {
                            fieldTitle: "--.generic.description",
                            validationRegex: "^.{0,1000}$",
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        startDate: {
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'startDate'
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
                            },
                            field: scope.getInfo().dto,
                            active: function () {
                                return false;
                            },
                            fieldName: 'endDate'
                        },
                        illustration: {
                            fieldTitle: "--.promotion.illustration",
                            validationMessage: '--.error.validation.image',
                            sizex: 60,
                            sizey: 60,
                            optional: function () {
                                return true;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            multiple: true,
                            fieldName: 'pictures'
                        },
                        interests: {
                            fieldTitle: "--.promotion.interest",
                            details: '--.promotion.interest.help',
                            validationMessage: '--.error.validation.not_null',
                            options: [],
                            optional: function () {
                                return false;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: function () {
                                return false
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'interest'
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
                }
            }
        }
    }


})
;