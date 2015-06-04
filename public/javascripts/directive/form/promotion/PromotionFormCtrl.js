myApp.directive('promotionFormCtrl', function ($flash, directiveService, $timeout, translationService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/promotion/template.html",
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


                    scope.completePromotion = true;

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
                            fieldTitle: "--.promotion.illustration",
                            validationMessage: '--.error.validation.image',
                            size: 60,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            optional: function () {
                                return true;
                            }
                        },
                        quantity: {
                            fieldTitle: "--.promotion.quantity",
                            numbersOnly: 'integer',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.generic.validation.numberExpected',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.completePromotion;
                            }
                        },
                        minimalQuantity: {
                            fieldTitle: "--.promotion.minimalQuantity",
                            numbersOnly: 'integer',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.promotion.validation.minimalQuantityMustBeLowerThanQuantity',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: '1',
                            active: function () {
                                return scope.completePromotion;
                            }
                        },
                        unit: {
                            fieldTitle: "--.promotion.unit",
                            validationRegex: "^.{0,30}$",
                            validationMessage: ['--.generic.validation.max', '30'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.completePromotion;
                            }
                        },
                        originalPrice: {
                            fieldTitle: "--.promotion.originalUnitPrice",
                            numbersOnly: 'double',
                            validationMessage: '--.generic.validation.numberExpected',
                            validationFct: function () {
                                return scope.fields.originalPrice.field!=null;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "€",
                            active: function () {
                                return scope.completePromotion;
                            }
                        },
                        offPercent: {
                            fieldTitle: "--.promotion.offPercent",
                            numbersOnly: 'percent',
                            validationFct: function () {
                                return scope.fields.offPercent.field!=null && scope.fields.offPercent.field > 0 && scope.fields.offPercent.field < 100;
                            },
                            validationMessage: '--.promotion.validation.offPercent',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "%"
                        },
                        offPrice: {
                            fieldTitle: "--.promotion.offPrice",
                            numbersOnly: 'double',
                            validationMessage: '--.promotion.validation.offPrice',
                            validationFct: function () {
                                return scope.fields.offPrice.field!=null && scope.fields.offPrice.field < scope.fields.originalPrice.field;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "€",
                            active: function () {
                                return scope.completePromotion;
                            }
                        }
                    };
                    var suspendWatch = false;
                    scope.$watch('fields.originalPrice.field', function (o, n) {
                        if (o != n && scope.fields.originalPrice != null && scope.fields.offPercent.field != null && suspendWatch == false) {
                            suspendWatch = true;
                            scope.fields.offPrice.field = scope.fields.originalPrice.field * (1 - scope.fields.offPercent.field);
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });
                    scope.$watch('fields.offPercent.field', function (o, n) {
                        if (o != n && scope.fields.originalPrice != null && scope.fields.offPercent.field != null && suspendWatch == false) {
                            suspendWatch = true;
                            scope.fields.offPrice.field = scope.fields.originalPrice.field * (1 - scope.fields.offPercent.field);
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });
                    scope.$watch('fields.offPrice.field', function (o, n) {
                        if (o != n && scope.fields.originalPrice != null && scope.fields.offPrice.field && suspendWatch == false) {
                            suspendWatch = true;
                            scope.fields.offPercent.field = 1 - scope.fields.offPrice.field / scope.fields.originalPrice.field;
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });


                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
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
                        if (scope.getInfo().dto.description != null)scope.fields.description.field = scope.getInfo().dto.description;
                        if (scope.getInfo().dto.quantity != null)scope.fields.quantity.field = scope.getInfo().dto.quantity;
                        if (scope.getInfo().dto.minimalQuantity != null)scope.fields.minimalQuantity.field = scope.getInfo().dto.minimalQuantity;
                        if (scope.getInfo().dto.originalPrice != null)scope.fields.originalPrice.field = scope.getInfo().dto.originalPrice;
                        if (scope.getInfo().dto.offPercent != null)scope.fields.offPercent.field = scope.getInfo().dto.offPercent;
                        if (scope.getInfo().dto.unit != null)scope.fields.unit.field = scope.getInfo().dto.unit;
                        if (scope.getInfo().dto.startDate != null)scope.fields.startDate.field = scope.getInfo().dto.startDate;
                        if (scope.getInfo().dto.endDate != null)scope.fields.endDate.field = scope.getInfo().dto.endDate;
                        if (scope.getInfo().dto.illustration != null)scope.fields.illustration.field = scope.getInfo().dto.illustration;
                        if (scope.getInfo().dto.quantity == null && scope.update) {
                            scope.completePromotion = false;
                        }
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