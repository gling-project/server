myApp.directive('toTopCtrl', function ($window) {

    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/js/directive/component/toTop/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {

                    //to top
                    scope.toTop = function () {
                        $(window).scrollTop(0);
                    };

                    scope.displayToTopButton = $(window).scrollTop() > 100;
                    angular.element($window).bind("scroll", function () {
                        scope.displayToTopButton = $(window).scrollTop() > 100;
                        scope.$apply();
                    });
                }
            }
        }
    }
});