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

                    scope.top = function () {

                    };

                    scope.bottom = function () {

                    };

                    scope.seeAll = function () {

                    };

                    scope.seeAllPublication = function () {

                    };

                    scope.seeAllBusiness = function () {

                    };

                    //element.bind("keydown keypress", function(event) {
                    //    console.log(event.which);
                    //    if (event.which === 40) {
                    //        scope.$apply(function() {
                    //            console.log('down');
                    //        });
                    //        return event.preventDefault();
                    //    }
                    //    else if (event.which === 38) {
                    //        scope.$apply(function() {
                    //            console.log('up');
                    //        });
                    //        return event.preventDefault();
                    //    }
                    //});


                    scope.navigateTo = function (target) {
                        $location.path(target);
                        scope.getInfo().display = false;
                        scope.getInfo().cleanSearch();
                    };

                }
            }
        }
    }
});