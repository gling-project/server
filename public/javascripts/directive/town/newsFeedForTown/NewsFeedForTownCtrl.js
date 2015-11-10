myApp.directive('newsFeedForTownCtrl', function ($rootScope, directiveService, townService, $modal) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/town/newsFeedForTown/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.publicationLoading = true;
                    scope.promotionLoading = true;

                    townService.getPublications('1160', 0, function (data) {
                        scope.publicationLoading = false;
                        scope.publications = data;
                    });

                    townService.getPromotions('1160', 0, function (data) {
                        scope.promotionLoading = false;
                        scope.promotions = data;
                    });

                }
            }
        }
    }
});