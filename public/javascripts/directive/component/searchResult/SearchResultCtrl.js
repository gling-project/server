myApp.directive('searchResultCtrl', function (directiveService, $location) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/searchResult/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    scope.selected = null;

                    scope.top = function(){

                    };

                    scope.bottom = function(){

                    };



                    scope.navigateTo = function (target) {
                        $location.path(target);
                        scope.getInfo().display=false;
                        scope.getInfo().cleanSearch();
                    };

                }
            }
        }
    }
});