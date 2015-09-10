myApp.directive('publicationListCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationList/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.click = function () {
                        console.log(scope.publication);
                    };

                    scope.getInfo().loading = true;

                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };

                    scope.$watch("getInfo().data", function () {
                        scope.publications = scope.getInfo().data;
                        for (var i in scope.publications) {
                            scope.publications[i].interval = (scope.publications[i].endDate - new Date());
                        }
                    });

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
                }
            }
        }
    }
});