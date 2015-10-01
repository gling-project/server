myApp.directive("headerSearchCtrl", function ($rootScope,$location) {
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

                    scope.showMenu = function(){
                        console.log('shox manue !! ');
                        $rootScope.$broadcast('toggleMenu');
                    };

                    scope.displayBack = function(){
                        return window.history.length>0;
                    };

                    scope.back = function () {
                        $location.path('/');//window.history.back();
                    };




                }
            }
        }
    }
});
