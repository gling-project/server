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
                            name:'facebook',
                            fieldTitle: "--.generic.facebook",
                            fieldImage:'assets/social_network/facebook.png',
                            validationRegex: "^($|https://www.facebook\.com/.*$)",
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
                            name:'twitter',
                            fieldTitle: "--.generic.twitter",
                            fieldImage:'assets/social_network/twitter.png',
                            validationRegex: "^($|^https://twitter\.com/.*$)",
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
                        instagram: {
                            name:'instagram',
                            fieldTitle: "--.generic.instagram",
                            fieldImage:'assets/social_network/instagram.png',
                            validationRegex: "^($|^https://instagram\.com/.*$)",
                            validationMessage: '--.generic.validation.instagram',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'instagramLink',
                            placeholder:'https://instagram.com/'
                        },
                        delivery: {
                            name:'delivery',
                            fieldTitle: "--.business.socialNetwork.delivery",
                            fieldImage:'assets/social_network/delivery.png',
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'deliveryLink',
                            placeholder:'http://...'
                        },
                        ecommerce: {
                            name:'ecommerce',
                            fieldTitle: "--.business.socialNetwork.ecommerce",
                            fieldImage:'assets/social_network/e-commerce.png',
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'ecommerceLink',
                            placeholder:'http://...'
                        },
                        opinion: {
                            name:'opinion',
                            fieldTitle: "--.business.socialNetwork.opinion",
                            fieldImage:'assets/social_network/opinion.png',
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'opinionLink',
                            placeholder:'http://...'
                        },
                        reservation: {
                            name:'reservation',
                            fieldTitle: "--.business.socialNetwork.reservation",
                            fieldImage:'assets/social_network/reservation.png',
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'reservationLink',
                            placeholder:'http://...'
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