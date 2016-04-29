myApp.directive('imageToolCtrl', function ($rootScope, businessService, geolocationService, directiveService, $timeout, fileService, $filter, $flash) {

        return {
            restrict: "E",
            scope: directiveService.autoScope({
                ngInfo: '='
            }),
            templateUrl: "/assets/js/tool/imageTool/template.html",
            replace: true,
            transclude: true,
            compile: function () {
                return {
                    post: function (scope) {
                        directiveService.autoScopeImpl(scope);


                        scope.image_target = null;


                        // Assign the container to a variable
                        scope.orig_src = new Image();
                        scope.constrain = true;
                        scope.min_width = 60; // Change as required
                        scope.min_height = 60;
                        scope.max_width = 10000; // Change as required
                        scope.max_height = 10000;
                        scope.event_state = {};
                        scope.resize_canvas = document.createElement('canvas');
                        scope.canvasWidth = scope.getInfo().maxWidth != null ? scope.getInfo().maxWidth : scope.getInfo().maxHeight * 1.5;
                        scope.canvasHeight = scope.getInfo().maxHeight != null ? scope.getInfo().maxHeight : scope.getInfo().maxWidth * 1.5;
                        scope.displayPicture = false;


                        scope.saveEventState = function (e) {
                            // Save the initial event details and container state
                            scope.event_state.container_width = scope.container.width();
                            scope.event_state.container_height = scope.container.height();
                            scope.event_state.container_left = scope.container.offset().left;
                            scope.event_state.container_top = scope.container.offset().top;
                            scope.event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
                            scope.event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

                            // This is a fix for mobile safari
                            // For some reason it does not allow a direct copy of the touches property
                            if (typeof e.originalEvent.touches !== 'undefined') {
                                scope.event_state.touches = [];
                                $.each(e.originalEvent.touches, function (i, ob) {
                                    scope.event_state.touches[i] = {};
                                    scope.event_state.touches[i].clientX = 0 + ob.clientX;
                                    scope.event_state.touches[i].clientY = 0 + ob.clientY;
                                });
                            }
                            scope.event_state.evnt = e;
                        };

                        scope.resizeImage = function (width, height) {
                            scope.resize_canvas.width = width;
                            scope.resize_canvas.height = height;
                            scope.resize_canvas.getContext('2d').drawImage(scope.orig_src, 0, 0, width, height);
                            $(scope.image_target).attr('src', scope.resize_canvas.toDataURL("image/png"));
                        };

                        scope.startMoving = function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            scope.saveEventState(e);
                            $(document).on('mousemove touchmove', scope.moving);
                            $(document).on('mouseup touchend', scope.endMoving);
                        };

                        scope.endMoving = function (e) {
                            e.preventDefault();
                            $(document).off('mouseup touchend', scope.endMoving);
                            $(document).off('mousemove touchmove', scope.moving);
                        };

                        scope.moving = function (e) {
                            var mouse = {}, touches;
                            e.preventDefault();
                            e.stopPropagation();

                            touches = e.originalEvent.touches;

                            mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
                            mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();

                            scope.container.offset({
                                'left': mouse.x - ( scope.event_state.mouse_x - scope.event_state.container_left ),
                                'top': mouse.y - ( scope.event_state.mouse_y - scope.event_state.container_top )
                            });
                            // Watch for pinch zoom gesture while moving
                            if (scope.event_state.touches && scope.event_state.touches.length > 1 && touches.length > 1) {
                                var width = scope.event_state.container_width, height = scope.event_state.container_height;
                                var a = scope.event_state.touches[0].clientX - scope.event_state.touches[1].clientX;
                                a = a * a;
                                var b = scope.event_state.touches[0].clientY - scope.event_state.touches[1].clientY;
                                b = b * b;
                                var dist1 = Math.sqrt(a + b);

                                a = e.originalEvent.touches[0].clientX - touches[1].clientX;
                                a = a * a;
                                b = e.originalEvent.touches[0].clientY - touches[1].clientY;
                                b = b * b;
                                var dist2 = Math.sqrt(a + b);

                                var ratio = dist2 / dist1;

                                width = width * ratio;
                                height = height * ratio;
                                // To improve performance you might limit how often resizeImage() is called
                                scope.resizeImage(width, height);
                            }
                        };

                        scope.getInfo().callBackSave = function () {

                            if (scope.image_target != null) {

                                //Find the part of the image that is inside the crop box
                                var crop_canvas,
                                    left = $('.image-tool-overlay').offset().left - scope.container.offset().left,
                                    top = $('.image-tool-overlay').offset().top - scope.container.offset().top,
                                    width = scope.canvasWidth,
                                    height = scope.canvasHeight;

                                crop_canvas = document.createElement('canvas');
                                crop_canvas.width = width;
                                crop_canvas.height = height;

                                console.log("result : " + left + "/" + top + "/" + width + "/" + height);

                                crop_canvas
                                    .getContext('2d')
                                    .scale(scope.scale, scope.scale);
                                crop_canvas
                                    .getContext('2d')
                                    .drawImage(scope.image_target, left, top, width, height, 0, 0, width, height);
                                var image64 = crop_canvas.toDataURL();
                                scope.getInfo().result = image64;


                                console.log(image64);

                                //fileService.uploadFile64(scope.fileName, image64);
                            }
                        };

                        scope.zoom = function (plus) {

                            if (scope.image_target != null) {

                                var width, height, factor = 0.1, left, top;
                                if (plus) {
                                    console.log(scope.image_target.width + '/' + (1 + factor) + '/' + scope.image_target.width * (1 + factor));
                                    width = scope.image_target.width * (1 + factor);
                                    height = width / scope.orig_src.width * scope.orig_src.height;
                                    left = scope.container.offset().left - (Math.abs(scope.image_target.width - width) / 2);
                                    top = scope.container.offset().top - (Math.abs(scope.image_target.height - height) / 2);
                                }
                                else {
                                    width = scope.image_target.width * (1 - factor);
                                    height = width / scope.orig_src.width * scope.orig_src.height;
                                    left = scope.container.offset().left + (Math.abs(scope.image_target.width - width) / 2);
                                    top = scope.container.offset().top + (Math.abs(scope.image_target.height - height) / 2);
                                }

                                scope.resize(width, height, left, top);
                            }
                        };

                        scope.resizing = function (e) {
                            var mouse = {}, width, height, left, top, offset = scope.container.offset();
                            mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
                            mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

                            // Position image differently depending on the corner dragged and constraints
                            if ($(scope.event_state.evnt.target).hasClass('resize-handle-se')) {
                                width = mouse.x - scope.event_state.container_left;
                                height = mouse.y - scope.event_state.container_top;
                                left = scope.event_state.container_left;
                                top = scope.event_state.container_top;
                            } else if ($(scope.event_state.evnt.target).hasClass('resize-handle-sw')) {
                                width = scope.event_state.container_width - (mouse.x - scope.event_state.container_left);
                                height = mouse.y - scope.event_state.container_top;
                                left = mouse.x;
                                top = scope.event_state.container_top;
                            } else if ($(scope.event_state.evnt.target).hasClass('resize-handle-nw')) {
                                width = scope.event_state.container_width - (mouse.x - scope.event_state.container_left);
                                height = scope.event_state.container_height - (mouse.y - scope.event_state.container_top);
                                left = mouse.x;
                                top = mouse.y;
                                if (scope.constrain || e.shiftKey) {
                                    top = mouse.y - ((width / scope.orig_src.width * scope.orig_src.height) - height);
                                }
                            } else if ($(scope.event_state.evnt.target).hasClass('resize-handle-ne')) {
                                width = mouse.x - scope.event_state.container_left;
                                height = scope.event_state.container_height - (mouse.y - scope.event_state.container_top);
                                left = scope.event_state.container_left;
                                top = mouse.y;
                                if (scope.constrain || e.shiftKey) {
                                    top = mouse.y - ((width / scope.orig_src.width * scope.orig_src.height) - height);
                                }
                            }

                            scope.resize(width, height, left, top);

                        };

                        scope.resize = function (width, height, left, top) {


                            console.log(width + "/" + height + "/" + left + "/" + top);

                            // Optionally maintain aspect ratio
                            if (scope.constrain || e.shiftKey) {
                                height = width / scope.orig_src.width * scope.orig_src.height;
                            }

                            if (width >= scope.min_width && height >= scope.min_height && width <= scope.max_width && height <= scope.max_height) {
                                // To improve performance you might limit how often resizeImage() is called
                                scope.resizeImage(width, height);
                                // Without this Firefox will not re-calculate the the image dimensions until drag end
                                scope.container.offset({'left': left, 'top': top});
                            }
                        };


                        scope.startResize = function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            scope.saveEventState(e);
                            $(document).on('mousemove touchmove', scope.resizing);
                            $(document).on('mouseup touchend', scope.endResize);
                        };

                        scope.endResize = function (e) {
                            e.preventDefault();
                            $(document).off('mouseup touchend', scope.endResize);
                            $(document).off('mousemove touchmove', scope.resizing);
                        };


                        //scope.initialize = function (img) {

                        $timeout(function () {


                            scope.displayPicture = false;


                            $('.resize-image').attr('src', scope.getInfo().image);

                            // Some variable and settings
                            scope.image_target = $('.resize-image').get(0);

                            // Wrap the image with the container and add resize handles
                            scope.orig_src.src = scope.getInfo().image;


                            scope.container = $(scope.image_target).parent('.resize-container');
                            // Add events
                            scope.container.on('mousedown touchstart', '.resize-handle', scope.startResize);
                            scope.container.on('mousedown touchstart', 'img', scope.startMoving);


                            $timeout(function () {

                                var width = scope.image_target.width,
                                    height = scope.image_target.height;

                                console.log(width + "/" + height);

                                scope.displayPicture = true;

                                //compute proportion
                                var proportionWidth = scope.image_target.width / scope.canvasWidth;
                                var proportionHeight = scope.image_target.height / scope.canvasHeight;

                                if (proportionWidth < proportionHeight || scope.getInfo().maxHeight == null) {
                                    scope.resize(scope.canvasWidth, scope.image_target.height / proportionWidth);
                                }
                                else {
                                    scope.resize(scope.image_target.width / proportionHeight, scope.canvasHeight);
                                }

                                //need scale ??
                                console.log(".image-tool-overlay=>" + $(".image-tool-overlay").width());
                                if ($(".image-tool-overlay").width() < scope.canvasWidth) {
                                    scope.scale = scope.canvasWidth / $(".image-tool-overlay").width();
                                }
                                else {
                                    scope.scale = 1;
                                }
                                console.log(scope.canvasHeight + '/' + scope.scale);
                                scope.imageToolOverlayHeight = scope.canvasHeight / scope.scale;

                                $timeout(function () {

                                    var left = ((scope.image_target.width - scope.canvasWidth) / 2 - 1),
                                        top = ((scope.image_target.height - scope.canvasHeight) / 2 - 1);
                                    if (left < 1) {
                                        left = 1;
                                    }
                                    if (top < 1) {
                                        top = 1;
                                    }

                                    $('.resize-container').css('margin-left', '-' + left + 'px');
                                    $('.resize-container').css('margin-top', '-' + top + 'px');

                                }, 1);
                                //}
                            }, 1);

                        }, 1);
                        //};


                        //scope.readURL = function (input) {
                        //
                        //    if (input.files && input.files[0]) {
                        //        var reader = new FileReader();
                        //
                        //        scope.fileName = input.files[0].name;
                        //
                        //        reader.onload = function (e) {
                        //            scope.initialize(e.target.result);
                        //        };
                        //
                        //        reader.readAsDataURL(input.files[0]);
                        //    }
                        //};
                        //
                        //
                        //$("#imgInp").change(function () {
                        //    scope.readURL(this);
                        //});


                    }
                }
            }
        }
    }
)
;