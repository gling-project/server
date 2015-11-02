myApp.directive("dirFieldImageMultipleResizable", function ($rootScope,directiveService, $upload, $flash, $filter, generateId, imageService, modalService,constantService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldImageMultipleResizable/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.id = generateId.generate();
                    scope.errorMessage = "";
                    scope.images = [];

                    scope.isActive = function () {

                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                        scope.getInfo().field[scope.getInfo().fieldName] = [];
                    }

                    scope.isValid = function () {
                        if ((scope.getInfo().optional != null && scope.getInfo().optional()) || scope.isActive() == false) {
                            scope.getInfo().isValid = true;
                        }
                        else {
                            scope.getInfo().isValid = scope.getInfo().field[scope.getInfo().fieldName].length > 0;
                        }

                    };
                    scope.isValid();

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };

                    scope.remove = function (imageContainer) {
                        for (var key in scope.images) {
                            if (scope.images[key] == imageContainer) {
                                scope.images.splice(key, 1);
                            }
                        }
                    };

                    scope.success = false;
                    //
                    ////build images (first time)
                    //for (var key in scope.getInfo().field[scope.getInfo().fieldName]) {
                    //    scope.images.push({
                    //        image: scope.getInfo().field[scope.getInfo().fieldName][key]
                    //    });

                    scope.resize = function (imageContainer) {
                        var dto = {
                            image: angular.copy(imageContainer.originalImage),
                            maxWidth: scope.getInfo().maxWidth,
                            maxHeight: scope.getInfo().maxHeight
                        };
                        if(constantService.isMobile) {
                            modalService.resizeImageMobileModal(dto
                                , function (close) {
                                    close();
                                    imageContainer.image = dto.result;
                                });
                        }
                        else{
                            modalService.basicModal('--.field.imageMultipleResize.resizeModal.title', 'image-tool-ctrl', dto
                                , function (close) {
                                    close();
                                    imageContainer.image = dto.result;
                                });
                        }
                    };

                    scope.$watch('images', function () {
                        scope.getInfo().field[scope.getInfo().fieldName] = [];
                        for (var key in scope.images) {
                            scope.getInfo().field[scope.getInfo().fieldName].push({
                                originalName: scope.images[key].originalName,
                                image64: scope.images[key].image,
                                comment: scope.images[key].comment
                            });
                        }
                        scope.isValid();
                    }, true);


                    //resize the image by default
                    scope.defaultResize = function (img) {
                        return imageService.resizeImage(img, scope.getInfo().maxWidth, scope.getInfo().maxHeight);
                    };

                    //create the file with default resizing
                    scope.treatFile = function (img, fileName) {

                        //control size
                        //convert img to htmlImage
                        var imgHtml = document.createElement("img");
                        imgHtml.setAttribute('src', img);
                        var src = imgHtml, success = true;


                        if (scope.getInfo().maxHeight != null && scope.getInfo().maxHeight > src.height) {
                            $flash.error($filter('translateText')('--.field.imageMultipleResize.minimalHeight', scope.getInfo().maxHeight));
                            success = false;
                        }
                        if (scope.getInfo().maxWidth != null && scope.getInfo().maxWidth > src.width) {
                            $flash.error($filter('translateText')('--.field.imageMultipleResize.minimalWidth', scope.getInfo().maxWidth));
                            success = false;
                        }

                        if (success) {
                            scope.images.push({
                                originalName: fileName,
                                originalImage: img,
                                comment: null,
                                image: scope.defaultResize(angular.copy(img))
                            });
                            scope.$apply();
                        }
                    };

                    scope.fullSize = function (image) {
                        var images = [];
                        for (var key in scope.images) {
                            images.push(scope.images[key].image);
                        }
                        if(constantService.isMobile === true) {
                            modalService.galleryModal(image, images);
                        }
                        else{
                            $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY',{list:images,first:image});
                        }
                    };

                    //read file and convert to base64
                    scope.readURL = function (input) {

                        if (input.files && input.files[0]) {
                            var reader = new FileReader();

                            var fileName = input.files[0].name;

                            reader.onload = function (e) {
                                scope.treatFile(e.target.result, fileName);
                            };

                            reader.readAsDataURL(input.files[0]);
                        }
                    };

                    //catch change value of input and call readURL
                    $("#a").change(function () {
                        scope.readURL(this);
                    });

                    scope.convertToNumber = function (number) {

                        number = parseInt(number);
                        if (isNaN(number)) {
                            number = null;
                        }
                        return number;
                    };

                    scope.$watch('getInfo().maxHeight', function (n, o) {
                        if (n != o) {
                            scope.getInfo().maxHeight = scope.convertToNumber(scope.getInfo().maxHeight);
                        }
                    });
                    scope.$watch('getInfo().maxWidth', function (n, o) {
                        if (n != o) {
                            scope.getInfo().maxWidth = scope.convertToNumber(scope.getInfo().maxWidth);
                        }
                    });
                    scope.getInfo().maxHeight = scope.convertToNumber(scope.getInfo().maxHeight);
                    scope.getInfo().maxWidth = scope.convertToNumber(scope.getInfo().maxWidth);


                }
            };
        }
    };
});