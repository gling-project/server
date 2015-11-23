myApp.directive("compile", function ($compile, $filter) {
    return function (scope, element, attrs) {
        scope.$watch(
            function (scope) {
                return scope.$eval(attrs.compile);
            },
            function (value, o) {
                value = $filter('translateText')(value);
                element.html(value);
                $compile(element.contents())(scope);
            }
        )
    };
});