myApp.directive('newsFeedForTownCtrl', function ($rootScope, directiveService, townService, $location) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/town/newsFeedForTown/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.loading = true;

                    townService.getPublications('1160', 0, function (data) {
                        scope.notifications = data.notifications;
                        scope.promotions = data.promotions;
                        scope.loading = false;
                    });


                }
            }
        }
    }
});