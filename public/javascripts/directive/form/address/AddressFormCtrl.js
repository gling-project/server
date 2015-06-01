myApp.directive('addressFormCtrl', function ($flash, directiveService, $timeout, $filter, translationService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/address/template.html",
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

                    if (scope.getInfo().dto.name == undefined ||
                        scope.getInfo().dto.name == null) {
                        scope.getInfo().dto.name = $filter('translateText')('--.generic.home');
                    }

                    scope.fields = {
                        name: {
                            fieldTitle: "--.form.address.field.name",
                            options: [
                                {key: translationService.get('--.address.type.home'), value: '--.address.type.home'},
                                {key: translationService.get('--.address.type.work'), value: '--.address.type.work'},
                                {key: translationService.get('--.address.type.other'), value: '--.address.type.other'}
                            ],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.getInfo().addName == true;
                            }
                        },
                        nameCustom: {
                            fieldType: "text",
                            fieldTitle: "--.form.address.field.name",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '50'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return scope.getInfo().addName;
                            },
                            active: function () {
                                return scope.getInfo().addName && scope.fields.name.field == translationService.get('--.address.type.other');
                            }
                        },
                        street: {
                            fieldType: "text",
                            name: 'street',
                            fieldTitle: "--.form.address.field.street",
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return !scope.getInfo().addName;
                            }
                        },
                        zip: {
                            fieldType: "text",
                            name: 'zip',
                            fieldTitle: "--.form.address.field.zip",
                            validationRegex: "^.{2,20}$",
                            validationMessage: ['--.generic.validation.size', '2', '20'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        },
                        city: {
                            fieldType: "text",
                            name: 'city',
                            fieldTitle: "--.form.address.field.city",
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            }
                        }
                    };

                    scope.$watch('getInfo().dto', function () {
                        if (scope.getInfo().dto.name != null) {
                            for (var key in scope.fields.name.options) {
                                if (scope.getInfo().dto.name == key) {
                                    scope.fields.name.field = key;
                                }
                            }
                            if (scope.fields.name.field == null) {
                                scope.fields.name.field = translationService.get('--.address.type.other');
                                scope.fields.nameCustom.field = scope.getInfo().dto.name;
                            }
                        }
                        if (scope.getInfo().dto.street != null)scope.fields.street.field = scope.getInfo().dto.street;
                        if (scope.getInfo().dto.zip != null)scope.fields.zip.field = scope.getInfo().dto.zip;
                        if (scope.getInfo().dto.city != null)scope.fields.city.field = scope.getInfo().dto.city;
                    }, true);

                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key)) {
                                if (obj.isValid == null || obj.isValid === false) {
                                    obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                    validation = false;
                                }
                                else if (key == 'name' || key == 'nameCustom') {
                                    if (scope.fields.name.field != translationService.get('--.address.type.other')) {
                                        scope.getInfo().dto.name = scope.fields.name.field;
                                    }
                                    else if (scope.fields.nameCustom.isValid) {
                                        scope.getInfo().dto.name = scope.fields.nameCustom.field;
                                    }
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