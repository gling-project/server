myApp.directive('facebookSharePublicationCtrl', function ($rootScope, businessService, geolocationService, directiveService, facebookService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/facebookSharePublication/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.share = function(){
                        facebookService.sharePublication(scope.getInfo().publication);
                    };

                }
            }
        }
    }
});