myApp.directive("dirTopArrow", function() {
    return function(scope, element, attrs) {
        return element.bind("keydown keypress", function(event) {
            console.log(event.which);
            if (event.which === 13) {
                scope.$apply(function() {
                    return scope.$eval(attrs.dirEnter);
                });
                return event.preventDefault();
            }
        });
    };
});
