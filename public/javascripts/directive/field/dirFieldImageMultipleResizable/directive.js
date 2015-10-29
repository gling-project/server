myApp.directive("dirFieldImageMultipleResizable", function (directiveService, $upload, $flash, $filter, generateId, imageService,modalService) {
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

                    //scope.isActive = function () {
                    //
                    //    return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    //};
                    //
                    //if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                    //    scope.getInfo().field[scope.getInfo().fieldName] = [];
                    //}
                    //
                    //scope.isValid = function () {
                    //    if((scope.getInfo().optional != null && scope.getInfo().optional()) || scope.isActive() == false){
                    //        scope.getInfo().isValid = true;
                    //    }
                    //    else {
                    //        scope.getInfo().isValid = scope.getInfo().field[scope.getInfo().fieldName].length > 0;
                    //    }
                    //
                    //};
                    //scope.isValid();
                    //
                    //scope.displayError = function () {
                    //    if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                    //        return true;
                    //    }
                    //    return false;
                    //};
                    //
                    //scope.remove = function (imageContainer) {
                    //    for (var key in scope.images) {
                    //        if (scope.images[key] == imageContainer) {
                    //            scope.images.splice(key, 1);
                    //        }
                    //    }
                    //};
                    //
                    //scope.success = false;
                    //scope.images = [];
                    //
                    ////build images (first time)
                    //for (var key in scope.getInfo().field[scope.getInfo().fieldName]) {
                    //    scope.images.push({
                    //        image: scope.getInfo().field[scope.getInfo().fieldName][key]
                    //    });
                    //}
                    //
                    //
                    //scope.onFileSelect = function ($files) {
                    //
                    //    //create a new object
                    //    var imgContainer = {};
                    //
                    //    var file, i;
                    //    scope.inDownload = true;
                    //    i = 0;
                    //    while (i < $files.length) {
                    //        file = $files[i];
                    //
                    //
                    //        var url = "/rest/file/"+scope.getInfo().target;
                    //
                    //        if(scope.unique!==true) {
                    //            scope.images.push(imgContainer);
                    //        }
                    //        scope.upload = $upload.upload({
                    //            url: url,
                    //            data: {
                    //                myObj: scope.myModelObj
                    //            },
                    //            file: file
                    //        }).progress(function (evt) {
                    //            imgContainer.percent = parseInt(100.0 * evt.loaded / evt.total);
                    //        }).success(function (data, status) {
                    //            scope.success = true;
                    //            imgContainer.percent = 100.0;
                    //            imgContainer.image = data;
                    //            scope.inDownload = false;
                    //        })
                    //            .error(function (data, status) {
                    //                console.log('je suis un échec !! : '+data.message);
                    //                console.log(data);
                    //                for(var key in scope.images){
                    //                    if(scope.images[key] == imgContainer){
                    //                        scope.images.splice(key,1);
                    //                    }
                    //                }
                    //
                    //                imgContainer.percent = 0;
                    //                scope.inDownload = false;
                    //                $flash.error(data.message);
                    //            });
                    //        i++;
                    //    }
                    //};
                    //
                    //scope.$watch('images', function () {
                    //    scope.getInfo().field[scope.getInfo().fieldName] = [];
                    //    for (var key in scope.images) {
                    //        scope.getInfo().field[scope.getInfo().fieldName].push(scope.images[key].image);
                    //    }
                    //    scope.isValid();
                    //}, true);


                    //resize the image by default
                    scope.defaultResize = function(img){
                        return imageService.resizeImage(img,600,null);
                    };

                    //create the file with default resizing
                    scope.treatFile = function(img){
                        console.log('treat file !! ');
                        scope.images.push({
                            originalImage:img,
                            image:scope.defaultResize(angular.copy(img))
                        });
                        scope.$apply();
                    };

                    scope.fullSize = function(image){
                        var images = [];
                        for(var key in scope.images){
                            images.push(scope.images[key].image);
                        }
                        modalService.galleryModal(image, images);
                    };

                    //read file and convert to base64
                    scope.readURL = function (input) {

                        console.log('read url!! ');

                        if (input.files && input.files[0]) {
                            var reader = new FileReader();

                            scope.fileName = input.files[0].name;

                            reader.onload = function (e) {
                                scope.treatFile(e.target.result);
                            };

                            reader.readAsDataURL(input.files[0]);
                        }
                    };

                    //catch change value of input and call readURL
                    $("#a").change(function () {
                        console.log('changement !! ');
                        scope.readURL(this);
                    });



                }
            };
        }
    };
});