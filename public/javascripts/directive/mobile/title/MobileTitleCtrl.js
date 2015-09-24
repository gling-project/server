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

                    scope.displayBack = function(){
                        console.log('window.history.length:'+window.history.length);
                        return window.history.length>0;
                    };

                    scope.back = function () {
                        console.log('BACK4 !! ');
                        window.history.back();
                    };

                }
            }
        }
    }
});
