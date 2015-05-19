myApp.directive('customerInterestFormCtrl', function ($flash, directiveService,customerInterestService,$timeout) {
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
                    customerInterestService.getAll(function (result){
                        console.log(result);
                        scope.interests = result.list;
                    });

                    scope.select = function(interest){
                        console.log("jjjj");
                        interest.selected = !interest.selected;//true;//!scope.interests[interest].selected;
                    };

                    scope.$watch('interests', function () {
                        scope.getInfo().isValid = true;


                        scope.getInfo().result = [];

                        for(var key in scope.interests){
                            var interest = scope.interests[key];
                            if(interest.selected){
                                scope.getInfo().result.push(interest);
                            }
                        }

                    }, true);

                    $timeout(function() {
                        scope.loadingFinish = true;
                    },800);
                }
            }
        }
    }
});