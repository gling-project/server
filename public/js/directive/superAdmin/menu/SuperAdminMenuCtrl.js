myApp.directive('superAdminMenuCtrl', function ($rootScope, businessService, geolocationService, directiveService, accountService,modalService,$location) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/superAdmin/menu/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    if (accountService.getMyself() == null || accountService.getMyself().role != 'SUPERADMIN') {
                        modalService.openLoginModal();
                    }

                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };


                }
            }
        }
    }
});