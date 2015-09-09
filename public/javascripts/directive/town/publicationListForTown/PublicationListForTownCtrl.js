myApp.directive('publicationListForTownCtrl', function ($rootScope, directiveService, townService,$modal) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/town/publicationListForTown/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    console.log('heloooooo');

                    scope.$watch('getInfo().businessId', function () {
                        if (scope.getInfo().businessId != null) {
                            console.log('watcher !! ');
                            townService.getPublicationByBusiness(scope.getInfo().businessId, 0, function (data) {
                                scope.publications = data;
                            });
                        }
                    });


                    scope.openGallery = function (image,publication) {
                        var resolve = {
                            image: function () {
                                return image;
                            },
                            images: function () {
                                return publication.pictures;
                            }
                        };
                        $modal.open({
                            templateUrl: "/assets/javascripts/modal/GalleryModal/view.html",
                            controller: "GalleryModalCtrl",
                            windowClass:'modal-gallery-content',
                            size: "lg",
                            resolve: resolve
                        });
                    };


                }
            }
        }
    }
});