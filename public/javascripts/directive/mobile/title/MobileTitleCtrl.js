myApp.directive("mobileTitleCtrl", function () {
    return {
        restrict: "E",
        scope: {
            title: '=',
            displayMenu: '='
        },
        templateUrl: "/assets/javascripts/directive/mobile/title/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {
                }
            }
        }
    }
});
