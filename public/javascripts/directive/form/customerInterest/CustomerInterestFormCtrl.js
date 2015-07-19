myApp.directive('customerInterestFormCtrl', function ($flash, directiveService, customerInterestService, $timeout) {
        return {
            restrict: "E",
            scope: directiveService.autoScope({
                ngInfo: '='
            }),
            templateUrl: "/assets/javascripts/directive/form/customerInterest/template.html",
            replace: true,
            transclude: true,
            compile: function () {
                return {
                    pre: function (scope) {
                        return directiveService.autoScopeImpl(scope);
                    },
                    post: function (scope) {
                        directiveService.autoScopeImpl(scope);


                        scope.interests = {};
                        customerInterestService.getAll(function (result) {
                                scope.interests = result;
                                for (var j in scope.interests) {
                                    for (var i in scope.getInfo().result) {
                                        if (scope.getInfo().result[i].name == scope.interests[j].name) {
                                            scope.interests[j].registrationSelection = true;
                                        }
                                    }
                                }
                            }
                        );

                        scope.select = function (interest) {
                            interest.registrationSelection = !interest.registrationSelection;//true;//!scope.interests[interest].selected;
                        };

                        scope.$watch('interests', function (o, n) {
                            if (o != n) {

                                scope.getInfo().isValid = true;


                                scope.getInfo().result = [];

                                for (var key in scope.interests) {
                                    var interest = scope.interests[key];
                                    if (interest.registrationSelection) {
                                        scope.getInfo().result.push(interest);
                                    }
                                }
                            }

                        }, true);
                    }
                }
            }
        }
    }
)
;