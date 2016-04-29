myApp.directive("dirFieldImageMutiple", function (directiveService, $upload, $flash, $filter, generateId, $window) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/field/dirFieldImageMutiple/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.id = generateId.generate();
                    scope.errorMessage = "";
                    scope.inDownload = false;

                    scope.isActive = function () {

                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                        scope.getInfo().field[scope.getInfo().fieldName] = [];
                    }

                    scope.$watch('inDownload', function () {
                        scope.isValid();
                    });

                    scope.isValid = function () {
                        if ((scope.getInfo().optional != null && scope.getInfo().optional()) || scope.isActive() == false || scope.inDownload != true) {
                            scope.getInfo().isValid = true;
                        }
                        else {
                            scope.getInfo().isValid = scope.getInfo().field[scope.getInfo().fieldName].length > 0 && scope.inDownload != true;
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
                    scope.images = [];

                    //build images (first time)
                    for (var key in scope.getInfo().field[scope.getInfo().fieldName]) {
                        scope.images.push({
                            image: scope.getInfo().field[scope.getInfo().fieldName][key]
                        });
                    }


                    scope.onFileSelect = function ($files) {

                        //create a new object
                        var imgContainer = {};

                        var file, i;
                        scope.inDownload = true;
                        i = 0;
                        while (i < $files.length) {
                            file = $files[i];


                            var url = "/rest/file/" + scope.getInfo().target;

                            if (scope.unique !== true) {
                                scope.images.push(imgContainer);
                            }
                            scope.upload = $upload.upload({
                                url: url,
                                data: {
                                    myObj: scope.myModelObj
                                },
                                file: file
                            }).progress(function (evt) {
                                imgContainer.percent = parseInt(100.0 * evt.loaded / evt.total);
                            }).success(function (data, status) {
                                scope.success = true;
                                imgContainer.percent = 100.0;
                                imgContainer.image = data;
                                scope.inDownload = false;
                            })
                                .error(function (data, status) {
                                    console.log('je suis un échec !! : ' + data.message);
                                    console.log(data);
                                    for (var key in scope.images) {
                                        if (scope.images[key] == imgContainer) {
                                            scope.images.splice(key, 1);
                                        }
                                    }

                                    imgContainer.percent = 0;
                                    scope.inDownload = false;
                                    $flash.error(data.message);
                                });
                            i++;
                        }
                    };

                    scope.$watch('images', function () {
                        scope.getInfo().field[scope.getInfo().fieldName] = [];
                        for (var key in scope.images) {
                            scope.getInfo().field[scope.getInfo().fieldName].push(scope.images[key].image);
                        }
                        scope.isValid();
                    }, true);
                }
            };
        }
    };
});