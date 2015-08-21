myApp.directive("dirEnter", function() {
    return function(scope, element, attrs) {
        return element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    return scope.$eval(attrs.dirEnter);
                });
                return event.preventDefault();
            }
        });
    };
});

myApp.directive("dirFieldDate", ['directiveService', '$filter', 'generateId', function (directiveService, $filter, generateId) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldDate/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    directiveService.autoScopeImpl(scope);
                    scope.id = generateId.generate();
                    return scope.idHtag = '#' + scope.id;
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);
                    scope.result = null;

                    scope.$watch('result', function () {
                        if(scope.getInfo().minimalDelay=='day') {
                            return scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd');
                        }
                        else{
                            return scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd HH:mm');
                        }
                    });

                    scope.isActive = function(){

                        return !(scope.getInfo().active!=null && scope.getInfo().active!=undefined && scope.getInfo().active() == false);
                    };

                    scope.$watch('getInfo().field[getInfo().fieldName]', function () {
                        if (scope.getInfo().field[scope.getInfo().fieldName] != null) {
                            return scope.result = new Date(Number(scope.getInfo().field[scope.getInfo().fieldName]));
                        }
                        scope.isValid();
                    });

                    scope.$watch('result', function () {
                        if (scope.result != null) {
                            scope.getInfo().field[scope.getInfo().fieldName] = scope.result.getTime();
                        } else {
                            scope.getInfo().field[scope.getInfo().fieldName] = null;
                        }
                        return scope.isValid();
                    });

                    scope.isValid = function () {

                        var isValid;
                        if (scope.getInfo().disabled === true || scope.isActive() === false) {
                            scope.getInfo().isValid = true;
                            return;
                        }
                        isValid = true;
                        if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                            isValid = false;
                        }
                        if (scope.getInfo().validationFct != null) {
                            isValid = isValid && scope.getInfo().validationFct();
                        }
                        scope.getInfo().isValid = isValid;
                    };
                    scope.isValid();

                    scope.logField = function () {
                        return console.log(scope.getInfo());
                    };

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };
                }
            };
        }
    };
}]);

myApp.directive("dirFieldSelect", ['directiveService', '$timeout', 'modalService', function (directiveService, $timeout,modalService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldSelect/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {

                    directiveService.autoScopeImpl(scope);

                    if(scope.getInfo().autoCompleteValue==undefined){
                        scope.getInfo().autoCompleteValue=[];
                    }

                    scope.isActive = function(){

                        return !(scope.getInfo().active!=null && scope.getInfo().active!=undefined && scope.getInfo().active() == false);
                    };

                    scope.errorMessage = "";
                    scope.isValidationDefined = (scope.getInfo().validationRegex != null) || (scope.getInfo().validationFct != null);
                    scope.hideIsValidIcon = !!scope.getInfo().hideIsValidIcon;
                    scope.fieldType = (scope.getInfo().fieldType != null) ? scope.getInfo().fieldType : "text";

                    if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                        scope.getInfo().field[scope.getInfo().fieldName] = "";
                    }
                    if (scope.getInfo().isValid == null) {
                        scope.getInfo().isValid = !scope.isValidationDefined;
                    }
                    if (scope.isValidationDefined) {
                        scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                            if (n !== o) {
                                return scope.isValid();
                            }
                        });
                    }
                    scope.isValid = function () {

                        var isValid;
                        if (scope.getInfo().disabled === true || scope.isActive() === false) {
                            scope.getInfo().isValid = true;
                            return;
                        }
                        if (!scope.getInfo().field[scope.getInfo().fieldName]) {
                            scope.getInfo().field[scope.getInfo().fieldName] = "";
                        }

                        isValid = true;
                        if (typeof scope.getInfo().field[scope.getInfo().fieldName] !== 'string') {
                            scope.getInfo().field[scope.getInfo().fieldName] += "";
                        }
                        if (scope.getInfo().validationRegex != null) {
                            isValid = scope.getInfo().field[scope.getInfo().fieldName].match(scope.getInfo().validationRegex) != null;
                        }
                        if (scope.getInfo().validationFct != null) {
                            isValid = isValid && scope.getInfo().validationFct();
                        }
                        scope.getInfo().isValid = isValid;
                    };

                    scope.isValid();
                    scope.logField = function () {
                        return console.log(scope.getInfo());
                    };
                    scope.setErrorMessage = function (errorMessage) {
                        scope.errorMessage = errorMessage;
                        if (scope.lastTimeOut != null) {
                            $timeout.cancel(scope.lastTimeOut);
                        }
                        return scope.lastTimeOut = $timeout(function () {
                            scope.errorMessage = "";
                            return scope.lastTimeOut = null;
                        }, 2000);
                    };

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };


                    scope.openCalculator= function(){
                        modalService.openCalculatorModal(new function(result){
                            scope.getInfo().field[scope.getInfo().fieldName]=result;
                        });
                    };

                }
            };
        }
    };
}]);

myApp.directive("dirFieldText", ['directiveService', '$timeout', 'modalService', function (directiveService, $timeout, modalService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldText/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    if (scope.getInfo().autoCompleteValue == undefined) {
                        scope.getInfo().autoCompleteValue = [];
                    }

                    scope.isActive = function () {
                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    scope.errorMessage = "";
                    scope.isValidationDefined = (scope.getInfo().validationRegex != null) || (scope.getInfo().validationFct != null);
                    scope.hideIsValidIcon = !!scope.getInfo().hideIsValidIcon;
                    scope.fieldType = (scope.getInfo().fieldType != null) ? scope.getInfo().fieldType : "text";

                    if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                        scope.getInfo().field[scope.getInfo().fieldName] = "";
                    }
                    if (scope.getInfo().isValid == null) {
                        scope.getInfo().isValid = !scope.isValidationDefined;
                    }
                    if (scope.isValidationDefined) {
                        scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                            return scope.isValid();
                        });
                    }

                    scope.$watch('getInfo().active()', function (o, n) {
                        if (o != n) {
                            scope.isValid();
                        }
                    }, true);

                    scope.isValid = function () {

                        var isValid;
                        if (scope.getInfo().disabled === true || scope.isActive() === false) {
                            scope.getInfo().isValid = true;
                            return;
                        }
                        if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                            scope.getInfo().field[scope.getInfo().fieldName] = "";
                        }

                        isValid = true;
                        if (typeof scope.getInfo().field[scope.getInfo().fieldName] !== 'string') {
                            scope.getInfo().field[scope.getInfo().fieldName] += "";
                        }
                        if (scope.getInfo().validationRegex != null) {
                            isValid = scope.getInfo().field[scope.getInfo().fieldName].match(scope.getInfo().validationRegex) != null;
                        }
                        if (scope.getInfo().validationFct != null) {
                            isValid = isValid && scope.getInfo().validationFct();
                        }
                        scope.getInfo().isValid = isValid;
                    };
                    scope.isValid();

                    scope.logField = function () {
                        return console.log(scope.getInfo());
                    };
                    scope.setErrorMessage = function (errorMessage) {
                        scope.errorMessage = errorMessage;
                        if (scope.lastTimeOut != null) {
                            $timeout.cancel(scope.lastTimeOut);
                        }
                        return scope.lastTimeOut = $timeout(function () {
                            scope.errorMessage = "";
                            return scope.lastTimeOut = null;
                        }, 2000);
                    };

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };


                    scope.openCalculator = function () {
                        modalService.openCalculatorModal(new function (result) {
                            scope.getInfo().field[scope.getInfo().fieldName] = result;
                        });
                    };
                }
            };
        }
    };
}]);

myApp.directive("dirFieldTextArea", ['directiveService', '$timeout', 'modalService', '$timeout', function (directiveService, $timeout,modalService,$timeout) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldTextArea/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    if(scope.getInfo().autoCompleteValue==undefined){
                        scope.getInfo().autoCompleteValue=[];
                    }

                    scope.isActive = function(){

                        return !(scope.getInfo().active!=null && scope.getInfo().active!=undefined && scope.getInfo().active() == false);
                    };

                    scope.errorMessage = "";
                    scope.isValidationDefined = (scope.getInfo().validationRegex != null) || (scope.getInfo().validationFct != null);
                    scope.hideIsValidIcon = !!scope.getInfo().hideIsValidIcon;
                    scope.fieldType = (scope.getInfo().fieldType != null) ? scope.getInfo().fieldType : "text";

                    if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                        scope.getInfo().field[scope.getInfo().fieldName] = "";
                    }
                    if (scope.getInfo().isValid == null) {
                        scope.getInfo().isValid = !scope.isValidationDefined;
                    }
                    if (scope.isValidationDefined) {
                        scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                            if (n !== o) {
                                return scope.isValid();
                            }
                        });
                    }
                    scope.isValid = function () {

                        var isValid;
                        if (scope.getInfo().disabled === true || scope.isActive() === false) {
                            scope.getInfo().isValid = true;
                            return;
                        }
                        if (!scope.getInfo().field[scope.getInfo().fieldName]) {
                            scope.getInfo().field[scope.getInfo().fieldName] = "";
                        }

                        isValid = true;
                        if (typeof scope.getInfo().field[scope.getInfo().fieldName] !== 'string') {
                            scope.getInfo().field[scope.getInfo().fieldName] += "";
                        }
                        if (scope.getInfo().validationRegex != null) {
                            isValid = !!scope.getInfo().field[scope.getInfo().fieldName] && scope.getInfo().field[scope.getInfo().fieldName].match(scope.getInfo().validationRegex) != null;
                        }
                        if (scope.getInfo().validationFct != null) {
                            isValid = isValid && scope.getInfo().validationFct();
                        }
                        scope.getInfo().isValid = isValid;
                    };

                    scope.isValid();
                    scope.logField = function () {
                        return console.log(scope.getInfo());
                    };
                    scope.setErrorMessage = function (errorMessage) {
                        scope.errorMessage = errorMessage;
                        if (scope.lastTimeOut != null) {
                            $timeout.cancel(scope.lastTimeOut);
                        }
                        return scope.lastTimeOut = $timeout(function () {
                            scope.errorMessage = "";
                            return scope.lastTimeOut = null;
                        }, 2000);
                    };

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };


                    scope.openCalculator= function(){
                        modalService.openCalculatorModal(new function(result){
                            scope.getInfo().field[scope.getInfo().fieldName]=result;
                        });
                    };
                }
            };
        }
    };
}]);

myApp.directive("dirFocusMe", function() {
    return {
        restrict: 'A',
        scope: {
            dirFocusMe: '='
        },
        link: function(scope, element, attrs) {
            scope.$watch('dirFocusMe', function() {
                if (scope.dirFocusMe === true) {
                    return element[0].focus();
                }
            });
        }
    };
});

myApp.directive("numbersOnly", ['$filter', 'translationService', '$locale', function($filter, translationService, $locale) {
    return {
        restrict: 'A',
        require: "ngModel",
        link: function(scope, element, attrs, modelCtrl) {
            return scope.$watch(attrs.numbersOnly, function() {

                var convertToFloat, convertToString, displayError, errorMessage, filterFloat, nbDecimal, valueToDisplay;
                if (attrs.numbersOnly === "integer" || attrs.numbersOnly === "double" || attrs.numbersOnly === "percent") {
                    scope.lastValidValue = 0;
                    if (attrs.numbersOnly === "integer") {
                        errorMessage = $filter('translateText')('--.generic.numberOnly');
                        nbDecimal = 0;
                    } else {
                        errorMessage = $filter('translateText')('--.generic.numberOnly');
                        nbDecimal = 2;
                    }
                    scope.$root.$on('$localeChangeSuccess', function(event, current, previous) {
                        var result;
                        if (modelCtrl.$modelValue != null) {
                            result = convertToString(parseFloat(modelCtrl.$modelValue));
                            if (result != null) {
                                modelCtrl.$setViewValue(result.toString());
                                return modelCtrl.$render();
                            }
                        }
                    });
                    modelCtrl.$parsers.unshift(function(viewValue) {
                        var result, resultString, resultToDisplay;
                        if (viewValue === "") {
                            return null;
                        }

                        result = convertToFloat(viewValue);
                        if (isNaN(result)) {
                             displayError();
                            if (!!scope.lastValidValue) {
                                resultString = scope.lastValidValue.toString();
                                if (attrs.numbersOnly === "percent") {
                                    resultToDisplay = (scope.lastValidValue * 100).toString();
                                } else {
                                    resultToDisplay = scope.lastValidValue.toString();
                                }
                            } else {
                                resultString = "";
                                resultToDisplay = "";
                            }
                            modelCtrl.$setViewValue(resultToDisplay);
                            modelCtrl.$render();
                        } else {
                            if (attrs.numbersOnly === "percent") {
                                result = result / 100;
                            }
                            scope.lastValidValue = result;
                            resultString = result.toString();
                        }
                        if (resultString === "") {
                            return null;
                        }
                        //return result
                        return resultString;

                    });
                    modelCtrl.$formatters.unshift(function(modelValue) {
                        //return a string for display
                        return scope.displayValue(modelValue);
                    });

                    scope.displayValue = function(modelValue) {
                        var result;
                        result = parseFloat(modelValue);
                        if (attrs.numbersOnly === "percent") {
                            result = result * 100;
                        }
                        return convertToString(result);
                    };
                    displayError = function() {
                        if (scope.setErrorMessage != null) {
                            return scope.setErrorMessage(errorMessage);
                        }
                    };
                    convertToString = function(value) {
                        var formats, result;
                        if ((value == null) || isNaN(value)) {
                            return "";
                        }
                        value = value.toFixed(nbDecimal);
                        formats = $locale.NUMBER_FORMATS;
                        return result = value.toString().replace(new RegExp("\\.", "g"), formats.DECIMAL_SEP);
                    };
                    convertToFloat = function(viewValue) {
                        var decimalRegex, formats, value;
                        if (viewValue === "") {
                            return NaN;
                        }
                        formats = $locale.NUMBER_FORMATS;
                        decimalRegex = formats.DECIMAL_SEP;
                        if (decimalRegex === ".") {
                            decimalRegex = "\\.";
                        }
                        value = viewValue.replace(new RegExp(decimalRegex, "g"), ".");

                        return filterFloat(value);
                    };
                    filterFloat = function(value) {
                        var regexFloat;
                        if (value.isNaN) {
                            return NaN;
                        }
                        if (attrs.numbersOnly === "integer") {
                            regexFloat = new RegExp("^(\\-|\\+)?([0-9]+|Infinity)?$");
                        } else {
                            regexFloat = new RegExp("^(\\-|\\+)?([0-9]+(\\.[0-9]*)?|Infinity)?$");
                        }
                        if (regexFloat.test(value)) {
                            return Number(value);
                        }
                        return NaN;
                    };
                    if (modelCtrl.$modelValue != null) {
                        scope.lastValidValue = parseFloat(modelCtrl.$modelValue);
                        valueToDisplay = scope.displayValue(scope.lastValidValue);
                        modelCtrl.$setViewValue(valueToDisplay);
                        return modelCtrl.$render();
                    }
                }
            });
        }
    };
}]);

myApp.directive("dirFieldCheck", ['directiveService', '$timeout', function (directiveService, $timeout) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldCheck/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.errorMessage = "";
                    scope.hideIsValidIcon = !!scope.getInfo().hideIsValidIcon;

                    if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                        scope.getInfo().field[scope.getInfo().fieldName] = "";
                    }

                    scope.isActive = function(){
                        return !(scope.getInfo().active!=null && scope.getInfo().active!=undefined && scope.getInfo().active() == false);
                    };

                    scope.isValid = function () {
                        scope.getInfo().isValid = true;
                    };

                    scope.isValid();
                    scope.logField = function () {
                        return console.log(scope.getInfo());
                    };
                    scope.setErrorMessage = function (errorMessage) {
                        scope.errorMessage = errorMessage;
                        if (scope.lastTimeOut != null) {
                            $timeout.cancel(scope.lastTimeOut);
                        }
                        return scope.lastTimeOut = $timeout(function () {
                            scope.errorMessage = "";
                            return scope.lastTimeOut = null;
                        }, 2000);
                    };

                    scope.displayError = function () {
                        if (scope.getInfo().isValid == false && scope.getInfo().firstAttempt === false) {
                            return true;
                        }
                        return false;
                    };

                }
            };
        }
    };
}]);

