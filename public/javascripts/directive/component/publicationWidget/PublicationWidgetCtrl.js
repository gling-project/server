myApp.directive('publicationWidgetCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationWidget/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.descriptionLimit = 200;
                    scope.descriptionLimitBase = scope.descriptionLimit;

                    directiveService.autoScopeImpl(scope);

                    scope.click = function () {
                        console.log(scope.publication);
                    };

                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };

                    scope.getInterestClass = function (publication) {
                        if (publication.interest != null) {
                            return 'gling-icon-' + publication.interest.name;
                        }
                        return null;
                    };

                    var isEmpty = function (val) {
                        return val == undefined || val === null || val === "";
                    };

                    scope.descriptionIsEmpty = function (publication) {
                        return publication.type != 'PROMOTION' && isEmpty(publication.description);
                    };

                    scope.openGallery = function (image, publication) {
                        modalService.galleryModal(image, publication.pictures);
                    };

                    scope.getIllustrationClass = function (picture) {

                        if (picture!= undefined && picture.height > picture.width) {
                            return 'publication-illustration-high';
                        }
                        else {
                            return 'publication-illustration';
                        }
                    }
                }
            }
        }
    }
});