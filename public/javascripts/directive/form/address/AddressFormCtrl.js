myApp.directive('addressFormCtrl', function ($flash, directiveService, $timeout, $filter, translationService,modalService) {
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

                    var names = [
                        {key: translationService.get('--.address.type.home'), value: '--.address.type.home'},
                        {key: translationService.get('--.address.type.work'), value: '--.address.type.work'},
                        {key: translationService.get('--.address.type.other'), value: '--.address.type.other'}
                    ];

                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            name:$filter('translateText')('--.generic.home')
                        };
                    }
                    else{
                        var founded=false;
                        for (var key in names) {
                            if(key == scope.getInfo().dto.name){
                                founded=true;
                            }
                        }
                        if(!founded){
                            names.push({key:scope.getInfo().dto.name,value:scope.getInfo().dto.name});
                        }
                    }

                    scope.fields = {
                        name: {
                            fieldTitle: "--.form.address.field.name",
                            options: names,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.getInfo().addName == true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'name'
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
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'street'
                        },
                        zip: {
                            fieldType: "text",
                            name: 'zip',
                            fieldTitle: "--.form.address.field.zip",
                            validationRegex: "^.{2,20}$",
                            validationMessage: ['--.generic.validation.size', '2', '20'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'zip'
                        },
                        city: {
                            fieldType: "text",
                            name: 'city',
                            fieldTitle: "--.form.address.field.city",
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'city'
                        }
                    };

                    scope.$watch('getInfo().dto', function () {
                        if (scope.getInfo().dto.name == translationService.get('--.address.type.other')) {
                            modalService.openOneFieldModal({name:'--.address.customName.fieldTitle'},function(data){
                                names.push({key:data,value:data});
                                scope.getInfo().dto.name = data;
                            });
                        }
                    }, true);

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key)) {
                                if (obj.isValid == null || obj.isValid === false) {
                                    obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                    validation = false;
                                }
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
});