myApp.directive("dirFieldDocument", ['directiveService', '$upload', '$flash', '$filter', 'generateId', '$window', function(directiveService, $upload, $flash, $filter,generateId,$window) {
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


                            var url = "/rest/file";
                            if(scope.getInfo().sizex !=null && scope.getInfo().sizex != undefined){
                                url += "/"+scope.getInfo().sizex+"/"+scope.getInfo().sizey;
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
                        //if (n != null) {
                        //    scope.fileCall = "/rest/file/" + scope.getInfo().field[scope.getInfo().fieldName].id;
                        //}
                        scope.isValid();// = n != null;
                    });

                    scope.download = function () {
                        if (scope.getInfo().field[scope.getInfo().fieldName] != null) {
                            var url = "/rest/file/" + scope.getInfo().field[scope.getInfo().fieldName].id;
                            $window.open(url);
                        }
                    };
                }
            };
        }
    };
}]);
myApp.directive("dirFieldImageMutiple", ['directiveService', '$upload', '$flash', '$filter', 'generateId', '$window', function (directiveService, $upload, $flash, $filter, generateId, $window) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldImageMutiple/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.id = generateId.generate();
                    scope.errorMessage = "";

                    scope.isActive = function () {

                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    if (scope.getInfo().field[scope.getInfo().fieldName] == null) {
                        scope.getInfo().field[scope.getInfo().fieldName] = [];
                    }

                    scope.isValid = function () {
                        if((scope.getInfo().optional != null && scope.getInfo().optional()) || scope.isActive() == false){
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


                            var url = "/rest/file";
                            if (scope.getInfo().sizex != null && scope.getInfo().sizex != undefined) {
                                url += "/" + scope.getInfo().sizex + "/" + scope.getInfo().sizey;
                            }

                            scope.images.push(imgContainer);
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
}]);
myApp.directive('loginFormCtrl', ['$flash', 'facebookService', 'translationService', 'directiveService', '$timeout', 'accountService', function ($flash, facebookService, translationService, directiveService, $timeout, accountService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/login/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {};
                    }

                    scope.fields = {
                        email: {
                            fieldType: "email",
                            name: 'email',
                            fieldTitle: "--.registration.form.yourEmail",
                            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            validationMessage: "--.generic.validation.email",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        password: {
                            name: 'password',
                            fieldTitle: "--.generic.yourPassword",
                            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
                            validationMessage: "--.generic.validation.password",
                            fieldType: 'password',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'password'
                        },
                        keepSessionOpen: {
                            fieldTitle: "--.registration.form.keepSessionOpen",
                            field: false,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active : function(){
                              return !scope.getInfo().mobileVersion
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'keepSessionOpen'
                        }
                    };

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);



                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });

                    //
                    // facebook connection
                    //
                    scope.fb_login = function () {
                        facebookService.login(function (data) {
                                accountService.setMyself(data);
                                $flash.success(translationService.get("--.login.flash.success"));
                                scope.getInfo().facebookSuccess(data);

                            },
                            function (data, status) {
                                $flash.error(data.message);
                            });
                    };
                }
            }
        }
    }
}]);
myApp.directive('addressFormCtrl', ['$flash', 'directiveService', '$timeout', '$filter', 'translationService', 'modalService', function ($flash, directiveService, $timeout, $filter, translationService,modalService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/address/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    var names = [
                        {key: translationService.get('--.address.type.home'), value: '--.address.type.home'},
                        {key: translationService.get('--.address.type.work'), value: '--.address.type.work'},
                        {key: translationService.get('--.address.type.other'), value: '--.address.type.other'}
                    ];

                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            name:$filter('translateText')('--.generic.home')
                        };
                    }
                    else{
                        var founded=false;
                        for (var key in names) {
                            if(key == scope.getInfo().dto.name){
                                founded=true;
                            }
                        }
                        if(!founded){
                            names.push({key:scope.getInfo().dto.name,value:scope.getInfo().dto.name});
                        }
                    }

                    scope.fields = {
                        name: {
                            fieldTitle: "--.form.address.field.name",
                            options: names,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.getInfo().addName == true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'name'
                        },
                        street: {
                            fieldType: "text",
                            name: 'street',
                            fieldTitle: "--.form.address.field.street",
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return !scope.getInfo().addName;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'street'
                        },
                        zip: {
                            fieldType: "text",
                            name: 'zip',
                            fieldTitle: "--.form.address.field.zip",
                            validationRegex: "^.{2,20}$",
                            validationMessage: ['--.generic.validation.size', '2', '20'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'zip'
                        },
                        city: {
                            fieldType: "text",
                            name: 'city',
                            fieldTitle: "--.form.address.field.city",
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'city'
                        }
                    };

                    scope.$watch('getInfo().dto', function () {
                        if (scope.getInfo().dto.name == translationService.get('--.address.type.other')) {
                            modalService.openOneFieldModal({name:'--.address.customName.fieldTitle'},function(data){
                                names.push({key:data,value:data});
                                scope.getInfo().dto.name = data;
                            });
                        }
                    }, true);

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key)) {
                                if (obj.isValid == null || obj.isValid === false) {
                                    obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                    validation = false;
                                }
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);

                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }
}]);
myApp.directive('customerInterestFormCtrl', ['$flash', 'directiveService', 'customerInterestService', '$timeout', function ($flash, directiveService, customerInterestService, $timeout) {
        return {
            restrict: "E",
            scope: directiveService.autoScope({
                ngInfo: '='
            }),
            templateUrl: "/assets/javascripts/directive/form/customerInterest/template.html",
            replace: true,
            transclude: true,
            compile: function () {
                return {
                    pre: function (scope) {
                        return directiveService.autoScopeImpl(scope);
                    },
                    post: function (scope) {
                        directiveService.autoScopeImpl(scope);


                        scope.interests = {};
                        customerInterestService.getAll(function (result) {
                                scope.interests = result;
                                for (var j in scope.interests) {
                                    for (var i in scope.getInfo().result) {
                                        if (scope.getInfo().result[i].name == scope.interests[j].name) {
                                            scope.interests[j].registrationSelection = true;
                                        }
                                    }
                                }
                            }
                        );

                        scope.select = function (interest) {
                            interest.registrationSelection = !interest.registrationSelection;
                        };

                        scope.$watch('interests', function (o, n) {
                            if (o != n) {

                                scope.getInfo().isValid = true;


                                scope.getInfo().result = [];

                                for (var key in scope.interests) {
                                    var interest = scope.interests[key];
                                    if (interest.registrationSelection) {
                                        scope.getInfo().result.push(interest);
                                    }
                                }
                            }

                        }, true);
                    }
                }
            }
        }
    }]
)
;
myApp.directive('accountFormCtrl', ['$flash', 'directiveService', function ($flash, directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/account/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    //
                    // initialization default data
                    //
                    scope.update = scope.getInfo().dto != null;
                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            gender: null
                        };
                    };

                    scope.passwordActive = true;

                    scope.fields = {
                        gender: {
                            name: 'gender',
                            fieldTitle: "--.generic.gender",
                            validationRegex: "^.+$",
                            validationMessage: '--.error.validation.not_null',
                            options: [
                                {key: 'MALE', value: '--.generic.male'},
                                {key: 'FEMALE', value: '--.generic.female'}
                            ],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'gender'
                        },
                        firstname: {
                            name: 'firstname',
                            fieldTitle: "--.generic.firstname",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '50'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'firstname'
                        },
                        lastname: {
                            name: 'lastname',
                            fieldTitle: "--.generic.lastname",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '50'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'lastname'
                        },
                        email: {
                            fieldType: "email",
                            name: 'email',
                            fieldTitle: "--.generic.email",
                            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            validationMessage: "--.generic.validation.email",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        password: {
                            name: 'password',
                            fieldTitle: "--.registration.form.password",
                            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
                            validationMessage: "--.generic.validation.password",
                            fieldType: 'password',
                            details: '--.registration.form.password.help',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return !scope.getInfo().updateMode && scope.passwordActive
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'password'
                        },
                        repeatPassword: {
                            name: 'password',
                            fieldTitle: "--.registration.form.repeatPassword",
                            validationMessage: "--.generic.validation.wrongRepeatPassword",
                            fieldType: 'password',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            validationFct: function () {
                                return scope.fields.password.field === scope.fields.repeatPassword.field;
                            },
                            active: function () {
                                return !scope.getInfo().updateMode && scope.passwordActive
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'repeatPAssword'
                        },
                        keepSessionOpen: {
                            fieldTitle: "--.registration.form.keepSessionOpen",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return !scope.getInfo().updateMode && !scope.getInfo().mobileVersion
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'keepSessionOpen'
                        }
                    };

                    scope.getInfo().maskPassword = function () {
                        scope.passwordActive=false;
                    };

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);

                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }


}])
;
myApp.directive('businessFormCtrl', ['$flash', 'directiveService', function ($flash, directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/business/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);
                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {};
                    }

                    scope.fields = {
                        name: {
                            fieldTitle: "--.generic.name",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '250'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            //isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'name'
                        },
                        description: {
                            fieldTitle: "--.generic.desc",
                            validationRegex: "^.{0,1500}$",
                            validationMessage: ['--.generic.validation.size', '0', '1500'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        phone: {
                            fieldTitle: "--.generic.phone",
                            validationRegex: "^[0-9. *-+]{6,16}$",
                            validationMessage: '--.validation.dto.phone',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'phone'
                        },
                        email: {
                            fieldTitle: "--.business.contactEmail",
                            name: 'email',
                            validationRegex: /^($|(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/,
                            validationMessage: '--.validation.dto.notNull',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        website: {
                            fieldTitle: "--.business.website",
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: !scope.getInfo().updateMode,
                            field: scope.getInfo().dto,
                            fieldName: 'website'
                        }

                    };

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);


                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }


}]);
myApp.directive('businessCategoryFormCtrl', ['$flash', 'directiveService', 'businessCategoryService', '$timeout', function ($flash, directiveService, businessCategoryService, $timeout) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/businessCategory/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.isDisabled = function () {
                        return scope.getInfo().disabled;
                    };

                    scope.getInfo().isValid = false;

                    var value = scope.getInfo().value;

                    //scope.selectedCategory = null;
                    //scope.subsubselectedCategory = [];

                    scope.displayValue = function () {
                        if (scope.getInfo().value != null && scope.getInfo().value.length > 0) {
                            for (var catSKey in scope.getInfo().value) {
                                var catSelected = scope.getInfo().value[catSKey];
                                for (var cat in scope.categories) {
                                    for (var subcat in scope.categories[cat].children) {
                                        for (var subsubcat in scope.categories[cat].children[subcat].children) {

                                            if (scope.categories[cat].children[subcat].children[subsubcat].name == catSelected.name) {

                                                scope.subcategories = scope.categories[cat].children;
                                                scope.subsubcategories = scope.categories[cat].children[subcat].children;
                                                scope.categories[cat].selected = true;
                                                scope.categories[cat].children[subcat].selected = true;
                                                scope.categories[cat].children[subcat].children[subsubcat].selected = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                    ;

                    businessCategoryService.getAll(function (data) {
                        scope.categories = data.list;
                        scope.displayValue();
                    });

                    scope.$watch('getInfo().value', function () {
                        scope.displayValue();
                    });

                    scope.select = function (category) {

                        if (category.selected != true) {

                            scope.cleanSubSubCat();
                            scope.cleanSubCat();
                            scope.cleanCat();

                            category.selected = true;
                            scope.subcategories = category.children;
                            scope.subsubcategories = null;
                            scope.compileValue();
                        }
                    };

                    scope.selectSubcategory = function (subCategory) {

                        if (subCategory.selected != true) {

                            scope.cleanSubSubCat();
                            scope.cleanSubCat();
                            scope.subsubcategories = subCategory.children;
                            subCategory.selected = true;
                            scope.compileValue();
                        }
                    };

                    scope.selectSubSubcategory = function (subSubCategory) {

                        if (subSubCategory.selected === true) {
                            subSubCategory.selected = false;
                        }
                        else {
                            subSubCategory.selected = true;
                        }
                        scope.compileValue();
                    };

                    scope.cleanCat = function () {
                        for (var key in scope.categories) {
                            scope.categories[key].selected = false;
                        }
                    };

                    scope.cleanSubCat = function () {
                        for (var key in scope.subcategories) {
                            scope.subcategories[key].selected = false;
                        }
                    };

                    scope.cleanSubSubCat = function () {
                        for (var key in scope.subsubcategories) {
                            scope.subsubcategories[key].selected = false;
                        }
                    };

                    scope.compileValue = function () {

                        scope.getInfo().isValid = false;
                        scope.getInfo().value.splice(0, scope.getInfo().value.length);

                        if (scope.subsubcategories != null) {
                            for (var key in scope.subsubcategories) {
                                if (scope.subsubcategories[key].selected == true) {
                                    scope.getInfo().value.push(scope.subsubcategories[key]);
                                    scope.getInfo().isValid = true;
                                }
                            }
                        }
                    }
                }

            }
        }
    }


}])
;
myApp.directive('downloadFormCtrl', ['$flash', 'directiveService', '$timeout', function ($flash, directiveService, $timeout) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/download/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);
                    
                    scope.fields = {
                        file: {
                            fieldTitle: "generic.file",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            size : scope.getInfo().size
                        }
                    };

                    scope.$watch('getInfo().dto', function (o, n) {
                        scope.fields.file.field = scope.getInfo().dto;
                    });

                    scope.fileCall = null;
                    scope.$watch('fields.file.field', function (n, o) {
                        if (n != null) {
                            scope.fileCall = "/rest/file/" + scope.fields.file.field.id;
                        }
                        scope.getInfo().isValid = n != null;
                        scope.getInfo().dto = scope.fields.file.field;
                    });


                    scope.download = function () {
                        if (scope.fields.file.field != null) {
                            var url = "/rest/file/" + scope.fields.file.field.id;
                            $window.open(url);
                        }
                    };


                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }
}]);
myApp.directive('promotionFormCtrl', ['$flash', 'directiveService', '$timeout', 'businessService', function ($flash, directiveService, $timeout,businessService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/promotion/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.update = scope.getInfo().dto != null;
                    scope.completePromotion = true;

                    //
                    // initialize default data
                    //
                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            startDate: new Date(),
                            minimalQuantity: 1
                        };
                    }
                    else {
                        scope.completePromotion = scope.getInfo().dto.quantity != null;
                    }


                    //load interests
                    businessService.getInterests(function (data) {
                        scope.interests = data;
                        if (scope.interests.length > 1) {
                            scope.fields.interests.isActive = function () {
                                return true;
                            };
                            for (var key in scope.interests) {
                                var interest = scope.interests[key];
                                scope.fields.interests.options.push({
                                    key: interest,
                                    value: interest.translationName
                                });
                            }
                        }
                    });

                    //build field + dto binding
                    scope.fields = {
                        title: {
                            fieldTitle: "--.generic.title",
                            validationRegex: "^.{2,100}$",
                            validationMessage: ['--.generic.validation.size', '2', '100'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'title'
                        },
                        description: {
                            fieldTitle: "--.generic.description",
                            validationRegex: "^.{0,1000}$",
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        startDate: {
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'startDate'
                        },
                        endDate: {
                            fieldTitle: "--.promotion.endDate",
                            validationMessage: '--.promotion.validation.endDateBeforeStartDate',
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            validationFct: function () {
                                return scope.getInfo().dto.endDate >= scope.getInfo().dto.startDate;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'endDate'
                        },
                        illustration: {
                            fieldTitle: "--.promotion.illustration",
                            validationMessage: '--.error.validation.image',
                            sizex: 60,
                            sizey: 60,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            optional: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            multiple:true,
                            fieldName: 'pictures'
                        },
                        quantity: {
                            fieldTitle: "--.promotion.quantity",
                            numbersOnly: 'integer',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.generic.validation.numberExpected',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'quantity'
                        },
                        minimalQuantity: {
                            fieldTitle: "--.promotion.minimalQuantity",
                            numbersOnly: 'integer',
                            validationRegex: "^[0-9,.]{1,9}$",
                            validationMessage: '--.promotion.validation.minimalQuantityMustBeLowerThanQuantity',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: 1,
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'minimalQuantity'
                        },
                        unit: {
                            fieldTitle: "--.promotion.unit",
                            validationRegex: "^.{0,30}$",
                            validationMessage: ['--.generic.validation.max', '30'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'unit'
                        },
                        originalPrice: {
                            fieldTitle: "--.promotion.originalUnitPrice",
                            numbersOnly: 'double',
                            validationMessage: '--.generic.validation.numberExpected',
                            validationFct: function () {
                                return scope.getInfo().dto.originalPrice != null;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "€",
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'originalPrice'
                        },
                        offPercent: {
                            fieldTitle: "--.promotion.offPercent",
                            numbersOnly: 'percent',
                            validationFct: function () {
                                return scope.getInfo().dto.offPercent != null && parseFloat(scope.getInfo().dto.offPercent) > 0 && parseFloat(scope.getInfo().dto.offPercent) <= 1;
                            },
                            validationMessage: '--.promotion.validation.offPercent',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "%",
                            field: scope.getInfo().dto,
                            fieldName: 'offPercent'
                        },
                        offPrice: {
                            fieldTitle: "--.promotion.offPrice",
                            numbersOnly: 'double',
                            validationMessage: '--.promotion.validation.offPrice',
                            validationFct: function () {
                                return scope.getInfo().dto.offPrice != null && parseFloat(scope.getInfo().dto.offPrice) < parseFloat(scope.getInfo().dto.originalPrice);
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            money: "€",
                            active: function () {
                                return scope.completePromotion;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'offPrice'
                        },
                        interests: {
                            fieldTitle: "--.promotion.interest",
                            details: '--.promotion.interest.help',
                            validationMessage: '--.error.validation.not_null',
                            options: [],
                            optional: function () {
                                return false;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: function () {
                                return false
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'interest'
                        }
                    };

                    //
                    // specific treatment
                    //
                    var suspendWatch = false;
                    scope.$watch('getInfo().dto.originalPrice', function (o, n) {
                        if (o != n && scope.getInfo().dto.originalPrice != null && scope.getInfo().dto.offPercent != null && suspendWatch == false) {
                            suspendWatch = true;
                            scope.getInfo().dto.offPrice = parseFloat(scope.getInfo().dto.originalPrice) * (1 - parseFloat(scope.getInfo().dto.offPercent));
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });
                    scope.$watch('getInfo().dto.offPercent', function (o, n) {
                        if (o != n && scope.getInfo().dto.originalPrice != null && scope.getInfo().dto.offPercent != null && suspendWatch == false) {
                            suspendWatch = true;
                            scope.getInfo().dto.offPrice = parseFloat(scope.getInfo().dto.originalPrice) * (1 - parseFloat(scope.getInfo().dto.offPercent));
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });
                    scope.$watch('getInfo().dto.offPrice', function (o, n) {
                        if (o != n && scope.getInfo().dto.originalPrice != null && scope.getInfo().dto.offPrice && suspendWatch == false) {
                            suspendWatch = true;
                            scope.getInfo().dto.offPercent = 1 -  (parseFloat(scope.getInfo().dto.offPrice) / parseFloat(scope.getInfo().dto.originalPrice));
                            $timeout(function () {
                                suspendWatch = false;
                            }, 1);
                        }
                    });

                    //compute first
                    if (scope.getInfo().dto.originalPrice != null && scope.getInfo().dto.offPercent != null && suspendWatch == false) {
                        suspendWatch = true;
                        scope.getInfo().dto.offPrice = parseFloat(scope.getInfo().dto.originalPrice) * (1 - parseFloat(scope.getInfo().dto.offPercent));
                        $timeout(function () {
                            suspendWatch = false;
                        }, 1);
                    }

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);

                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }


}])
;
myApp.directive('businessNotificationFormCtrl', ['$flash', 'directiveService', 'businessService', function ($flash, directiveService, businessService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/businessNotification/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.update = scope.getInfo().dto != null;
                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {
                            startDate: new Date()
                        };
                    }

                    //load interests
                    businessService.getInterests(function (data) {
                        scope.interests = data;
                        if (scope.interests.length > 1) {
                            scope.fields.interests.isActive = function () {
                                return true;
                            };
                            for (var key in scope.interests) {
                                var interest = scope.interests[key];
                                scope.fields.interests.options.push({
                                    key: interest,
                                    value: interest.translationName
                                });
                            }
                        }
                    });

                    scope.fields = {
                        title: {
                            fieldTitle: "--.generic.title",
                            validationRegex: "^.{2,100}$",
                            validationMessage: ['--.generic.validation.size', '2', '100'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'title'
                        },
                        description: {
                            fieldTitle: "--.generic.description",
                            validationRegex: "^.{0,1000}$",
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        startDate: {
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'startDate'
                        },
                        endDate: {
                            fieldTitle: "--.promotion.endDate",
                            validationMessage: '--.promotion.validation.endDateBeforeStartDate',
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            validationFct: function () {
                                return scope.fields.endDate.field >= scope.fields.startDate.field;
                            },
                            field: scope.getInfo().dto,
                            active: function () {
                                return false;
                            },
                            fieldName: 'endDate'
                        },
                        illustration: {
                            fieldTitle: "--.promotion.illustration",
                            validationMessage: '--.error.validation.image',
                            sizex: 60,
                            sizey: 60,
                            optional: function () {
                                return true;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            multiple: true,
                            fieldName: 'pictures'
                        },
                        interests: {
                            fieldTitle: "--.promotion.interest",
                            details: '--.promotion.interest.help',
                            validationMessage: '--.error.validation.not_null',
                            options: [],
                            optional: function () {
                                return false;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            isActive: function () {
                                return false
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'interest'
                        }
                    };

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);

                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }


}])
;
myApp.directive('scheduleFormCtrl', ['$flash', 'directiveService', function ($flash, directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/schedule/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    scope.days = [
                        'MONDAY',
                        'TUESDAY',
                        'WEDNESDAY',
                        'THURSDAY',
                        'FRIDAY',
                        'SATURDAY',
                        'SUNDAY'
                    ];


                    scope.attendance_selected = 'LIGHT';
                    scope.select_day = null;
                    scope.attendance_class = {
                        LIGHT: 'attendance-light',
                        MODERATE: 'attendance-moderate',
                        IMPORTANT: 'attendance-heavy'
                    };

                    scope.selectAttendance = function (attendance) {
                        scope.attendance_selected = attendance;
                    };

                    scope.sections = [];

                    //scope.clockParam = {
                    //    schedule: [],
                    //    min: true
                    //};
                    //scope.clockParamMin = {
                    //    schedule: scope.clockParam.schedule
                    //};


                    scope.nbPair = function (nb) {
                        return !(nb % 2);
                    };

                    scope.hours = [];
                    for (var i = 0; i < 49; i++) {

                        var hour = "";
                        if (scope.nbPair(i)) {
                            hour = i / 2 + "h";
                        }
                        scope.hours.push({text: hour});
                    }

                    for (var dayKey in scope.days) {
                        var day = scope.days[dayKey];
                        scope.sections[day] = [];
                        for (var i = 0; i < 48; i++) {
                            scope.sections[day].push({
                                minutes: i * 30,
                                attendance: 'CLOSE'
                            });
                        }
                        scope.$watch('sections.' + day, function () {
                            scope.compile();
                        }, true);
                    }
                    ;

                    scope.select = function (section, force) {
                        if (down || force) {
                            section.attendance = scope.attendance_selected
                        }
                    };


                    scope.compile = function () {
                        for (var dayKey in scope.days) {
                            var day = scope.days[dayKey];
                            if (scope.getInfo().dto[day] == undefined || scope.getInfo().dto[day] == null) {
                                scope.getInfo().dto[day] = [];
                            }
                            scope.getInfo().dto[day].splice(0, scope.getInfo().dto[day].length);
                            var newPart = null;
                            for (var key in scope.sections[day]) {
                                var obj = scope.sections[day][key];
                                if (obj.attendance != 'CLOSE') {

                                    if (newPart != null) {
                                        if (newPart.attendance == obj.attendance) {
                                            //extend
                                            newPart.to = obj.minutes + 30;
                                            continue;
                                        }
                                        else {
                                            scope.getInfo().dto[day].push(newPart);
                                            newPart = null;
                                        }
                                    }
                                    newPart = {
                                        attendance: obj.attendance,
                                        from: obj.minutes,
                                        to: obj.minutes + 30
                                    };
                                }
                                else if (newPart != null) {
                                    scope.getInfo().dto[day].push(newPart);
                                    newPart = null;
                                }


                            }
                            if (newPart != null) {
                                scope.getInfo().dto[day].push(newPart);
                                newPart = null;
                            }
                        }
                    };

                    scope.decompile = function () {
                        for (var dayKey in scope.days) {
                            var day = scope.days[dayKey];
                            for (var key in scope.sections[day]) {
                                var obj = scope.sections[day][key];
                                obj.attendance = 'CLOSE';
                            }

                            for (var key in scope.getInfo().dto[day]) {
                                var obj = scope.getInfo().dto[day][key];

                                for (var key2 in scope.sections[day]) {
                                    var obj2 = scope.sections[day][key2];
                                    if (obj2.minutes >= obj.from &&
                                        (obj2.minutes + 30) <= obj.to) {
                                        obj2.attendance = obj.attendance;
                                    }
                                }
                            }
                        }
                    };
                    scope.decompile();

                    scope.startSection = null;

                    scope.select = function (day, section) {
                        section.attendance = scope.attendance_selected;
                        scope.startSection = section;
                        scope.select_day = day;
                        computeLabel();
                    };

                    $(document).mouseup(function () {
                        scope.startSection = null;
                        scope.select_day = null;
                    });

                    var sectionToString = function (section, end) {
                        var min = section.minutes + (30 * end);
                        var minutes = min % 60;
                        if (minutes < 10) {
                            minutes = "0" + minutes;
                        }
                        return Math.floor(min / 60 % 24) + 'h' + minutes;
                    };

                    var computeLabel = function () {
                        if (scope.startSection != null) {
                            var end = null,start=null;
                            for (var i = scope.startSection.minutes / 30; i <= 48; i++) {
                                if (scope.sections[scope.select_day][i].attendance != scope.attendance_selected) {
                                    end = scope.sections[scope.select_day][i-1];
                                    break;
                                }
                            }
                            for (var i = scope.startSection.minutes / 30; i >= 0; i--) {
                                if (scope.sections[scope.select_day][i].attendance != scope.attendance_selected) {
                                    start = scope.sections[scope.select_day][i+1];
                                    break;
                                }
                            }
                            scope.selectedTiming = sectionToString(start, 0) + " to " + sectionToString(end, 1);
                        }
                    };

                    scope.progress = function (event, day, section) {

                        if (scope.select_day == day) {

                            scope.infoStyle = {
                                left: event.pageX + 'px',
                                top: (event.pageY - 75) + 'px'
                            };

                            if (scope.startSection != null) {
                                if (section.minutes < scope.startSection.minutes) {
                                    //select all section between section and scope.startSection
                                    for (var key in scope.sections[day]) {
                                        var obj = scope.sections[day][key];
                                        if (obj.minutes >= section.minutes &&
                                            obj.minutes <= scope.startSection.minutes) {
                                            obj.attendance = scope.attendance_selected;
                                        }
                                    }

                                    computeLabel();
                                }
                                else {
                                    for (var key in scope.sections[day]) {
                                        var obj = scope.sections[day][key];
                                        if (obj.minutes <= section.minutes &&
                                            obj.minutes >= scope.startSection.minutes) {
                                            obj.attendance = scope.attendance_selected;
                                        }
                                    }
                                    computeLabel();//scope.selectedTiming = sectionToString(scope.startSection, 0) + " to " + sectionToString(section, 1);
                                }
                            }
                        }
                    };

                }
            }
        }
    }
}])
;
myApp.directive('imageFormCtrl', ['$flash', 'directiveService', function ($flash, directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/image/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.imageParam = {
                        fieldTitle: "",
                        validationMessage: '--.error.validation.image',
                        sizex: scope.getInfo().sizex,
                        sizey: scope.getInfo().sizey,
                        field: scope.getInfo().dto,
                        fieldName:scope.getInfo().fieldName,
                        fullSize:true
                    };
                }
            }
        }
    }


}])
;
myApp.directive('businessSocialNetworkCtrl', ['$flash', 'directiveService', 'languageService', function ( $flash, directiveService,languageService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/businessSocialNetwork/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);
                    if (scope.getInfo().dto == null) {
                        scope.getInfo().dto = {};
                    }

                    scope.fields = {
                        facebook: {
                            fieldTitle: "--.generic.facebook",
                            fieldImage:'assets/social_network/facebook.png',
                            validationRegex: "^($|https://www.facebook\.com/.*$)",
                            validationMessage: '--.generic.validation.facebook',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'facebookLink',
                            placeholder:'https://facebook.com/'
                        },
                        twitter: {
                            fieldTitle: "--.generic.twitter",
                            fieldImage:'assets/social_network/twitter.png',
                            validationRegex: "^($|^https://twitter\.com/.*$)",
                            validationMessage: '--.generic.validation.twitter',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'twitterLink',
                            placeholder:'https://twitter.com/'
                        },
                        instagram: {
                            fieldTitle: "--.generic.instagram",
                            fieldImage:'assets/social_network/instagram.png',
                            validationRegex: "^($|^https://instagram\.com/.*$)",
                            validationMessage: '--.generic.validation.instagram',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'instagramLink',
                            placeholder:'https://instagram.com/'
                        },
                        delivery: {
                            fieldTitle: "--.business.socialNetwork.delivery",
                            fieldImage:'assets/social_network/delivery.png',
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'deliveryLink',
                            placeholder:'http://...'
                        },
                        ecommerce: {
                            fieldTitle: "--.business.socialNetwork.ecommerce",
                            fieldImage:'assets/social_network/e-commerce.png',
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'ecommerceLink',
                            placeholder:'http://...'
                        },
                        opinion: {
                            fieldTitle: "--.business.socialNetwork.opinion",
                            fieldImage:'assets/social_network/opinion.png',
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'opinionLink',
                            placeholder:'http://...'
                        },
                        reservation: {
                            fieldTitle: "--.business.socialNetwork.reservation",
                            fieldImage:'assets/social_network/reservation.png',
                            validationRegex: "^($|^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?$)",
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            focus: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'reservationLink',
                            placeholder:'http://...'
                        }

                    };

                    //
                    // validation : watching on field
                    //
                    scope.$watch('fields', function () {
                        var validation = true;

                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            if (scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                                validation = false;
                            }
                        }
                        scope.getInfo().isValid = validation;
                    }, true);


                    //
                    // display error watching
                    //
                    scope.$watch('getInfo().displayErrorMessage', function () {
                        for (var key in scope.fields) {
                            var obj = scope.fields[key];
                            obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                        }
                    });
                }
            }
        }
    }


}]);
myApp.directive('publicationListCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$location', 'accountService', 'followService', 'modalService', 'facebookService', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, accountService, followService, modalService, facebookService) {

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

                    scope.follow = function (publication) {
                        if (accountService.getMyself() != null) {
                            scope.followed(publication);
                        }
                        else {
                            modalService.openLoginModal(scope.followed, publication);
                        }
                    };

                    scope.followed = function (publication) {
                        var followed = publication.following;
                        followService.addFollow(!followed, publication.businessId, function () {
                            publication.following = !followed;
                            if (publication.following) {
                                publication.totalFollowers++;
                            }
                            else {
                                publication.totalFollowers--;
                            }
                            for (var i in scope.publications) {
                                if (scope.publications[i].businessId == publication.businessId) {
                                    scope.publications[i].following = publication.following;
                                    scope.publications[i].totalFollowers = publication.totalFollowers;
                                }
                            }
                        });
                    };

                    //scope.share = function (publication) {
                    //    facebookService.share('http://lynk-test.herokuapp.com/publication/'+publication.id);
                    //};


                    //(function(d, s, id) {
                    //    var js, fjs = d.getElementsByTagName(s)[0];
                    //    if (d.getElementById(id)) return;
                    //    js = d.createElement(s); js.id = id;
                    //    js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.4&appId=1446672245627002";
                    //    fjs.parentNode.insertBefore(js, fjs);
                    //}(document, 'script', 'facebook-jssdk'));


                }
            }
        }
    }
}]);
myApp.directive('scheduleCtrl', ['directiveService', function (directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/schedule/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.sections = [];

                    scope.days = [
                        'MONDAY',
                        'TUESDAY',
                        'WEDNESDAY',
                        'THURSDAY',
                        'FRIDAY',
                        'SATURDAY',
                        'SUNDAY'
                    ];

                    scope.daysTranslation = {
                        'MONDAY':'day_abrv_monday',
                        'TUESDAY':'day_abrv_tuesday',
                        'WEDNESDAY':'day_abrv_wednesday',
                        'THURSDAY':'day_abrv_thusday',
                        'FRIDAY':'day_abrv_friday',
                        'SATURDAY':'day_abrv_saturday',
                        'SUNDAY':'day_abrv_sunday'
                    };

                    scope.attendance_class = {
                        LIGHT: 'attendance-light',
                        MODERATE: 'attendance-moderate',
                        IMPORTANT: 'attendance-heavy'
                    };

                    scope.nbPair = function (nb) {
                        return !(nb % 2);
                    };


                    scope.$watch('getInfo().dto', function () {

                            if (scope.getInfo().dto != null && Object.keys(scope.getInfo().dto).length > 0){

                                var minMinute = null, maxMinute = null;

                                //1. looking for the min and max values
                                for (var dayKey in scope.days) {
                                    var day = scope.days[dayKey];
                                    for (var key in scope.getInfo().dto[day]) {
                                        var obj = scope.getInfo().dto[day][key];
                                        if (minMinute == null || minMinute > obj.from) {
                                            minMinute = obj.from;
                                        }
                                        if (maxMinute == null || maxMinute < obj.to) {
                                            maxMinute = obj.to;
                                        }
                                    }
                                }
                                if (minMinute % 60 == 30) {
                                    minMinute -= 30;
                                }
                                if (maxMinute % 60 == 30) {
                                    maxMinute += 30;
                                }


                                scope.hours = [];
                                for (var i = minMinute / 30; i <= maxMinute / 30; i++) {

                                    var hour = "";
                                    if (scope.nbPair(i)) {
                                        hour = i / 2;// + "h";
                                    }
                                    scope.hours.push({text: hour});
                                }
                                var displayWK = true;
                                if (scope.getInfo().dto['SATURDAY'].length == 0 &&
                                    scope.getInfo().dto['SUNDAY'].length == 0) {
                                    displayWK = false;
                                }

                                for (var dayKey in scope.days) {
                                    var day = scope.days[dayKey];
                                    if ((day == 'SUNDAY' || day == 'SATURDAY') && displayWK == false) {
                                        continue;
                                    }
                                    scope.sections[day] = [];
                                    for (var i = minMinute / 30; i < maxMinute / 30; i++) {
                                        scope.sections[day].push({
                                            minutes: i * 30,
                                            attendance: 'CLOSE'
                                        });
                                    }
                                }


                                for (var dayKey in scope.days) {
                                    var day = scope.days[dayKey];
                                    for (var key in scope.sections[day]) {
                                        var obj = scope.sections[day][key];
                                        obj.attendance = 'CLOSE';
                                    }

                                    for (var key in scope.getInfo().dto[day]) {
                                        var obj = scope.getInfo().dto[day][key];

                                        for (var key2 in scope.sections[day]) {
                                            var obj2 = scope.sections[day][key2];
                                            if (obj2.minutes >= obj.from &&
                                                (obj2.minutes + 30) <= obj.to) {
                                                obj2.attendance = obj.attendance;
                                            }
                                        }
                                    }
                                }
                            }

                        }, true
                    )
                    ;


                }
            }
        }
    }
}])
;
myApp.directive('galleryCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', '$location', 'accountService', 'followService', 'modalService', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, accountService, followService, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/gallery/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.openGallery = function (image) {
                        modalService.galleryModal(image, scope.getInfo().images);
                    }
                }
            }
        }
    }
}]);
myApp.directive('googleMapWidgetCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', '$window', function ($rootScope, businessService, geolocationService, directiveService, $window) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/googleMapWidget/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.$watch('getInfo().address', function () {

                        scope.getInfo().refreshNow = function () {
                            scope.centerMap();
                        };

                        if (scope.getInfo().address != null) {
                            //test
                            scope.centerMap = function () {
                                scope.map = {
                                    center: {
                                        latitude: scope.getInfo().address.posx,
                                        longitude: scope.getInfo().address.posy
                                    }
                                };
                            };

                            scope.toGoogleMap = function () {//function navigate(lat, lng) {
                                // If it's an iPhone..
                                if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
                                    function iOSversion() {
                                        if (/iP(hone|od|ad)/.test(navigator.platform)) {
                                            // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
                                            var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                                            return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                                        }
                                    }
                                    var ver = iOSversion() || [0];

                                    var protocol = "";

                                    if (ver[0] >= 6) {
                                        protocol = 'maps://';
                                    } else {
                                        protocol = 'http://';

                                    }
                                    window.location = protocol + scope.complete('maps.apple.com/maps');
                                }
                                else {
                                    window.open(scope.complete('http://maps.google.com'));
                                }
                            };

                            scope.complete = function(url){
                                var address = scope.getInfo().address;
                                url += '?q='+address.posx + ",+" + address.posy;
                                return url;
                            };
                        }
                    });

                }
            }
        }
    }
}]);
myApp.directive('searchResultCtrl', ['directiveService', '$location', 'searchBarService', function (directiveService, $location, searchBarService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/searchResult/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    var counter = -1;
                    scope.$watch('getInfo().result', function () {
                        if (scope.getInfo().result != null) {
                            counter = -1;
                            for (var i in scope.getInfo().result.businesses) {
                                scope.getInfo().result.businesses[i].index = ++counter;
                            }
                            scope.seeMoreBusinessIndex = ++counter;
                            for (var i in scope.getInfo().result.publications) {
                                scope.getInfo().result.publications[i].index = ++counter;
                            }
                            scope.seeMorePublicationIndex = ++counter;
                            for (var i in scope.getInfo().result.categories) {
                                scope.getInfo().result.categories[i].index = ++counter;
                            }
                            scope.seeMoreCategoryIndex = ++counter;
                            scope.seeMoreIndex = ++counter;
                        }
                        else {
                            scope.getInfo().display = false;
                        }
                        scope.indexSelected = null;
                    });

                    scope.indexSelected = null;

                    $(document).keydown(function (e) {
                        if (e.keyCode == 40) {
                            if (scope.indexSelected == null ||
                                scope.indexSelected == counter) {
                                scope.indexSelected = 0;
                            }
                            else {
                                scope.indexSelected++;
                            }
                            scope.$apply();
                        }
                        else if (e.keyCode == 38) {
                            if (scope.indexSelected == null ||
                                scope.indexSelected == 0) {
                                scope.indexSelected = counter;
                            }
                            else {
                                scope.indexSelected--;
                            }
                            scope.$apply();
                        }
                        else if (e.keyCode == 13) {
                            for (var i in scope.getInfo().result.businesses) {
                                if (scope.indexSelected == scope.getInfo().result.businesses[i].index) {
                                    scope.goToBusiness(scope.getInfo().result.businesses[i]);
                                    break;
                                }
                            }
                            for (var i in scope.getInfo().result.categories) {
                                if (scope.indexSelected == scope.getInfo().result.categories[i].index) {
                                    scope.goToCategory(scope.getInfo().result.categories[i]);
                                    break;
                                }
                            }
                            for (var i in scope.getInfo().result.publications) {
                                if (scope.indexSelected == scope.getInfo().result.publications[i].index) {
                                    scope.goToPublication(scope.getInfo().result.publications[i]);
                                    break;
                                }
                            }
                            scope.$apply();
                        }
                        else if (e.keyCode == 27) {
                            scope.getInfo().display = false;
                            scope.indexSelected = null;
                            scope.$apply();
                        }
                    });

                    $(document).click(function () {
                        if (!($('#searchContainer').is(':hover'))) {
                            scope.getInfo().display = false;
                            scope.indexSelected = null;
                            scope.$apply();
                        }
                    });

                    scope.select = function (index) {
                        scope.indexSelected = index;
                    };

                    scope.seeAll = function () {
                        scope.navigateTo('search/' + searchBarService.currentSearch);
                    };

                    scope.goToPublication = function (publication) {
                        scope.navigateTo('business/' + publication.businessId + '/publication/' + publication.id);
                    };

                    scope.goToBusiness = function (business) {
                        scope.navigateTo('business/' + business.id);
                    };


                    scope.seeAllPublication = function () {
                        scope.navigateTo('search/publication:' + removeCriteria(searchBarService.currentSearch));
                    };

                    scope.seeAllBusiness = function () {
                        scope.navigateTo('search/business:' + removeCriteria(searchBarService.currentSearch));
                    };

                    scope.seeAllCategory = function () {
                        scope.navigateTo('search/category:' + removeCriteria(searchBarService.currentSearch));
                    };

                    scope.goToCategory = function (category) {

                        var target = null;

                        if (category.subSubCategory != null) {
                            target = category.subSubCategory.translationName;
                        }
                        else if (category.subCategory != null) {
                            target = category.subCategory.translationName;
                        }
                        else {
                            target = category.category.translationName;
                        }
                        scope.navigateTo('search/category:' + removeCriteria(target));
                    };

                    var removeCriteria = function (s) {

                        if (s.indexOf(":") != -1) {
                            return s.split(':')[1];
                        }
                        else {
                            return s;
                        }
                    };

                    scope.navigateTo = function (target) {
                        $location.path(target);
                        scope.getInfo().display = false;
                        scope.getInfo().cleanSearch();
                    };

                }
            }
        }
    }
}]);
myApp.directive('searchBarCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', 'searchService', 'searchBarService', '$timeout', function ($rootScope, businessService, geolocationService, directiveService, searchService, searchService,searchBarService,$timeout) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/searchBar/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.advancedSearch = false;

                    scope.displayAdvancedSearch = function () {
                        scope.advancedSearch = !scope.advancedSearch;
                        $rootScope.$broadcast('DISPLAY_ADVANCED_SEARCH',{display:scope.advancedSearch});
                    };

                    scope.searchBarService = searchBarService;

                    scope.searchResultParam = {
                        display: false,
                        cleanSearch: function () {
                            searchBarService.currentSearch = "";
                        }
                    };

                    scope.$watch('searchBarService.currentSearch', function (o, n) {
                        if (searchBarService.displaySearchResult && o != n && searchBarService.currentSearch != "" && searchBarService.currentSearch.length >= 2) {
                            var searchS = angular.copy(searchBarService.currentSearch);
                            $timeout(function () {
                                if (searchS == searchBarService.currentSearch) {

                                    if ((searchBarService.currentSearch.indexOf(":") != -1 && searchBarService.currentSearch.split(":")[1].length > 0) ||
                                        (searchBarService.currentSearch.indexOf(":") == -1 && searchBarService.currentSearch.length > 0)) {
                                        searchService.searchByStringLittle(searchBarService.currentSearch, function (result) {
                                            scope.searchResultParam.result = result;
                                            scope.searchResultParam.display = true;
                                        });
                                    }
                                }
                            }, 500);
                        }
                    });


                    scope.search = function () {
                    };
                    
                }
            }
        }
    }
}]);
myApp.filter("translateText", ['$sce', 'translationService', function ($sce, translationService) {
    return function (input, params) {
        var text;

        if (typeof input === 'object') {
            text = translationService.get(input[0]);
            for (var key in input) {
                if (key != 0) {
                    text = text.replace('{' + (parseFloat(key) -1) + '}', input[key]);
                }
            }
            return text;
        }
        else {
            text = translationService.get(input);

            if (params != null) {
                if (typeof params === 'array') {
                    for (var key in params) {
                        text = text.replace('{' + key + '}', params[key]);
                    }
                } else {
                    text = text.replace('{0}', params);
                }
            }

            return text;
        }
        return input;
    };
}]);

