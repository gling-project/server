myApp.directive('galleryCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, accountService, followService, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/gallery/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.openGallery = function (image) {
                        modalService.galleryModal(image, scope.getInfo().images);
                    }
                }
            }
        }
    }
});