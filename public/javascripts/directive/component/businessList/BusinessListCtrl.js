myApp.directive('businessListCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/businessList/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    scope.getInfo().loading = true;


                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };

                    scope.$watch("getInfo().data", function () {
                        scope.businesses = scope.getInfo().data;
                    });
                }
            }
        }
    }
});