myApp.filter("zeropad", ['$sce', 'translationService', function ($sce, translationService) {
    return function (n) {
        var len = 2;
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = ''+num;
        while (num.length < len) {
            num = '0'+num;
        }
        return num;
    };
}]);

myApp.filter("image", function () {
    return function (input,orginal) {
        if(input!=null && input!=undefined) {
            if(orginal!=undefined && orginal == true){
                return "https://s3.amazonaws.com/lynk-test/" + input.storedNameOriginalSize;
            }
            else {
                return "https://s3.amazonaws.com/lynk-test/" + input.storedName;
            }
        }
        return null;
    };
});

//
// initialization external modules
//


//
// initialize routes
//
initializeCommonRoutes();

//
// main ctrl
//
myApp.controller('MainCtrl', ['$scope', '$locale', 'translationService', '$window', 'facebookService', 'languageService', '$location', 'modalService', 'accountService', 'geolocationService', function ($scope, $locale, translationService, $window, facebookService, languageService, $location, modalService, accountService,geolocationService) {

    $scope.navigateTo = function (target) {
        $location.path(target);
    };

    //
    // initialize translations
    // load from data var and insert into into translationService
    //
    if ("data" in window && data != undefined && data != null) {
        translationService.set(data.translations);
    }

    //import data
    //store the current user into the model
    accountService.setMyself(data.mySelf);
    facebookService.facebookAppId = data.appId;
    languageService.setLanguages(lang, languages);

    //
    //facebook initialization
    //
    facebookService.ini();
    if (accountService.getMyself() == null) {
        facebookService.getLoginStatus();
    }
    else {
        facebookService.recover();
    }


    //
    // help functionalities
    //
    $scope.helpDisplayed = false;

    $scope.displayHelp = function () {
        $scope.helpDisplayed = true;
    };

    $scope.maskHelp = function () {
        $scope.helpDisplayed = false;
    };

    $scope.openHelp = function (message) {
        modalService.openHelpModal(message);
    };
}]);
myApp.service("directiveService", ['$sce', function($sce) {
    this.autoScope = function(s) {
        var k, res, v;
        res = {};
        for (k in s) {
            v = s[k];
            res[k] = v;
            if (k.slice(0, 2) === 'ng' && v === '=') {
                res[k[2].toLowerCase() + k.slice(3)] = '@';
            }
        }
        return res;
    };
    this.autoScopeImpl = function(s, name) {
        var fget, key, val;
        s.$$NAME = name;
        for (key in s) {
            val = s[key];
            if (key.slice(0, 2) === 'ng') {
                fget = function(scope, k) {
                    return function() {
                        var v;
                        v = 0;
                        if (scope[k] === void 0 || scope[k] === null || scope[k] === '') {
                            v = scope[k[2].toLowerCase() + k.slice(3)];
                        } else {
                            v = scope[k];
                        }
                        if (scope['decorate' + k.slice(2)]) {
                            return scope['decorate' + k.slice(2)](v);
                        } else {
                            return v;
                        }
                    };
                };
                s['get' + key.slice(2)] = fget(s, key);
            }
        }
        s.isTrue = function(v) {
            return v === true || v === 'true' || v === 'y';
        };
        s.isFalse = function(v) {
            return v === false || v === 'false' || v === 'n';
        };
        s.isNull = function(v) {
            return v === null;
        };
        return s.html = function(v) {
            return $sce.trustAsHtml(v);
        };
    };
}]);

