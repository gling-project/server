myApp.directive("dirFieldDocument", function(directiveService, $upload, $flash, $filter,generateId,$window) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldDocument/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.id = generateId.generate();
                    scope.errorMessage = "";

                    scope.isActive = function(){

                        return !(scope.getInfo().active!=null && scope.getInfo().active!=undefined && scope.getInfo().active() == false);
                    };

                    scope.isValid = function () {
                        //scope.getInfo().isValid = true;//scope.isActive()==false  || scope.getInfo().field!=null;
                            scope.getInfo().isValid = (scope.getInfo().optional!=null && scope.getInfo().optional()) || scope.isActive() == false || scope.getInfo().field != null;
                    };

                    //scope.isValid();

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };


                    scope.inDownload = false;
                    scope.percent = 0;
                    scope.$watch('percent', function() {
                        var _ref;
                        return scope.style = {
                            "width": scope.percent + "%",
                            "color": (_ref = scope.percent > 50) != null ? _ref : {
                                "white": "black"
                            }
                        };
                    });

                    scope.success = false;
                    scope.onFileSelect = function($files) {
                        var file, i;
                        scope.inDownload = true;
                        i = 0;
                        while (i < $files.length) {
                            file = $files[i];


                            var url = "/file";
                            if(scope.getInfo().size !=null && scope.getInfo().size != undefined){
                                url += "/"+scope.getInfo().size;
                            }

                            scope.upload = $upload.upload({
                                url: url,
                                data: {
                                    myObj: scope.myModelObj
                                },
                                file: file
                            }).progress(function(evt) {
                                scope.percent = parseInt(100.0 * evt.loaded / evt.total);
                            }).success(function (data, status) {
                                scope.success = true;
                                scope.percent = 100.0;
                                scope.getInfo().field = data;
                                scope.inDownload=false;
                            })
                                .error(function (data, status) {
                                    scope.percent = 0;
                                    scope.inDownload = false;
                                    $flash.error(data.message);
                                });
                            i++;
                        }
                    };

                    scope.fileCall = null;
                    scope.$watch('getInfo().field', function (n, o) {
                        if (n != null) {
                            scope.fileCall = "/file/" + scope.getInfo().field.id;
                        }
                        //scope.getInfo().isValid = n != null;
                        scope.isValid();// = n != null;
                    });

                    scope.download = function () {
                        if (scope.getInfo().field != null) {
                            var url = "/file/" + scope.getInfo().field.id;
                            $window.open(url);
                        }
                    };
                }
            };
        }
    };
});