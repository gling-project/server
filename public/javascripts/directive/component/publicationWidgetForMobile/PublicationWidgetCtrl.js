myApp.directive('publicationWidgetCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService, $timeout) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationWidgetForMobile/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.descriptionLimitBase = 250;
                    scope.descriptionLimit = scope.descriptionLimitBase;
                    scope.getInfo().loading = true;

                    scope.getInterestClass = function (publication) {
                        if (publication.interest != null) {
                            return 'gling-icon-' + publication.interest.name;
                        }
                        return null;
                    };

                    scope.navigateTo = function (target) {
                        $rootScope.$broadcast('PROGRESS_BAR_START');
                        modalService.openLoadingModal();
                        $timeout(function () {
                            $location.path(target);
                        }, 1);
                    };

                    scope.openGallery = function (image, publication) {
                        $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY', {list: publication.pictures, first: image});
                    };
                }
            }
        }
    }
});