myApp.service("$flash", ['$filter', function($filter) {

    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-top messenger-on-center cr-messenger',
        theme: 'block'
    }

    this.success = function(messages) {
        print(messages,'success');
        return;
    };
    this.info = function(messages) {
        print(messages,'info');
        return
    };
    this.error = function(messages) {
        print(messages,'error');
        return;

    };
    this.warning = function(messages) {
        print(messages,'warning');
        return;
    };

    print = function(messages,type){

        if(!(angular.isUndefined(messages) || messages === null )) {
            for (var key in messages.split("\n")) {
                var message = messages.split("\n")[key];

                Messenger().post({
                    message: message,
                    type: type,
                    showCloseButton: true
                });
            }
        };
        return;
    }
}]);

myApp.service("generateId", ['$rootScope', function($rootScope) {
    this.generate = function() {
        var i, possible, text;
        text = "";
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        i = 0;
        while (i < 20) {
            text += possible.charAt(((Math.random() * possible.length)|0));
            i++;
        }
        return text;
    };
}]);

myApp.service("translationService", ['$rootScope', '$filter', '$http', '$locale', function ($rootScope, $filter, $http,$locale) {
    var svc;
    svc = this;
    svc.elements = null;

    svc.set = function(elements){
        svc.elements = elements.translations;
    };

    svc.get = function (code) {

        if(!!svc.elements[code]){
            return svc.elements[code];
        }
        return code;
    };

    svc.translateExceptionsDTO = function (exception) {
        if ((exception.params != null) && Object.keys(exception.params).length > 0) {
            return $filter('translateTextWithVars')(exception.messageToTranslate, exception.params);
        } else if (exception.messageToTranslate != null) {
            return $filter('translate')(exception.messageToTranslate);
        } else {
            return exception.message;
        }
    };
}]);

myApp.service("modelService", ['$rootScope', function($rootScope) {

    this.MY_SELF="MYSELF";
    this.APP_ID="APP_ID";

    this.model = {};

    this.set = function(key,content) {
        this.model[key]= content;
    };

    this.get = function(key){
        return this.model[key];
    };

    this.remove = function(key){
        delete this.model[key];
    };
}]);
myApp.service("facebookService", ['$http', 'accountService', '$locale', 'languageService', '$FB', function ($http, accountService, $locale, languageService,$FB) {


    this.facebookAppId;

    //
    // initialization
    //
    this.ini = function () {
        FB.init({
            appId: this.facebookAppId,
            cookie: true,
            xfbml: true,
            version: 'v2.3'
        });
        $FB.init(this.facebookAppId);

        FB.getLoginStatus(function (response) {
            if(response.status == 'connected'){
                isConnected=true;
            }
        });
    };

    var isConnected = false;

    this.isConnected = function () {
        return isConnected;
    };


    //
    // registration
    //
    this.registration = function (successCallback, failCallback) {

        // From now on you can use the  service just as Facebook api says
        FB.login(function (response) {

            if (response.status === 'connected') {

                successCallback(response.authResponse);
                isConnected = true;
            }
            else {
                failCallback();
            }
        }, {
            scope: 'public_profile, email,publish_actions'
        });
    };

    //
    // login
    //
    this.login = function (successCallback, failCallback) {
        // From now on you can use the  service just as Facebook api says
        FB.login(function (response) {

            if (response.status === 'connected') {

                loginToServer(response.authResponse, successCallback, failCallback);
                isConnected = true;
            }
            else {
                failCallback();
            }
        }, {
            scope: 'public_profile, email,publish_actions'
        });
    };

    this.recover = function (successCallback, failCallback) {
        //From now on you can use the  service just as Facebook api says
        FB.getLoginStatus(function (response) {

        });
    };

    //
    // login
    //
    me = function (successCallback, failCallback) {
        // From now on you can use the  service just as Facebook api says
        FB.api('/me', {
            fields: 'first_name,last_name,email,gender,locale'
        }, function (response) {
            if (!response || response.error) {
                failCallback(response.status, response.error);
            } else {
                successCallback(response);
            }
        });
    };

    //
    // get login : test if the user is currently connected
    //if the user is connected, connect to the server
    //
    this.getLoginStatus = function () {

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {

                //the user is now connected by facebook
                isConnected = true;

                loginToServer(response.authResponse, function (data) {
                        //success
                        //store connected user
                        accountService.setMyself(data);

                        //test lang
                        languageService.changeLanguage(data.lang.code);
                    },
                    function () {
                        //connection failed
                    });
            } else {
                //connection failed
            }
        });
    };

    this.logout = function () {

        //if (this.isConnected()) {
        FB.logout(function (response) {
        });
        //
    };

    this.share = function(url){
        url = url.replace('#','%23');
        FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object:url
            })
        }, function(response){});
    };

    loginToServer = function (authResponse, callbackSuccess, callbackError) {

        var access_token = authResponse.accessToken;
        var user_id = authResponse.userID;

        //send request
        var dto = {
            userId: user_id,
            token: access_token
        };

        $http({
            'method': "POST",
            'url': "/rest/login/facebook",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
            ;
        })
            .error(function (data, status) {
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


}]);
myApp.service("languageService", ['$flash', '$window', '$http', '$rootScope', function ($flash, $window, $http,$rootScope) {

    this.languages;
    this.languagesStructured = [];
    this.currentLanguage;
    var self= this;

    this.setLanguages = function (currentLanguage, languages) {
        this.currentLanguage = currentLanguage;
        this.languages = languages;

        for (var key in languages) {
            lang = languages[key];
            this.languagesStructured.push({
                key: lang.code,
                value: lang.language
            });
        }
    };

    $rootScope.$watch(function() {
        return self.currentLanguage;
    }, function watchCallback(newValue, oldValue) {
        if(newValue != oldValue) {
            self.changeLanguage(self.currentLanguage,true);
        }
    });

    this.changeLanguage = function (lang,forced) {
        if (lang != this.currentLanguage ||forced) {

            $http({
                'method': "PUT",
                'url': "/rest/language/" + lang,
                'headers': "Content-Type:application/json;charset=utf-8"
            }).success(function (data, status) {
                $window.location.reload();
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                });
        }
    }
}]);

