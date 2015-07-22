myApp.directive('businessSocialNetworkCtrl', function ( $flash, directiveService,languageService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/businessSocialNetwork/template.html",
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
                        facebook: {
                            fieldTitle: "--.generic.facebook",
                            fieldImage:'assets/social_network/facebook.png',
                            validationRegex: "^https://facebook\.com/.*$",
                            validationMessage: '--.generic.validation.facebook',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'facebookLink',
                            placeholder:'https://facebook.com/'
                        },
                        twitter: {
                            fieldTitle: "--.generic.twitter",
                            fieldImage:'assets/social_network/twitter.png',
                            validationRegex: "^https://twitter\.com/.*$",
                            validationMessage: '--.generic.validation.twitter',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'twitterLink',
                            placeholder:'https://twitter.com/'
                        },
                        googleplus: {
                            fieldTitle: "--.generic.googleplus",
                            fieldImage:'assets/social_network/googleplus.png',
                            validationRegex: "^https://plus\.google\.com/.*$",
                            validationMessage: '--.generic.validation.googleplus',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'googleplusLink',
                            placeholder:'https://plus.google.com/'
                        },
                        foursquare: {
                            fieldTitle: "--.generic.foursquare",
                            fieldImage:'assets/social_network/foursquare.png',
                            validationRegex: "^https://[a-z]+\.foursquare\.com/.*$",
                            validationMessage: '--.generic.validation.foursquare',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'foursquareLink',
                            placeholder:'https://'+languageService.currentLanguage.code+'foursquare.com/'
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