myApp.directive('publicationListCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/component/publicationList/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.getInfo().loading = true;


                    scope.$watch("getInfo().data", function () {
                        scope.publications = scope.getInfo().data;
                        for (var i in scope.publications) {
                            scope.publications[i].interval = (scope.publications[i].endDate - new Date());
                        }
                    });

                }
            }
        }
    }
});