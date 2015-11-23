myApp.directive("headerSearchCtrl", function ($rootScope,$location,$timeout,modalService) {
    return {
        restrict: "E",
        scope: {
            title: '=',
            displayMenu: '='
        },
        templateUrl: "/assets/js/directive/mobile/headerSearch/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.showMenu = function(){
                        $rootScope.$broadcast('toggleMenu');
                    };

                    scope.displayBack = function(){
                        return window.history.length>0;
                    };


                    scope.back = function () {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        modalService.openLoadingModal();
                        $timeout(function(){
                            $location.url('/');
                        },1);
                    };




                }
            }
        }
    }
});
