myApp.directive('promotionFormCtrl', function ($flash, directiveService) {

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

                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            startDate:new Date()
                        };
                    }


                    scope.$watch('getInfo().dto', function () {
                        console.log("binding !! ");
                        scope.fields.description.field = scope.getInfo().dto.description;
                        scope.fields.quantity.field = scope.getInfo().dto.quantity;
                        scope.fields.minimalQuantity.field = scope.getInfo().dto.minimalQuantity;
                        scope.fields.price.field = scope.getInfo().dto.price;
                        scope.fields.unit.field = scope.getInfo().dto.unit;
                        scope.fields.startDate.field = scope.getInfo().dto.startDate;
                        scope.fields.endDate.field = scope.getInfo().dto.endDate;
                    });

                    scope.fields = {
                        description: {
                            fieldTitle: "--.generic.description",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '50'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        quantity: {
                            fieldTitle: "--.promotion.quantity",
                            numbersOnly:true,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        minimalQuantity: {
                            fieldTitle: "--.promotion.minimalQuantity",
                            numbersOnly:true,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        price: {
                            fieldTitle: "--.promotion.price",
                            numbersOnly:true,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        unit: {
                            fieldTitle: "--.promotion.unit",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        startDate: {
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay:'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        endDate: {
                            fieldTitle: "--.promotion.endDate",
                            minimalDelay:'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
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
                }
            }
        }
    }


})
;