myApp.directive("mobileTitleCtrl", function ($rootScope) {
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

                    scope.showMenu = function(){
                        console.log('showMenu');
                        $rootScope.$broadcast('toggleMenu');
                    };

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
