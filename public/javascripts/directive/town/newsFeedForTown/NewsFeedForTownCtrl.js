myApp.directive('newsFeedForTownCtrl', function ($rootScope, directiveService, townService,$modal) {

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

                    townService.getPublications('1160',0,function(data){
                        console.log(data);
                        scope.publications=data;
                    });

                    townService.getPromotions('1160',0,function(data){
                        console.log(data);
                        scope.promotions=data;
                    });

                }
            }
        }
    }
});