myApp.service("customerInterestService", ['$sce', '$http', '$flash', function ($sce, $http, $flash) {


    var customerInterests = null;


    var loadAll = function (callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/rest/customerInterest",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            customerInterests = data.list;
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if (callbackError != null) {
                    callbackError(data, status);
                }
                $flash.error(data);
            });
    };

    this.getAll = function (callback) {
        if (customerInterests == null) {
            loadAll(callback);
        }
        else {
            callback(angular.copy(customerInterests));
        }

    }

}]);
myApp.service("accountService", ['$flash', '$http', function ($flash, $http) {

    var self = this;

    this.model = {
        myself: null
    };

    this.testEmail = function (email, callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/rest/email/test/" + email,
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.value);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.registration = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/registration/customer",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            self.setMyself(data);
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.testFacebook = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/facebook/test",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.logout = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/logout",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            self.setMyself(null);
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.accountFusion = function (accountFusion, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/account/fusion",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': accountFusion
        }).success(function (data, status) {
            $flash.success(translationService.get("--.login.flash.success"));
            self.setMyself(data);
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.changePassword = function (oldPassword, newPassword, callbackSuccess, callbackError) {
        var dto = {
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        $http({
            'method': "PUT",
            'url': "/rest/account/password/" + self.getMyself().id,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.editAccount = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/account/" + self.getMyself().id,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            self.setMyself(data);
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.login = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/login",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            self.setMyself(data);
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                console.log(data);
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.addAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/address",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            self.getMyself().addresses.push(data);
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.editAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/address/" + dto.id,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {

            for (var key in self.getMyself().addresses) {
                if (self.getMyself().addresses[key].id == dto.id) {
                    self.getMyself().addresses.splice(key, 1, data);
                }
            }
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.deleteAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "DELETE",
            'url': "/rest/address/" + dto.id,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {

            for (var key in self.getMyself().addresses) {
                if (self.getMyself().addresses[key].id == dto.id) {
                    self.getMyself().addresses.splice(key, 1);
                }
            }
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.editCustomerInterest = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/customer/interest/" + self.getMyself().id,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {

            self.getMyself().customerInterests = data.list;
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.forgotPassword = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/forgot/password",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.getMyself = function () {
        return this.model.myself;
    };

    this.setMyself = function (dto) {
        this.model.myself = dto;
    };
}]);
myApp.service("businessCategoryService", ['$sce', '$http', '$flash', function ($sce,$http,$flash) {


    var businessCategory = null;


    var loadAll = function (callbackSuccess,callbackError) {
        $http({
            'method': "GET",
            'url': "/rest/businessCategory",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            businessCategory = data;
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
        .error(function (data, status) {
            if (callbackError != null) {
                callbackError(data, status);
            }
            $flash.error(data.message);
        });
    };

    this.getAll = function (callback) {
        if (businessCategory == null) {
            loadAll(callback);
        }
        else {
            callback(angular.copy(businessCategory));
        }

    }

}]);
myApp.service("businessService", ['$flash', '$http', 'accountService', function ($flash, $http, accountService) {


    this.getBusiness = function (id, callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/rest/business/" + id,
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.registration = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/registration/business",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            accountService.setMyself(data);
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.edit = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/business",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            accountService.getMyself().business = data;
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.editSocialNetwork = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/business/social_network",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.editBusinessCategory = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/business/category",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {list: dto}
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.publishBusiness = function (callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/ask_publication",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {}
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.cancelPublishRequest = function (callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/cancel_publication_request",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {}
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.stopPublication = function (callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/stop_publish",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {}
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };


    this.editIllustration = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/business/illustration",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            //accountService.getMyself().business.illustration = dto;
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.editLandscape = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/business/landscape",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            //accountService.getMyself().business.illustration = dto;
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.editAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/business/address",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.createSchedule = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/schedule",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.editGallery = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/edit/gallery",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.getInterests = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/business/interests",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

}]);
myApp.service("modalService", ['$modal', function ($modal) {


    this.basicModal = function (title, directiveName, param, save) {
        var resolve = {
            directiveName: function () {
                return directiveName;
            },
            param: function () {
                return param;
            },
            title: function () {
                return title;
            },
            save: function () {
                return save;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/BasicModal/view.html",
            controller: "BasicModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };
    this.messageModal = function (title, message, save) {
        var resolve = {
            message: function () {
                return message;
            },
            title: function () {
                return title;
            },
            save: function () {
                return save;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/MessageModal/view.html",
            controller: "MessageModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };

    this.openCustomerRegistrationModal = function (fctToExecute,fctToExecuteParams) {
        var resolve = {
            fctToExecute: function () {
                return fctToExecute;
            },
            fctToExecuteParams:function(){
                return fctToExecuteParams;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/CustomerRegistrationModal/view.html",
            controller: "CustomerRegistrationModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };

    this.openBusinessRegistrationModal = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/BusinessRegistrationModal/view.html",
            controller: "BusinessRegistrationModalCtrl",
            size: "lg"
        });
    };

    this.openEditProfileModal = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/EditProfileModal/view.html",
            controller: "EditProfileModalCtrl",
            size: "l"
        });
    };

    this.openLoginModal = function (fctToExecute,fctToExecuteParams) {
        var resolve = {
            fctToExecute: function () {
                return fctToExecute;
            },
            fctToExecuteParams:function(){
                return fctToExecuteParams;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/LoginModal/view.html",
            controller: "LoginModalCtrl",
            size: "l",
            resolve: resolve
        });
    }

    this.openHelpModal = function (message) {
        var resolve = {
            message: function () {
                return message;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/HelpModal/view.html",
            controller: "HelpModalCtrl",
            size: 'sm',
            resolve: resolve
        });
    }

    this.openCalculatorModal = function (callbackResult) {
        var resolve = {
            setResult: function () {
                return function (result) {
                    callbackResult(result);
                };
            }
        };

        $modal.open({
            templateUrl: "/assets/javascripts/modal/Calculator/view.html",
            controller: "CalculatorModalCtrl",
            size: "sm",
            resolve: resolve
        });
    };

    this.openFacebookFusionModal = function (accountFusion) {
        var resolve = {
            accountFusion: function () {
                return accountFusion;
            }
        };

        $modal.open({
            templateUrl: "/assets/javascripts/modal/AccountFusionFacebookModal/view.html",
            controller: "AccountFusionFacebookModalCtrl",
            size: "l",
            resolve: resolve
        });
    };

    this.openEditPasswordModal = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/ChangePassword/view.html",
            controller: "ChangePasswordModalCtrl",
            size: "l"
        });
    };

    this.openEditCustomerInterest = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/EditCustomerInterestModal/view.html",
            controller: "EditCustomerInterestModalCtrl",
            size: "lg"
        });
    };

    this.addressModal = function (addName, address, isBusiness) {
        var resolve = {
            dto: function () {
                return address;
            }
            , addName: function () {
                return addName;
            },
            isBusiness: function () {
                return isBusiness;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/AddressModal/view.html",
            controller: "AddressModalCtrl",
            size: "l",
            resolve: resolve
        });
    };

    this.openForgotPasswordModal = function (email) {
        var resolve = {
            email: function () {
                return email;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/ForgotPasswordModal/view.html",
            controller: "ForgotPasswordModalCtrl",
            size: "l",
            resolve: resolve
        });
    };


    this.openPromotionModal = function (promotion,callback) {
        var resolve = {
            dto: function () {
                return promotion;
            },
            callback:function(){
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/PromotionModal/view.html",
            controller: "PromotionModalCtrl",
            size: "l",
            resolve: resolve
        });
    };


    this.openBusinessNotificationModal = function (businessNotification,callback) {
        var resolve = {
            dto: function () {
                return businessNotification;
            },
            callback:function(){
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/BusinessNotificationModal/view.html",
            controller: "BusinessNotificationModalCtrl",
            size: "l",
            resolve: resolve
        });
    };


    this.openOneFieldModal = function (field, callback) {
        var resolve = {
            field: function () {
                return field;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/OneFieldModal/view.html",
            controller: "OneFieldModalCtrl",
            size: "l",
            resolve: resolve
        });
    };

    this.galleryModal = function (image, images) {
        var resolve = {
            image: function () {
                return image;
            },
            images: function () {
                return images;
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

}]);
myApp.service("promotionService", ['$http', '$flash', '$rootScope', function ($http, $flash, $rootScope) {

    this.add = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/promotion",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.edit = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/promotion/" + dto.id,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

}]);
myApp.service("geolocationService", ['geolocation', '$http', 'accountService', '$timeout', '$rootScope', '$window', function (geolocation, $http, accountService, $timeout, $rootScope, $window) {


        this.position = null;
        this.currentPosition = null;
        var self = this;

        $http({
            'method': "GET",
            'url': "http://ipinfo.io/json",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (self.currentPosition == null) {
                var pos = data.loc.split(',');
                self.currentPosition = {
                    x: pos[0],
                    y: pos[1]
                };
                computePosition();
                $timeout(function () {
                    $rootScope.$broadcast('POSITION_CHANGED');
                }, 1);
            }
        });


        if ($window.navigator && $window.navigator.geolocation) {

            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    self.currentPosition = {
                        x: position.coords.latitude,
                        y: position.coords.longitude
                    };
                    computePosition();
                    $timeout(function () {
                        $rootScope.$broadcast('POSITION_CHANGED');
                    }, 1);
                });
        }

        var computePosition = function () {

            if (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null) {
                if (self.currentPosition == null) {

                    $rootScope.$watch(function () {
                        return self.currentPosition;
                    }, function watchCallback(n, o) {
                        if (n != null) {
                            self.position = {
                                x: self.currentPosition.x,
                                y: self.currentPosition.y
                            };

                        }
                    });

                }
                else {
                    self.position = {
                        x: self.currentPosition.x,
                        y: self.currentPosition.y
                    };
                }
            }
            else {
                self.position = {
                    x: accountService.getMyself().selectedAddress.posx,
                    y: accountService.getMyself().selectedAddress.posy
                };
            }
        };

        $timeout(function () {
            computePosition();
        }, 1);

        $rootScope.$watch(function () {
            if (accountService.model.myself != null) {
                return accountService.model.myself.selectedAddress;
            }
            return null;
        }, function watchCallback(newValue, oldValue) {
            computePosition();
        });

        this.getLocationText = function () {
            if (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null) {
                return "currentPosition";
            }
            else {
                return accountService.getMyself().selectedAddress.name;
            }
        };
    }]
)
;

myApp.service("businessNotificationService", ['$http', '$flash', '$rootScope', function ($http, $flash, $rootScope) {

    this.REFRESH_BUSINESS_NOTIFICAITON = "REFRESH_BUSINESS_NOTIFICAITON";

    var self = this;

    this.add = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/businessNotification",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
            $rootScope.$broadcast(self.REFRESH_BUSINESS_NOTIFICAITON);
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.edit = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/businessNotification/" + dto.id,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
            $rootScope.$broadcast(self.REFRESH_BUSINESS_NOTIFICAITON);
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };
}]);
myApp.service("addressService", ['$flash', '$http', 'geolocationService', function ($flash, $http, geolocationService) {


    this.testAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/address/test",
            'headers': "Content-Type:application/json;charset=utf-8",
            data: dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.value);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.distance = function (addressId, callbackSuccess, callbackError) {

        if (geolocationService.position != null) {
            $http({
                'method': "POST",
                'url': "/rest/address/distance/" + addressId,
                'headers': "Content-Type:application/json;charset=utf-8",
                data: geolocationService.position
            }).success(function (data, status) {
                if (callbackSuccess != null) {
                    callbackSuccess(data);
                }
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                    if (callbackError != null) {
                        callbackError(data, status);
                    }
                });
        }
    };

    this.changeAddress = function (addressText, callbackSuccess, callbackError) {

        if (geolocationService.position != null) {
            $http({
                'method': "PUT",
                'url': "/rest/address/current",
                'headers': "Content-Type:application/json;charset=utf-8",
                data: {
                    addressName:addressText
                }
            }).success(function (data, status) {
                if (callbackSuccess != null) {
                    callbackSuccess(data);
                }
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                    if (callbackError != null) {
                        callbackError(data, status);
                    }
                });
        }
    };

}]);
myApp.service("followService", ['$flash', '$http', function ($flash, $http) {

    var self = this;

    this.model = {
        myself: null
    };

    this.addFollow = function (follow,businessId, callbackSuccess, callbackError) {
        var dto = {
            follow:follow,
            businessId:businessId
        };
        
        $http({
            'method': "POST",
            'url': "/rest/follow",
            'headers': "Content-Type:application/json;charset=utf-8",
            data:dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.value);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.getFollows = function (callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/rest/follow",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };
}]);
myApp.service("searchService", ['$http', '$flash', '$rootScope', 'geolocationService', '$q', function ($http, $flash, $rootScope, geolocationService, $q) {


    this.currentSearch = "";

    var canceler = null;

    this.default = function (callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/default",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.searchByStringLittle = function (searchText, callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/text/little",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {
                search: searchText,
                position: geolocationService.position
            },
            'config': {
                timeout: canceler.promise
            }
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.searchByString = function (searchText, callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/text",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {
                search: searchText,
                position: geolocationService.position
            },
            'config': {
                timeout: canceler.promise
            }
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byFollowed = function (callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/followed",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byFollowedAndInterest = function (interestId,callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/followed/interest/"+interestId,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.byBusiness = function (businessId, callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        console.log("geolocationService.position");
        console.log(geolocationService.position);

        $http({
            'method': "POST",
            'url': "/rest/search/publication/business/" + businessId,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byInterest = function (interestId, callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }

        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/interest/" + interestId,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };
}]);
myApp.service("searchBarService", ['$timeout', '$rootScope', function ($timeout, $rootScope) {

    this.currentSearch = "";
    this.searchCriteria = data.searchCriterias;

    var self = this;

    var suspendBinding = false;
    this.displaySearchResult = true;

    this.setCurrentSearch = function (search) {
        self.displaySearchResult = false;
        this.currentSearch = search;
        $timeout(function () {
            self.displaySearchResult = true;
        }, 1);
    };

    $rootScope.$watch(function () {
        return self.searchCriteria;
    }, function watchCallback(newValue, oldValue) {
        if (!suspendBinding) {
            suspendBinding = true;
            self.currentSearch = '';
            var first = true;
            for (var key in self.searchCriteria) {
                if (self.searchCriteria[key].selected === true) {
                    if (first) {
                        first = false;
                    }
                    else {
                        self.currentSearch += "|";
                    }
                    self.currentSearch += self.searchCriteria[key].key;
                }
            }
            if (!first) {
                self.currentSearch += ":";
                $(".search-bar").focus();
            }
            $timeout(function () {
                suspendBinding = false;
            }, 1);
        }
    }, true);


    $rootScope.$watch(function () {
        return self.currentSearch;
    }, function watchCallback(newValue, oldValue) {

        if (!suspendBinding) {
            suspendBinding = true;

            for (var j in self.searchCriteria) {
                self.searchCriteria[j].selected = false;
            }

            if (self.currentSearch.indexOf(":") != -1) {
                var criterias = self.currentSearch.split(":")[0].split("|");
                for (var j in self.searchCriteria) {
                    var founded=false;
                    for (var i in criterias) {
                        if (criterias[i] == self.searchCriteria[j].key) {
                            self.searchCriteria[j].selected = true;
                            founded=true;
                        }
                    }
                }
            }
            $timeout(function () {
                suspendBinding = false;
            }, 1);
        }
    });

}]);
myApp.service("publicationService", ['$http', '$flash', '$rootScope', function ($http, $flash, $rootScope) {

    this.delete = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "DELETE",
            'url': "/rest/publication/"+dto.id,
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

}]);
angular.module('app').run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("/assets/javascripts/directive/component/businessList/template.html",
    "<div class=business-list><div ng-show=\"getInfo().loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-show=\"getInfo().loading!=true && businesses.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-hide=\"getInfo().loading===true\" ng-repeat=\"business in businesses\" class=\"business-box business-business\" ng-click=click()><img class=illustration ng-src=\"{{business.illustration | image}}\"><div class=business-data><div><span class=link ng-click=\"navigateTo('/business/'+business.id)\">{{business.name}}</span></div><div><button ng-click=follow(business) class=follow-button><img src=/assets/images/haert.png ng-show=\"business.following\"> <img src=/assets/images/haert-off.png ng-hide=\"business.following\"></button> {{business.totalFollowers}}</div><div class=distance><i class=\"fa fa-globe\"></i> {{business.distance / 1000 | number:2}} km</div><br></div><div class=business-list-body><category-line-ctrl ng-info={categories:business.categories}></category-line-ctrl>{{business.description}}<div style=\"float: right\"><google-map-widget-ctrl ng-info={address:business.address}></google-map-widget-ctrl></div></div></div></div>");
  $templateCache.put("/assets/javascripts/directive/component/categoryLine/template.html",
    "<div><table class=category-line-tree><tr ng-repeat=\"(catLev1Key,lev2) in getInfo().categories\"><td><a ng-click=searchCat(catLev1Key)>{{catLev1Key | translateText}}</a> <span class=transition>>></span></td><td><table><tr ng-repeat=\"(catLev2Key, lev3) in lev2\"><td><a ng-click=searchCat(catLev2Key)>{{catLev2Key | translateText}}</a> <span class=transition>>></span></td><td><span ng-repeat=\"catLev3 in lev3\"><span class=transition ng-show=\"$index>0\">/</span> <a ng-click=searchCat(catLev3.translationName)>{{catLev3.translationName | translateText}}</a></span></td></tr></table></td></tr></table></div>");
  $templateCache.put("/assets/javascripts/directive/component/gallery/template.html",
    "<div class=gallery-component><img ng-repeat=\"image in getInfo().images\" ng-click=openGallery(image) class=gallery-picture ng-src=\"{{image | image}}\"></div>");
  $templateCache.put("/assets/javascripts/directive/component/googleMapWidget/template.html",
    "<div ng-click=toGoogleMap()><ui-gmap-google-map center=map.center dragging=false options=\"{disableDefaultUI:true,\n" +
    "                            draggable:false,\n" +
    "                            scrollwheel: false}\" zoom=15><ui-gmap-marker idkey=1 coords={latitude:getInfo().address.posx,longitude:getInfo().address.posy}></ui-gmap-marker></ui-gmap-google-map></div>");
  $templateCache.put("/assets/javascripts/directive/component/publicationList/template.html",
    "<div class=publication-list><div ng-show=\"getInfo().loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-show=\"getInfo().loading!=true && publications.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-hide=\"getInfo().loading===true\" ng-repeat=\"publication in publications\" class=\"publication-box publication-publication\" ng-click=click()><img class=\"link illustration\" ng-click=\"navigateTo('/business/'+publication.businessId)\" ng-src=\"{{publication.businessIllustration | image}}\"><div class=publication-list-business-data><div><span class=link ng-click=\"navigateTo('/business/'+publication.businessId)\">{{publication.businessName}}</span></div><div><button ng-click=follow(publication) class=follow-button><img src=/assets/images/haert.png ng-show=\"publication.following\"> <img src=/assets/images/haert-off.png ng-hide=\"publication.following\"></button> {{publication.totalFollowers}}</div><div class=distance><i class=\"fa fa-globe\"></i> {{publication.distance / 1000 | number:2}} km</div><br></div><div class=publication-list-publication-data><div class=publication-reduction><div ng-show=\"publication.type == 'PROMOTION' && publication.offPercent * 100 >= 1\">- {{publication.offPercent * 100|number:0}} % !</div><div ng-show=\"publication.type == 'PROMOTION' && publication.interval < (24 * 60 * 60 * 1000)\">Plus que {{ publication.interval |date:'H'}} h !</div></div><a facebook class=facebookShare data-url=http://lynk-test.herokuapp.com/business/{{publication.businessId}}/publication/{{publication.id}} data-shares=shares>{{ shares }}</a><div class=date><i class=\"fa fa-calendar\"></i> {{publication.startDate | date:medium}}</div><div class=publication-box-name>{{publication.title}}</div><div class=publication-box-description>{{publication.description}}</div><div ng-show=\"publication.type == 'PROMOTION'\" class=publication-box-promotion-data>{{'--.publication.promotionData' | translateText}}<table><tr ng-show=\"publication.quantity!=null\"><td>{{'--.promotion.quantity' | translateText}}</td><td>{{publication.quantity}} {{publication.unit}}</td></tr><tr ng-show=\"publication.originalPrice!=null\"><td>{{'--.promotion.originalUnitPrice' | translateText}}</td><td>{{publication.originalPrice | number:2}} €</td></tr><tr ng-show=\"publication.originalPrice!=null\"><td>{{'--.promotion.offPrice' | translateText}}</td><td>{{(publication.originalPrice * (1 - publication.offPercent)) | number:2 }} €</td></tr><tr><td>{{'--.promotion.offPercent' | translateText}}</td><td>- {{(publication.offPercent * 100) | number:2 }} %</td></tr></table></div><div class=publication-box-picture-container><gallery-ctrl ng-info={images:publication.pictures}></gallery-ctrl></div></div></div></div>");
  $templateCache.put("/assets/javascripts/directive/component/publicationListForBusiness/template.html",
    "<div class=publication-list><div ng-show=\"getInfo().loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-show=\"getInfo().loading!=true && businesses.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"publication in publications\" id=publication{{publication.id}} class=\"publication-box publication-promotion publication-list-publication-data\" ng-click=click()><div class=publication-list-publication-data><div class=publication-reduction><div ng-show=\"publication.type == 'PROMOTION' && publication.offPercent * 100 >= 1\">- {{publication.offPercent * 100|number:0}} % !</div><div ng-show=\"publication.type == 'PROMOTION' && publication.interval < (24 * 60 * 60 * 1000)\">Plus que {{ publication.interval |date:'H'}} h !</div></div><div class=date><i class=\"fa fa-calendar\"></i> {{publication.startDate | date:medium}}</div><div class=publication-box-name>{{publication.title}}</div><div class=publication-box-description>{{publication.description}}</div><div ng-show=\"publication.type == 'PROMOTION'\" class=publication-box-promotion-data>{{'--.publication.promotionData' | translateText}}<table><tr ng-show=\"publication.quantity!=null\"><td>{{'--.promotion.quantity' | translateText}}</td><td>{{publication.quantity}} {{publication.unit}}</td></tr><tr ng-show=\"publication.originalPrice!=null\"><td>{{'--.promotion.originalUnitPrice' | translateText}}</td><td>{{publication.originalPrice | number:2}} €</td></tr><tr ng-show=\"publication.originalPrice!=null\"><td>{{'--.promotion.offPrice' | translateText}}</td><td>{{(publication.originalPrice * (1 - publication.offPercent)) | number:2 }} €</td></tr><tr><td>{{'--.promotion.offPercent' | translateText}}</td><td>- {{(publication.offPercent * 100) | number:2 }} %</td></tr></table></div><div class=publication-box-picture-container><gallery-ctrl ng-info={images:publication.pictures}></gallery-ctrl></div></div><button ng-show=getInfo().displayRemoveIcon type=button class=\"btn btn-primary\" ng-click=removePublication(publication)>{{'--.generic.remove' | translateText}}</button></div></div>");
  $templateCache.put("/assets/javascripts/directive/component/publicationListMobile/template.html",
    "<div class=publication-list-mobile><div ng-show=\"getInfo().loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-show=\"getInfo().loading!=true && publications.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-hide=\"getInfo().loading===true\" ng-repeat=\"publication in publications\" class=\"publication-box publication-publication\" ng-click=click()><img class=\"link illustration\" ng-click=\"navigateTo('/business/'+publication.businessId)\" ng-src=\"{{publication.businessIllustration | image}}\"><div class=publication-list-business-data><div><span class=link ng-click=\"navigateTo('/business/'+publication.businessId)\">{{publication.businessName}}</span></div></div><div class=publication-list-publication-data><div class=publication-box-name>{{publication.title}}</div></div></div></div>");
  $templateCache.put("/assets/javascripts/directive/component/publicationListMobileForBusiness/template.html",
    "<div class=publication-list><div ng-show=\"getInfo().loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-show=\"getInfo().loading!=true && businesses.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"publication in publications\" id=publication{{publication.id}} class=\"publication-box publication-promotion publication-list-publication-data\" ng-click=click()><div class=publication-list-publication-data><div class=publication-reduction><div ng-show=\"publication.type == 'PROMOTION' && publication.offPercent * 100 >= 1\">- {{publication.offPercent * 100|number:0}} % !</div><div ng-show=\"publication.type == 'PROMOTION' && publication.interval < (24 * 60 * 60 * 1000)\">Plus que {{ publication.interval |date:'H'}} h !</div></div><div class=date><i class=\"fa fa-calendar\"></i> {{publication.startDate | date:medium}}</div><div class=publication-box-name>{{publication.title}}</div><div class=publication-box-description>{{publication.description}}</div><div ng-show=\"publication.type == 'PROMOTION'\" class=publication-box-promotion-data>{{'--.publication.promotionData' | translateText}}<table><tr ng-show=\"publication.quantity!=null\"><td>{{'--.promotion.quantity' | translateText}}</td><td>{{publication.quantity}} {{publication.unit}}</td></tr><tr ng-show=\"publication.originalPrice!=null\"><td>{{'--.promotion.originalUnitPrice' | translateText}}</td><td>{{publication.originalPrice | number:2}} €</td></tr><tr ng-show=\"publication.originalPrice!=null\"><td>{{'--.promotion.offPrice' | translateText}}</td><td>{{(publication.originalPrice * (1 - publication.offPercent)) | number:2 }} €</td></tr><tr><td>{{'--.promotion.offPercent' | translateText}}</td><td>- {{(publication.offPercent * 100) | number:2 }} %</td></tr></table></div><div class=publication-box-picture-container><gallery-ctrl ng-info={images:publication.pictures}></gallery-ctrl></div></div><button ng-show=getInfo().displayRemoveIcon type=button class=\"btn btn-primary\" ng-click=removePublication(publication)>{{'--.generic.remove' | translateText}}</button></div></div>");
  $templateCache.put("/assets/javascripts/directive/component/schedule/template.html",
    "<div class=schedule-form><table><tr><td></td><td ng-repeat=\"hour in hours\"><div class=hour-block-info><div>{{hour.text}}</div></div></td></tr><tr ng-repeat=\"day in days\" ng-show=\"sections[day].length >0\"><td>{{daysTranslation[day] | translateText}}</td><td ng-repeat=\"section in sections[day]\"><div class=hour-block ng-class=attendance_class[section.attendance] ng-mousedown=select(day,section) ng-mouseover=progress($event,day,section)></div></td></tr></table></div>");
  $templateCache.put("/assets/javascripts/directive/component/searchBar/template.html",
    "<div class=search-container><div ng-show=advancedSearch class=\"container search-advanced-block\"><div class=search-advanced-block-desc><div>{{'--.welcome.serach.advanced.criteria' | translateText}}</div><div class=search-advanced-criteria ng-repeat=\"criteria in searchBarService.searchCriteria\"><input type=checkbox ng-model=\"criteria.selected\"> {{criteria.nameRef | translateText}}</div></div></div><input dir-bottom-arrow=down() dir-top-arrow=top() dir-enter=search() ng-model=searchBarService.currentSearch class=search-bar placeholder=\"{{'--.welcome.search' | translateText}}\"><search-result-ctrl ng-info=searchResultParam></search-result-ctrl><button ng-show=getInfo().mobile ng-click=displayAdvancedSearch() class=\"glyphicon glyphicon-plus generic-cursor\"></button> <button ng-hide=getInfo().mobile class=search-advanced ng-click=displayAdvancedSearch()>{{'--.welcome.search.advanced.link' | translateText}}</button></div>");
  $templateCache.put("/assets/javascripts/directive/component/searchResult/template.html",
    "<div id=searchContainer ng-show=getInfo().display class=search-result-box dir-bottom-arrow=down() dir-top-arrow=top()><div ng-show=\"getInfo().result.businesses.length ==0 && getInfo().result.publications.length == 0 && getInfo().result.categories.length == 0\" class=search-result-nothing>{{'--.search.nothing' | translateText}}</div><div ng-hide=\"getInfo().result.businesses.length ==0 && getInfo().result.publications.length == 0 && getInfo().result.categories.length == 0\"><div ng-show=\"getInfo().result.businesses.length > 0\"><div class=search-result-sub-title>{{'--.search.business' | translateText}}</div><div class=\"search-result-business search-result-content\" ng-mouseenter=select(business.index) ng-click=goToBusiness(business) ng-class=\"{'search-result-selected':indexSelected==business.index}\" ng-repeat=\"business in getInfo().result.businesses\"><img ng-src=\"{{business.illustration | image}}\"> {{business.name}}</div><div class=search-result-content ng-click=seeAllBusiness() ng-mouseenter=select(seeMoreBusinessIndex) ng-class=\"{'search-result-selected':indexSelected==seeMoreBusinessIndex}\"><button class=\"search-result-show-more link\">{{'--.search.business.seeMore' | translateText}}</button></div></div><div ng-show=\"getInfo().result.publications.length >0\"><div class=search-result-sub-title>{{'--.search.publication' | translateText}}</div><table><tr class=\"search-result-publication search-result-content\" ng-mouseenter=select(publication.index) ng-click=goToPublication(publication) ng-class=\"{'search-result-selected':indexSelected==publication.index}\" ng-repeat=\"publication in getInfo().result.publications\"><td><img ng-src=\"{{publication.pictures[0] | image}}\"> {{publication.title}}</td><td><div class=search-result-publication-business><img ng-src=\"{{publication.businessIllustration | image}}\"> {{publication.businessName}}</div></td></tr></table><div ng-click=seeAllPublication() ng-mouseenter=select(seeMorePublicationIndex) class=search-result-content ng-class=\"{'search-result-selected':indexSelected==seeMorePublicationIndex}\"><div class=\"search-result-show-more link\">{{'--.search.publication.seeMore' | translateText}}</div></div></div><div ng-show=\"getInfo().result.categories.length > 0\"><div class=search-result-sub-title>{{'--.search.category' | translateText}}</div><div class=\"search-result-category search-result-content\" ng-mouseenter=select(category.index) ng-click=goToCategory(category) ng-class=\"{'search-result-selected':indexSelected==category.index}\" ng-repeat=\"category in getInfo().result.categories\">{{category.category.translationName}} <span class=transition ng-show=\"category.subCategory!=null\">>></span> {{category.subCategory.translationName}} <span class=transition ng-show=\"category.subSubCategory!=null\">>></span> {{category.subSubCategory.translationName}}</div><div ng-click=seeAllCategory() class=search-result-content ng-mouseenter=select(seeMoreCategoryIndex) ng-class=\"{'search-result-selected':indexSelected==seeMoreCategoryIndex}\"><div class=\"search-result-show-more link\">{{'--.search.category.seeMore' | translateText}}</div></div></div><div class=search-result-content ng-click=seeAll() ng-mouseenter=select(seeMoreIndex) ng-class=\"{'search-result-selected':indexSelected==seeMoreIndex}\"><div class=\"search-result-show-more link\">{{'--.search.seeMore' | translateText}}</div></div></div></div>");
  $templateCache.put("/assets/javascripts/directive/field/dirFieldCheck/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div ng-class=\"{'input-group':!!getInfo().money}\"><button class=\"calculator btn btn-sm btn-default fa fa-calculator\" ng-click=openCalculator()></button> <input type=checkbox ng-disabled=getInfo().disabled() ng-model=getInfo().field[getInfo().fieldName] ng-class=\"{input_number: getInfo().numbersOnly === 'integer' || getInfo().numbersOnly === 'double',\n" +
    "                       'money':!!getInfo().money}\" dir-focus-me=getInfo().focus() class=form-control-check></div></div></div><div class=\"col-md-3 hidden-sm hidden-xs\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("/assets/javascripts/directive/field/dirFieldDate/template.html",
    "<div class=\"row form-group has-feedback\" ng-class=\"{'error' : displayError()===true}\" ng-click=logField() ng-hide=\"isActive() === false\"><div><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div class=dropdown></div><a id={{id}} role=button data-toggle=dropdown data-target=# href=\"\" class=dropdown-toggle><div class=input-group><input ng-disabled=getInfo().disabled() ng-model=resultFormated class=\"form-control\"><span class=input-group-addon><i class=\"glyphicon glyphicon-calendar\"></i></span></div><ul role=menu aria-labelledby=dLabel class=\"dropdown-menu date_input\"><datetimepicker data-ng-model=result data-datetimepicker-config=\"{ dropdownSelector: '{{idHtag}}',minView:'{{getInfo().minimalDelay}}' }\"></datetimepicker></ul></a></div><div ng-transclude></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-xs\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("/assets/javascripts/directive/field/dirFieldDocument/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=\"form-group row\"><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle |translateText}}</label><div ng-class=\"getInfo().fullSize==true?'col-md-12':'col-md-6'\"><div ng-class=\"{'input-group':!!getInfo().money}\" style=\"text-align: center\"><div ng-show=\"inDownload=== true &amp;&amp; percent != 100\" class=document-question-progress-bar><div ng-style=style><spa></spa></div></div><div ng-show=\"inDownload=== true && percent != 100\" class=document-question-progress-percentage>{{percent}} %</div><div ng-show=\"inDownload=== true && percent == 100\">{{'--.field.document.inTreatment' | translateText}}</div><span class=\"btn btn-default btn-file field-document-btn\" ng-hide=\"inDownload === true || getInfo().disabled()\">{{((getInfo().field[getInfo().fieldName]!=null)?'--.download.button.update':'--.download.button.new') | translateText}} <input name=\"{{ id }}\" type=file ng-file-select=\"onFileSelect($files)\"></span><div ng-show=\"success && getInfo().disabled()!=true\">{{'--.field.document.success' | translateText}}</div><button type=button ng-show=\"getInfo().field[getInfo().fieldName]!=null && getInfo().field[getInfo().fieldName].isImage!=true\" ng-click=download() class=button>{{'--.field.document.download' | translateText}} {{getInfo().field[getInfo().fieldName].name}}</button> <img ng-show=\"getInfo().field[getInfo().fieldName]!=null && getInfo().field[getInfo().fieldName].isImage==true\" style=\"border:1px solid #999999\" ng-src=\"/{{fileCall}}\"></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div></div>");
  $templateCache.put("/assets/javascripts/directive/field/dirFieldImageMutiple/template.html",
    "<div class=\"input-text field_text row field-image-multiple\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=\"form-group row\"><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle |translateText}}</label><div ng-class=\"getInfo().fullSize==true?'col-md-12':'col-md-6'\"><div ng-class=\"{'input-group':!!getInfo().money}\"><div ng-repeat=\"imageContainer in images\" class=image-block-container><div class=image-block><div ng-show=\"imageContainer.percent>0 && imageContainer.percent < 100\">{{imageContainer.percent}} %</div><div class=image-container><img ng-src=\"{{imageContainer.image| image}}\"></div><div class=\"image-remove glyphicon glyphicon-remove\" ng-click=remove(imageContainer)></div></div>{{'--.generic.comment' | translateText}}<textarea ng-model=imageContainer.image.comment></textarea></div><div class=\"add-image-button image-block\"><input name=\"{{ id }}\" type=file ng-file-select=\"onFileSelect($files)\"></div></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div></div>");
  $templateCache.put("/assets/javascripts/directive/field/dirFieldSelect/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div ng-class=\"{'input-group':!!getInfo().money}\"><button class=\"calculator btn btn-sm btn-default glyphicon glyphicon-th-list\" ng-click=openCalculator()></button><select ng-disabled=getInfo().disabled() ng-model=getInfo().field[getInfo().fieldName] dir-focus-me=getInfo().focus() ng-options=\"option.key as option.value | translateText for option in getInfo().options\" class=form-control></select></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-xs\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("/assets/javascripts/directive/field/dirFieldText/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div ng-class=\"{'input-group':!!getInfo().money}\"><button class=\"calculator btn btn-sm btn-default fa fa-calculator\" ng-click=openCalculator()></button> <input type={{fieldType}} name={{getInfo().name}} ng-disabled=getInfo().disabled() ng-model=getInfo().field[getInfo().fieldName] numbers-only={{getInfo().numbersOnly}} ng-class=\"{input_number: getInfo().numbersOnly === 'integer' || getInfo().numbersOnly === 'double',\n" +
    "                       'money':!!getInfo().money}\" placeholder={{getInfo().placeholder}} dir-focus-me=getInfo().focus() class=form-control ng-show=\"getInfo().fieldType != 'textarea'\" typeahead=\"c as c for c in getInfo().autoCompleteValue | filter:$viewValue | limitTo:10\" typeahead-min-length=\"1\"> <span ng-show=!!getInfo().money class=input-group-addon>{{getInfo().money}}</span></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-md\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("/assets/javascripts/directive/field/dirFieldTextArea/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div ng-class=\"{'input-group':!!getInfo().money}\"><button class=\"calculator btn btn-sm btn-default fa fa-calculator\" ng-click=openCalculator()></button><textarea name={{getInfo().name}} ng-disabled=getInfo().disabled() ng-model=getInfo().field[getInfo().fieldName] ng-class=\"{input_number: getInfo().numbersOnly === 'integer' || getInfo().numbersOnly === 'double',\n" +
    "                       'money':!!getInfo().money}\" placeholder={{getInfo().placeholder}} dir-focus-me=getInfo().focus() class=form-control></textarea></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-xs\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("/assets/javascripts/directive/form/account/template.html",
    "<div class=form><dir-field-text ng-info=fields.firstname></dir-field-text><dir-field-text ng-info=fields.lastname></dir-field-text><dir-field-select ng-info=fields.gender></dir-field-select><dir-field-text ng-info=fields.email></dir-field-text><dir-field-text ng-info=fields.password></dir-field-text><dir-field-text ng-info=fields.repeatPassword></dir-field-text><dir-field-check ng-info=fields.keepSessionOpen></dir-field-check></div>");
  $templateCache.put("/assets/javascripts/directive/form/address/template.html",
    "<div class=form><dir-field-select ng-info=fields.name></dir-field-select><dir-field-text ng-info=fields.street></dir-field-text><dir-field-text ng-info=fields.zip></dir-field-text><dir-field-text ng-info=fields.city></dir-field-text></div>");
  $templateCache.put("/assets/javascripts/directive/form/business/template.html",
    "<div class=form><dir-field-text ng-info=fields.name></dir-field-text><dir-field-text-area ng-info=fields.description></dir-field-text-area><dir-field-text ng-info=fields.phone></dir-field-text><dir-field-text ng-info=fields.email></dir-field-text><dir-field-text ng-info=fields.website></dir-field-text></div>");
  $templateCache.put("/assets/javascripts/directive/form/businessCategory/template.html",
    "<div class=form><div class=business-category ng-class=\"{'disabled' : isDisabled()}\"><div class=\"panel panel-default\"><div class=panel-heading>{{'--.businessCategory.column.category' | translateText}}</div><div class=panel-body><button ng-disabled=isDisabled() ng-repeat=\"category in categories\" class=category-box ng-class=\"{'category-selected':category.selected === true}\" ng-click=select(category)>{{category.translationName | translateText}}</button></div></div><div class=\"panel panel-default\"><div class=panel-heading>{{'--.businessCategory.column.subcategory' | translateText}}</div><div class=panel-body><button ng-repeat=\"subcategory in subcategories\" ng-disabled=isDisabled() class=category-box ng-class=\"{'subcategory-selected':subcategory.selected === true}\" ng-click=selectSubcategory(subcategory)>{{subcategory.translationName | translateText}}</button></div></div><div class=\"panel panel-default\"><div class=panel-heading>{{'--.businessCategory.column.subsubcategory' | translateText}}</div><div class=panel-body><button ng-repeat=\"subsubcategory in subsubcategories\" ng-disabled=isDisabled() class=category-box ng-class=\"{'subsubcategory-selected':subsubcategory.selected === true}\" ng-click=selectSubSubcategory(subsubcategory)>{{subsubcategory.translationName | translateText}}</button></div></div></div></div>");
  $templateCache.put("/assets/javascripts/directive/form/businessNotification/template.html",
    "<div class=form><dir-field-select ng-info=fields.interests></dir-field-select><dir-field-text ng-info=fields.title></dir-field-text><dir-field-text-area ng-info=fields.description></dir-field-text-area><dir-field-date ng-info=fields.startDate></dir-field-date><dir-field-date ng-info=fields.endDate></dir-field-date><dir-field-image-mutiple ng-info=fields.illustration></dir-field-image-mutiple></div>");
  $templateCache.put("/assets/javascripts/directive/form/businessSocialNetwork/template.html",
    "<div class=form><div>{{'--.business.socialNetwork.form.description' | translateText}}</div><dir-field-text ng-info=fields.facebook></dir-field-text><dir-field-text ng-info=fields.twitter></dir-field-text><dir-field-text ng-info=fields.instagram></dir-field-text>{{'--.business.socialNetwork.other' | translateText}} {{'--.business.socialNetwork.other' | translateText}}<dir-field-text ng-info=fields.delivery></dir-field-text><dir-field-text ng-info=fields.ecommerce></dir-field-text><dir-field-text ng-info=fields.opinion></dir-field-text><dir-field-text ng-info=fields.reservation></dir-field-text></div>");
  $templateCache.put("/assets/javascripts/directive/form/customerInterest/template.html",
    "<div class=form><div class=row><div class=customer_interest_form ng-repeat=\"interest in interests\"><div class=\"col-xs-12 col-sm-6 col-md-4\"><button class=\"interest btn\" ng-class={interest_selected:interest.registrationSelection} ng-click=select(interest)><input type=checkbox ng-checked=\"interest.registrationSelection\"> {{interest.translationName | translateText}}</button></div></div></div></div>");
  $templateCache.put("/assets/javascripts/directive/form/download/template.html",
    "<div class=form><dir-field-document ng-info=fields.file></dir-field-document><button type=button ng-show=\"fields.file.field!=null && fields.file.field.isImage!=true\" ng-click=download() class=button>{{'--.field.document.download' | translateText}} {{getInfo().field.name}}</button> <img ng-show=\"fields.file.field!=null && fields.file.field.isImage==true\" ng-src=\"/{{fileCall}}\"></div>");
  $templateCache.put("/assets/javascripts/directive/form/image/template.html",
    "<div class=form><dir-field-document ng-info=imageParam></dir-field-document></div>");
  $templateCache.put("/assets/javascripts/directive/form/login/template.html",
    "<div class=\"form login-form\"><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn btn-primary\"><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.loginModal.facebook.btn' |translateText}}</span></button></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><dir-field-text ng-info=fields.email></dir-field-text><dir-field-text ng-info=fields.password></dir-field-text><dir-field-check ng-info=fields.keepSessionOpen></dir-field-check></div>");
  $templateCache.put("/assets/javascripts/directive/form/promotion/template.html",
    "<div class=form><dir-field-select ng-info=fields.interests></dir-field-select><dir-field-text ng-info=fields.title></dir-field-text><dir-field-text-area ng-info=fields.description></dir-field-text-area><dir-field-date ng-info=fields.startDate></dir-field-date><dir-field-date ng-info=fields.endDate></dir-field-date><dir-field-image-mutiple ng-info=fields.illustration></dir-field-image-mutiple><div class=row><div class=form-group><label class=\"control-label col-xs-5\">{{'--.promotion.simplePromotion' | translateText}}</label><div class=col-xs-2><div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitchFromPromotionForm checked ng-model=completePromotion><label class=onoffswitch-label for=myonoffswitchFromPromotionForm><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></div><label class=\"control-label col-xs-5\">{{'--.promotion.completePromotion' | translateText}}</label></div></div><dir-field-text ng-info=fields.quantity></dir-field-text><dir-field-text ng-info=fields.minimalQuantity></dir-field-text><dir-field-text ng-info=fields.unit></dir-field-text><dir-field-text ng-info=fields.originalPrice></dir-field-text><dir-field-text ng-info=fields.offPercent></dir-field-text><dir-field-text ng-info=fields.offPrice></dir-field-text></div>");
  $templateCache.put("/assets/javascripts/directive/form/schedule/template.html",
    "<div class=schedule-form><div ng-show=\"startSection!=null\" class=schedule-info ng-style=infoStyle>{{selectedTiming}}</div><div><div class=schedule-form-radio><div class=attendance-close ng-click=\"selectAttendance('CLOSE')\"><input type=radio ng-model=attendance_selected value=\"CLOSE\">Closed</div><div class=attendance-light ng-click=\"selectAttendance('LIGHT')\"><input type=radio ng-model=attendance_selected value=\"LIGHT\">Light</div><div class=attendance-moderate ng-click=\"selectAttendance('MODERATE')\"><input type=radio ng-model=attendance_selected value=\"MODERATE\">Moderate</div><div class=attendance-heavy ng-click=\"selectAttendance('IMPORTANT')\"><input type=radio ng-model=attendance_selected value=\"IMPORTANT\">Heavy</div></div><table class=editable><tr><td></td><td ng-repeat=\"hour in hours\"><div class=hour-block-info><div>{{hour.text}}</div></div></td></tr><tr ng-repeat=\"day in days\"><td>{{day}}</td><td ng-repeat=\"section in sections[day]\"><button class=hour-block ng-class=attendance_class[section.attendance] ng-mousedown=select(day,section) ng-mouseover=progress($event,day,section)></button></td></tr></table></div></div>");
  $templateCache.put("/assets/javascripts/directive/mobile/title/template.html",
    "<div class=\"navbar navbar-app navbar-absolute-top\"><div class=\"navbar-brand navbar-brand-center\">{{title | translateText}}</div><div class=\"btn-group pull-left\" ng-show=displayMenu><div class=\"btn btn-navbar\"><div ui-toggle=uiSidebarLeft class=nav-button><i class=\"fa fa-bars\"></i></div></div></div></div>");
  $templateCache.put("/assets/javascripts/modal/AccountFusionFacebookModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.account.fusion.modal.title' | translateText}}</h4></div><div class=modal-body dir-enter=save()>{{\"--.account.fusion.description\" | translateText : email }}<dir-field-text ng-info=fields.password></dir-field-text></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/AddressModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 ng-show=update class=modal-title>{{'--.account.address.modal.title.update' | translateText}}</h4><h4 ng-hide=update class=modal-title>{{'--.account.address.modal.title.create' | translateText}}</h4></div><div class=modal-body dir-enter=save()><address-form-ctrl ng-info=addressParam></address-form-ctrl></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/BasicModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{title | translateText}}</h4></div><div class=\"modal-body inject-data\" dir-enter=save()></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/BusinessNotificationModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 ng-show=update class=modal-title>{{'--.businessNotification.modal.title.update' | translateText}}</h4><h4 ng-hide=update class=modal-title>{{'--.businessNotification.modal.title.create' | translateText}}</h4></div><div class=modal-body dir-enter=save()><business-notification-form-ctrl ng-info=businessNotificationParam></business-notification-form-ctrl></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/BusinessRegistrationModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.business.registrationModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login business-registration\" dir-enter=save()><div class=wizard><div ng-class=\"{'current':badgeSelected==1}\"><span class=badge ng-class=\"{'badge-inverse':badgeSelected==1}\">1</span> {{'--.customer.registrationModal.personal.title' | translateText}}</div><div ng-class=\"{'current':badgeSelected==2}\"><span class=badge ng-class=\"{'badge-inverse':badgeSelected==2}\">2</span> {{'--.business.registrationModal.business.title' | translateText}}</div><div ng-class=\"{'current':badgeSelected==3}\"><span class=badge ng-class=\"{'badge-inverse':badgeSelected==3}\">3</span> {{'--.business.registrationModal.category.title' | translateText}}</div></div><div ng-show=\"badgeSelected==1\"><account-form-ctrl ng-info=accountParam></account-form-ctrl><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn btn-primary\"><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.registrationModal.facebook.btn' |translateText}}</span></button></div></div><div ng-show=\"badgeSelected==2\"><div class=modal-description>{{'--.business.registrationModal.business.desc' | translateText}}</div><business-form-ctrl ng-info=businessFormParam></business-form-ctrl><div class=modal-subtitle>{{'--.business.registrationModal.address.subtitle' | translateText}}</div><address-form-ctrl ng-info=addressFormParam></address-form-ctrl></div><div ng-show=\"badgeSelected==3\"><div class=modal-description>{{'--.business.registrationModal.category.desc' | translateText}}</div><business-category-form-ctrl ng-info=businessCategoryFormParam></business-category-form-ctrl></div></div><div class=modal-footer><button ng-show=\"badgeSelected!=1\" style=float:left ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=previous()>{{'--.generic.previous' | translateText}}</button> <button ng-show=\"badgeSelected!=3\" ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=next()>{{'--.generic.next' | translateText}}</button> <button ng-show=\"badgeSelected==3\" ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/ChangePassword/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.changePasswordModal.title' | translateText}}</h4></div><div class=\"modal-body form\" dir-enter=save()><dir-field-text ng-info=fields.oldPassword></dir-field-text><dir-field-text ng-info=fields.newPassword></dir-field-text><dir-field-text ng-info=fields.repeatPassword></dir-field-text></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/CustomerRegistrationModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.customer.registrationModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login customer-registration\" dir-enter=save()><div class=wizard><div ng-class=\"{'current':badgeSelected==1}\"><span class=badge ng-class=\"{'badge-inverse':badgeSelected==1}\">1</span> {{'--.customer.registrationModal.personal.title' | translateText}}</div><div ng-class=\"{'current':badgeSelected==2}\"><span class=badge ng-class=\"{'badge-inverse':badgeSelected==2}\">2</span> {{'--.customer.registrationModal.interest.title' | translateText}}</div><div ng-class=\"{'current':badgeSelected==3}\"><span class=badge ng-class=\"{'badge-inverse':badgeSelected==3}\">3</span> {{'--.customer.registrationModal.personal.address' | translateText}}</div></div><div ng-show=\"badgeSelected==1\"><div class=modal-description>{{'--.customer.registrationModal.personal.desc' | translateText}}<br><span class=\"modal-login-link link\" ng-click=toBusinessRegistration()>{{'--.registrationModal.toBusinessRegistration' | translateText}}</span></div><account-form-ctrl ng-info=accountParam></account-form-ctrl><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn btn-primary\"><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.registrationModal.facebook.btn' |translateText}}</span></button></div></div><div ng-show=\"badgeSelected==2\"><div class=modal-description>{{'--.customer.registrationModal.interest.desc' | translateText}}</div><customer-interest-form-ctrl ng-info=customerInterestParam></customer-interest-form-ctrl></div><div ng-show=\"badgeSelected==3\"><div class=modal-description>{{'--.customer.registrationModal.address.desc' | translateText}}</div><address-form-ctrl ng-info=addressFormParam></address-form-ctrl></div></div><div class=modal-footer><button ng-show=\"badgeSelected!=1\" style=float:left ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=previous()>{{'--.generic.previous' | translateText}}</button> <button ng-show=\"badgeSelected!=1\" ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=skip()>{{'--.generic.skip' | translateText}}</button> <button ng-show=\"badgeSelected!=3\" ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=next()>{{'--.generic.next' | translateText}}</button> <button ng-show=\"badgeSelected==3\" ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/DownloadFieldModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.downloadModal.title' | translateText}}</h4></div><div class=modal-body dir-enter=save()><dir-field-document ng-info=fields.file></dir-field-document></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/EditCustomerInterestModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.customer.editInterestModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login\" dir-enter=save()><customer-interest-form-ctrl ng-info=customerInterestParam></customer-interest-form-ctrl></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=close()>{{'--.generic.cancel' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/ForgotPasswordModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.forgotPassword.title' | translateText}}</h4></div><div class=modal-body dir-enter=save()><p>{{'--.forgotPassword.desc' | translateText}}</p><dir-field-text ng-info=fields.email></dir-field-text></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.submit' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/GalleryModal/view.html",
    "<div class=\"modal-body gallery-modal\" dir-enter=save()><div><img class=gallery-picture ng-src=\"{{image | image}}\"></div><div class=comment-container>{{image.comment}}</div><div ng-show=\"images.length > 1\"><button type=button&quot; class=\"btn btn-primary\" ng-click=previous()>{{'--.gallery.modal.previous' | translateText}}</button> {{imageNb}} / {{images.length}} <button type=button&quot; style=\"float: right\" class=\"btn btn-primary\" ng-click=next()>{{'--.gallery.modal.next' | translateText}}</button></div></div>");
  $templateCache.put("/assets/javascripts/modal/HelpModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.helpModal.title' | translateText}}</h4></div><div class=modal-body>{{message | translateText}}</div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button></div>");
  $templateCache.put("/assets/javascripts/modal/LoginModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.loginModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login\" dir-enter=save()><div class=\"modal-login-link-box modal-description\"><div>{{'--.loginModal.notRegisterYet' | translateText}}</div><span class=\"modal-login-link link\" ng-click=toCustomerRegistration()>{{'--.loginModal.toCustomerRegistration' | translateText}}</span> <span class=\"modal-login-link link\" ng-click=toBusinessRegistration()>{{'--.loginModal.toBusinessRegistration' | translateText}}</span></div><login-form-ctrl ng-info=loginFormParam></login-form-ctrl><div class=link ng-click=toForgotPassword()>{{'--.login.form.button.forgotPassword' | translateText}}</div></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.login.btn' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/MessageModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{title | translateText}}</h4></div><div class=modal-body dir-enter=save()>{{message | translateText}}</div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.cancel' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.valid' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/OneFieldModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.loginModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login\" dir-enter=save()><dir-field-text ng-info=text></dir-field-text></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.valid' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/modal/PromotionModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 ng-show=update class=modal-title>{{'--.promotion.modal.title.update' | translateText}}</h4><h4 ng-hide=update class=modal-title>{{'--.promotion.modal.title.create' | translateText}}</h4></div><div class=modal-body dir-enter=save()><promotion-form-ctrl ng-info=promotionParam></promotion-form-ctrl></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-primary\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("/assets/javascripts/view/admin/adminBusiness.html",
    "<div>Business</div><table ng-table=tableParams class=table><tr ng-repeat=\"business in $data\"><td data-title=\"'--.generic.name' | translateText\" sortable>{{business.name}}</td><td data-title=\"'--.generic.status' | translateText\" sortable>{{business.businessStatus}}</td><td data-title=\"'--.generic.action' | translateText\"><button ng-click=toBusiness(business.id)>{{'--.admin.business.toBusiness' | translateText}}</button> <button ng-click=confirmPublication(business) ng-show=\"business.businessStatus == 'WAITING_CONFIRMATION' \">{{'--.admin.business.confirmPublication' | translateText}}</button></td></tr></table>");
  $templateCache.put("/assets/javascripts/view/admin/welcome.html",
    "<div><button ng-click=\"navigateTo('/business')\">Business list</button></div>");
  $templateCache.put("/assets/javascripts/view/mobile/business.html",
    "<div class=\"navbar navbar-app navbar-absolute-top\" ng-class=\"{'header-with-advanced-search':advancedSearch}\"><div class=\"navbar-brand navbar-brand-center header-option-container\"><search-bar-ctrl ng-info={mobile:true}></search-bar-ctrl></div><div class=\"btn-group pull-left header-option-container\"><div class=\"btn btn-navbar\"><div ui-toggle=uiSidebarLeft class=nav-button><i class=\"fa fa-bars\"></i></div></div></div></div><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"scrollable-content business-mobile-page\"><div class=business-page-header ng-style=\"{'background-image':'url('+(business.landscape | image)+')' }\"><div class=\"edit-button-container landscape-edit\"><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editLandscape()>{{'--.business.page.edit.landscape' | translateText}}</button></div><div class=business-page-illustration-container><img class=business-illustration ng-src=\"{{business.illustration | image}}\"><div class=edit-button-container><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit btn-sm\" ng-show=edit ng-click=editIllustration()>{{'--.business.page.edit.illustration' | translateText}}</button></div></div><div class=business-page-name>{{business.name}}<div class=edit-button-container><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=\"edit && business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editbusiness()>{{'--.business.page.edit.business' | translateText}}</button></div></div></div><div style=\"overflow: auto\"><div class=home-interest-box ng-style=\"{width:(customerInterests.length * 34 + 4) + 'px'}\"><button class=home-interest ng-repeat=\"action in actions\" ng-show=action.display() ng-click=action.action()><img ng-src={{action.icon}} style=\"width:50px\"></button></div></div><div ng-show=\"interfaceToDisplay=='home'\"><publication-list-mobile-for-business-ctrl ng-info=publicationListParam></publication-list-mobile-for-business-ctrl></div><div class=section ng-show=\"interfaceToDisplay=='info'\"><table class=business-info-line><tr><td colspan=2><div class=business-info-line-action><google-map-widget-ctrl ng-info=googleMapParams></google-map-widget-ctrl></div></td></tr><tr><td><div class=business-address>{{business.address.street}}<br>{{business.address.zip}}<br>{{business.address.city}}</div></td><td class=td-action>{{business.distance / 1000 | number:2}} Km</td></tr></table><table class=business-info-line ng-show=\"business.phone!=null\"><tr><td>{{business.phone}}</td><td class=td-action><a class=\"business-info-line-action glyphicon glyphicon-earphone\" href=tel:{{business.phone}}></a></td></tr></table><table class=business-info-line ng-show=\"business.website!=null\"><tr><td>{{business.website}}</td><td class=td-action><a href={{business.website}} target=_blank>{{business.website}}</a></td></tr></table><table class=business-info-line ng-show=\"business.email!=null\"><tr><td>{{business.email}}</td><td class=td-action><a class=\"business-info-line-action glyphicon glyphicon-envelope\" href=mailto:{{business.email}}></a></td></tr></table><table class=business-info-line ng-show=\"business.schedules!=null\"><tr><td><schedule-ctrl ng-info={dto:business.schedules}></schedule-ctrl></td></tr></table></div><div class=\"section gallery-mobile\" ng-show=\"interfaceToDisplay=='gallery'\"><h4>{{'--.generic.gallery' | translateText}}</h4><img ng-repeat=\"image in business.galleryPictures\" style=\"margin-top: 5px\" ng-click=openGallery(image) ng-src=\"{{image | image}}\"></div></div></div></div></div>");
  $templateCache.put("/assets/javascripts/view/mobile/business_registration.html",
    "<mobile-title-ctrl title=\"'--.page.business_registration.title'\" display-menu=false></mobile-title-ctrl><div class=app-body><div class=\"app-content modal-login\"><div class=scrollable><div class=\"section business-registration scrollable-content\"><div class=wizard-little><div ng-class=\"{'current':badgeSelected==1}\">{{'--.customer.registrationModal.personal.title' | translateText}}</div><div ng-class=\"{'current':badgeSelected==2}\">{{'--.business.registrationModal.business.title' | translateText}}</div><div ng-class=\"{'current':badgeSelected==3}\">{{'--.business.registrationModal.category.title' | translateText}}</div></div><div ng-show=\"badgeSelected==1\"><div class=modal-description>{{'--.customer.registrationModal.personal.desc' |translateText}}<br></div><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn btn-primary\"><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.registrationModal.facebook.btn' |translateText}}</span></button></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><account-form-ctrl ng-info=accountParam></account-form-ctrl></div><div ng-show=\"badgeSelected==2\"><div class=modal-description>{{'--.business.registrationModal.business.desc' | translateText}}</div><business-form-ctrl ng-info=businessFormParam></business-form-ctrl><div class=modal-subtitle>{{'--.business.registrationModal.address.subtitle' | translateText}}</div><address-form-ctrl ng-info=addressFormParam></address-form-ctrl></div><div ng-show=\"badgeSelected==3\"><div class=modal-description>{{'--.business.registrationModal.category.desc' | translateText}}</div><business-category-form-ctrl ng-info=businessCategoryFormParam></business-category-form-ctrl></div></div></div></div></div><div class=\"navbar navbar-app navbar-absolute-bottom\"><div class=\"btn-group navbar-brand-center\"><div style=\"text-align: center;width: 100%\"><div class=\"btn btn-navbar\" ng-click=\"navigateTo('/')\">{{'--.generic.home'| translateText}}</div></div></div><div class=\"btn-group pull-left\"><div class=\"btn btn-navbar\" ng-click=previous() ng-disabled=loading type=button class=\"btn btn-primary\" ng-show=\"badgeSelected!=1\"><span class=\"fa fa-angle-left\"></span> {{'--.generic.previous' | translateText}}</div></div><div class=\"btn-group pull-right\"><div class=\"btn btn-navbar\" ng-click=next() ng-disabled=loading type=button ng-show=\"badgeSelected!=3\">{{'--.generic.next' | translateText}} <span class=\"fa fa-angle-right\"></span></div><div class=\"btn btn-navbar\" ng-disabled=loading type=button ng-click=save() ng-show=\"badgeSelected==3\">{{'--.generic.save' |translateText}}</div></div></div>");
  $templateCache.put("/assets/javascripts/view/mobile/customer_registration.html",
    "<mobile-title-ctrl title=\"'--.page.customer_registration.title'\" display-menu=false></mobile-title-ctrl><div class=app-body><div class=\"app-content modal-login\"><div class=scrollable><div class=\"section customer-registration scrollable-content\"><div class=wizard-little><div ng-class=\"{'current':badgeSelected==1}\"><div>{{'--.customer.registrationModal.personal.title' | translateText}}</div></div><div ng-class=\"{'current':badgeSelected==2}\"><div>{{'--.customer.registrationModal.interest.title' | translateText}}</div></div><div ng-class=\"{'current':badgeSelected==3}\"><div>{{'--.customer.registrationModal.personal.address' | translateText}}</div></div></div><div ng-show=\"badgeSelected==1\"><div class=modal-description>{{'--.customer.registrationModal.personal.desc' |translateText}}<br></div><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn btn-primary\"><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.registrationModal.facebook.btn' |translateText}}</span></button></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><account-form-ctrl ng-info=accountParam></account-form-ctrl></div><div ng-show=\"badgeSelected==2\"><div class=modal-description>{{'--.customer.registrationModal.interest.desc' | translateText}}</div><customer-interest-form-ctrl ng-info=customerInterestParam></customer-interest-form-ctrl></div><div ng-show=\"badgeSelected==3\"><div class=modal-description>{{'--.customer.registrationModal.address.desc' | translateText}}</div><address-form-ctrl ng-info=addressFormParam></address-form-ctrl></div></div></div></div></div><div class=\"navbar navbar-app navbar-absolute-bottom\"><div class=\"btn-group navbar-brand-center\"><div style=\"text-align: center;width: 100%\"><div class=\"btn btn-navbar glyphicon glyphicon-home\" ng-click=\"navigateTo('/')\"></div></div></div><div class=\"btn-group pull-left\"><div class=\"btn btn-navbar\" ng-click=previous() ng-disabled=loading type=button class=\"btn btn-primary\" ng-show=\"badgeSelected!=1\"><span class=\"fa fa-angle-left\"></span> {{'--.generic.previous' | translateText}}</div></div><div class=\"btn-group pull-right\"><div class=\"btn btn-navbar\" ng-click=skip() ng-disabled=loading type=button ng-show=\"badgeSelected!=1\">{{'--.generic.skip' | translateText}} <span class=\"fa fa-angle-right\"></span></div><div class=\"btn btn-navbar\" ng-click=next() ng-disabled=loading type=button ng-show=\"badgeSelected!=3\">{{'--.generic.next' | translateText}} <span class=\"fa fa-angle-right\"></span></div><div class=\"btn btn-navbar\" ng-disabled=loading type=button ng-click=save() ng-show=\"badgeSelected==3\">{{'--.generic.save' |translateText}}</div></div></div>");
  $templateCache.put("/assets/javascripts/view/mobile/forgotPassword.html",
    "<mobile-title-ctrl title=\"'--.page.forgot_password.title'\" display-menu=false></mobile-title-ctrl><div class=app-body><div class=app-content><div class=scrollable><div class=\"section customer-registration scrollable-content\"><p>{{'--.forgotPassword.desc' | translateText}}</p><dir-field-text ng-info=fields.email></dir-field-text><div class=generic-center><button ng-click=save() ng-disabled=loading type=button class=\"btn btn-primary\">{{'--.mobile.forgotPassword.btn' | translateText}}</button></div></div></div></div></div><div class=\"navbar navbar-app navbar-absolute-bottom\"><div class=\"btn-group navbar-brand-center\"><div style=\"text-align: center;width: 100%\"><div class=\"btn btn-navbar glyphicon glyphicon-home\" ng-click=\"navigateTo('/')\"></div></div></div></div>");
  $templateCache.put("/assets/javascripts/view/mobile/home.html",
    "<div class=\"navbar navbar-app navbar-absolute-top\" ng-class=\"{'header-with-advanced-search':advancedSearch}\"><div class=\"navbar-brand navbar-brand-center header-option-container\"><search-bar-ctrl ng-info={mobile:true}></search-bar-ctrl></div><div class=\"btn-group pull-left header-option-container\"><div class=\"btn btn-navbar\"><div ui-toggle=uiSidebarLeft class=nav-button><i class=\"fa fa-bars\"></i></div></div></div></div><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=scrollable-content><div style=\"overflow: auto\"><div class=home-interest-box style=width:700px ng-style=\"{width:(customerInterests.length * 34 + 20) + 'px'}\"><button class=home-interest ng-repeat=\"interest in customerInterests\" ng-show=\"interest.iconName!=null\" ng-click=searchByInterest(interest) ng-class=\"{'selected':interest.selected === true}\"><img ng-src=/assets/images/interest/{{interest.iconName}} style=\"width:50px\"></button></div></div><publication-list-mobile-ctrl ng-info=publicationListCtrl></publication-list-mobile-ctrl></div></div></div></div><div class=\"navbar navbar-app navbar-absolute-bottom\"><div class=\"btn-group navbar-brand-center\"><div class=home-footer><div><div class=home-footer-position-details ng-class=\"{'generic-block':displayPositionDetails  === true}\"><div ng-repeat=\"position in positions\" class=link ng-click=selectPosition(position.key)>{{position.translation | translateText}}</div></div><button ng-click=openPositionDetails() class=\"glyphicon glyphicon-home\"></button></div><div><div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitch checked ng-model=followedMode><label class=onoffswitch-label for=myonoffswitch><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></div><div><div class=home-footer-position-details ng-class=\"{'generic-block':displayFavoriteBusiness  === true}\"><div ng-repeat=\"follow in follows\" class=link ng-click=\"navigateTo('/business/'+follow.businessId)\">{{follow.businessName}}</div></div><button ng-click=openFavoriteBusiness() class=\"glyphicon glyphicon-heart-empty\"></button></div></div></div></div>");
  $templateCache.put("/assets/javascripts/view/mobile/profile.html",
    "<mobile-title-ctrl title=\"'--.page.profile.title'\" display-menu=true></mobile-title-ctrl><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"section scrollable-content\"><div ui-state=activeTab default><ul class=\"nav nav-tabs\"><li ng-click=\"setActiveTab('personal')\" ng-class=\"{'active':activeTab == 'personal'}\"><a ui-set=\"{'activeTab': 1}\">{{'--.customer.profile.personalInformation' | translateText}}</a></li><li ng-click=\"setActiveTab('address')\" ng-class=\"{'active':activeTab == 'address'}\"><a ui-set=\"{'activeTab': 2}\">{{'--.customer.profile.myAddresses' | translateText}}</a></li><li ng-click=\"setActiveTab('interest')\" ng-class=\"{'active':activeTab == 'interest'}\"><a ui-set=\"{'activeTab': 3}\">{{'--.customer.profile.interest' | translateText}}</a></li></ul><div ng-show=\"activeTab == 'personal'\"><account-form-ctrl ng-info=accountParam></account-form-ctrl><button class=\"btn btn-primary glyphicon glyphicon-edit\" ng-show=accountParam.disabled ng-click=personalEdit()>{{'--.generic.edit' |translateText}}</button> <button class=\"btn btn-primary\" ng-hide=accountParam.disabled ng-click=personalSave()>{{'--.generic.save' | translateText}}</button> <button class=\"btn btn-primary\" ng-hide=accountParam.disabled ng-click=personalCancel()>{{'--.generic.cancel' | translateText}}</button><div class=col-md-3 ng-show=\"account.loginAccount==true\"></div><button type=button class=\"btn btn-primary\" ng-click=editPassword()>{{'--.changePasswordModal.title' | translateText}}</button></div><div ng-show=\"activeTab == 'address'\"><button class=\"btn btn-primary\" ng-click=addAddress()>{{'--.customer.profile.address.create' | translateText}}</button><div class=\"panel panel-default\" ng-repeat=\"address in model.myself.addresses\"><div class=panel-heading>{{address.name}}</div><div class=panel-body><div class=address-box><div><span>{{'--.generic.street' | translateText}}</span>{{address.street}}</div><div><span>{{'--.generic.zip' | translateText}}</span>{{address.zip}}</div><div><span>{{'--.generic.city' | translateText}}</span>{{address.city}}</div><div><span>{{'--.generic.country' | translateText}}</span>{{address.country}}</div></div><button class=\"btn btn-primary glyphicon glyphicon-edit\" ng-click=editAddress(address)>{{'--.generic.edit' | translateText}}</button> <button class=\"btn btn-primary glyphicon glyphicon-remove\" ng-click=deleteAddress(address)>{{'--.generic.remove' |translateText}}</button></div></div></div><div ng-show=\"activeTab == 'interest'\"><div ng-repeat=\"interest in model.myself.customerInterests\" ng-show=interestParam.disabled class=category-box>{{interest.translationName |translateText}}</div><customer-interest-form-ctrl ng-hide=interestParam.disabled ng-info=interestParam></customer-interest-form-ctrl><button class=\"btn btn-primary glyphicon glyphicon-edit\" ng-show=interestParam.disabled ng-click=interestEdit()>{{'--.generic.edit' |translateText}}</button> <button class=\"btn btn-primary\" ng-hide=interestParam.disabled ng-click=interestSave()>{{'--.generic.save' | translateText}}</button> <button class=\"btn btn-primary\" ng-hide=interestParam.disabled ng-click=interestCancel()>{{'--.generic.cancel' | translateText}}</button></div></div></div></div></div></div>");
  $templateCache.put("/assets/javascripts/view/mobile/welcome.html",
    "<mobile-title-ctrl title=\"'--.page.welcome.title'\" display-menu=false></mobile-title-ctrl><div class=app-body><div class=\"app-content modal-login\"><div class=scrollable><div class=\"section customer-registration scrollable-content\"><h2>Welcome to Lynk</h2><div>{{'--.mobile.welcome.login.desc' | translateText}}</div><login-form-ctrl ng-info=loginFormParam></login-form-ctrl><div class=generic-center><button ng-click=save() ng-disabled=loading type=button class=\"btn btn-primary\">{{'--.mobile.welcome.login.btn' | translateText}}</button></div><div class=link ng-click=\"navigateTo('/forgot_password')\">{{'--.login.form.button.forgotPassword' | translateText}}</div><div class=mobile_welcome_registration_title>{{'--.mobile.welcome.registration.desc' | translateText}}</div><div class=generic-center><button class=\"btn btn-primary\" ng-click=\"navigateTo('/customer_registration')\">{{'--.mobile.welcome.toCustomerRegistration.btn' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("/assets/javascripts/view/web/business.html",
    "<div ng-show=\"myBusiness === true\"><div ng-show=\"business.businessStatus === 'NOT_PUBLISHED'\">{{'--.business.page.edit.description.notPublished' | translateText}}</div><div ng-show=\"business.businessStatus === 'WAITING_CONFIRMATION'\">{{'--.business.page.edit.description.waitConfirmation' | translateText}}</div><div ng-show=\"business.businessStatus === 'PUBLISHED'\">{{'--.business.page.edit.descriptionPublished' | translateText}}</div><div class=onoffswitch-container><div>{{'--.business.page.edit.editSwitchDisplay' | translateText}}</div><div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitchFromBusiness checked ng-model=edit><label class=onoffswitch-label for=myonoffswitchFromBusiness><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div><div>{{'--.business.page.edit.editSwitchEdit' | translateText}}</div></div><button ng-show=\"business.businessStatus === 'NOT_PUBLISHED'\" ng-click=publish() class=\"btn btn-primary\">{{'--.business.page.publication' | translateText}}</button> <button ng-show=\"business.businessStatus === 'WAITING_CONFIRMATION'\" ng-click=cancelPublishRequest() class=\"btn btn-primary\">{{'--.business.page.cancelPublishRequest' | translateText}}</button> <button ng-show=\"business.businessStatus === 'PUBLISHED'\" ng-click=stopPublish() class=\"btn btn-primary\">{{'--.business.page.stopPublication' | translateText}}</button></div><div class=business-page><div class=business-page-header ng-style=\"{'background-image':'url('+(business.landscape | image)+')' }\"><div class=\"edit-button-container landscape-edit\"><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editLandscape()>{{'--.business.page.edit.landscape' | translateText}}</button></div><div class=business-page-illustration-container><img class=business-illustration ng-src=\"{{business.illustration | image}}\"><div class=edit-button-container><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit btn-sm\" ng-show=edit ng-click=editIllustration()>{{'--.business.page.edit.illustration' | translateText}}</button></div></div><div class=business-page-name>{{business.name}}<div class=edit-button-container><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=\"edit && business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editbusiness()>{{'--.business.page.edit.business' | translateText}}</button></div></div></div><div class=business-page-body><div class=business-page-body-center><category-line-ctrl ng-info=categoryLineParams></category-line-ctrl><button ng-show=\"edit && business.businessStatus === 'NOT_PUBLISHED'\" class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-click=editCategory()>{{'--.generic.edit' | translateText}}</button><div class=business-page-description>{{business.description}} <button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=\"edit && business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editbusiness()>{{'--.business.page.edit.business' | translateText}}</button></div><div><button class=\"btn btn-primary\" ng-click=createPromotion() ng-show=\"edit && business.businessStatus === 'PUBLISHED'\">{{'--.business.publication.btn.promotion' | translateText}}</button> <button class=\"btn btn-primary\" ng-click=createNotification() ng-show=\"edit && business.businessStatus === 'PUBLISHED'\">{{'--.business.publication.btn.notification' | translateText}}</button><publication-list-for-business-ctrl ng-info=publicationListParam></publication-list-for-business-ctrl></div></div><div class=business-page-body-right><div style=\"text-align: center;margin: 10px\"><button ng-click=follow() class=follow-button><img src=/assets/images/haert.png ng-show=\"business.following\"> <img src=/assets/images/haert-off.png ng-hide=\"business.following\"></button> {{business.totalFollowers}}</div><div class=\"panel panel-default\"><div class=panel-heading>{{'--.business.gallery' | translateText}}</div><div class=panel-body><gallery-ctrl ng-info={images:business.galleryPictures}></gallery-ctrl><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editGallery()>{{'--.business.page.edit.gallery' | translateText}}</button></div></div><div class=\"panel panel-default\"><div class=panel-heading>{{'--.generic.address' | translateText}}</div><div class=panel-body><google-map-widget-ctrl ng-info=googleMapParams></google-map-widget-ctrl><div class=business-address><div>{{business.address.street}}, {{business.address.zip}}, {{business.address.city}}</div><div>Distance:{{business.distance / 1000 | number:2}} Km</div></div><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=\"edit && business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editAddress()>{{'--.generic.edit' | translateText}}</button></div></div><div class=\"panel panel-default\"><div class=panel-heading>{{'--.generic.contact' | translateText}}</div><div class=panel-body><div>{{business.phone}}</div><div><a href={{business.website}} target=_blank>{{business.website}}</a></div><div>{{business.email}}</div><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=\"edit && business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editbusiness()>{{'--.business.page.edit.business' | translateText}}</button></div></div><div class=\"panel panel-default business-social-panel\" ng-show=\"edit === true || business.facebookLink!=null || business.twitterLink!=null || business.googleplusLink!=null || business.foursquareLink!=null\"><div class=panel-heading>{{'--.generic.socialNetwork' | translateText}}</div><div class=panel-body><div ng-show=!!business.socialNetwork.facebookLink class=business-social-network-box><a href={{business.socialNetwork.facebookLink}} title={{business.socialNetwork.facebookLink}} target=_blank><img src=/assets/images/social_network/facebook.png></a></div><div ng-show=!!business.socialNetwork.twitterLink class=business-social-network-box><a href={{business.socialNetwork.twitterLink}} title={{business.socialNetwork.twitterLink}} target=_blank><img src=/assets/images/social_network/twitter.png></a></div><div ng-show=!!business.socialNetwork.instagramLink class=business-social-network-box><a href={{business.socialNetwork.instagramLink}} title={{business.socialNetwork.instagramLink}} target=_blank><img src=/assets/images/social_network/instagram.png></a></div><div ng-show=!!business.socialNetwork.deliveryLink class=business-social-network-box><a href={{business.socialNetwork.deliveryLink}} title={{business.socialNetwork.deliveryLink}} target=_blank><img src=/assets/images/social_network/delivery.png></a></div><div ng-show=!!business.socialNetwork.reservationLink class=business-social-network-box><a href={{business.socialNetwork.reservationLink}} title={{business.socialNetwork.reservationLink}} target=_blank><img src=/assets/images/social_network/reservation.png></a></div><div ng-show=!!business.socialNetwork.opinionLink class=business-social-network-box><a href={{business.socialNetwork.opinionLink}} title={{business.socialNetwork.opinionLink}} target=_blank><img src=/assets/images/social_network/opinion.png></a></div><div ng-show=!!business.socialNetwork.ecommerceLink class=business-social-network-box><a href={{business.socialNetwork.ecommerceLink}} title={{business.socialNetwork.ecommerceLink}} target=_blank><img src=/assets/images/social_network/e_commerce.png></a></div><br><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editSocialNetwork()>{{'--.business.page.edit.business' | translateText}}</button></div></div><div class=\"panel panel-default\" ng-show=\"edit === true || displaySchedule()\"><div class=panel-heading>{{'--.business.profile.businessSchedule' | translateText}}</div><div class=panel-body><schedule-ctrl ng-info={dto:business.schedules}></schedule-ctrl><button class=\"btn btn-primary btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editSchedule()>{{'--.generic.edit' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("/assets/javascripts/view/web/business_registration.html",
    "<div class=content-block><div class=temp-box>{{'--.business.registration.title' | translateText}}<div><button class=\"btn btn-default\" ng-click=businessRegistration()>{{'--.business.registration.newBusiness' | translateText}}</button></div><div><button class=\"btn btn-default\" ng-click=login()>{{'--.business.registration.oldBusiness' | translateText}}</button></div><div><button class=\"btn btn-default\" ng-click=\"navigateTo('/')\">{{'--.generic.back' | translateText}}</button></div></div></div>");
  $templateCache.put("/assets/javascripts/view/web/home.html",
    "<div class=content-block><div style=\"vertical-align: top\"><div style=\"display: inline-block;width:71%;vertical-align: top\"><div class=\"home-interest-switch home-interest-box\" ng-show=\"accountService.myself != null\"><div><label class=\"glyphicon glyphicon-home\"></label></div><div><div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitch checked ng-model=followedMode><label class=onoffswitch-label for=myonoffswitch><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></div><div><label class=\"glyphicon glyphicon-heart-empty\"></label></div></div><div class=home-interest-box><button class=home-interest ng-repeat=\"interest in customerInterests\" ng-show=\"interest.iconName!=null\" ng-click=searchByInterest(interest) ng-class=\"{'selected':interest.selected === true}\"><img ng-src=/assets/images/interest/{{interest.iconName}} style=\"width:50px\"></button></div><publication-list-ctrl ng-info=publicationListCtrl></publication-list-ctrl></div><div style=\"display: inline-block;width:28%;vertical-align: top\"><div class=temp-box ng-show=\"accountService.getMyself()==null\"><div>Sign up to follow you favorite shops, benefit to awesome promotion</div><button class=\"btn btn-default\" style=\"color: #000000\" ng-click=customerRegistration()>Sign up now !</button></div><div class=temp-box ng-show=\"accountService.getMyself()==null\"><div>You have a business and you want to communique directly with your customer ? Start now for free, and discover you pricing !</div><button class=\"btn btn-default\" style=\"color: #000000\" ng-click=\"navigateTo('/business_registration')\">{{'--.home.toBusiness.btn' | translateText}}</button></div></div></div></div>");
  $templateCache.put("/assets/javascripts/view/web/profile.html",
    "<div class=profile-page><div class=\"panel panel-default main-panel panel-personal-information\"><div class=panel-heading>{{'--.customer.profile.personalInformation' | translateText}}</div><div class=panel-body><account-form-ctrl ng-info=accountParam></account-form-ctrl><button class=\"btn btn-primary glyphicon glyphicon-edit\" ng-show=accountParam.disabled ng-click=personalEdit()>{{'--.generic.edit' | translateText}}</button> <button class=\"btn btn-primary\" ng-hide=accountParam.disabled ng-click=personalSave()>{{'--.generic.save' | translateText}}</button> <button class=\"btn btn-primary\" ng-hide=accountParam.disabled ng-click=personalCancel()>{{'--.generic.cancel' | translateText}}</button><div ng-show=\"account.loginAccount==true\" class=col-md-3 ng-show=\"account.loginAccount==true\"></div><button type=button class=\"btn btn-primary\" ng-click=editPassword()>{{'--.changePasswordModal.title' |translateText}}</button></div></div><div class=\"panel panel-default main-panel\"><div class=panel-heading>{{'--.customer.profile.myAddresses' | translateText}}</div><div class=panel-body><div><accordion><accordion-group class=address-container ng-repeat=\"address in model.myself.addresses\" is-open=address.isOpen><accordion-heading>{{address.name}} <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': address.isOpen, 'glyphicon-chevron-right': !address.isOpen}\"></i></accordion-heading><div class=address-box><div><span>{{'--.generic.street' | translateText}}</span>{{address.street}}</div><div><span>{{'--.generic.zip' | translateText}}</span>{{address.zip}}</div><div><span>{{'--.generic.city' | translateText}}</span>{{address.city}}</div><div><span>{{'--.generic.country' | translateText}}</span>{{address.country}}</div></div><button class=\"btn btn-primary glyphicon glyphicon-edit\" ng-click=editAddress(address)>{{'--.generic.edit' | translateText}}</button> <button class=\"btn btn-primary glyphicon glyphicon-remove\" ng-click=deleteAddress(address)>{{'--.generic.remove' |translateText}}</button></accordion-group></accordion><button class=\"btn btn-primary\" ng-click=addAddress()>{{'--.customer.profile.create' | translateText}}</button></div></div></div><div class=\"panel panel-default main-panel\"><div class=panel-heading>{{'--.customer.profile.interest' | translateText}}</div><div class=panel-body><div><div ng-repeat=\"interest in model.myself.customerInterests\" class=category-box>{{interest.translationName |translateText}}</div><button class=\"btn btn-primary glyphicon glyphicon-edit\" ng-show=accountParam.disabled ng-click=interestEdit()>{{'--.generic.edit' | translateText}}</button></div></div></div></div>");
  $templateCache.put("/assets/javascripts/view/web/search_page.html",
    "<div><div ng-show=\"results == null\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-hide=\"results==null\"><tabset><tab ng-show=businessTab.display active=businessTab.active><tab-heading>{{'--.generic.business' | translateText}} ({{businessTab.total}})</tab-heading><business-list-ctrl ng-info=businessParams></business-list-ctrl></tab><tab ng-show=publicationTab.display active=publicationTab.active><tab-heading>{{'--.generic.publication' | translateText}} ({{publicationTab.total}})</tab-heading><publication-list-ctrl ng-info=publicationParams></publication-list-ctrl></tab><tab ng-show=categoryTab.display active=categoryTab.active><tab-heading>{{'--.generic.category' | translateText}} ({{categoryTab.total}})</tab-heading><div ng-show=\"results.categoriesMap == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"businessesByCategory in results.categoriesMap\">{{businessesByCategory.category.category.translationName}} <span class=transition ng-show=\"category.subCategory!=null\">>></span> {{businessesByCategory.category.subCategory.translationName}} <span class=transition ng-show=\"category.subSubCategory!=null\">>></span> {{businessesByCategory.category.subSubCategory.translationName}}<business-list-ctrl ng-info={data:businessesByCategory.businesses,loading:false}></business-list-ctrl></div></tab></tabset></div></div>");
}]);
