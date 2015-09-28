myApp.directive("headerSearchCtrl", function () {
    return {
        restrict: "E",
        scope: {
            title: '=',
            displayMenu: '='
        },
        templateUrl: "/assets/javascripts/directive/mobile/headerSearch/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.displayBack = function(){
                        return window.history.length>0;
                    };

                    scope.back = function () {
                        window.history.back();
                    };




                }
            }
        }
    }
});
