myApp.directive('businessFormCtrl', function ( $flash, directiveService) {

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
                            //isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'name'
                        },
                        description: {
                            fieldTitle: "--.generic.desc",
                            validationRegex: "^.{0,1500}$",
                            validationMessage: ['--.generic.validation.size', '0', '1500'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        phone: {
                            fieldTitle: "--.generic.phone",
                            validationRegex: "^[0-9. *-+]{6,16}$",
                            validationMessage: '--.validation.dto.notNull',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'phone'
                        },
                        email: {
                            fieldTitle: "--.business.contactEmail",
                            validationRegex: /^($|(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                            validationMessage: '--.validation.dto.notNull',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        website: {
                            fieldTitle: "--.business.website",
                            validationRegex: "^($|https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$)",
                            validationMessage: '--.validation.dto.notNull',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'website'
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


});