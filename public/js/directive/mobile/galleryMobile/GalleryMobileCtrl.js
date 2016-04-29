myApp.directive('galleryMobileCtrl', function ($rootScope) {

    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/js/directive/mobile/galleryMobile/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.display = false;
                    scope.image=null;


                    $rootScope.$on('DISPLAY_PICTURE_IN_GALLERY',function(event,params){
                        scope.display = true;
                        scope.image=params.first;
                        scope.images=params.list;
                    });

                    scope.close = function(){
                        scope.display=false;
                    };

                    scope.openGallery = function (image) {
                        modalService.galleryModal(image, scope.getInfo().images);
                    };

                    scope.previous = function () {
                        for (var key in scope.images) {
                            if (scope.images[key].storedName == scope.image.storedName) {
                                if (scope.images[key - 1] == undefined) {
                                    scope.image = scope.images[scope.images.length - 1];
                                    scope.imageNb = scope.images.length;
                                }
                                else {
                                    scope.image = scope.images[key - 1];
                                    scope.imageNb = key - 1 - -1;
                                }
                                break;
                            }
                        }
                    };

                    scope.next = function () {
                        for (var key in scope.images) {
                            if (scope.images[key].storedName == scope.image.storedName) {
                                var newKey = key - -1;
                                if (scope.images[newKey] == undefined) {
                                    scope.image = scope.images[0];
                                    scope.imageNb = 1;
                                }
                                else {
                                    scope.image = scope.images[newKey];
                                    scope.imageNb = key - -1 - -1;
                                }
                                break;
                            }
                        }
                    };
                }
            }
        }
    }
});