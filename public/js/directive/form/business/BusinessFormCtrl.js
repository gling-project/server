myApp.directive('businessFormCtrl', function ($flash, directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/form/business/template.html",
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

                    console.log('scope.getInfo().status : ' + scope.getInfo().status);


                    scope.fields = {
                        name: {
                            name: 'name',
                            fieldTitle: "--.generic.name",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '250'],
                            focus: function () {
                                return true;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled || (scope.getInfo().status !=undefined && scope.getInfo().status === 'PUBLISHED');
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'name'
                        },
                        vta: {
                            name: 'vta',
                            fieldTitle: "--.business.vta",
                            validationRegex: /^($|[a-zA-Z0-9\.\- ]{6,20}$)/,
                            validationMessage: '--.validation.dto.vta',
                            disabled: function () {
                                return scope.getInfo().disabled || (scope.getInfo().status !=undefined && scope.getInfo().status === 'PUBLISHED');
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'vta'
                        },
                        description: {
                            name: 'description',
                            fieldTitle: "--.generic.desc",
                            validationRegex: /^[\s\S]{2,1500}$/gi,
                            validationMessage: ['--.generic.validation.size', '2', '1500'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        phone: {
                            name: 'phone',
                            fieldTitle: "--.generic.phone",
                            validationRegex: /^[0-9. *-+\/]{6,16}$/,
                            validationMessage: '--.validation.dto.phone',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'phone'
                        },
                        email: {
                            name: 'business-email',
                            fieldTitle: "--.business.contactEmail",
                            validationRegex: /^($|((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$))/,
                            validationMessage: '--.validation.dto.notNull',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        website: {
                            name: 'website',
                            fieldTitle: "--.business.website",
                            validationRegex: /^($|^(http[s]?:\/\/(www\.)?)[0-9A-Za-z-\.@:%_\+~#=]+\.[a-zA-Z]{2,3}((\/|\?).*)?$)/,
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
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