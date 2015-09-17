myApp.directive("footerBarCtrl", function (addressService, $rootScope, languageService, $location, accountService, facebookService, modalService, $timeout, geolocationService, addressService) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/web/footerBar/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {
                }
            }
        }
    }
});
