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
                        scope.getInfo().isValid = (scope.getInfo().optional!=null && scope.getInfo().optional()) || scope.isActive() == false || scope.getInfo().field[scope.getInfo().fieldName] != null;
                    };
                    scope.isValid();

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


                            var url = "/rest/file/"+scope.getInfo().target;
                            console.log(scope.getInfo());
                            //if(scope.getInfo().sizex !=null && scope.getInfo().sizex != undefined){
                            //    url += "/"+scope.getInfo().sizex+"/"+scope.getInfo().sizey;
                            //}

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
                                scope.getInfo().field[scope.getInfo().fieldName] = data;
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

                    //scope.fileCall = null;
                    scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                        scope.isValid();// = n != null;
                    });
                }
            };
        }
    };
});