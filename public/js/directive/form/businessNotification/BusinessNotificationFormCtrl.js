myApp.directive('businessNotificationFormCtrl', function ($flash, directiveService, businessService, accountService,constantService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/form/businessNotification/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    //add day function
                    var addDays = function (date, days) {
                        var result = new Date(date);
                        result.setDate(result.getDate() + days);
                        return result;
                    };

                    scope.editMode = false;

                    //
                    // initialize default data
                    //
                    if (scope.getInfo().dto == null) {
                        var startDate = new Date();
                        startDate.setMinutes(0);
                        startDate.setSeconds(0);
                        startDate.setMilliseconds(0);
                        var endDate = angular.copy(startDate);
                        endDate = new Date(endDate.getTime() + 3600 * 1000 * 24 * 7);
                        scope.getInfo().dto = {
                            type: 'NOTIFICATION',
                            startDate: startDate,
                            endDate: endDate
                        };
                    }
                    else {
                        var startDate = scope.getInfo().dto.startDate;
                        scope.editMode = true;
                        scope.completePromotion = scope.getInfo().dto.originalPrice != null;
                    }

                    //complete for previsualization
                    scope.getInfo().dto.businessName = scope.getInfo().business.name;
                    scope.getInfo().dto.businessIllustration = scope.getInfo().business.illustration;
                    scope.getInfo().dto.distance = scope.getInfo().business.distance;

                    //load interests
                    businessService.getInterests(function (data) {
                        scope.interests = data;
                        if (scope.interests.length > 1) {
                            scope.fields.interests.active = function () {
                                return true;
                            };
                            var list = [];
                            for (var key in scope.interests) {
                                var interest = scope.interests[key];
                                list.push({
                                    key: interest,
                                    value: interest.translationName
                                });
                            }
                            scope.fields.interests.options = list;
                        }
                        else if (scope.interests.length == 1) {
                            scope.getInfo().dto.interest = scope.interests[0];
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
                            fieldTitle: "--.publication.description",
                            validationRegex: /^[\s\S]{0,1000}$/gi,
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        startDate: {
                            name: 'startDate',
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled || scope.editMode === true;
                            },
                            field: scope.getInfo().dto,
                            startDate: startDate,
                            fieldName: 'startDate',
                            maxDay: 30
                        },
                        endDate: {
                            name: 'endDate',
                            fieldTitle: "--.promotion.endDate",
                            validationMessage: '--.promotion.validation.endDateBeforeStartDate',
                            minimalDelay: 'hour',
                            details: '--.businessNotification.dayMax.details',
                            disabled: function () {
                                return scope.getInfo().disabled || scope.editMode === true;
                            },
                            validationFct: function () {
                                return scope.getInfo().dto.endDate >= scope.getInfo().dto.startDate;
                            },
                            field: scope.getInfo().dto,
                            startDate: startDate,
                            fieldName: 'endDate',
                            maxDay: 28

                        },
                        illustration: {
                            fieldTitle: "--.promotion.illustration",
                            validationMessage: '--.error.validation.image',
                            details: '--promotion.illustration.maximumImage',
                            target: 'publication_picture',
                            maxHeight: constantService.PUBLICATION_PICTURE_HEIGHT,
                            maxWidth: constantService.PUBLICATION_PICTURE_WIDTH,
                            optional: function () {
                                return true;
                            },
                            maxImage: 4,
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
                                return true;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return false
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'interest',
                            comparableFct: function (a, b) {
                                return a.name == b.name;
                            }
                        },
                        editionReason: {
                            fieldTitle: "--.publication.editionJustification",
                            validationRegex: /^[\s\S]{0,1000}$/gi,
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return accountService.getMyself().role == 'SUPERADMIN';
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'editionReason'
                        }
                    };

                    scope.$watch('fields.startDate.field', function () {
                        scope.fields.endDate.startDate = scope.fields.startDate.field[scope.fields.startDate.fieldName];
                    }, true);

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