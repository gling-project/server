myApp.directive('categoryLineCtrl', function ($rootScope, businessService, geolocationService, directiveService, $location) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/categoryLine/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.searchCat = function(categoryName){
                        $location.path('/search/category:'+categoryName);
                    }
                }
            }
        }
    }
});