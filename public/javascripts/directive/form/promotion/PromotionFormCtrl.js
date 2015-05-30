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




                    scope.fields = {
                        description: {
                            fieldTitle: "--.generic.description",
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        quantity: {
                            fieldTitle: "--.promotion.quantity",
                            numbersOnly:'double',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.generic.numberExpected',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        minimalQuantity: {
                            fieldTitle: "--.promotion.minimalQuantity",
                            numbersOnly:'double',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.generic.numberExpected',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field:'1'
                        },
                        price: {
                            fieldTitle: "--.promotion.price",
                            numbersOnly:'double',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.generic.validation.numberExpected',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money:"€"
                        },
                        unit: {
                            fieldTitle: "--.promotion.unit",
                            validationRegex: "^.{0,30}$",
                            validationMessage: ['--.generic.validation.max', '30'],
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
                            validationMessage: '--.generic.validation.notNull',
                            minimalDelay:'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        }
                    };

                    scope.$watch('fields', function () {
                        console.log('balidation !! ');
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
                        if(scope.getInfo().dto.description!=null)scope.fields.description.field = scope.getInfo().dto.description;
                        if(scope.getInfo().dto.quantity!=null)scope.fields.quantity.field = scope.getInfo().dto.quantity;
                        if(scope.getInfo().dto.minimalQuantity!=null)scope.fields.minimalQuantity.field = scope.getInfo().dto.minimalQuantity;
                        if(scope.getInfo().dto.price!=null)scope.fields.price.field = scope.getInfo().dto.price;
                        if(scope.getInfo().dto.unit!=null)scope.fields.unit.field = scope.getInfo().dto.unit;
                        if(scope.getInfo().dto.startDate!=null)scope.fields.startDate.field = scope.getInfo().dto.startDate;
                        if(scope.getInfo().dto.endDate!=null)scope.fields.endDate.field = scope.getInfo().dto.endDate;
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