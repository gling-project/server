myApp.directive('publicationListMobileCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationListMobile/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.getInfo().loading = true;

                    scope.getInterestClass = function (publication) {
                        if (publication.interest != null) {
                            return 'gling-icon-' + publication.interest.name;
                        }
                        return null;
                    };

                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };

                    scope.openGallery = function (image, publication) {
                        $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY',{list:publication.pictures,first:image});
                    };

                    scope.$watch("getInfo().data", function () {
                        scope.publications = scope.getInfo().data;
                        for (var i in scope.publications) {
                            scope.publications[i].interval = (scope.publications[i].endDate - new Date());
                        }
                    });

                }
            }
        }
    }
});