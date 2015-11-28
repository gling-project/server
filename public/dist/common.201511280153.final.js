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
        templateUrl: "/assets/js/directive/field/dirFieldDate/template.html",
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


                    if (scope.getInfo().field[scope.getInfo().fieldName] != null) {
                        scope.result = new Date(Number(scope.getInfo().field[scope.getInfo().fieldName]));
                        if (scope.getInfo().minimalDelay == 'day') {
                            scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd');
                        }
                        else {
                            scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd HH:mm');
                        }
                    }

                    scope.$watch('result', function (n, o) {
                        if (n != o) {
                            if (scope.result != null) {
                                scope.getInfo().field[scope.getInfo().fieldName] = scope.result.getTime();
                            } else {
                                scope.getInfo().field[scope.getInfo().fieldName] = null;
                            }
                            scope.isValid();
                            if (scope.getInfo().minimalDelay == 'day') {
                                scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd');
                            }
                            else {
                                scope.resultFormated = $filter('date')(scope.result, 'yyyy-MM-dd HH:mm');
                            }
                        }
                    });

                    scope.isActive = function () {

                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                        if (n != o) {
                            if (scope.getInfo().field[scope.getInfo().fieldName] != null) {
                                return scope.result = new Date(Number(scope.getInfo().field[scope.getInfo().fieldName]));
                            }
                            scope.isValid();
                        }
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

myApp.directive("dirFieldDateSimple", ['directiveService', '$filter', 'generateId', '$filter', function (directiveService, $filter, generateId, $filter) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/field/dirFieldDateSimple/template.html",
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

                    scope.hours = [];
                    scope.days = [];
                    scope.day = null;
                    scope.hour = null;

                    //build choice

                    //if the start date change, recompile
                    scope.$watch('getInfo().startDate', function () {
                        scope.compileDate();
                    });

                    scope.compileDate = function () {

                        scope.days = [];
                        scope.hours = [];

                        //build hour
                        if (scope.getInfo().startDate != null && scope.getInfo().startDate != undefined) {
                            for (var i = 0; i <= 23; i++) {
                                scope.hours.push({value: i, key: i + ':00'});
                            }

                            //build day

                            for (var i = 0; i < scope.getInfo().maxDay; i++) {

                                var date = new Date(scope.getTime(scope.getInfo().startDate) + (i * 24 * 60 * 60 * 1000));
                                date.setHours(0);
                                date.setMinutes(0);
                                date.setSeconds(0);
                                date.setMilliseconds(0);
                                var day = date.getDate();
                                var month = date.getMonth() + 1;
                                var time = date.getTime();

                                scope.days.push(time);

                            }

                            //reinitialize model
                            if (scope.days.length > 0) {
                                if (scope.day < scope.days[0] || scope.day > scope.days[scope.days.length - 1]) {
                                    scope.day = null;
                                }

                                //select default value
                                if (scope.day == null) {
                                    if (scope.getInfo().field[scope.getInfo().fieldName] != null) {

                                        var date = scope.getDate(scope.getInfo().field[scope.getInfo().fieldName]);
                                        date.setMinutes(0);
                                        date.setSeconds(0);
                                        date.setMilliseconds(0);
                                        var hour = date.getHours();
                                        date.setHours(0);
                                        var day = date.getTime();

                                        scope.day = day;
                                        scope.hour = hour;

                                    }
                                    else {
                                        if (scope.getInfo().defaultSelection == 'lastDay') {
                                            scope.day = scope.days[scope.days.length - 1];
                                        }
                                        else {
                                            scope.day = scope.days[0];
                                        }
                                        if (scope.hour == null) {
                                            scope.hour = new Date().getHours();
                                        }
                                    }
                                }
                            }
                        }
                    };

                    //watching
                    scope.$watch('day', function () {
                        scope.compileValue();
                    });
                    scope.$watch('hour', function () {
                        scope.compileValue();
                    });

                    //compile value
                    scope.compileValue = function () {
                        var time = scope.day;
                        time += scope.hour * 60 * 60 * 1000;
                        scope.getInfo().field[scope.getInfo().fieldName] = new Date(time);
                        scope.isValid();
                    };

                    //is active
                    scope.isActive = function () {
                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    //validation
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

                    //get time from date or time
                    scope.getTime = function (param) {
                        if (param instanceof Date) {
                            return param.getTime();
                        }
                        return param;
                    };


                    //get date from date or time
                    scope.getDate = function (param) {
                        if (param instanceof Date) {
                            return param;
                        }
                        return new Date(param);
                    };
                }
            };
        }
    };
}]);

myApp.directive("dirFieldSelect", ['directiveService', '$timeout', 'modalService', function (directiveService, $timeout, modalService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/field/dirFieldSelect/template.html",
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
                    scope.hideIsValidIcon = !!scope.getInfo().hideIsValidIcon;
                    scope.fieldType = (scope.getInfo().fieldType != null) ? scope.getInfo().fieldType : "text";

                    scope.isValid = function () {

                        var isValid;
                        if (scope.getInfo().disabled === true || scope.isActive() === false) {
                            scope.getInfo().isValid = true;
                            return;
                        }

                        isValid = (scope.getInfo().optional!=undefined && scope.getInfo().optional() === true) || scope.getInfo().field[scope.getInfo().fieldName] != null;

                        scope.getInfo().isValid = isValid;
                    };

                    scope.isValid();

                    scope.$watch('getInfo().options', function (n, o) {
                        scope.computeResult();
                        return scope.isValid();
                    });

                    scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                        if (n != o) {
                            scope.computeResult();
                        }
                        return scope.isValid();
                    });

                    scope.computeResult = function () {
                        if (scope.getInfo().comparableFct != undefined && scope.getInfo().field[scope.getInfo().fieldName] != null) {
                            for (var key in scope.getInfo().options) {
                                if (scope.getInfo().comparableFct(scope.getInfo().options[key].key, scope.getInfo().field[scope.getInfo().fieldName])) {
                                    scope.getInfo().field[scope.getInfo().fieldName] = scope.getInfo().options[key].key;
                                }
                            }
                        }
                    };

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

myApp.directive("dirFieldText", ['directiveService', '$timeout', 'modalService', function (directiveService, $timeout, modalService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/field/dirFieldText/template.html",
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
        templateUrl: "/assets/js/directive/field/dirFieldTextArea/template.html",
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
        templateUrl: "/assets/js/directive/field/dirFieldCheck/template.html",
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
                        if(scope.getInfo().valid != undefined){
                            scope.getInfo().isValid =scope.getInfo().valid();
                        }
                        else {
                            scope.getInfo().isValid = true;
                        }
                    };

                    scope.isValid();

                    scope.$watch('getInfo().field[getInfo().fieldName]', function (n, o) {
                        return scope.isValid();
                    });


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

myApp.directive("dirFieldDocument", ['directiveService', '$upload', '$flash', '$filter', 'generateId', '$window', function (directiveService, $upload, $flash, $filter, generateId, $window) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/field/dirFieldDocument/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    console.log('getInfo()');
                    console.log(scope.getInfo());


                    scope.id = generateId.generate();
                    scope.errorMessage = "";

                    scope.isActive = function () {

                        return !(scope.getInfo().active != null && scope.getInfo().active != undefined && scope.getInfo().active() == false);
                    };

                    scope.isValid = function () {
                        scope.getInfo().isValid = (scope.getInfo().optional != null && scope.getInfo().optional()) || scope.isActive() == false || scope.getInfo().field[scope.getInfo().fieldName] != null;
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
                    scope.$watch('percent', function () {
                        var _ref;
                        return scope.style = {
                            "width": scope.percent + "%",
                            "color": (_ref = scope.percent > 50) != null ? _ref : {
                                "white": "black"
                            }
                        };
                    });

                    scope.success = false;
                    scope.onFileSelect = function ($files) {
                        var file, i;
                        scope.inDownload = true;
                        i = 0;
                        while (i < $files.length) {
                            file = $files[i];

                            var url = "/rest/file/" + scope.getInfo().target;


                            console.log("-- scope.getInfo()");
                            console.log(scope.getInfo());
                            console.log("-- url:"+url);

                            scope.upload = $upload.upload({
                                url: url,
                                data: {
                                    myObj: scope.myModelObj
                                },
                                file: file
                            }).progress(function (evt) {
                                scope.percent = parseInt(100.0 * evt.loaded / evt.total);
                            }).success(function (data, status) {
                                scope.success = true;
                                scope.percent = 100.0;
                                scope.getInfo().field[scope.getInfo().fieldName] = data;
                                scope.inDownload = false;
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
}]);
myApp.directive("dirFieldImageMutiple", ['directiveService', '$upload', '$flash', '$filter', 'generateId', '$window', function (directiveService, $upload, $flash, $filter, generateId, $window) {
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
}]);
myApp.directive("dirFieldImageMultipleResizable", ['$rootScope', 'directiveService', '$upload', '$flash', '$filter', 'generateId', 'imageService', 'modalService', 'constantService', function ($rootScope,directiveService, $upload, $flash, $filter, generateId, imageService, modalService,constantService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/field/dirFieldImageMultipleResizable/template.html",
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
                            $flash.error($filter('translateText')('--.field.imageMultipleResize.minimalHeight', [scope.getInfo().maxHeight,src.height]));
                            success = false;
                        }
                        if (scope.getInfo().maxWidth != null && scope.getInfo().maxWidth > src.width) {
                            $flash.error($filter('translateText')('--.field.imageMultipleResize.minimalWidth', [scope.getInfo().maxWidth,src.width] ));
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
}]);
myApp.directive("compile", ['$compile', '$filter', function ($compile, $filter) {
    return function (scope, element, attrs) {
        scope.$watch(
            function (scope) {
                return scope.$eval(attrs.compile);
            },
            function (value, o) {
                value = $filter('translateText')(value);
                element.html(value);
                $compile(element.contents())(scope);
            }
        )
    };
}]);
myApp.directive('loginFormCtrl', ['$flash', 'facebookService', 'translationService', 'directiveService', '$timeout', 'accountService', '$location', 'modalService', function($flash, facebookService, translationService, directiveService, $timeout, accountService, $location, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/form/login/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          var access_token;
          directiveService.autoScopeImpl(scope);
          scope.facebookAppId = facebookService.facebookAppId;
          scope.facebookAuthorization = facebookService.facebookAuthorization;
          scope.basic_url = location.host;
          if (scope.basic_url.indexOf('http') === -1) {
            if (scope.basic_url.indexOf('localhost') !== -1) {
              scope.basic_url = 'http://' + scope.basic_url;
            } else {
              scope.basic_url = 'https://' + scope.basic_url;
            }
          }
          if (!(scope.getInfo().dto != null)) {
            scope.getInfo().dto = {};
          }
          scope.fields = {
            email: {
              fieldType: 'email',
              name: 'email',
              fieldTitle: '--.registration.form.yourEmail',
              validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              validationMessage: '--.generic.validation.email',
              disabled: function() {
                return scope.getInfo().loading;
              },
              field: scope.getInfo().dto,
              fieldName: 'email'
            },
            password: {
              name: 'password',
              fieldTitle: '--.generic.yourPassword',
              validationRegex: '^[a-zA-Z0-9-_%]{6,18}$',
              validationMessage: '--.generic.validation.password',
              fieldType: 'password',
              disabled: function() {
                return scope.getInfo().loading;
              },
              field: scope.getInfo().dto,
              fieldName: 'password'
            }
          };
          scope.setLoading = function(b) {
            if (scope.getInfo().mobileVersion) {
              if (b === true) {
                return modalService.openLoadingModal();
              } else {
                return modalService.closeLoadingModal();
              }
            } else {
              return scope.getInfo().loading = b;
            }
          };
          scope.$watch('fields', (function() {
            var key, obj, validation;
            validation = true;
            for (key in scope.fields) {
              obj = scope.fields[key];
              if (!(obj.isValid != null) || obj.isValid === false) {
                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                validation = false;
              }
            }
            return scope.getInfo().isValid = validation;
          }), true);
          scope.$watch('getInfo().displayErrorMessage', function() {
            var key, obj, _results;
            _results = [];
            for (key in scope.fields) {
              obj = scope.fields[key];
              _results.push(obj.firstAttempt = !scope.getInfo().displayErrorMessage);
            }
            return _results;
          });
          scope.facebookSuccess = function(data) {
            accountService.setMyself(data);
            if (data.type === 'BUSINESS') {
              $location.path('/business/' + accountService.getMyself().businessId);
            } else if (scope.getInfo().mobileVersion) {
              $location.path('/');
            }
            scope.getInfo().facebookSuccess(data);
            return scope.setLoading(false);
          };
          scope.fb_login = function() {
            var failed, success, url;
            success = function(data) {
              scope.facebookSuccess(data);
              return scope.setLoading(false);
            };
            failed = function(data) {
              $flash.error(data.message);
              scope.setLoading(false);
              return scope.$apply();
            };
            scope.setLoading(true);
            if (scope.getInfo().mobileVersion) {
              if (facebookService.isConnected()) {
                return facebookService.loginToServer(success, failed);
              } else {
                url = 'https://www.facebook.com/dialog/oauth/?scope=' + facebookService.facebookAuthorization + '&client_id=' + scope.facebookAppId + '&redirect_uri=' + scope.basic_url + '/&state=BELGIUM&scope=' + scope.facebookAuthorization + '&response_type=token';
                return window.open(url, '_self');
              }
            } else {
              return facebookService.login((function(data) {
                return success(data);
              }), function(data) {
                return failed(data);
              });
            }
          };
          scope.getUrlParam = function(name, url) {
            var regex, regexS, results;
            if (!url) {
              url = location.href;
            }
            name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
            regexS = '[\\?&]' + name + '=([^&#]*)';
            regex = new RegExp(regexS);
            results = regex.exec(url);
            if (results === null) {
              return null;
            } else {
              return results[1];
            }
          };
          if (location.href.indexOf('access_token') !== -1) {
            access_token = scope.getUrlParam('access_token', location.href);
            if (access_token != null) {
              scope.setLoading(true);
              return facebookService.loginToServerSimple(access_token, (function(data) {
                return scope.facebookSuccess(data);
              }), function(data, status) {
                scope.setLoading(false);
                return $location.path('/customer_registration');
              });
            }
          }
        }
      };
    }
  };
}]);
myApp.directive('addressFormCtrl', ['$flash', 'directiveService', '$timeout', '$filter', 'translationService', 'modalService', function ($flash, directiveService, $timeout, $filter, translationService,modalService) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/form/address/template.html",
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
                            if(names[key].key== scope.getInfo().dto.name){
                                founded=true;
                                scope.getInfo().dto.listName =scope.getInfo().dto.name;
                            }
                        }
                        if(!founded){
                            console.log('not found');
                            scope.getInfo().dto.listName =names[names.length - 1].key;
                            scope.getInfo().dto.customName =scope.getInfo().dto.name;
                        }
                    }

                    scope.fields = {
                        name: {
                            fieldTitle: "--.form.address.field.name",
                            name:'name',
                            options: names,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.getInfo().addName == true;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'listName'
                        },
                        customName:{
                            fieldTitle: '--.address.customName.fieldTitle',
                            name:'customName',
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return scope.getInfo().addName == true && scope.getInfo().dto['listName'] == translationService.get('--.address.type.other');
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'customName'
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

                        if(scope.fields.customName.active()){
                            scope.getInfo().dto['name'] = scope.getInfo().dto['customName'];
                        }
                        else{
                            scope.getInfo().dto['name'] = scope.getInfo().dto['listName'];
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
            templateUrl: "/assets/js/directive/form/customerInterest/template.html",
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
myApp.directive('accountFormCtrl', ['$flash', 'directiveService', 'languageService', 'modalService', function ($flash, directiveService, languageService,modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/form/account/template.html",
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
                    }

                    scope.passwordActive = true;

                    var langOptions = [];


                    scope.fields = {
                        gender: {
                            name: 'gender',
                            fieldTitle: "--.generic.gender",
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
                        language: {
                            name: 'language',
                            fieldTitle: "--.generic.favoriteLanguage",
                            validationMessage: '--.error.validation.not_null',
                            options: langOptions,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'lang'
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
                            name: 'repeatPassword',
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
                            fieldName: 'repeatPassword'
                        }
                    };

                    var langs = languageService.getLanguages();
                    for (var key in langs) {
                        var lang = langs[key];
                        langOptions.push({
                            key: lang,
                            value: lang.code
                        });
                        if (lang.code == languageService.currentLanguage) {
                            scope.getInfo().dto.lang = lang;
                        }
                    }

                    scope.getInfo().maskPassword = function () {
                        scope.passwordActive = false;
                    };

                    scope.openSla = function(){
                      modalService.openSla('--.sla.modal.title','/legal/');
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
        templateUrl: "/assets/js/directive/form/business/template.html",
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

                    console.log('scope.getInfo().status : ' + scope.getInfo().status);


                    scope.fields = {
                        name: {
                            name: 'name',
                            fieldTitle: "--.generic.name",
                            validationRegex: "^.{2,50}$",
                            validationMessage: ['--.generic.validation.size', '2', '250'],
                            focus: function () {
                                return true;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled || (scope.getInfo().status !=undefined && scope.getInfo().status === 'PUBLISHED');
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'name'
                        },
                        vta: {
                            name: 'vta',
                            fieldTitle: "--.business.vta",
                            validationRegex: /^($|[a-zA-Z0-9\.\- ]{6,20}$)/,
                            validationMessage: '--.validation.dto.vta',
                            disabled: function () {
                                return scope.getInfo().disabled || (scope.getInfo().status !=undefined && scope.getInfo().status === 'PUBLISHED');
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'vta'
                        },
                        description: {
                            name: 'description',
                            fieldTitle: "--.generic.desc",
                            validationRegex: /^[\s\S]{2,1500}$/gi,
                            validationMessage: ['--.generic.validation.size', '2', '1500'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        phone: {
                            name: 'phone',
                            fieldTitle: "--.generic.phone",
                            validationRegex: /^[0-9. *-+\/]{6,16}$/,
                            validationMessage: '--.validation.dto.phone',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'phone'
                        },
                        email: {
                            name: 'business-email',
                            fieldTitle: "--.business.contactEmail",
                            validationRegex: /^($|((([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$))/,
                            validationMessage: '--.validation.dto.notNull',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        website: {
                            name: 'website',
                            fieldTitle: "--.business.website",
                            validationRegex: /^($|^(http[s]?:\/\/(www\.)?)[0-9A-Za-z-\.@:%_\+~#=]+\.[a-zA-Z]{2,3}((\/|\?).*)?$)/,
                            validationMessage: '--.validation.dto.url',
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
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
        templateUrl: "/assets/js/directive/form/businessCategory/template.html",
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
                    console.log(scope.getInfo());
                    scope.displayValue = function () {
                        console.log('scope.displayValue');

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

                    scope.loading=true;
                    businessCategoryService.getAll(function (data) {
                        scope.categories = data.list;
                        scope.displayValue();
                        scope.loading=false;
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
        templateUrl: "/assets/js/directive/form/download/template.html",
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
myApp.directive('promotionFormCtrl', ['$flash', 'directiveService', '$timeout', 'businessService', 'accountService', function ($flash, directiveService, $timeout, businessService, accountService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/form/promotion/template.html",
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
                    scope.editMode = false;

                    //
                    // initialize default data
                    //
                    if (scope.getInfo().dto == null) {
                        var startDate = new Date();
                        startDate.setMinutes(0);
                        startDate.setSeconds(0);
                        startDate.setMilliseconds(0);
                        var endDate = angular.copy(startDate);
                        endDate = new Date(endDate.getTime() + 3600 * 1000 * 24 * 7);
                        console.log('startDate:' + startDate);
                        console.log('endDate:' + endDate);
                        scope.getInfo().dto = {
                            type: 'PROMOTION',
                            startDate: startDate,
                            endDate: endDate
                            //minimalQuantity: 1
                        };
                    }
                    else {
                        var startDate = scope.getInfo().dto.startDate;
                        scope.editMode = true;
                        scope.completePromotion = scope.getInfo().dto.originalPrice != null;
                    }


                    //complete for previsualization
                    scope.getInfo().dto.businessName = scope.getInfo().business.name;
                    scope.getInfo().dto.businessIllustration = scope.getInfo().business.illustration;
                    scope.getInfo().dto.distance = scope.getInfo().business.distance;


                    //load interests
                    businessService.getInterests(function (data) {
                        scope.interests = data;
                        if (scope.interests.length > 1) {
                            scope.fields.interests.active = function () {
                                return true;
                            };
                            var list = [];
                            for (var key in scope.interests) {
                                var interest = scope.interests[key];
                                list.push({
                                    key: interest,
                                    value: interest.translationName
                                });
                            }
                            scope.fields.interests.options = list;
                        }
                        else if (scope.interests.length == 1) {
                            scope.getInfo().dto.interest = scope.interests[0];
                        }
                    });

                    //build field + dto binding
                    scope.fields = {
                        title: {
                            name: 'title',
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
                            name: 'description',
                            fieldTitle: "--.publication.description",
                            validationRegex: /^[\s\S]{0,1000}$/gi,
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        startDate: {
                            name: 'startDate',
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled || scope.editMode === true;
                            },
                            field: scope.getInfo().dto,
                            startDate: startDate,
                            fieldName: 'startDate',
                            maxDay: 30
                        },
                        endDate: {
                            name: 'endDate',
                            fieldTitle: "--.promotion.endDate",
                            validationMessage: '--.promotion.validation.endDateBeforeStartDate',
                            minimalDelay: 'hour',
                            details: '--.businessNotification.dayMax.details',
                            disabled: function () {
                                return scope.getInfo().disabled || scope.editMode === true;
                            },
                            validationFct: function () {
                                return scope.getInfo().dto.endDate >= scope.getInfo().dto.startDate;
                            },
                            field: scope.getInfo().dto,
                            startDate: startDate,
                            fieldName: 'endDate',
                            maxDay: 14

                        },
                        illustration: {
                            name: 'illustration',
                            fieldTitle: "--.promotion.illustration",
                            details: '--promotion.illustration.maximumImage',
                            validationMessage: '--.error.validation.image',
                            target: 'publication_picture',
                            //sizex: constantService.PUBLICATION_ILLUSTRATION_X,
                            //sizey: constantService.PUBLICATION_ILLUSTRATION_Y,
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            maxImage: 4,
                            optional: function () {
                                return true;
                            },
                            field: scope.getInfo().dto,
                            multiple: true,
                            fieldName: 'pictures'
                        },
                        originalPrice: {
                            name: 'originalPrice',
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
                            name: 'offPercent',
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
                            name: 'offPrice',
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
                            name: 'interests',
                            fieldTitle: "--.promotion.interest",
                            details: '--.promotion.interest.help',
                            validationMessage: '--.error.validation.not_null',
                            options: [],
                            optional: function () {
                                return true;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'interest',
                            comparableFct: function (a, b) {
                                return a.name == b.name;
                            }
                        },
                        editionReason: {
                            fieldTitle: "--.publication.editionJustification",
                            validationRegex: /^[\s\S]{1,1000}$/gi,
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return accountService.getMyself().role == 'SUPERADMIN';
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'editionReason'
                        }
                    };

                    scope.$watch('fields.startDate.field', function () {
                        scope.fields.endDate.startDate = scope.fields.startDate.field[scope.fields.startDate.fieldName];
                    }, true);

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
                            scope.getInfo().dto.offPercent = 1 - (parseFloat(scope.getInfo().dto.offPrice) / parseFloat(scope.getInfo().dto.originalPrice));
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
myApp.directive('businessNotificationFormCtrl', ['$flash', 'directiveService', 'businessService', 'accountService', 'constantService', function ($flash, directiveService, businessService, accountService,constantService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/form/businessNotification/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    //add day function
                    var addDays = function (date, days) {
                        var result = new Date(date);
                        result.setDate(result.getDate() + days);
                        return result;
                    };

                    scope.editMode = false;

                    //
                    // initialize default data
                    //
                    if (scope.getInfo().dto == null) {
                        var startDate = new Date();
                        startDate.setMinutes(0);
                        startDate.setSeconds(0);
                        startDate.setMilliseconds(0);
                        var endDate = angular.copy(startDate);
                        endDate = new Date(endDate.getTime() + 3600 * 1000 * 24 * 7);
                        scope.getInfo().dto = {
                            type: 'NOTIFICATION',
                            startDate: startDate,
                            endDate: endDate
                        };
                    }
                    else {
                        var startDate = scope.getInfo().dto.startDate;
                        scope.editMode = true;
                        scope.completePromotion = scope.getInfo().dto.originalPrice != null;
                    }

                    //complete for previsualization
                    scope.getInfo().dto.businessName = scope.getInfo().business.name;
                    scope.getInfo().dto.businessIllustration = scope.getInfo().business.illustration;
                    scope.getInfo().dto.distance = scope.getInfo().business.distance;

                    //load interests
                    businessService.getInterests(function (data) {
                        scope.interests = data;
                        if (scope.interests.length > 1) {
                            scope.fields.interests.active = function () {
                                return true;
                            };
                            var list = [];
                            for (var key in scope.interests) {
                                var interest = scope.interests[key];
                                list.push({
                                    key: interest,
                                    value: interest.translationName
                                });
                            }
                            scope.fields.interests.options = list;
                        }
                        else if (scope.interests.length == 1) {
                            scope.getInfo().dto.interest = scope.interests[0];
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
                            fieldTitle: "--.publication.description",
                            validationRegex: /^[\s\S]{0,1000}$/gi,
                            validationMessage: ['--.generic.validation.size', '0', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'description'
                        },
                        startDate: {
                            name: 'startDate',
                            fieldTitle: "--.promotion.startDate",
                            minimalDelay: 'hour',
                            disabled: function () {
                                return scope.getInfo().disabled || scope.editMode === true;
                            },
                            field: scope.getInfo().dto,
                            startDate: startDate,
                            fieldName: 'startDate',
                            maxDay: 30
                        },
                        endDate: {
                            name: 'endDate',
                            fieldTitle: "--.promotion.endDate",
                            validationMessage: '--.promotion.validation.endDateBeforeStartDate',
                            minimalDelay: 'hour',
                            details: '--.businessNotification.dayMax.details',
                            disabled: function () {
                                return scope.getInfo().disabled || scope.editMode === true;
                            },
                            validationFct: function () {
                                return scope.getInfo().dto.endDate >= scope.getInfo().dto.startDate;
                            },
                            field: scope.getInfo().dto,
                            startDate: startDate,
                            fieldName: 'endDate',
                            maxDay: 28

                        },
                        illustration: {
                            fieldTitle: "--.promotion.illustration",
                            validationMessage: '--.error.validation.image',
                            details: '--promotion.illustration.maximumImage',
                            target: 'publication_picture',
                            maxHeight: constantService.PUBLICATION_PICTURE_HEIGHT,
                            maxWidth: constantService.PUBLICATION_PICTURE_WIDTH,
                            optional: function () {
                                return true;
                            },
                            maxImage: 4,
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
                                return true;
                            },
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return false
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'interest',
                            comparableFct: function (a, b) {
                                return a.name == b.name;
                            }
                        },
                        editionReason: {
                            fieldTitle: "--.publication.editionJustification",
                            validationRegex: /^[\s\S]{1,1000}$/gi,
                            validationMessage: ['--.generic.validation.size', '1', '1000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active: function () {
                                return accountService.getMyself().role == 'SUPERADMIN';
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'editionReason'
                        }
                    };

                    scope.$watch('fields.startDate.field', function () {
                        scope.fields.endDate.startDate = scope.fields.startDate.field[scope.fields.startDate.fieldName];
                    }, true);

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
        templateUrl: "/assets/js/directive/form/schedule/template.html",
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
                        APPOINTMENT:'attendance-appointment',
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
        templateUrl: "/assets/js/directive/form/image/template.html",
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
                        target: scope.getInfo().target,
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
        templateUrl: "/assets/js/directive/form/businessSocialNetwork/template.html",
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
                            name:'facebook',
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
                            name:'twitter',
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
                            name:'instagram',
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
                            name:'delivery',
                            details:'--.business.social.edit.modal.delivery.desc',
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
                            name:'ecommerce',
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
                            name:'opinion',
                            details:'--.business.social.edit.modal.opinion.desc',
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
                            name:'reservation',
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
myApp.directive('contactFormCtrl', ['$flash', 'directiveService', 'accountService', function ($flash, directiveService,accountService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/form/contact/template.html",
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
                        email: {
                            fieldType: "email",
                            name: 'email',
                            fieldTitle: "--.registration.form.yourEmail",
                            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            validationMessage: "--.generic.validation.email",
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            active:function(){
                              return accountService.getMyself()==null;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'email'
                        },
                        subject: {
                            name: 'subject',
                            fieldTitle: "--.contactForm.subject",
                            validationRegex: "^.{2,255}$",
                            validationMessage: ['--.generic.validation.size', '2', '255'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'subject'
                        },
                        message: {
                            name: 'message',
                            fieldTitle: "--.contactForm.message",
                            validationRegex: /^[\s\S]{2,10000}$/gi,
                            validationMessage: ['--.generic.validation.size', '2', '10000'],
                            disabled: function () {
                                return scope.getInfo().disabled;
                            },
                            field: scope.getInfo().dto,
                            fieldName: 'message'
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
myApp.directive('claimBusinessCtrl', ['$flash', 'facebookService', 'translationService', 'directiveService', '$timeout', 'accountService', '$location', 'modalService', function($flash, facebookService, translationService, directiveService, $timeout, accountService, $location, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/form/claimBusiness/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.fields = {
            phone: {
              name: 'phone',
              fieldTitle: "--.generic.phone",
              validationRegex: /^[0-9. *-+\/]{6,16}$/,
              validationMessage: '--.validation.dto.phone',
              disabled: function() {
                return scope.getInfo().disabled;
              },
              field: scope.getInfo().dto,
              fieldName: 'phone'
            },
            vta: {
              name: 'vta',
              fieldTitle: "--.business.vta",
              validationRegex: /^[a-zA-Z0-9\.\- ]{6,20}$/,
              validationMessage: '--.validation.dto.vta',
              disabled: function() {
                return scope.getInfo().disabled || (scope.getInfo().status != null) === 'PUBLISHED';
              },
              field: scope.getInfo().dto
            }
          };
          scope.setLoading = function(b) {
            if (scope.getInfo().mobileVersion) {
              if (b === true) {
                return modalService.openLoadingModal();
              } else {
                return modalService.closeLoadingModal();
              }
            } else {
              return scope.getInfo().loading = b;
            }
          };
          scope.$watch('fields', (function() {
            var key, obj, validation;
            validation = true;
            for (key in scope.fields) {
              obj = scope.fields[key];
              if (scope.fields.hasOwnProperty(key) && (!(obj.isValid != null) || obj.isValid === false)) {
                obj.firstAttempt = !scope.getInfo().displayErrorMessage;
                validation = false;
              }
            }
            return scope.getInfo().isValid = validation;
          }), true);
          return scope.$watch('getInfo().displayErrorMessage', function() {
            var key, obj, _results;
            _results = [];
            for (key in scope.fields) {
              obj = scope.fields[key];
              _results.push(obj.firstAttempt = !scope.getInfo().displayErrorMessage);
            }
            return _results;
          });
        }
      };
    }
  };
}]);
myApp.directive('scheduleCtrl', ['directiveService', function(directiveService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/schedule/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        pre: function(scope) {},
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.sections = [];
          scope.days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
          scope.daysTranslation = {
            'MONDAY': 'day_abrv_monday',
            'TUESDAY': 'day_abrv_tuesday',
            'WEDNESDAY': 'day_abrv_wednesday',
            'THURSDAY': 'day_abrv_thusday',
            'FRIDAY': 'day_abrv_friday',
            'SATURDAY': 'day_abrv_saturday',
            'SUNDAY': 'day_abrv_sunday'
          };
          scope.attendance_class = {
            APPOINTMENT: 'attendance-appointment',
            LIGHT: 'attendance-light',
            MODERATE: 'attendance-moderate',
            IMPORTANT: 'attendance-heavy'
          };
          scope.isEven = function(nb) {
            return !(nb % 2);
          };
          return scope.$watch('getInfo().dto', (function() {
            var day, displayWK, hour, i, maxMinute, minMinute, nowDay, nowMinutes, obj, obj2, _i, _j, _k, _l, _len, _len2, _len3, _len4, _ref, _ref2, _ref3, _ref4, _results;
            console.log(new Date().getDay());
            nowDay = scope.days[new Date().getDay() - 1];
            nowMinutes = (new Date().getHours() * 60) + new Date().getMinutes();
            if ((scope.getInfo().dto != null) && Object.keys(scope.getInfo().dto).length > 0) {
              minMinute = null;
              maxMinute = null;
              _ref = scope.days;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                day = _ref[_i];
                if (scope.getInfo().dto[day] != null) {
                  _ref2 = scope.getInfo().dto[day];
                  for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                    obj = _ref2[_j];
                    if (minMinute === null || minMinute > obj.from) {
                      minMinute = obj.from;
                    }
                    if (maxMinute === null || maxMinute < obj.to) {
                      maxMinute = obj.to;
                    }
                  }
                }
              }
              if (minMinute % 60 === 30) {
                minMinute -= 30;
              }
              if (maxMinute % 60 === 30) {
                maxMinute += 30;
              }
              scope.hours = [];
              i = minMinute / 30;
              while (i <= maxMinute / 30) {
                hour = '';
                if (scope.isEven(i)) {
                  hour = i / 2;
                }
                scope.hours.push({
                  text: hour
                });
                i++;
              }
              displayWK = true;
              if (scope.getInfo().dto['SATURDAY'].length === 0 && scope.getInfo().dto['SUNDAY'].length === 0) {
                displayWK = false;
              }
              _ref3 = scope.days;
              for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                day = _ref3[_k];
                if ((day === 'SUNDAY' || day === 'SATURDAY') && displayWK === false) {
                  i++;
                  continue;
                }
                scope.sections[day] = [];
                i = minMinute / 30;
                while (i < maxMinute / 30) {
                  scope.sections[day].push({
                    minutes: i * 30,
                    attendance: 'CLOSE'
                  });
                  i++;
                }
              }
              _ref4 = scope.days;
              _results = [];
              for (_l = 0, _len4 = _ref4.length; _l < _len4; _l++) {
                day = _ref4[_l];
                _results.push((function() {
                  var _i, _len, _ref, _results;
                  if (scope.getInfo().dto[day] != null) {
                    _ref = scope.getInfo().dto[day];
                    _results = [];
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                      obj = _ref[_i];
                      _results.push((function() {
                        var _i, _len, _ref, _results;
                        _ref = scope.sections[day];
                        _results = [];
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                          obj2 = _ref[_i];
                          if (day === nowDay && obj2.minutes < nowMinutes && (obj2.minutes + 30) > nowMinutes) {
                            scope.isOpenNow = true;
                          }
                          _results.push(obj2.minutes >= obj.from && obj2.minutes + 30 <= obj.to ? obj2.attendance = obj.attendance : void 0);
                        }
                        return _results;
                      })());
                    }
                    return _results;
                  }
                })());
              }
              return _results;
            }
          }), true);
        }
      };
    }
  };
}]);
myApp.directive('galleryCtrl', ['$rootScope', 'directiveService', 'modalService', function($rootScope, directiveService, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/gallery/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          return scope.openGallery = function(image) {
            return modalService.galleryModal(image, scope.getInfo().images);
          };
        }
      };
    }
  };
}]);
myApp.directive('googleMapWidgetCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', '$timeout', function($rootScope, businessService, geolocationService, directiveService, $timeout) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/googleMapWidget/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          return scope.$watch('getInfo().address', function() {
            scope.getInfo().refreshNow = function() {
              return scope.getInfo().centerMap();
            };
            scope.$watch('getInfo().address', function() {
              return scope.getInfo().centerMap();
            }, true);
            scope.$watch('getInfo().map', function(n) {
              return scope.getInfo().centerMap();
            });
            scope.getInfo().centerMap = function() {
              var marker;
              if (scope.getInfo().address != null) {
                scope.map = new google.maps.Map(document.getElementsByClassName('map')[0], {
                  zoom: 14,
                  disableDefaultUI: true,
                  center: {
                    lat: scope.getInfo().address.posx,
                    lng: scope.getInfo().address.posy
                  }
                });
                marker = new google.maps.Marker({});
                marker.setPosition(new google.maps.LatLng(scope.getInfo().address.posx, scope.getInfo().address.posy));
                return marker.setMap(scope.map);
              }
            };
            scope.toGoogleMap = function() {
              var iOSversion, protocol, ver;
              iOSversion = function() {
                var v;
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                  v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                  return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                }
              };
              if (navigator.platform.indexOf('iPhone') !== -1 || navigator.platform.indexOf('iPod') !== -1) {
                ver = iOSversion() || [0];
                protocol = '';
                if (ver[0] >= 6) {
                  protocol = 'maps://';
                } else {
                  protocol = 'http://';
                }
                return window.location = protocol + scope.complete('maps.apple.com/?address=');
              } else {
                return window.open(scope.complete('https://www.google.be/maps/place/'));
              }
            };
            return scope.complete = function(url) {
              var add;
              add = scope.getInfo().address.street + ',' + scope.getInfo().address.zip + ',' + scope.getInfo().address.city + ',' + scope.getInfo().address.country;
              return url += add.replace(RegExp(' ', 'g'), '+');
            };
          });
        }
      };
    }
  };
}]);
myApp.directive('searchResultCtrl', ['directiveService', '$location', 'searchBarService', function(directiveService, $location, searchBarService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/searchResult/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        pre: function(scope) {},
        post: function(scope) {
          var counter, removeCriteria;
          directiveService.autoScopeImpl(scope);
          counter = -1;
          scope.getInfo().indexSelected = null;
          scope.$watch('getInfo().result', function() {
            var business, category, publication, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
            if (scope.getInfo().result != null) {
              counter = -1;
              _ref = scope.getInfo().result.businesses;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                business = _ref[_i];
                business.index = ++counter;
              }
              if ((scope.getInfo().result.businesses != null) && scope.getInfo().result.businesses.length > 0 && scope.getInfo().mobile !== true) {
                scope.seeMoreBusinessIndex = ++counter;
              }
              _ref2 = scope.getInfo().result.publications;
              for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                publication = _ref2[_j];
                publication.index = ++counter;
              }
              if ((scope.getInfo().result.publications != null) && scope.getInfo().result.publications.length > 0 && scope.getInfo().mobile !== true) {
                scope.seeMorePublicationIndex = ++counter;
              }
              _ref3 = scope.getInfo().result.categories;
              for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                category = _ref3[_k];
                category.index = ++counter;
              }
              if ((scope.getInfo().result.categories != null) && scope.getInfo().result.categories.length > 0 && scope.getInfo().mobile !== true) {
                scope.seeMoreCategoryIndex = ++counter;
              }
              scope.seeMoreIndex = ++counter;
            } else {
              scope.getInfo().display = false;
            }
            return scope.getInfo().indexSelected = null;
          });
          $(document).keydown(function(e) {
            var business, category, publication, _i, _j, _k, _len, _len2, _len3, _ref, _ref2, _ref3;
            if (e.keyCode === 40) {
              if (scope.getInfo().indexSelected === null || scope.getInfo().indexSelected === counter) {
                scope.getInfo().indexSelected = 0;
              } else {
                scope.getInfo().indexSelected++;
              }
              return scope.$apply();
            } else if (e.keyCode === 38) {
              if (scope.getInfo().indexSelected === null || scope.getInfo().indexSelected === 0) {
                scope.getInfo().indexSelected = counter;
              } else {
                scope.getInfo().indexSelected--;
              }
              return scope.$apply();
            } else if (e.keyCode === 13) {
              if ((scope.getInfo().result != null) && (scope.getInfo().indexSelected != null)) {
                _ref = scope.getInfo().result.businesses;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  business = _ref[_i];
                  if (scope.getInfo().indexSelected === business.index) {
                    console.log('goToBusiness');
                    scope.goToBusiness(business);
                    break;
                  }
                }
                _ref2 = scope.getInfo().result.categories;
                for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                  category = _ref2[_j];
                  if (scope.getInfo().indexSelected === category.index) {
                    console.log('goToCategory ');
                    scope.goToCategory(category);
                    break;
                  }
                }
                _ref3 = scope.getInfo().result.publications;
                for (_k = 0, _len3 = _ref3.length; _k < _len3; _k++) {
                  publication = _ref3[_k];
                  if (scope.getInfo().indexSelected === publication.index) {
                    console.log('goToPublication');
                    scope.goToPublication(publication);
                    break;
                  }
                }
                return scope.$apply();
              }
            } else if (e.keyCode === 27) {
              scope.getInfo().display = false;
              scope.getInfo().indexSelected = null;
              return scope.$apply();
            }
          });
          $(document).click(function() {
            if (!$('#searchContainer').is(':hover')) {
              scope.getInfo().display = false;
              scope.getInfo().indexSelected = null;
              return scope.$apply();
            }
          });
          scope.select = function(index) {
            return scope.getInfo().indexSelected = index;
          };
          scope.seeAll = function() {
            return scope.navigateTo('search/' + searchBarService.currentSearch);
          };
          scope.goToPublication = function(publication) {
            return scope.navigateTo('business/' + publication.businessId + '/publication/' + publication.id);
          };
          scope.goToBusiness = function(business) {
            return scope.navigateTo('business/' + business.id);
          };
          scope.seeAllPublication = function() {
            return scope.navigateTo('search/publication:' + removeCriteria(searchBarService.currentSearch));
          };
          scope.seeAllBusiness = function() {
            return scope.navigateTo('search/business:' + removeCriteria(searchBarService.currentSearch));
          };
          scope.seeAllCategory = function() {
            return scope.navigateTo('search/category:' + removeCriteria(searchBarService.currentSearch));
          };
          scope.goToCategory = function(category) {
            var target;
            target = null;
            if (category.subSubCategory != null) {
              target = category.subSubCategory.translationName;
            } else if (category.subCategory != null) {
              target = category.subCategory.translationName;
            } else {
              target = category.category.translationName;
            }
            return scope.navigateTo('search/category:' + removeCriteria(target));
          };
          removeCriteria = function(s) {
            if (s.indexOf(':') !== -1) {
              return s.split(':')[1];
            } else {
              return s;
            }
          };
          scope.navigateTo = function(target) {
            $location.path(target);
            return scope.$broadcast('SEARCH_CLEAN');
          };
          return scope.$on('SEARCH_CLEAN', function() {
            scope.getInfo().display = false;
            return scope.getInfo().cleanSearch();
          });
        }
      };
    }
  };
}]);
myApp.directive('searchBarCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'searchService', 'searchBarService', '$timeout', '$location', 'modalService', function($rootScope, businessService, geolocationService, directiveService, searchService, searchBarService, $timeout, $location, modalService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/searchBar/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.advancedSearch = false;
          scope.searchBarService = searchBarService;
          scope.searchResultParam = {
            mobile: scope.getInfo().mobile,
            display: false,
            cleanSearch: function() {
              return searchBarService.currentSearch = '';
            }
          };
          scope.$watch('searchBarService.currentSearch', function(o, n) {
            var searchS;
            if (searchBarService.displaySearchResult && o !== n && searchBarService.currentSearch !== '' && searchBarService.currentSearch.length >= 2) {
              searchS = angular.copy(searchBarService.currentSearch);
              if (scope.promise != null) {
                $timeout.cancel(scope.promise);
              }
              return scope.promise = $timeout(function() {
                if (searchBarService.currentSearch.indexOf(':') !== -1 && searchBarService.currentSearch.split(':')[1].length > 0 || searchBarService.currentSearch.indexOf(':') === -1 && searchBarService.currentSearch.length > 0) {
                  return scope.searchResultParam.promise = searchService.searchByStringLittle(searchBarService.currentSearch, function(result) {
                    scope.searchResultParam.result = result;
                    return scope.searchResultParam.display = true;
                  });
                }
              }, 500);
            }
          });
          scope.search = function() {
            scope.searchResultParam.display = false;
            if (!(scope.searchResultParam.indexSelected != null)) {
              return $location.path('search/' + searchBarService.currentSearch);
            }
          };
          return scope.navigateTo = function(target) {
            $rootScope.$broadcast('SEARCH_CLEAN');
            return $timeout((function() {
              return $location.path(target);
            }), 1);
          };
        }
      };
    }
  };
}]);
myApp.directive('followWidgetCtrl', ['accountService', 'modalService', 'followService', 'directiveService', '$filter', '$flash', function(accountService, modalService, followService, directiveService, $filter, $flash) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/followWidget/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.follow = function() {
            if (accountService.getMyself() != null) {
              return scope.followed();
            } else {
              return modalService.openLoginModal(scope.followed, null, '--.loginModal.help.follow');
            }
          };
          scope.getInfo().maskTotal = true;
          return scope.followed = function() {
            scope.getInfo().business.following = !scope.getInfo().business.following;
            if (scope.getInfo().business.following === true) {
              scope.getInfo().business.totalFollowers++;
              $flash.success($filter('translateText')('--.followWidget.message.add'));
            } else {
              $flash.success($filter('translateText')('--.followWidget.message.remove'));
              scope.getInfo().business.totalFollowers--;
            }
            return followService.addFollow(scope.getInfo().business.following, scope.getInfo().business.id);
          };
        }
      };
    }
  };
}]);
myApp.directive('followWidgetForPublicationCtrl', ['accountService', 'modalService', 'followService', 'directiveService', '$filter', '$flash', function(accountService, modalService, followService, directiveService, $filter, $flash) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/followWidgetForPublication/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.follow = function() {
            if (accountService.getMyself() != null) {
              return scope.followed();
            } else {
              return modalService.openLoginModal(scope.followed, null, '--.loginModal.help.follow');
            }
          };
          scope.getInfo().maskTotal = true;
          return scope.followed = function() {
            scope.getInfo().publication.following = !scope.getInfo().publication.following;
            if (scope.getInfo().publication.following === true) {
              scope.getInfo().publication.totalFollowers++;
              $flash.success($filter('translateText')('--.followWidget.message.add'));
            } else {
              $flash.success($filter('translateText')('--.followWidget.message.remove'));
              scope.getInfo().publication.totalFollowers--;
            }
            return followService.addFollow(scope.getInfo().publication.following, scope.getInfo().publication.businessId);
          };
        }
      };
    }
  };
}]);
myApp.directive('facebookSharePublicationCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', 'facebookService', function($rootScope, businessService, geolocationService, directiveService, facebookService) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/facebookSharePublication/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          return scope.share = function() {
            return facebookService.sharePublication(scope.getInfo().businessId, scope.getInfo().publicationId);
          };
        }
      };
    }
  };
}]);
myApp.filter("translateText", ['$sce', 'translationService', function ($sce, translationService) {
    return function (input, params,toUpperCase) {
        var text;

        if (typeof input === 'object') {
            text = translationService.get(input[0]);
            for (var key in input) {
                if (key != 0) {
                    text = text.replace('{' + (parseFloat(key) -1) + '}', input[key]);
                }
            }
            if(toUpperCase===true){
                return text.toUpperCase();
            }
            return text;
        }
        else {
            text = translationService.get(input);

            if (params != null) {
                if (Object.prototype.toString.call( params ) === '[object Array]') {
                    for (var key in params) {
                        text = text.replace('{' + key + '}', params[key]);
                    }
                } else {
                    text = text.replace('{0}', params);
                }
            }
            if(toUpperCase===true){
                return text.toUpperCase();
            }
            return text;
        }
        return input;
    };
}]);

myApp.filter("text", ['$sce', '$filter', function ($sce,$filter) {
    return function (input,limit) {
        if(input!=undefined || input!=null) {
            if(limit!=undefined && input.length > limit){
                input=input.substr(0,limit);//$filter('limitTo')(result,limit);
                input= input.substr(0, Math.min(input.length, input.lastIndexOf(" ")));
                input=input+" ...";
            }
            var result= $sce.trustAsHtml(input.replace(/\n/g, '<br/>'));
            return result;
        }
        return $sce.trustAsHtml(input);
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

myApp.filter("image", ['constantService', function (constantService) {
    return function (input, orginal) {
        if (input != null && input != undefined) {
            if (input.storedName != null && input.storedName != undefined) {

                if (orginal != undefined && orginal == true) {
                    return constantService.fileBucketUrl + '/' + input.storedNameOriginalSize;
                }
                else {
                    return constantService.fileBucketUrl + '/' + input.storedName;
                }
            }
            else {
                return input;
            }
        }
        return null;
    };
}]);

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
myApp.controller('MainCtrl', ['$rootScope', '$scope', '$locale', 'translationService', '$window', 'facebookService', 'languageService', '$location', 'modalService', 'accountService', '$timeout', 'constantService', 'customerInterestService', function ($rootScope, $scope, $locale, translationService, $window, facebookService, languageService, $location, modalService, accountService, $timeout, constantService, customerInterestService) {


    $scope.navigateTo = function (target) {
        $location.path(target);
    };

    //
    // initialize translations
    // load from data var and insert into into translationService
    //
    if ("data" in window && data != undefined && data != null) {
        translationService.set(data.translations);
        constantService.fileBucketUrl = data.fileBucketUrl;
        constantService.urlBase = data.urlBase;
        customerInterestService.setAll(data.customerInterests);

        //add constants
        for (var key in data.constants) {
            constantService[key] = data.constants[key];
        }
        constantService.isMobile = data.isMobile;
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

    //catch url
    if ($location.url().indexOf("customerRegistration") != -1 && accountService.getMyself()==null) {
        modalService.openCustomerRegistrationModal();
    }
    else if ($location.url().indexOf("businessRegistration") != -1 && accountService.getMyself()==null) {
        modalService.openBusinessRegistrationModal();
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

    //
    // progress bar
    //
    $scope.progressBarWidth = 0;
    var progressBarMultiplicator = 2;

    $scope.progressBarCss = {
        width: $scope.progressBarWidth + "%"
    };

    $rootScope.$on('PROGRESS_BAR_START', function () {
        $scope.progress();
    });

    $scope.progress = function () {
        $scope.progressBarWidth++;
        if ($scope.progressBarWidth < 50 * progressBarMultiplicator) {
            $timeout(function () {
                $scope.progress();
            }, 1000 / 100 * progressBarMultiplicator);
        }
        else if ($scope.progressBarWidth < 75 * progressBarMultiplicator) {
            $timeout(function () {
                $scope.progress();
            }, 3000 / 100 * progressBarMultiplicator);
        }
        else if ($scope.progressBarWidth < 100 * progressBarMultiplicator) {
            $timeout(function () {
                $scope.progress();
            }, 10000 / 100 * progressBarMultiplicator);
        }
    };

    $rootScope.$on('PROGRESS_BAR_STOP', function () {
        $scope.progressBarWidth = 100 * progressBarMultiplicator;
        $timeout(function () {
            $scope.progressBarWidth = 0;
        }, 500);
    });

    $scope.$watch('progressBarWidth', function () {
        $scope.progressBarCss.width = ($scope.progressBarWidth / progressBarMultiplicator) + '%';
    });


}]);
myApp.controller('LegalCtrl', ['$scope', function ($scope) {


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
myApp.service('facebookService', ['$http', 'accountService', '$locale', 'languageService', 'constantService', '$flash', function($http, accountService, $locale, languageService, constantService, $flash) {
  var authResponse, isConnected, _this;
  this.facebookAppId;
  this.facebookAuthorization = 'public_profile,email';
  isConnected = false;
  authResponse = null;
  _this = this;
  this.ini = function() {
    FB.init({
      appId: this.facebookAppId,
      cookie: true,
      xfbml: true,
      version: 'v2.3'
    });
    return FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        isConnected = true;
        return authResponse = response.authResponse;
      }
    });
  };
  this.sharePublication = function(businessId, publicationId) {
    var obj, url;
    url = constantService.urlBase + '/business/' + businessId + '/publication/' + publicationId;
    obj = {
      method: 'share',
      href: url
    };
    return FB.ui(obj);
  };
  this.loginToServer = function(callbackSuccess, callbackError) {
    var access_token, user_id;
    access_token = authResponse.accessToken;
    user_id = authResponse.userID;
    return $http({
      'method': 'GET',
      'url': '/rest/login/facebook/' + access_token + '/' + user_id,
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data) {
      if ((data != null) !== '') {
        if (callbackSuccess != null) {
          return callbackSuccess(data);
        }
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.loginToServerSimple = function(accessToken, callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/login/facebook/' + accessToken + '/null',
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data) {
      if ((data != null) !== '') {
        if (callbackSuccess != null) {
          return callbackSuccess(data);
        }
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.linkToAccount = function(accessToken, callbackSuccess, callbackError) {
    var linkFct;
    linkFct = function(accessTokenToLink) {
      return $http({
        'method': 'GET',
        'url': '/rest/facebook/link/' + accessTokenToLink + '/null',
        'headers': 'Content-Type:application/json;charset=utf-8'
      }).success(function(data) {
        if ((data != null) !== '') {
          if (callbackSuccess != null) {
            return callbackSuccess(data);
          }
        }
      }).error(function(data, status) {
        $flash.error(data.message);
        if (callbackError != null) {
          return callbackError(data, status);
        }
      });
    };
    if (accessToken != null) {
      authResponse = {
        accessToken: accessToken
      };
      isConnected = true;
      return linkFct(authResponse.accessToken);
    } else {
      if (isConnected) {
        return linkFct(authResponse.accessToken);
      } else {
        return FB.login(function(response) {
          if (response.status === 'connected') {
            authResponse = response.authResponse;
            isConnected = true;
            return linkFct(authResponse.accessToken);
          } else {
            if (callbackError != null) {
              return callbackError();
            }
          }
        }, {
          scope: this.facebookAuthorization
        });
      }
    }
  };
  this.login = function(successCallback, callbackError) {
    if (isConnected) {
      return this.loginToServer(successCallback, callbackError);
    } else {
      return FB.login(function(response) {
        if (response.status === 'connected') {
          authResponse = response.authResponse;
          _this.loginToServer(successCallback, callbackError);
          return isConnected = true;
        } else {
          if (callbackError != null) {
            return callbackError();
          }
        }
      }, {
        scope: this.facebookAuthorization
      });
    }
  };
  this.isConnected = function() {
    return isConnected;
  };
  return;
}]);
myApp.service("languageService", ['$flash', '$window', '$http', '$rootScope', function ($flash, $window, $http, $rootScope) {

    this.languages;
    this.languagesStructured = [];
    this.currentLanguage;
    var self = this;

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

    $rootScope.$watch(function () {
        return self.currentLanguage;
    }, function watchCallback(newValue, oldValue) {
        if (newValue != oldValue) {
            self.changeLanguage(self.currentLanguage, true);
        }
    });

    this.changeLanguage = function (lang, forced) {
        if (lang != this.currentLanguage || forced) {

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

    this.getLanguages = function () {
        return angular.copy(this.languages);
    };
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

    this.setAll = function(interests){
        customerInterests = interests;
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
myApp.service("accountService", ['$flash', '$http', 'translationService', function ($flash, $http,translationService) {

    var self = this;

    this.model = {
        myself: null,
        myBusiness:null
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
        console.log(dto);
        $http({
            'method': "PUT",
            'url': "/rest/customer/interest/" + self.getMyself().id,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {list:dto}
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

    this.getMyBusiness = function () {
        return this.model.myBusiness;
    };

    this.setMyBusiness = function (dto) {
        this.model.myBusiness = dto;
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
myApp.service('businessService', ['$flash', '$http', 'accountService', 'geolocationService', function($flash, $http, accountService, geolocationService) {
  this.loadLastBusiness = function(businessNb, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/last/' + businessNb,
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': geolocationService.getPositionWithoutNull()
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.createBusiness = function(accountId, businessName, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/createBusiness',
      'headers': 'Content-Type:application/json;charset=utf-8',
      data: {
        accountId: accountId,
        businessName: businessName
      }
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.importBusinessFormFacebook = function(urlFacebook, callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/createBusinessFromFacebook/' + urlFacebook,
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.getBusiness = function(id, callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/business/' + id,
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.getFollowedBusinesses = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/business/followed',
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.edit = function(dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + dto.id,
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
    }).success(function(data, status) {
      accountService.getMyself().business = data;
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.editSocialNetwork = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/social_network',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.editBusinessCategory = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/category',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {
        list: dto
      }
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.publishBusiness = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/ask_publication',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {}
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.cancelPublishRequest = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/cancel_publication_request',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {}
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.stopPublication = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/stop_publish',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {}
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.editIllustration = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/illustration',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.editLandscape = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/landscape',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.editAddress = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'PUT',
      'url': '/rest/business/' + businessId + '/address',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.createSchedule = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/' + businessId + '/schedule',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.editGallery = function(businessId, dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/' + businessId + '/edit/gallery',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': dto
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.getInterests = function(callbackSuccess, callbackError) {
    return $http({
      'method': 'GET',
      'url': '/rest/business/interests',
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.claimBusiness = function(businessId, phone, vta, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/business/claim',
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': {
        phone: phone,
        vta: vta,
        businessId: businessId
      }
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  return;
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
            templateUrl: "/assets/js/modal/BasicModal/view.html",
            controller: "BasicModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };

    this.alertModal = function (type, message) {
        var resolve = {
            message: function () {
                return message;
            }
        };
        var classes = "modal-alert-content";
        if (type == 'info') {
            classes += " modal-alert-content-info";
        }
        else if (type == 'success') {
            classes += " modal-alert-content-success";
        }
        else {
            classes += " modal-alert-content-error";
        }


        $modal.open({
            templateUrl: "/assets/js/modal/mobile/AlertModal/view.html",
            controller: "AlertMessageCtrl",
            size: "l",
            windowClass: classes,
            resolve: resolve
        });
    };


    this.openLoadingModal = function () {
        this.loadingModal = $modal.open({
            templateUrl: "/assets/js/modal/mobile/LoadingModal/view.html",
            controller: "LoadingModalCtrl",
            size: "l",
            windowClass: 'loading-modal'
        });
    };
    this.closeLoadingModal = function () {
        if (this.loadingModal != undefined && this.loadingModal != null) {
            this.loadingModal.close();
        }
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
            templateUrl: "/assets/js/modal/MessageModal/view.html",
            controller: "MessageModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };

    this.openCustomerRegistrationModal = function (fctToExecute, fctToExecuteParams) {
        var resolve = {
            fctToExecute: function () {
                return fctToExecute;
            },
            fctToExecuteParams: function () {
                return fctToExecuteParams;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/CustomerRegistrationModal/view.html",
            controller: "CustomerRegistrationModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };

    this.openBusinessRegistrationModal = function () {
        $modal.open({
            templateUrl: "/assets/js/modal/BusinessRegistrationModal/view.html",
            controller: "BusinessRegistrationModalCtrl",
            size: "lg"
        });
    };

    this.openEditProfileModal = function () {
        $modal.open({
            templateUrl: "/assets/js/modal/EditProfileModal/view.html",
            controller: "EditProfileModalCtrl",
            size: "l"
        });
    };

    this.openLoginModal = function (fctToExecute, fctToExecuteParams, helpMessage) {
        var resolve = {
            fctToExecute: function () {
                return fctToExecute;
            },
            fctToExecuteParams: function () {
                return fctToExecuteParams;
            },
            helpMessage: function () {
                return helpMessage;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/LoginModal/view.html",
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
            templateUrl: "/assets/js/modal/HelpModal/view.html",
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
            templateUrl: "/assets/js/modal/Calculator/view.html",
            controller: "CalculatorModalCtrl",
            size: "sm",
            resolve: resolve
        });
    };

    this.openEditPasswordModal = function () {
        $modal.open({
            templateUrl: "/assets/js/modal/ChangePassword/view.html",
            controller: "ChangePasswordModalCtrl",
            size: "l"
        });
    };

    this.openEditCustomerInterest = function () {
        $modal.open({
            templateUrl: "/assets/js/modal/EditCustomerInterestModal/view.html",
            controller: "EditCustomerInterestModalCtrl",
            size: "lg"
        });
    };

    this.addressModal = function (addName, address, isBusiness, callback) {
        var resolve = {
            dto: function () {
                return address;
            }
            , addName: function () {
                return addName;
            },
            isBusiness: function () {
                return isBusiness;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/AddressModal/view.html",
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
            templateUrl: "/assets/js/modal/ForgotPasswordModal/view.html",
            controller: "ForgotPasswordModalCtrl",
            size: "l",
            resolve: resolve
        });
    };


    this.openPromotionModal = function (promotion, business, callback) {
        var resolve = {
            dto: function () {
                return promotion;
            },
            business: function () {
                return business;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/PromotionModal/view.html",
            controller: "PromotionModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };


    this.openBusinessNotificationModal = function (businessNotification, business, callback) {
        var resolve = {
            dto: function () {
                return businessNotification;
            },
            business: function () {
                return business;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/BusinessNotificationModal/view.html",
            controller: "BusinessNotificationModalCtrl",
            size: "lg",
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
            templateUrl: "/assets/js/modal/OneFieldModal/view.html",
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
            templateUrl: "/assets/js/modal/GalleryModal/view.html",
            controller: "GalleryModalCtrl",
            windowClass: 'modal-gallery-content',
            size: "lg",
            resolve: resolve
        });
    };

    this.interestSelection = function (listInterest, callback) {
        var resolve = {
            listInterest:function(){
              return listInterest;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/mobile/InterestSelectionModal/view.html",
            controller: "InterestSelectionModalCtrl",
            size: "l",
            resolve: resolve
        });
    };

    this.openSla = function (title, url) {
        var resolve = {
            title: function () {
                return title;
            },
            url: function () {
                return url;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/IframeModal/view.html",
            controller: "iframeModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };



    this.successAndShare = function (businessId, publicationId) {
        var resolve = {
            businessId: function () {
                return businessId;
            },
            publicationId: function () {
                return publicationId;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/ConfirmAndShareModal/view.html",
            controller: "ConfirmAndShareModalCtrl",
            size: "l",
            resolve: resolve,
            backdrop:true
        });
    };






    this.resizeImageMobileModal = function (params,save) {
        var resolve = {
            params: function () {
                return params;
            },
            save:function(){
                return save;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/ResizeImageMobileModal/view.html",
            controller: "ResizeImageMobileModalCtrl",
            size: "l",
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
myApp.service("geolocationService", ['$rootScope', 'geolocation', '$http', 'accountService', '$timeout', '$window', function ($rootScope, geolocation, $http, accountService, $timeout, $window) {


        this.position = null;
        this.currentPosition = null;
        this.geoPositionAlreadyComputed = false;
        var self = this;
        this.sharePosition = false;

        this.getPositionWithoutNull = function () {
            if (this.position == null) {
                return {};
            }
            return this.position;
        };

        if ($window.navigator && $window.navigator.geolocation && this.geoPositionAlreadyComputed == false) {

            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    self.currentPosition = {
                        x: position.coords.latitude,
                        y: position.coords.longitude
                    };
                    computePosition();
                    self.sharePosition = true;
                    this.geoPositionAlreadyComputed = true;
                    $timeout(function () {
                        $rootScope.$broadcast('POSITION_CHANGED');
                    }, 1);
                }, function () {
                }, {
                    maximumAge: 5 * 60 * 1000,
                    timeout: 2 * 1000
                });
        }

        var computePosition = function () {

            if (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null) {
                //if (self.currentPosition == null) {
                //
                //    $rootScope.$watch(function () {
                //        return self.currentPosition;
                //    }, function watchCallback(n, o) {
                //        if (n != null) {
                //            self.position = {
                //                x: self.currentPosition.x,
                //                y: self.currentPosition.y
                //            };
                //
                //        }
                //    });
                //
                //}
                //else {
                    self.position = angular.copy(self.currentPosition);
                //}
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
                if (this.currentPosition != null) {
                    return "currentPosition";
                }
                else {
                    return "default";
                }
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

        $http({
            'method': "POST",
            'url': "/rest/address/distance/" + addressId,
            'headers': "Content-Type:application/json;charset=utf-8",
            data: geolocationService.getPositionWithoutNull()
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

    this.changeAddress = function (addressText, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/address/current",
            'headers': "Content-Type:application/json;charset=utf-8",
            data: {
                addressName: addressText
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

}]);
myApp.service("followService", ['$flash', '$http', function ($flash, $http) {

    var self = this;

    this.model = {
        myself: null
    };

    this.setNotification = function (businessId,sendNotification, callbackSuccess, callbackError) {
        var dto = {
            sendNotification:sendNotification,
            businessId:businessId
        };
        
        $http({
            'method': "POST",
            'url': "/rest/follow/notification",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data':dto
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

    this.canceler = null;

    this.default = function (page,callbackSuccess, callbackError) {

        console.log("search default : "+page);

        if (this.canceler != null) {$
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/default/"+page,
            'headers': "Content-Type:application/json; charset=utf-8",
            'dataType':"json",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.searchByStringLittle = function (searchText, callbackSuccess, callbackError) {

        console.log("search by string little : "+searchText);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/text/little",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {
                search: searchText,
                position: geolocationService.getPositionWithoutNull()
            },
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.searchByString = function (page,searchText, callbackSuccess, callbackError) {

        console.log("search by string : "+searchText+"/"+page);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/text",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {
                page:page,
                search: searchText,
                position: geolocationService.getPositionWithoutNull()
            },
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byFollowed = function (page,callbackSuccess, callbackError) {

        console.log("search by follow : "+page);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/followed/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byFollowedAndInterest = function (page,interestId,callbackSuccess, callbackError) {

        console.log("search by follow and interest : "+page+"/"+interestId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/followed/interest/"+interestId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.byBusiness = function (page,businessId, callbackSuccess, callbackError) {

        console.log("search by business : "+page+"/"+businessId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "GET",
            'url': "/rest/search/publication/business/" + businessId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            timeout: this.canceler.promise
        }).success(function (data, status) {
            console.log('success');
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                console.log('error');
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.byBusinessArchived = function (page,businessId, callbackSuccess, callbackError) {

        console.log("search by business archived : "+page+"/"+businessId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "GET",
            'url': "/rest/search/publication/business/archive/" + businessId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.byBusinessPrevisualization = function (page,businessId, callbackSuccess, callbackError) {

        console.log("search by business previsualization : "+page+"/"+businessId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "GET",
            'url': "/rest/search/publication/business/previsualization/" + businessId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byInterest = function (page,interestId, callbackSuccess, callbackError) {

        console.log("search by interst : "+page+"/"+interestId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }

        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/interest/" + interestId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.nearBusiness = function (callbackSuccess, callbackError) {

        console.log("search near business");

        if (this.canceler != null) {
            this.canceler.resolve();
        }

        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/business/near",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };


    this.nearBusinessByInterest = function (interestId,callbackSuccess, callbackError) {

        console.log("search near business by interest");


        if (this.canceler != null) {
            this.canceler.resolve();
        }

        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/business/near/interest/"+interestId,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.lastOnes = function (nb,callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/search/publication/lastOnes/"+nb,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull()
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
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
        if (!suspendBinding && newValue != oldValue) {
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

        if (!suspendBinding && newValue!=null && newValue != "") {
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
myApp.service('publicationService', ['$http', '$flash', 'geolocationService', function($http, $flash, geolocationService) {
  this["delete"] = function(dto, callbackSuccess, callbackError) {
    return $http({
      'method': 'DELETE',
      'url': '/rest/publication/' + dto.id,
      'headers': 'Content-Type:application/json;charset=utf-8'
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  this.loadByIds = function(listId, callbackSuccess, callbackError) {
    return $http({
      'method': 'POST',
      'url': '/rest/publication/ids/' + listId,
      'headers': 'Content-Type:application/json;charset=utf-8',
      'data': geolocationService.getPositionWithoutNull()
    }).success(function(data, status) {
      console.log('SUCCESS');
      console.log(data);
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      console.log('ERROR');
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  return;
}]);
myApp.service("constantService", function () {

    this.compareNumber = function (a, b) {
        return parseFloat(a) === parseFloat(b);
    }

});
myApp.service("contactService", ['$flash', '$http', function ($flash, $http) {

    this.contact= function (contactFrom, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/contact",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': contactFrom
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
myApp.service("fileService", ['$flash', '$http', function ($flash, $http) {

    this.uploadFile64 = function (name, img, callbackSuccess, callbackError) {

        var dto = {image: img, name: name};

        $http({
            'method': "POST",
            'url': "/rest/file64",
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
myApp.service("imageService", function () {

    this.resizeImage = function (img, width, height) {
        return this.cropImage(img, width, height);
    };


    this.cropImage = function (img, width, height) {

        //convert img to htmlImage
        var imgHtml = document.createElement("img");
        imgHtml.setAttribute('src', img);
        var src = imgHtml;

        // check scale
        var crop = width == 0 || height == 0;
        var xscale = width / src.width;
        var yscale = height / src.height;
        var scale = crop ? Math.min(xscale, yscale) : Math.max(xscale, yscale);

        // create empty canvas
        var canvas = document.createElement("canvas");
        canvas.width = width ? width : Math.round(src.width * scale);
        canvas.height = height ? height : Math.round(src.height * scale);
        canvas.getContext("2d").scale(scale, scale);

        // crop it top center
        var right, top;
        right = ((src.width * scale) - canvas.width) * 0.5;
        top = ((src.height * scale) - canvas.height) * 0.5;
        canvas.getContext("2d").drawImage(src, - (right / scale), -(top / scale));
        var image64 = canvas.toDataURL();

        return image64;
    }


});
myApp.service('mapService', ['$http', '$flash', function($http, $flash) {
  this.loadMapDataBusiness = function(callbackSuccess, callbackError) {
    return $http({
      'method': "GET",
      'url': "/rest/map/business",
      'headers': "Content-Type:application/json;charset=utf-8"
    }).success(function(data, status) {
      if (callbackSuccess != null) {
        return callbackSuccess(data.list);
      }
    }).error(function(data, status) {
      $flash.error(data.message);
      if (callbackError != null) {
        return callbackError(data, status);
      }
    });
  };
  return;
}]);
angular.module('app').run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("js/directive/admin/donutChart/template.html",
    "<div><div id={{id}}></div></div>");
  $templateCache.put("js/directive/component/businessList/_template.html",
    "<div class=publication-list><div ng-show=\"getInfo().loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-show=\"getInfo().loading!=true && businesses.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"business in businesses\" class=publication-box ng-class=\"{'publication-followed':business.following === true}\" ng-click=click()><table class=publication-header><tr><td rowspan=2><div class=publication-business-illustration><img ng-click=\"navigateTo('/business/'+business.id)\" ng-src=\"{{business.illustration | image}}\"></div></td><td class=publication-header-business><div ng-click=\"navigateTo('/business/'+business.id)\" class=\"publication-bordered-bottom-hover publication-bordered-bottom\"><span class=publication-main-title><i ng-show=\"business.following === true\" class=\"gling-icon gling-icon gling-icon-bell\"></i> {{business.name}}</span></div></td></tr><tr><td class=publication-header-title><div class=\"publication-bubble publication-bordered\"><i class=\"gling-icon gling-icon-earth\"></i> {{business.distance / 1000 | number:2}} km</div><div class=\"publication-bubble publication-bordered\"><span>{{business.address.street}}<br>{{business.address.zip}}, {{business.address.city}}</span></div></td></tr></table><div class=publication-body><div class=publication-data ng-hide=\"business.description == null\"><div class=publication-data-body><category-line-ctrl ng-info={categories:business.categories}></category-line-ctrl><span ng-bind-html=\"business.description | text : descriptionLimit\"></span> <span ng-show=\"business.description.length > descriptionLimitBase && descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\" class=link>{{'--.textReuction.seeMore' | translateText}}</span> <span ng-show=\"business.description.length > descriptionLimitBase && descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\" class=link>{{'--.textReuction.seeLess' | translateText}}</span></div></div></div><follow-widget-ctrl ng-info={displayText:true,business:business}></follow-widget-ctrl></div></div>");
  $templateCache.put("js/directive/component/businessList/template.html",
    "<div class=publication-list><div class=loading ng-show=\"getInfo().loading===true\"><img src=/assets/images/big_loading.gif></div><div ng-show=\"getInfo().loading!=true &amp;&amp; businesses.length == 0\">{{'--.list.nothing' | translateText}}</div><div class=publication-box ng-class=\"{'publication-followed':business.following === true}\" ng-click=click() ng-repeat=\"business in businesses\"><table class=publication-header><tr><td rowspan=2><div class=publication-business-illustration><img ng-click=\"navigateTo('/business/'+business.id)\" ng-src=\"{{business.illustration | image}}\"></div></td><td class=publication-header-business><div class=\"publication-bordered-bottom-hover publication-bordered-bottom\" ng-click=\"navigateTo('/business/'+business.id)\"><span class=publication-main-title><i class=\"gling-icon gling-icon gling-icon-bell\" ng-show=\"business.following === true\"></i> {{business.name}}</span></div></td></tr><tr><td class=publication-header-title><div class=\"publication-bubble publication-bordered\"><i class=\"gling-icon gling-icon-earth\"></i><span>{{business.distance / 1000 | number:2}} km</span></div><div class=\"publication-bubble publication-bordered\"><span>{{business.address.street}}<br>{{business.address.zip}},{{business.address.city}}</span></div></td></tr></table><div class=publication-body><div class=publication-data ng-hide=\"business.description == null\"><div class=publication-data-body><category-line-ctrl ng-info={categories:business.categories}></category-line-ctrl><span ng-bind-html=\"business.description | text : descriptionLimit\"></span><span class=link ng-show=\"business.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\">{{'--.textReuction.seeMore' | translateText}}</span><span class=link ng-show=\"business.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\">{{'--.textReuction.seeLess' | translateText}}</span></div></div></div><follow-widget-ctrl ng-info={displayText:true,business:business}></follow-widget-ctrl></div></div>");
  $templateCache.put("js/directive/component/businessListMobile/_template.html",
    "<div class=publication-list-mobile><div ng-show=\"loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-show=\"loading!=true && publications.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-hide=\"loading===true\" ng-repeat=\"business in businesses\" class=publication-box-mobile ng-click=click()><table class=publication-header ng-click=\"navigateTo('/business/'+business.id)\"><tr><td><img class=illustration ng-src=\"{{business.illustration | image}}\"></td><td><div class=title-box><div class=title><i ng-show=\"business.following === true\" class=\"gling-icon gling-icon gling-icon-bell\"></i> {{business.name}}</div><div class=title-data>{{business.address.street}}<br>{{business.address.zip}}, {{business.address.city}} - {{business.distance / 1000 | number:2}} km</div></div></td></tr></table><div class=business-list-business-data><category-line-ctrl ng-info={categories:business.categories}></category-line-ctrl><span ng-bind-html=\"business.description | text : descriptionLimit\"></span> <span ng-show=\"business.description.length > descriptionLimitBase && descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\" class=link>{{'--.textReuction.seeMore' | translateText}}</span> <span ng-show=\"business.description.length > descriptionLimitBase && descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\" class=link>{{'--.textReuction.seeLess' | translateText}}</span></div><follow-widget-ctrl ng-info={displayText:true,business:business}></follow-widget-ctrl></div></div>");
  $templateCache.put("js/directive/component/businessListMobile/template.html",
    "<div class=publication-list-mobile><div class=loading ng-show=\"loading===true\"><img src=/assets/images/big_loading.gif></div><div ng-show=\"loading!=true &amp;&amp; publications.length == 0\">{{'--.list.nothing' | translateText}}</div><div class=publication-box-mobile ng-click=click() ng-repeat=\"business in businesses\" ng-hide=\"loading===true\"><div><table class=publication-header ng-click=\"navigateTo('/business/'+business.id)\"><tr><td><img class=illustration ng-src=\"{{business.illustration | image}}\"></td><td><div class=title-box><div class=title><i class=\"gling-icon gling-icon-bell\" ng-show=\"business.following === true\"></i>{{business.name}}</div><div class=title-data>{{business.address.street}}<br>{{business.address.zip}},{{business.address.city}} -{{business.distance / 1000 | number:2}} km</div></div></td></tr></table><div class=business-list-business-data><category-line-ctrl ng-info={categories:business.categories}></category-line-ctrl><span ng-bind-html=\"business.description | text : descriptionLimit\"></span><span class=link ng-show=\"business.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\">{{'--.textReuction.seeMore' | translateText}}</span><span class=link ng-show=\"business.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\">{{'--.textReuction.seeLess' | translateText}}</span></div><follow-widget-ctrl ng-info={displayText:true,business:business}></follow-widget-ctrl></div></div></div>");
  $templateCache.put("js/directive/component/categoryLine/_template.html",
    "<div><table class=category-line-tree><tr ng-repeat=\"(catLev1Key,lev2) in getInfo().categories\"><td style=\"white-space: nowrap\"><a ng-click=searchCat(catLev1Key)>{{catLev1Key | translateText}}</a> <span class=transition>>></span></td><td><table><tr ng-repeat=\"(catLev2Key, lev3) in lev2\"><td style=\"white-space: nowrap\"><a ng-click=searchCat(catLev2Key)>{{catLev2Key | translateText}}</a> <span class=transition>>></span></td><td><span ng-repeat=\"catLev3 in lev3\"><span class=transition ng-show=\"$index>0\">/</span> <a ng-click=searchCat(catLev3.translationName)>{{catLev3.translationName | translateText}}</a></span></td></tr></table></td></tr></table></div>");
  $templateCache.put("js/directive/component/categoryLine/template.html",
    "<div><table class=category-line-tree><tr ng-repeat=\"(catLev1Key,lev2) in getInfo().categories\"><td ng-show=\"getInfo().level1!==false\" style=\"white-space: nowrap\"><a ng-click=searchCat(catLev1Key)>{{catLev1Key | translateText}}</a><span class=transition>>></span></td><td><table><tr ng-repeat=\"(catLev2Key, lev3) in lev2\"><td style=\"white-space: nowrap\"><a ng-click=searchCat(catLev2Key)>{{catLev2Key | translateText}}</a><span class=transition>>></span></td><td><span ng-repeat=\"catLev3 in lev3\"><span class=transition ng-show=$index&gt;0>/</span><a ng-click=searchCat(catLev3.translationName)>{{catLev3.translationName | translateText}}</a></span></td></tr></table></td></tr></table></div>");
  $templateCache.put("js/directive/component/facebookSharePublication/_template.html",
    "<div><a class=\"facebookShare ng-isolate-scope\" ng-click=share()><div class=facebookButton><div class=pluginButton><div class=pluginButtonContainer><div class=pluginButtonImage><button type=button><i class=\"pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue\"></i></button></div><span class=pluginButtonLabel>Share</span></div></div></div></a></div>");
  $templateCache.put("js/directive/component/facebookSharePublication/template.html",
    "<div><a class=\"facebookShare ng-isolate-scope\" ng-click=share()><div class=facebookButton><div class=pluginButton><div class=pluginButtonContainer><div class=pluginButtonImage><button type=button><i class=\"pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue\"></i></button></div><span class=pluginButtonLabel>Share</span></div></div></div></a></div>");
  $templateCache.put("js/directive/component/followWidget/_template.html",
    "<div class=follow-widget><div class=follow-text ng-hide=\"getInfo().displayText===true\"><div>{{'--.followWidget.follow' | translateText:null:true}}</div></div><div ng-hide=\"getInfo().displayText===true\" class=follow-widget-icon ng-click=follow()><button><span class=\"gling-icon gling-icon gling-icon-bell selected\" ng-show=getInfo().business.following></span> <span class=\"gling-icon gling-icon gling-icon-bell2\" ng-hide=getInfo().business.following></span></button></div><div class=follow-text ng-show=\"getInfo().displayText===true\"><div class=link ng-hide=getInfo().business.following ng-click=follow()>{{'--.followWidget.followBusiness' | translateText}}</div><div class=link ng-show=getInfo().business.following ng-click=follow()>{{'--.followWidget.stopFollowBusiness' | translateText}}</div></div></div>");
  $templateCache.put("js/directive/component/followWidget/template.html",
    "<div class=follow-widget><div class=follow-text ng-hide=\"getInfo().displayText===true\"><div>{{'--.followWidget.follow' | translateText:null:true}}</div></div><div class=follow-widget-icon ng-click=follow() ng-hide=\"getInfo().displayText===true\"><button><span class=\"gling-icon gling-icon gling-icon-bell selected\" ng-show=getInfo().business.following></span><span class=\"gling-icon gling-icon gling-icon-bell2\" ng-hide=getInfo().business.following></span></button></div><div class=follow-text ng-show=\"getInfo().displayText===true\"><div class=link ng-click=follow() ng-hide=getInfo().business.following>{{'--.followWidget.followBusiness' | translateText}}</div><div class=link ng-show=getInfo().business.following ng-click=follow()>{{'--.followWidget.stopFollowBusiness' | translateText}}</div></div></div>");
  $templateCache.put("js/directive/component/followWidgetForPublication/_template.html",
    "<div class=follow-widget><div class=follow-text ng-hide=\"getInfo().displayText===true\"><div>{{'--.followWidget.follow' | translateText:null:true}}</div></div><div ng-hide=\"getInfo().displayText===true\" class=follow-widget-icon ng-click=follow()><button><span class=\"gling-icon gling-icon gling-icon-bell selected\" ng-show=getInfo().publication.following></span> <span class=\"gling-icon gling-icon gling-icon-bell2\" ng-hide=getInfo().publication.following></span></button></div><div class=follow-text ng-show=\"getInfo().displayText===true\"><div class=link ng-hide=getInfo().publication.following ng-click=follow()>{{'--.followWidget.followBusiness' | translateText}}</div><div class=link ng-show=getInfo().publication.following ng-click=follow()>{{'--.followWidget.stopFollowBusiness' | translateText}}</div></div></div>");
  $templateCache.put("js/directive/component/followWidgetForPublication/template.html",
    "<div class=follow-widget><div class=follow-text ng-hide=\"getInfo().displayText===true\"><div>{{'--.followWidget.follow' | translateText:null:true}}</div></div><div class=follow-widget-icon ng-click=follow() ng-hide=\"getInfo().displayText===true\"><button><span class=\"gling-icon gling-icon-bell selected\" ng-show=getInfo().publication.following></span><span class=\"gling-icon gling-icon-bell2\">\"(ng-hide=\"getInfo().publication.following\")</span></button></div><div class=follow-text ng-show=\"getInfo().displayText===true\"><div class=link ng-click=follow() ng-hide=getInfo().publication.following>{{'--.followWidget.followBusiness' | translateText}}</div><div class=link ng-show=getInfo().publication.following ng-click=follow()>{{'--.followWidget.stopFollowBusiness' | translateText}}</div></div></div>");
  $templateCache.put("js/directive/component/gallery/_template.html",
    "<div class=gallery-component><div ng-repeat=\"image in getInfo().images\"><img ng-click=openGallery(image) class=gallery-picture ng-src=\"{{image | image}}\"></div></div>");
  $templateCache.put("js/directive/component/gallery/template.html",
    "<div class=gallery-component><div ng-repeat=\"image in getInfo().images\"><img class=gallery-picture ng-click=openGallery(image) ng-src=\"{{image | image}}\"></div></div>");
  $templateCache.put("js/directive/component/googleMapWidget/_template.html",
    "<div ng-click=toGoogleMap() class=google-map-container><div class=google-disabled-panel ng-show=getInfo().staticMap></div><div id=map class=map></div></div>");
  $templateCache.put("js/directive/component/googleMapWidget/template.html",
    "<div class=google-map-container ng-click=toGoogleMap()><div class=google-disabled-panel ng-show=getInfo().staticMap></div><div class=map id=map></div></div>");
  $templateCache.put("js/directive/component/map/businessForMap/_template.html",
    "<div class=business-for-map><img class=business-illustration ng-src=\"{{getInfo().business.illustration | image}}\"> <i ng-show=\"getInfo().business.following === true\" class=\"gling-icon gling-icon gling-icon-bell\"></i> <span class=title>{{getInfo().business.name}}</span><category-line-ctrl ng-info={categories:getInfo().business.categories}></category-line-ctrl>{{getInfo().business.address.street}}, {{getInfo().business.address.zip}} {{getInfo().business.address.city}}<br><follow-widget-ctrl ng-info={displayText:true,business:getInfo().business}></follow-widget-ctrl><br><span class=\"link see-more\" ng-click=\"goTo('/business/'+getInfo().business.id)\">Voir plus...</span></div>");
  $templateCache.put("js/directive/component/map/businessForMap/template.html",
    "<div class=business-for-map><img class=business-illustration ng-src=\"{{getInfo().business.illustration | image}}\"><i class=\"gling-icon gling-icon-bell\" ng-show=\"getInfo().business.following === true\"></i><span class=title>{{getInfo().business.name}}</span><category-line-ctrl ng-info={categories:getInfo().business.categories}>{{getInfo().business.address.street}},{{getInfo().business.address.zip}}{{getInfo().business.address.city}}<br></category-line-ctrl><follow-widget-ctrl ng-info={displayText:true,business:getInfo().business}><br></follow-widget-ctrl><span class=\"link see-more\" ng-click=\"goTo('/business/'+getInfo().business.id)\">Voir plus...</span></div>");
  $templateCache.put("js/directive/component/map/publicationForMap/_template.html",
    "<div></div>");
  $templateCache.put("js/directive/component/map/publicationForMap/template.html",
    "<div></div>");
  $templateCache.put("js/directive/component/publicationList/_template.html",
    "<div class=publication-list><div ng-show=\"getInfo().loading!=true && publications.length == 0\">{{'--.list.nothing' | translateText}}</div><publication-widget-ctrl ng-repeat=\"publication in publications\" ng-info={publication:publication,changeInterestCallback:changeInterestCallback}></publication-widget-ctrl><div ng-show=\"getInfo().loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div></div>");
  $templateCache.put("js/directive/component/publicationList/template.html",
    "<div class=publication-list><div ng-show=\"getInfo().loading!=true &amp;&amp; publications.length == 0\">{{'--.list.nothing' | translateText}}</div><publication-widget-ctrl ng-repeat=\"publication in publications\" ng-info={publication:publication,changeInterestCallback:changeInterestCallback}></publication-widget-ctrl><div class=loading ng-show=\"getInfo().loading===true\"><img src=/assets/images/big_loading.gif></div></div>");
  $templateCache.put("js/directive/component/publicationListForBusiness/_template.html",
    "<div class=publication-list><div ng-show=\"loading!=true && publications.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"publication in publications\" id=publication{{publication.id}} class=publication-box ng-click=click()><div ng-class=\"{'publication-followed':publication.following === true,'archived': isArchived(publication)}\"><div><div class=publication-badge ng-show=\"publication.type === 'PROMOTION'\">- {{publication.offPercent * 100 | number:0}}%</div><div class=publication-header-without-business-version><i ng-show=\"getInterestClass(publication)!=null\" class=\"publication-interest gling-icon {{getInterestClass(publication)}} publication-color-background\"></i><div class=\"publication-bubble publication-box-price publication-bordered\" ng-show=\"publication.type=='PROMOTION' && publication.originalPrice!=null\"><span>{{(publication.originalPrice * (1.0 - publication.offPercent)) | number:2}} €</span> <span>{{publication.originalPrice | number:2}} €</span></div><span style=\"margin-right: 80px\" class=publication-main-title>{{publication.title}}</span></div><div class=publication-body><div class=publication-data ng-class=\"{'publication-body-two':publication.pictures.length>0}\" ng-hide=\"descriptionIsEmpty(publication) === true\"><div ng-show=\"publication.type === 'PROMOTION'\" ng-class=\"{'publication-bordered-bottom' : publication.description !=null && publication.description.length > 0}\" class=publication-data-header><div class=\"glyphicon gling-icon gling-icon gling-icon-calendar\"></div><span><div>{{'--.publication.promotionTo' | translateText}}</div><div>&lt; {{publication.endDate | date:'dd MMM yyyy HH:mm'}}</div></span></div><div class=publication-data-body ng-show=\"publication.description !=null && publication.description.length > 0\"><span ng-bind-html=\"publication.description | text : publication.descriptionLimit\"></span> <span ng-show=\"publication.description.length > descriptionLimitBase && publication.descriptionLimit==descriptionLimitBase\" ng-click=\"publication.descriptionLimit = 10000\" class=link>{{'--.textReuction.seeMore' | translateText}}</span> <span ng-show=\"publication.description.length > descriptionLimitBase && publication.descriptionLimit!=descriptionLimitBase\" ng-click=\"publication.descriptionLimit = descriptionLimitBase\" class=link>{{'--.textReuction.seeLess' | translateText}}</span></div></div><div class=\"publication-gallery publication-body-two publication-body-two-right\" ng-show=\"publication.pictures.length > 1 && descriptionIsEmpty(publication) === true\" ng-click=openGallery(publication.pictures[1],publication)><img ng-src=\"{{publication.pictures[1] | image}}\" class={{getIllustrationClass(publication.pictures[1])}}><div class=publication-illustration-plus-icon><span>+{{publication.pictures.length - 2}}</span></div></div><div class=publication-gallery ng-class=\"{'publication-body-two':descriptionIsEmpty(publication) !== true,'publication-body-two-right':descriptionIsEmpty(publication) !== true}\" ng-show=\"publication.pictures.length > 0 \" ng-click=openGallery(publication.pictures[0],publication)><img ng-src=\"{{publication.pictures[0] | image}}\" class={{getIllustrationClass(publication.pictures[0])}}><div ng-show=\"publication.pictures.length > 1 && descriptionIsEmpty(publication) !== true\" class=publication-illustration-plus-icon><span>+{{publication.pictures.length - 1}}</span></div></div></div><div class=publication-footer><button ng-show=getInfo().displayRemoveIcon type=button style=\"margin-left: 25px\" class=\"btn gling-button-dark\" ng-click=removePublication(publication)>{{'--.generic.remove' | translateText}}</button> <button ng-show=getInfo().displayRemoveIcon type=button style=\"margin-left: 25px\" class=\"btn gling-button-dark\" ng-click=editPublication(publication)>{{'--.generic.edit' | translateText}}</button><div class=\"publication-footer-date publication-bordered-bottom\">{{'--.publication.publishTo' | translateText}} {{publication.startDate | date:'dd MMM yyyy'}}</div><div class=publication-footer-facebook><facebook-share-publication-ctrl ng-info={businessId:publication.businessId,publicationId:publication.id}></facebook-share-publication-ctrl></div></div></div></div><img class=archived-icon ng-show=isArchived(publication) src=\"/assets/images/publication/archived.png\"></div><div ng-show=\"loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div></div>");
  $templateCache.put("js/directive/component/publicationListForBusiness/template.html",
    "<div class=publication-list><div ng-show=\"loading!=true &amp;&amp; publications.length == 0\">{{'--.list.nothing' | translateText}}</div><div class=\"publication-box publication-box-without-business-data\" ng-click=click() ng-repeat=\"publication in publications\" id=publication{{publication.id}}><div ng-class=\"{'publication-followed':publication.following === true,'archived': isArchived(publication)}\"><div><div class=publication-badge ng-show=\"publication.type === 'PROMOTION' \">- {{publication.offPercent * 100 | number:0}}%</div><div class=publication-header-without-business-version><i class=\"publication-interest gling-icon publication-color-background\" ng-show=\"getInterestClass(publication)!=null\" ng-class=getInterestClass(publication)></i><div class=\"publication-bubble publication-box-price publication-bordered\" ng-show=\"publication.type=='PROMOTION' &amp;&amp; publication.originalPrice!=null\"><span>{{(publication.originalPrice * (1.0 - publication.offPercent)) | number:2}} €</span><span>{{publication.originalPrice | number:2}} €</span></div><span class=publication-main-title>{{publication.title}}</span></div><div class=publication-body><div class=publication-data ng-class=\"{'publication-body-two':publication.pictures.length&gt;0}\" ng-hide=\"descriptionIsEmpty(publication) === true\"><div class=publication-data-header ng-show=\"publication.type === 'PROMOTION'\" ng-class=\"{'publication-bordered-bottom' : publication.description !=null &amp;&amp; publication.description.length &gt; 0}\"><div class=\"glyphicon gling-icon gling-icon-calendar\"></div><span><div>{{'--.publication.promotionTo' | translateText}}</div><div>&lt; {{publication.endDate | date:'dd MMM yyyy HH:mm'}}</div></span></div><div class=publication-data-body ng-show=\"publication.description !=null &amp;&amp; publication.description.length &gt; 0\"><span ng-bind-html=\"publication.description | text : publication.descriptionLimit\"></span><span class=link ng-show=\"publication.description.length &gt; descriptionLimitBase &amp;&amp; publication.descriptionLimit==descriptionLimitBase\" ng-click=\"publication.descriptionLimit = 10000\">{{'--.textReuction.seeMore' | translateText}}</span><span class=link ng-show=\"publication.description.length &gt; descriptionLimitBase &amp;&amp; publication.descriptionLimit!=descriptionLimitBase\" ng-click=\"publication.descriptionLimit = descriptionLimitBase\">{{'--.textReuction.seeLess' | translateText}}</span></div></div><div class=\"publication-gallery publication-body-two publication-body-two-right\" ng-show=\"publication.pictures.length &gt; 1 &amp;&amp; descriptionIsEmpty(publication) === true\" ng-click=openGallery(publication.pictures[1],publication)><img ng-src=\"{{publication.pictures[1] | image}}\" class={{getIllustrationClass(publication.pictures[1])}}><div class=publication-illustration-plus-icon ng-show=publication.pictures.length&gt;2><span>+{{publication.pictures.length - 2}}</span></div></div><div class=publication-gallery ng-show=\"publication.pictures.length &gt; 0 \" ng-class=\"{'publication-body-two':descriptionIsEmpty(publication) !== true,'publication-body-two-right':descriptionIsEmpty(publication) !== true}\" ng-click=openGallery(publication.pictures[0],publication)><img ng-src=\"{{publication.pictures[0] | image}}\" class={{getIllustrationClass(publication.pictures[0])}}><div class=publication-illustration-plus-icon ng-show=\"publication.pictures.length &gt; 1 &amp;&amp; descriptionIsEmpty(publication) !== true\"><span>+{{publication.pictures.length - 1}}</span></div></div></div><div class=publication-footer><button class=\"btn gling-button-dark\" ng-show=getInfo().displayRemoveIcon ng-click=removePublication(publication) style=\"margin-left: 25px\" type=button>{{'--.generic.remove' | translateText}}</button><button class=\"btn gling-button-dark\" ng-show=getInfo().displayRemoveIcon ng-click=editPublication(publication) style=\"margin-left: 25px\" type=button>{{'--.generic.edit' | translateText}}</button><div class=\"publication-footer-date publication-bordered-bottom\">{{'--.publication.publishTo' | translateText}} {{publication.startDate | date:'dd MMM yyyy'}}</div><div class=publication-footer-facebook><facebook-share-publication-ctrl ng-info={businessId:publication.businessId,publicationId:publication.id}></facebook-share-publication-ctrl></div></div></div></div><img class=archived-icon ng-show=isArchived(publication) src=/assets/images/publication/archived.png></div><div class=loading ng-show=\"loading===true\"><img src=/assets/images/big_loading.gif></div></div>");
  $templateCache.put("js/directive/component/publicationListMobile/_template.html",
    "<div class=publication-list-mobile><div ng-show=\"getInfo().loading!=true && publications.length == 0\">{{'--.list.nothing' | translateText}}</div><publication-widget-ctrl ng-repeat=\"publication in publications\" ng-info={publication:publication,changeInterestCallback:changeInterestCallback}></publication-widget-ctrl><div ng-show=\"getInfo().loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div></div>");
  $templateCache.put("js/directive/component/publicationListMobile/template.html",
    "<div class=publication-list-mobile><div ng-show=\"getInfo().loading!=true &amp;&amp; publications.length == 0\">{{'--.list.nothing' | translateText}}</div><publication-widget-ctrl ng-repeat=\"publication in publications\" ng-info={publication:publication,changeInterestCallback:changeInterestCallback}></publication-widget-ctrl><div class=loading ng-show=\"getInfo().loading===true\"><img src=/assets/images/big_loading.gif></div></div>");
  $templateCache.put("js/directive/component/publicationListMobileForBusiness/_template.html",
    "<div class=publication-list-mobile><div ng-show=\"loading!=true && publications.length == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"publication in publications\" class=\"publication-box-mobile publication-publication\" ng-click=click()><div ng-class=\"{'archived': isArchived(publication)}\"><div><div class=publication-header><i ng-show=\"getInterestClass(publication)!=null\" class=\"publication-interest gling-icon {{getInterestClass(publication)}}\"></i><div class=title-box><div class=title-data>{{'--.publication.publishTo' | translateText}} {{publication.startDate | date:'dd MMM yyyy'}}</div></div></div><div class=publication-title>{{publication.title}}</div><div class=publication-body><div class=publication-data ng-class=\"{'publication-body-two':publication.pictures.length>0}\" ng-hide=\"descriptionIsEmpty(publication) === true\"><table ng-show=\"publication.type === 'PROMOTION'\" class=publication-data-promotion><tr><td>- {{publication.offPercent * 100 | number:0}}%</td><td class=publication-box-price ng-show=\"publication.originalPrice!=null\"><span>{{(publication.originalPrice * (1.0 - publication.offPercent)) | number:2}} €</span> <span>{{publication.originalPrice | number:2}} €</span></td><td>&gt; {{publication.endDate | date:'dd MMM HH:mm'}}</td></tr></table><div class=publication-data-body ng-show=\"publication.description !=null && publication.description.length > 0\"><span ng-bind-html=\"publication.description | text : publication.descriptionLimit\"></span> <span ng-show=\"publication.description.length > descriptionLimitBase && publication.descriptionLimit==descriptionLimitBase\" ng-click=\"publication.descriptionLimit = 10000\" class=link>{{'--.textReuction.seeMore' | translateText}}</span> <span ng-show=\"publication.description.length > descriptionLimitBase && publication.descriptionLimit!=descriptionLimitBase\" ng-click=\"publication.descriptionLimit = descriptionLimitBase\" class=link>{{'--.textReuction.seeLess' | translateText}}</span></div></div><div class=publication-gallery ng-class=\"{'publication-body-two':descriptionIsEmpty(publication) !== true,'publication-body-two-right':descriptionIsEmpty(publication) !== true}\" ng-show=\"publication.pictures.length > 0 \" ng-click=openGallery(publication.pictures[0],publication)><div class=publication-gallery-image-box><img ng-src=\"{{publication.pictures[0] | image}}\" class=publication-illustration><div ng-show=\"publication.pictures.length > 1\" class=publication-illustration-plus-icon><span>+{{publication.pictures.length - 1}}</span></div></div></div></div><div class=publication-footer><div class=publication-footer-facebook><facebook-share-publication-ctrl ng-info={businessId:publication.businessId,publicationId:publication.id}></facebook-share-publication-ctrl></div></div></div></div><img class=archived-icon ng-show=isArchived(publication) src=\"/assets/images/publication/archived_little.png\"></div><div ng-show=\"loading===true\" class=loading><img src=\"/assets/images/big_loading.gif\"></div></div>");
  $templateCache.put("js/directive/component/publicationListMobileForBusiness/template.html",
    "<div class=publication-list-mobile><div ng-show=\"loading!=true &amp;&amp; publications.length == 0\">{{'--.list.nothing' | translateText}}</div><div class=\"publication-box-mobile publication-publication\" ng-click=click() ng-repeat=\"publication in publications\"><div ng-class=\"{'archived': isArchived(publication)}\"><div><div class=publication-header><i class=\"publication-interest gling-icon\" ng-show=\"getInterestClass(publication)!=null\" ng-class=getInterestClass(publication)></i><div class=title-box><div class=title-data>{{'--.publication.publishTo' | translateText}}{{publication.startDate | date:'dd MMM yyyy'}}</div></div></div><div class=publication-title>{{publication.title}}</div><div class=publication-body><div class=publication-data ng-class=\"{'publication-body-two':publication.pictures.length&gt;0}\" ng-hide=\"descriptionIsEmpty(publication) === true\"><table class=publication-data-promotion ng-show=\"publication.type === 'PROMOTION'\"><tr><td>- {{publication.offPercent * 100 | number:0}}%</td><td class=publication-box-price ng-show=\"publication.originalPrice!=null\"><span>{{(publication.originalPrice * (1.0 - publication.offPercent)) | number:2}} €</span><span>{{publication.originalPrice | number:2}} €</span></td><td>&gt; {{publication.endDate | date:'dd MMM HH:mm'}}</td></tr></table><div class=publication-data-body ng-show=\"publication.description !=null &amp;&amp; publication.description.length &gt; 0\"><span ng-bind-html=\"publication.description | text : publication.descriptionLimit\"></span></div></div></div><span class=link ng-show=\"publication.description.length &gt; descriptionLimitBase &amp;&amp; publication.descriptionLimit==descriptionLimitBase\" ng-click=\"publication.descriptionLimit = 10000\">{{'--.textReuction.seeMore' | translateText}}</span><span class=link ng-show=\"publication.description.length &gt; descriptionLimitBase &amp;&amp; publication.descriptionLimit!=descriptionLimitBase\" ng-click=\"publication.descriptionLimit = descriptionLimitBase\">{{'--.textReuction.seeLess' | translateText}}<div class=publication-gallery ng-show=\"publication.pictures.length &gt; 0 \" ng-class=\"{'publication-body-two':descriptionIsEmpty(publication) !== true,'publication-body-two-right':descriptionIsEmpty(publication) !== true}\" ng-click=openGallery(publication.pictures[0],publication)><div class=publication-gallery-image-box><img class=publication-illustration ng-src=\"{{publication.pictures[0] | image}}\"><div class=publication-illustration-plus-icon ng-show=\"publication.pictures.length &gt; 1\"><span>+{{publication.pictures.length - 1}}</span></div></div></div></span><div class=publication-footer><div class=publication-footer-facebook><facebook-share-publication-ctrl ng-info={businessId:publication.businessId,publicationId:publication.id}></facebook-share-publication-ctrl></div></div></div></div><img class=archived-icon ng-show=isArchived(publication) src=/assets/images/publication/archived_little.png></div><div class=loading ng-show=\"loading===true\"><img src=/assets/images/big_loading.gif></div></div>");
  $templateCache.put("js/directive/component/publicationWidget/_template.html",
    "<div class=publication-box ng-class=\"{'publication-followed':getInfo().publication.following === true}\" ng-click=click()><div ng-show=\"getInfo().previsualization === true\" class=publication-box-previsualization></div><div class=publication-badge ng-show=\"getInfo().publication.type === 'PROMOTION'\">- {{getInfo().publication.offPercent * 100 | number:0}}%</div><table class=publication-header><tr><td rowspan=2><div class=publication-business-illustration><img ng-click=\"navigateTo('/business/'+getInfo().publication.businessId)\" ng-src=\"{{getInfo().publication.businessIllustration | image}}\"></div></td><td class=publication-header-business><div class=publication-bordered-bottom><span class=\"publication-main-title clickable\" ng-click=\"navigateTo('/business/'+getInfo().publication.businessId)\"><i ng-show=\"getInfo().publication.following === true\" class=\"gling-icon gling-icon gling-icon-bell\"></i> {{getInfo().publication.businessName}}</span></div></td></tr><tr><td class=publication-header-title><div class=publication-header-title-top><i ng-show=\"getInterestClass(getInfo().publication)!=null\" class=\"publication-interest gling-icon {{getInterestClass(getInfo().publication)}} publication-color-background\"></i> {{getInfo().publication.title}}</div><div class=\"publication-bubble publication-bordered\"><i class=\"glyphicon gling-icon gling-icon gling-icon-earth\"></i> {{getInfo().publication.distance / 1000 | number:2}} km</div><div class=\"publication-bubble publication-box-price publication-bordered\" ng-show=\"getInfo().publication.type=='PROMOTION' && getInfo().publication.originalPrice!=null\"><span>{{(getInfo().publication.originalPrice * (1.0 - getInfo().publication.offPercent)) | number:2}} €</span> <span>{{getInfo().publication.originalPrice | number:2}} €</span></div></td></tr></table><div class=publication-body><div class=publication-data ng-class=\"{'publication-body-two':getInfo().publication.pictures.length>0}\" ng-hide=\"descriptionIsEmpty(getInfo().publication) === true\"><div ng-show=\"getInfo().publication.type === 'PROMOTION'\" ng-class=\"{'publication-bordered-bottom' : getInfo().publication.description !=null && getInfo().publication.description.length > 0}\" class=publication-data-header><div class=\"glyphicon gling-icon gling-icon gling-icon-calendar\"></div><span><div>{{'--.publication.promotionTo' | translateText}}</div><div>&lt; {{getInfo().publication.endDate | date:'dd MMM HH:mm'}}</div></span></div><div class=publication-data-body ng-show=\"getInfo().publication.description !=null && getInfo().publication.description.length > 0\"><span ng-bind-html=\"getInfo().publication.description | text : descriptionLimit\"></span> <span ng-show=\"getInfo().publication.description.length > descriptionLimitBase && descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\" class=link>{{'--.textReuction.seeMore' | translateText}}</span> <span ng-show=\"getInfo().publication.description.length > descriptionLimitBase && descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\" class=link>{{'--.textReuction.seeLess' | translateText}}</span></div></div><div class=\"publication-gallery publication-body-two publication-body-two-right\" ng-show=\"getInfo().publication.pictures.length > 1 && descriptionIsEmpty(getInfo().publication) === true\" ng-click=openGallery(getInfo().publication.pictures[1],getInfo().publication)><img ng-src=\"{{getInfo().publication.pictures[1] | image}}\" class={{getIllustrationClass(getInfo().publication.pictures[1])}}><div class=publication-illustration-plus-icon><span>+{{getInfo().publication.pictures.length - 2}}</span></div></div><div class=publication-gallery ng-class=\"{'publication-body-two':descriptionIsEmpty(getInfo().publication) !== true,'publication-body-two-right':descriptionIsEmpty(getInfo().publication) !== true}\" ng-show=\"getInfo().publication.pictures.length > 0 \" ng-click=openGallery(getInfo().publication.pictures[0],getInfo().publication)><img ng-src=\"{{getInfo().publication.pictures[0] | image}}\" class={{getIllustrationClass(getInfo().publication.pictures[0])}}><div ng-show=\"getInfo().publication.pictures.length > 1 && descriptionIsEmpty(getInfo().publication) !== true\" class=publication-illustration-plus-icon><span>+{{getInfo().publication.pictures.length - 1}}</span></div></div></div><div class=publication-footer><div class=\"publication-footer-date publication-bordered-bottom\">{{'--.publication.publishTo' | translateText}} {{getInfo().publication.startDate | date:'dd MMM yyyy'}}</div><div class=publication-footer-facebook><facebook-share-publication-ctrl ng-info={businessId:getInfo().publication.businessId,publicationId:getInfo().publication.id}></facebook-share-publication-ctrl></div><div class=publication-following-widget><follow-widget-for-publication-ctrl ng-info={displayText:true,publication:getInfo().publication}></follow-widget-for-publication-ctrl></div></div></div>");
  $templateCache.put("js/directive/component/publicationWidget/template.html",
    "<div class=publication-box ng-class=\"{'publication-followed':getInfo().publication.following === true}\" ng-click=click()><div class=publication-box-previsualization ng-show=\"getInfo().previsualization === true\"></div><div class=publication-badge ng-show=\"getInfo().publication.type === 'PROMOTION'\">- {{getInfo().publication.offPercent * 100 | number:0}}%</div><table class=publication-header><tr><td rowspan=2><div class=publication-business-illustration><img ng-click=\"navigateTo('/business/'+getInfo().publication.businessId)\" ng-src=\"{{getInfo().publication.businessIllustration | image}}\"></div></td><td class=publication-header-business><div class=publication-bordered-bottom><span class=\"publication-main-title clickable\" ng-click=\"navigateTo('/business/'+getInfo().publication.businessId)\"><i class=\"gling-icon gling-icon-bell\" ng-show=\"getInfo().publication.following === true\"></i><span>{{getInfo().publication.businessName}}</span></span></div></td></tr><tr><td class=publication-header-title><div class=publication-header-title-top><i class=\"publication-color-background publication-interest gling-icon\" ng-show=\"getInterestClass(getInfo().publication)!=null\" ng-class=getInterestClass(getInfo().publication)></i><span>{{getInfo().publication.title}}</span></div><div class=\"publication-bubble publication-bordered\"><i class=\"glyphicon gling-icon gling-icon-earth\"></i><span>{{getInfo().publication.distance /1000 | number:2}} km</span></div><div class=\"publication-bubble publication-box-price publication-bordered\" ng-show=\"getInfo().publication.type=='PROMOTION' &amp;&amp; getInfo().publication.originalPrice!=null\"><span>{{(getInfo().publication.originalPrice * (1.0 - getInfo().publication.offPercent)) | number:2}} €</span><span>{{getInfo().publication.originalPrice | number:2}} €</span></div></td></tr></table><div class=publication-body><div class=publication-data ng-class=\"{'publication-body-two':getInfo().publication.pictures.length&gt;0}\" ng-hide=\"descriptionIsEmpty(getInfo().publication) === true\"><div class=publication-data-header ng-show=\"getInfo().publication.type === 'PROMOTION'\" ng-class=\"{'publication-bordered-bottom' : getInfo().publication.description !=null &amp;&amp; getInfo().publication.description.length &gt; 0}\"><div class=\"glyphicon gling-icon gling-icon-calendar\"></div><span><div>{{'--.publication.promotionTo' | translateText}}</div><div>&lt; {{getInfo().publication.endDate | date:'dd MMM HH:mm'}}</div></span></div><div class=publication-data-body ng-show=\"getInfo().publication.description !=null &amp;&amp; getInfo().publication.description.length &gt; 0\"><span ng-bind-html=\"getInfo().publication.description | text : descriptionLimit\"></span><span class=link ng-show=\"getInfo().publication.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\">{{'--.textReuction.seeMore' | translateText}}</span><span class=link ng-show=\"getInfo().publication.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\">{{'--.textReuction.seeLess' | translateText}}</span></div></div><div class=\"publication-gallery publication-body-two publication-body-two-right\" ng-show=\"getInfo().publication.pictures.length &gt; 1 &amp;&amp; descriptionIsEmpty(getInfo().publication) === true\" ng-click=openGallery(getInfo().publication.pictures[1],getInfo().publication)><img ng-src=\"{{getInfo().publication.pictures[1] | image}}\" ng-class=getIllustrationClass(getInfo().publication.pictures[1])><div class=publication-illustration-plus-icon ng-show=getInfo().publication.pictures.length&gt;2><span>+{{getInfo().publication.pictures.length - 2}}</span></div></div><div class=publication-gallery ng-show=\"getInfo().publication.pictures.length &gt; 0 \" ng-class=\"{'publication-body-two':descriptionIsEmpty(getInfo().publication) !== true,'publication-body-two-right':descriptionIsEmpty(getInfo().publication) !== true}\" ng-click=openGallery(getInfo().publication.pictures[0],getInfo().publication)><img ng-src=\"{{getInfo().publication.pictures[0] | image}}\" ng-class=getIllustrationClass(getInfo().publication.pictures[0])><div class=publication-illustration-plus-icon ng-show=\"getInfo().publication.pictures.length &gt; 1 &amp;&amp; descriptionIsEmpty(getInfo().publication) !== true\"><span>+{{getInfo().publication.pictures.length - 1}}</span></div></div></div><div class=publication-footer><div class=\"publication-footer-date publication-bordered-bottom\">{{'--.publication.publishTo' | translateText}}{{getInfo().publication.startDate | date:'dd MMM yyyy'}}</div><div class=publication-footer-facebook><facebook-share-publication-ctrl ng-info={businessId:getInfo().publication.businessId,publicationId:getInfo().publication.id}></facebook-share-publication-ctrl></div><div class=publication-following-widget><follow-widget-for-publication-ctrl ng-info={displayText:true,publication:getInfo().publication}></follow-widget-for-publication-ctrl></div></div></div>");
  $templateCache.put("js/directive/component/publicationWidgetForMobile/_template.html",
    "<div class=\"publication-box-mobile publication-publication\"><div><div ng-show=\"getInfo().previsualization === true\" class=publication-box-previsualization></div><table class=publication-header><tr><td ng-click=\"navigateTo('/business/'+getInfo().publication.businessId)\"><img class=illustration ng-src=\"{{getInfo().publication.businessIllustration | image}}\"></td><td><div class=title-box><div class=title ng-click=\"navigateTo('/business/'+getInfo().publication.businessId)\"><i ng-show=\"getInfo().publication.following === true\" class=\"gling-icon gling-icon gling-icon-bell\"></i> {{getInfo().publication.businessName}}</div><div class=title-data>{{'--.publication.publishTo' | translateText}} {{getInfo().publication.startDate | date:'dd MMM yyyy'}} - {{getInfo().publication.distance / 1000 | number:2}} km</div></div></td><td><i ng-show=\"getInterestClass(getInfo().publication)!=null\" class=\"publication-interest gling-icon {{getInterestClass(getInfo().publication)}}\"></i></td></tr></table><div class=publication-title>{{getInfo().publication.title}}</div><div class=publication-body><div class=publication-data ng-class=\"{'publication-body-two':getInfo().publication.pictures.length>0}\" ng-hide=\"descriptionIsEmpty(getInfo().publication) === true\"><table ng-show=\"getInfo().publication.type === 'PROMOTION'\" class=publication-data-promotion><tr><td>- {{getInfo().publication.offPercent * 100 | number:0}}%</td><td class=publication-box-price ng-show=\"getInfo().publication.originalPrice!=null\"><span>{{(getInfo().publication.originalPrice * (1.0 - getInfo().publication.offPercent)) | number:2}} €</span> <span>{{getInfo().publication.originalPrice | number:2}} €</span></td><td>&gt; {{getInfo().publication.endDate | date:'dd MMM HH:mm'}}</td></tr></table><div class=publication-data-body ng-show=\"getInfo().publication.description !=null && getInfo().publication.description.length > 0\"><span ng-bind-html=\"getInfo().publication.description | text : getInfo().publication.descriptionLimit\"></span> <span ng-show=\"getInfo().publication.description.length > descriptionLimitBase && getInfo().publication.descriptionLimit==descriptionLimitBase\" ng-click=\"getInfo().publication.descriptionLimit = 10000\" class=link>{{'--.textReuction.seeMore' | translateText}}</span> <span ng-show=\"getInfo().publication.description.length > descriptionLimitBase && getInfo().publication.descriptionLimit!=descriptionLimitBase\" ng-click=\"getInfo().publication.descriptionLimit = descriptionLimitBase\" class=link>{{'--.textReuction.seeLess' | translateText}}</span></div></div><div class=publication-gallery ng-class=\"{'publication-body-two':descriptionIsEmpty(getInfo().publication) !== true,'publication-body-two-right':descriptionIsEmpty(getInfo().publication) !== true}\" ng-show=\"getInfo().publication.pictures.length > 0 \" ng-click=openGallery(getInfo().publication.pictures[0],getInfo().publication)><div class=publication-gallery-image-box><img ng-src=\"{{getInfo().publication.pictures[0] | image}}\" class=publication-illustration><div ng-show=\"getInfo().publication.pictures.length > 1\" class=publication-illustration-plus-icon><span>+{{getInfo().publication.pictures.length - 1}}</span></div></div></div></div><div class=publication-footer><div class=publication-footer-facebook><facebook-share-publication-ctrl ng-info={businessId:getInfo().publication.businessId,publicationId:getInfo().publication.id}></facebook-share-publication-ctrl></div><follow-widget-for-publication-ctrl ng-info={displayText:true,publication:getInfo().publication}></follow-widget-for-publication-ctrl></div></div></div>");
  $templateCache.put("js/directive/component/publicationWidgetForMobile/template.html",
    "<div class=\"publication-box-mobile publication-publication\"><div><div class=publication-box-previsualization ng-show=\"getInfo().previsualization === true\"></div><table class=publication-header><tr><td ng-click=\"navigateTo('/business/'+getInfo().publication.businessId)\"><img class=illustration ng-src=\"{{getInfo().publication.businessIllustration | image}}\"></td><td><div class=title-box><div class=title ng-click=\"navigateTo('/business/'+getInfo().publication.businessId)\"><i class=\"gling-icon gling-icon gling-icon-bell\" ng-show=\"getInfo().publication.following === true\"></i>{{getInfo().publication.businessName}}</div><div class=title-data>{{'--.publication.publishTo' | translateText}}{{getInfo().publication.startDate | date:'dd MMM yyyy'}} -{{getInfo().publication.distance / 1000 | number:2}} km</div></div></td><td><i class=\"publication-interest gling-icon {{getInterestClass(getInfo().publication)}}\" ng-show=\"getInterestClass(getInfo().publication)!=null\"></i></td></tr></table><div class=publication-title>{{getInfo().publication.title}}</div><div class=publication-body><div class=publication-data ng-class=\"{'publication-body-two':getInfo().publication.pictures.length&gt;0}\" ng-hide=\"descriptionIsEmpty(getInfo().publication) === true\"><table class=publication-data-promotion ng-show=\"getInfo().publication.type === 'PROMOTION'\"><tr><td>- {{getInfo().publication.offPercent * 100 | number:0}}%</td><td class=publication-box-price ng-show=\"getInfo().publication.originalPrice!=null\"><span>{{(getInfo().publication.originalPrice * (1.0 - getInfo().publication.offPercent)) | number:2}} €</span><span>{{getInfo().publication.originalPrice | number:2}} €</span></td><td>> {{getInfo().publication.endDate | date:'dd MMM HH:mm'}}</td></tr></table><div class=publication-data-body ng-show=\"getInfo().publication.description !=null &amp;&amp; getInfo().publication.description.length &gt; 0\"><span ng-bind-html=\"getInfo().publication.description | text : getInfo().publication.descriptionLimit\"></span><span class=link ng-show=\"getInfo().publication.description.length &gt; descriptionLimitBase &amp;&amp; getInfo().publication.descriptionLimit==descriptionLimitBase\" ng-click=\"getInfo().publication.descriptionLimit = 10000\">{{'--.textReuction.seeMore' | translateText}}</span><span class=link ng-show=\"getInfo().publication.description.length &gt; descriptionLimitBase &amp;&amp; getInfo().publication.descriptionLimit!=descriptionLimitBase\" ng-click=\"getInfo().publication.descriptionLimit = descriptionLimitBase\">{{'--.textReuction.seeLess' | translateText}}</span></div></div><div class=publication-gallery ng-show=\"getInfo().publication.pictures.length &gt; 0 \" ng-class=\"{'publication-body-two':descriptionIsEmpty(getInfo().publication) !== true,'publication-body-two-right':descriptionIsEmpty(getInfo().publication) !== true}\" ng-click=openGallery(getInfo().publication.pictures[0],getInfo().publication)><div class=publication-gallery-image-box><img class=publication-illustration ng-src=\"{{getInfo().publication.pictures[0] | image}}\"><div class=publication-illustration-plus-icon ng-show=\"getInfo().publication.pictures.length &gt; 1\"><span>+{{getInfo().publication.pictures.length - 1}}</span></div></div></div></div><div class=publication-footer><div class=publication-footer-facebook><facebook-share-publication-ctrl ng-info={businessId:getInfo().publication.businessId,publicationId:getInfo().publication.id}></facebook-share-publication-ctrl></div><follow-widget-for-publication-ctrl ng-info={displayText:true,publication:getInfo().publication}></follow-widget-for-publication-ctrl></div></div></div>");
  $templateCache.put("js/directive/component/schedule/_template.html",
    "<div class=schedule-form><div class=schedule-open ng-show=\"isOpenNow === true\">{{'--.schedule.isOpenNow' | translateText}}</div><table><tr><td></td><td ng-repeat=\"hour in hours\"><div class=hour-block-info><div>{{hour.text}}</div></div></td></tr><tr ng-repeat=\"day in days\" ng-show=\"sections[day].length >0\"><td>{{daysTranslation[day] | translateText}}</td><td ng-repeat=\"section in sections[day]\"><div class=hour-block ng-class=attendance_class[section.attendance] ng-mousedown=select(day,section) ng-mouseover=progress($event,day,section)></div></td></tr></table><div class=schedule-legend>{{'--.generic.legend' | translateText}}<div class=attendance-light>{{'--.schedule.light' | translateText}}</div><div class=attendance-moderate>{{'--.schedule.moderate' | translateText}}</div><div class=attendance-heavy>{{'--.schedule.heavy' | translateText}}</div><div class=attendance-appointment>{{'--.schedule.appointment' | translateText}}</div></div></div>");
  $templateCache.put("js/directive/component/schedule/template.html",
    "<div class=schedule-form><div class=schedule-open ng-show=\"isOpenNow === true\">{{'--.schedule.isOpenNow' | translateText}}</div><table><tr><td></td><td ng-repeat=\"hour in hours\"><div class=hour-block-info><div>{{hour.text}}</div></div></td></tr><tr ng-show=\"sections[day].length &gt;0\" ng-repeat=\"day in days\"><td>{{daysTranslation[day] | translateText}}</td><td ng-repeat=\"section in sections[day]\"><div class=hour-block ng-mouseover=progress($event,day,section) ng-class=attendance_class[section.attendance] ng-mousedown=select(day,section)></div></td></tr></table><div class=schedule-legend>{{'--.generic.legend' | translateText}}<div class=attendance-light>{{'--.schedule.light' | translateText}}</div><div class=attendance-moderate>{{'--.schedule.moderate' | translateText}}</div><div class=attendance-heavy>{{'--.schedule.heavy' | translateText}}</div><div class=attendance-appointment>{{'--.schedule.appointment' | translateText}}</div></div></div>");
  $templateCache.put("js/directive/component/searchBar/_template.html",
    "<div class=search-container><input dir-bottom-arrow=down() dir-top-arrow=top() dir-enter=search() ng-model=searchBarService.currentSearch class=\"gling-button-light search-bar\" placeholder=\"{{'--.welcome.search' | translateText}}\"> <span ng-click=search() class=\"glyphicon glyphicon-search search-icon\"></span><search-result-ctrl ng-info=searchResultParam></search-result-ctrl></div>");
  $templateCache.put("js/directive/component/searchBar/template.html",
    "<div class=search-container><input dir-top-arrow=top() dir-enter=search() ng-model=searchBarService.currentSearch placeholder=\"{{'--.welcome.search' | translateText}}\" class=\"gling-button-light search-bar\" dir-bottom-arrow=down()><span class=\"glyphicon glyphicon-search search-icon\" ng-click=search()></span><search-result-ctrl ng-info=searchResultParam></search-result-ctrl></div>");
  $templateCache.put("js/directive/component/searchResult/_template.html",
    "<div id=searchContainer ng-show=getInfo().display class=search-result-box dir-bottom-arrow=down() dir-top-arrow=top()><div ng-show=\"getInfo().result.businesses.length ==0 && getInfo().result.publications.length == 0 && getInfo().result.categories.length == 0\" class=search-result-nothing>{{'--.search.nothing' | translateText}}</div><div ng-hide=\"getInfo().result.businesses.length ==0 && getInfo().result.publications.length == 0 && getInfo().result.categories.length == 0\" class=scrollable-content><div ng-show=\"getInfo().result.businesses.length > 0\"><div ng-hide=\"getInfo().mobile === true\" class=search-result-sub-title>{{'--.search.business' | translateText}}</div><div class=\"search-result-business search-result-content\" ng-mouseenter=select(business.index) ng-click=goToBusiness(business) ng-class=\"{'search-result-selected':indexSelected==business.index}\" ng-repeat=\"business in getInfo().result.businesses\"><img ng-src=\"{{business.illustration | image}}\"> {{business.name}}</div><div class=search-result-content ng-hide=\"getInfo().mobile === true\" ng-click=seeAllBusiness() ng-mouseenter=select(seeMoreBusinessIndex) ng-class=\"{'search-result-selected':indexSelected==seeMoreBusinessIndex}\"><button class=\"search-result-show-more link\">{{'--.search.business.seeMore' | translateText}}</button></div></div><div ng-show=\"getInfo().result.publications.length >0\"><div ng-hide=\"getInfo().mobile === true\" class=search-result-sub-title>{{'--.search.publication' | translateText}}</div><table><tr class=\"search-result-publication search-result-content\" ng-mouseenter=select(publication.index) ng-click=goToPublication(publication) ng-class=\"{'search-result-selected':indexSelected==publication.index}\" ng-repeat=\"publication in getInfo().result.publications\"><td><img ng-src=\"{{publication.pictures[0] | image}}\"> {{publication.title}}</td><td><div class=search-result-publication-business><img ng-src=\"{{publication.businessIllustration | image}}\"> {{publication.businessName}}</div></td></tr></table><div ng-hide=\"getInfo().mobile === true\" ng-click=seeAllPublication() ng-mouseenter=select(seeMorePublicationIndex) class=search-result-content ng-class=\"{'search-result-selected':indexSelected==seeMorePublicationIndex}\"><div class=\"search-result-show-more link\">{{'--.search.publication.seeMore' | translateText}}</div></div></div><div ng-show=\"getInfo().result.categories.length > 0\"><div ng-hide=\"getInfo().mobile === true\" class=search-result-sub-title>{{'--.search.category' | translateText}}</div><div class=\"search-result-category search-result-content\" ng-mouseenter=select(category.index) ng-click=goToCategory(category) ng-class=\"{'search-result-selected':indexSelected==category.index}\" ng-repeat=\"category in getInfo().result.categories\">{{category.category.translationName}} <span class=transition ng-show=\"category.subCategory!=null\">>></span> {{category.subCategory.translationName}} <span class=transition ng-show=\"category.subSubCategory!=null\">>></span> {{category.subSubCategory.translationName}}</div><div ng-click=seeAllCategory() ng-hide=\"getInfo().mobile === true\" class=search-result-content ng-mouseenter=select(seeMoreCategoryIndex) ng-class=\"{'search-result-selected':indexSelected==seeMoreCategoryIndex}\"><div class=\"search-result-show-more link\">{{'--.search.category.seeMore' | translateText}}</div></div></div><div class=search-result-content ng-click=seeAll() ng-mouseenter=select(seeMoreIndex) ng-class=\"{'search-result-selected':indexSelected==seeMoreIndex}\"><div class=\"search-result-show-more link\">{{'--.search.seeMore' | translateText}}</div></div></div></div>");
  $templateCache.put("js/directive/component/searchResult/template.html",
    "<div class=search-result-box dir-top-arrow=top() ng-show=getInfo().display id=searchContainer dir-bottom-arrow=down()><div class=search-result-nothing ng-show=\"getInfo().result.businesses.length ==0 &amp;&amp; getInfo().result.publications.length == 0 &amp;&amp; getInfo().result.categories.length == 0\">{{'--.search.nothing' | translateText}}</div><div class=scrollable-content ng-hide=\"getInfo().result.businesses.length ==0 &amp;&amp; getInfo().result.publications.length == 0 &amp;&amp; getInfo().result.categories.length == 0\"><div ng-show=\"getInfo().result.businesses.length &gt; 0\"><div class=search-result-sub-title ng-hide=\"getInfo().mobile === true\">{{'--.search.business' | translateText}}</div><div class=\"search-result-business search-result-content\" ng-click=goToBusiness(business) ng-class=\"{'search-result-selected':getInfo().indexSelected==business.index}\" ng-mouseenter=select(business.index) ng-repeat=\"business in getInfo().result.businesses\"><img ng-src=\"{{business.illustration | image}}\"><span>{{business.name}}</span></div><div class=search-result-content ng-click=seeAllBusiness() ng-class=\"{'search-result-selected':getInfo().indexSelected==seeMoreBusinessIndex}\" ng-mouseenter=select(seeMoreBusinessIndex) ng-hide=\"getInfo().mobile === true\"><button class=\"search-result-show-more link\">{{'--.search.business.seeMore' | translateText}}</button></div></div><div ng-show=\"getInfo().result.publications.length &gt;0\"><div class=search-result-sub-title ng-hide=\"getInfo().mobile === true\">{{'--.search.publication' | translateText}}</div><table><tr class=\"search-result-publication search-result-content\" ng-click=goToPublication(publication) ng-class=\"{'search-result-selected':getInfo().indexSelected==publication.index}\" ng-mouseenter=select(publication.index) ng-repeat=\"publication in getInfo().result.publications\"><td><img ng-src=\"{{publication.pictures[0] | image}}\"><span>{{publication.title}}</span></td><td><div class=search-result-publication-business><img ng-src=\"{{publication.businessIllustration | image}}\"><span>{{publication.businessName}}</span></div></td></tr></table><div class=search-result-content ng-click=seeAllPublication() ng-class=\"{'search-result-selected':getInfo().indexSelected==seeMorePublicationIndex}\" ng-mouseenter=select(seeMorePublicationIndex) ng-hide=\"getInfo().mobile === true\"><div class=\"search-result-show-more link\">{{'--.search.publication.seeMore' | translateText}}</div></div></div><div ng-show=\"getInfo().result.categories.length &gt; 0\"><div class=search-result-sub-title ng-hide=\"getInfo().mobile === true\">{{'--.search.category' | translateText}}</div><div class=\"search-result-category search-result-content\" ng-click=goToCategory(category) ng-class=\"{'search-result-selected':getInfo().indexSelected==category.index}\" ng-mouseenter=select(category.index) ng-repeat=\"category in getInfo().result.categories\">{{category.category.translationName}}<span class=transition ng-show=\"category.subCategory!=null\">>></span>{{category.subCategory.translationName}}<span class=transition ng-show=\"category.subSubCategory!=null\">>></span>{{category.subSubCategory.translationName}}</div><div class=search-result-content ng-click=seeAllCategory() ng-class=\"{'search-result-selected':getInfo().indexSelected==seeMoreCategoryIndex}\" ng-mouseenter=select(seeMoreCategoryIndex) ng-hide=\"getInfo().mobile === true\"><div class=\"search-result-show-more link\">{{'--.search.category.seeMore' | translateText}}</div></div></div><div class=search-result-content ng-click=seeAll() ng-class=\"{'search-result-selected':getInfo().indexSelected==seeMoreIndex}\" ng-mouseenter=select(seeMoreIndex)><div class=\"search-result-show-more link\">{{'--.search.seeMore' | translateText}}</div></div></div></div>");
  $templateCache.put("js/directive/component/toTop/_template.html",
    "<div ng-click=toTop() ng-show=\"displayToTopButton === true\" class=home-to-top><span class=\"glyphicon glyphicon-arrow-up\"></span><br>{{'--.generic.top' | translateText}}</div>");
  $templateCache.put("js/directive/component/toTop/template.html",
    "<div class=home-to-top ng-show=\"displayToTopButton === true\" ng-click=toTop()><span class=\"glyphicon glyphicon-arrow-up\"></span><br>{{'--.generic.top' | translateText}}</div>");
  $templateCache.put("js/directive/field/dirFieldCheck/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div><input type=checkbox name={{getInfo().name}} ng-disabled=getInfo().disabled() ng-model=getInfo().field[getInfo().fieldName] ng-class=\"{input_number: getInfo().numbersOnly === 'integer' || getInfo().numbersOnly === 'double',\n" +
    "                       'money':!!getInfo().money}\" dir-focus-me=getInfo().focus() class=form-control-check></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-xs\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("js/directive/field/dirFieldDate/template.html",
    "<div class=\"row form-group has-feedback\" ng-class=\"{'error' : displayError()===true}\" ng-click=logField() ng-hide=\"isActive() === false\"><div><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div class=dropdown></div><a id={{id}} role=button data-toggle=dropdown data-target=# href=\"\" class=dropdown-toggle><div class=input-group><input ng-disabled=getInfo().disabled() name={{getInfo().name}} ng-model=resultFormated class=\"form-control\"> <span class=input-group-addon><i class=\"glyphicon glyphicon-calendar\"></i></span></div><ul role=menu aria-labelledby=dLabel class=\"dropdown-menu date_input\"><datetimepicker data-ng-model=result data-datetimepicker-config=\"{ dropdownSelector: '{{idHtag}}',minView:'{{getInfo().minimalDelay}}' }\"></datetimepicker></ul></a></div><div ng-transclude></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-xs\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("js/directive/field/dirFieldDateSimple/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div>{{'--.field.dateSimple.to' | translateText}}<select ng-options=\"day as day | date:'EEE dd MMM' for day in days\" ng-model=day style=\"min-width: 100px;margin-right: 20px;margin-left: 5px\" ng-disabled=getInfo().disabled()></select>{{'--.field.dateSimple.at' | translateText}}<select ng-options=\"hour.value as hour.key for hour in hours\" ng-model=hour style=\"min-width: 100px;margin-right: 20px;margin-left: 5px\" ng-disabled=getInfo().disabled()></select></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-md\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("js/directive/field/dirFieldDocument/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=\"form-group row\"><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle |translateText}}</label><div ng-class=\"getInfo().fullSize==true?'col-md-12':'col-md-6'\"><div style=\"text-align: center\"><div><div ng-show=\"inDownload=== true &amp;&amp; percent != 100\" class=document-question-progress-bar><div ng-style=style><spa></spa></div></div><div ng-show=\"inDownload=== true && percent != 100\" class=document-question-progress-percentage>{{percent}} %</div><div ng-show=\"inDownload=== true && percent == 100\">{{'--.field.document.inTreatment' | translateText}}</div><span class=\"btn btn-default btn-file field-document-btn\" ng-hide=\"inDownload === true || getInfo().disabled()\">{{((getInfo().field[getInfo().fieldName]!=null)?'--.download.button.update':'--.download.button.new') | translateText}} <input name=\"{{ id }}\" type=file ng-file-select=\"onFileSelect($files)\"></span><div ng-show=\"success && getInfo().disabled()!=true\">{{'--.field.document.success' | translateText}}</div></div><img ng-show=\"  getInfo().field[getInfo().fieldName]!=null\" ng-style={width:getInfo().posx,height:getInfo().posy} style=\"border:1px solid #999999;max-width: 850px\" ng-src=\"{{getInfo().field[getInfo().fieldName] | image}}\"></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div></div>");
  $templateCache.put("js/directive/field/dirFieldImageMultipleResizable/template.html",
    "<div class=\"input-text field_text row field-image-multiple\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=modal-description ng-show=\"getInfo().help!=null\">{{getInfo().help | translateText}}</div><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle |translateText}}</label><div ng-class=\"getInfo().fullSize==true?'col-md-12':'col-md-6'\"><div ng-class=\"{'input-group':!!getInfo().money}\"><div ng-repeat=\"imageContainer in images\" class=image-block-container><div class=image-block><div ng-show=\"imageContainer.percent>0 && imageContainer.percent < 100\">{{imageContainer.percent}} %</div><div class=image-container><img ng-src=\"{{imageContainer.image}}\"></div><div class=\"image-remove glyphicon glyphicon-remove\" ng-click=remove(imageContainer)></div></div><button ng-click=fullSize(imageContainer.image)>Voir en taille réelle</button> <button ng-click=resize(imageContainer)>Recadrer</button> {{'--.generic.comment' | translateText}}<textarea ng-model=imageContainer.comment></textarea></div><div class=\"add-image-button image-block\" ng-hide=\"getInfo().maxImage!=null && images.length>=getInfo().maxImage\"><input id=a type=file ng-file-select=\"onFileSelect($files)\"></div></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div></div>");
  $templateCache.put("js/directive/field/dirFieldImageMutiple/template.html",
    "<div class=\"input-text field_text row field-image-multiple\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=modal-description ng-show=\"getInfo().help!=null\">{{getInfo().help | translateText}}</div><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle |translateText}}</label><div ng-class=\"getInfo().fullSize==true?'col-md-12':'col-md-6'\"><div ng-class=\"{'input-group':!!getInfo().money}\"><div ng-repeat=\"imageContainer in images\" class=image-block-container><div class=image-block><div class=image-percentage ng-show=\"imageContainer.percent>0 && imageContainer.percent < 100\">{{imageContainer.percent}} %</div><div ng-show=\"imageContainer.percent>0 && imageContainer.percent < 100\" class=image-percentage-background style=\"width: {{imageContainer.percent}}%\"></div><div ng-hide=\"imageContainer.percent>0 && imageContainer.percent < 100\" class=image-container><img ng-src=\"{{imageContainer.image| image}}\"></div><div class=\"image-remove glyphicon glyphicon-remove\" ng-click=remove(imageContainer)></div></div>{{'--.generic.comment' | translateText}}<textarea ng-model=imageContainer.image.comment></textarea></div><div class=\"add-image-button image-block\" ng-hide=\"getInfo().maxImage!=null && images.length>=getInfo().maxImage\"><input name=\"{{ id }}\" type=file ng-file-select=\"onFileSelect($files)\"></div></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div></div>");
  $templateCache.put("js/directive/field/dirFieldSelect/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div ng-class=\"{'input-group':!!getInfo().money}\"><select ng-disabled=getInfo().disabled() name={{getInfo().name}} ng-model=getInfo().field[getInfo().fieldName] dir-focus-me=getInfo().focus() ng-options=\"option.key as option.value | translateText for option in getInfo().options\" class=form-control></select></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-xs\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("js/directive/field/dirFieldText/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div ng-class=\"{'input-group':!!getInfo().money}\"><button class=\"calculator btn btn-sm btn-default fa fa-calculator\" ng-click=openCalculator()></button> <input type={{fieldType}} id={{getInfo().id}} name={{getInfo().name}} ng-disabled=getInfo().disabled() ng-model=getInfo().field[getInfo().fieldName] numbers-only={{getInfo().numbersOnly}} ng-class=\"{input_number: getInfo().numbersOnly === 'integer' || getInfo().numbersOnly === 'double',\n" +
    "                       'money':!!getInfo().money}\" placeholder={{getInfo().placeholder}} dir-focus-me=getInfo().focus() class=form-control ng-show=\"getInfo().fieldType != 'textarea'\" typeahead=\"c as c for c in getInfo().autoCompleteValue | filter:$viewValue | limitTo:10\" typeahead-min-length=\"1\"> <span ng-show=!!getInfo().money class=input-group-addon>{{getInfo().money}}</span></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-md\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("js/directive/field/dirFieldTextArea/template.html",
    "<div class=\"input-text field_text row\" ng-class=\"{'error' : displayError()===true,'has-calculator': getInfo().hasCalculator===true}\" ng-hide=\"isActive() === false\"><div class=form-group><label class=\"control-label col-md-3\" ng-show=getInfo().fieldTitle>{{getInfo().fieldTitle | translateText}}</label><div class=col-md-6><div><textarea name={{getInfo().name}} ng-disabled=getInfo().disabled() ng-model=getInfo().field[getInfo().fieldName] ng-class=\"{input_number: getInfo().numbersOnly === 'integer' || getInfo().numbersOnly === 'double',\n" +
    "                       'money':!!getInfo().money}\" placeholder={{getInfo().placeholder}} dir-focus-me=getInfo().focus() class=form-control></textarea></div></div><div class=\"col-md-3 errors\" ng-show=\"displayError()===true\">{{getInfo().validationMessage | translateText}}</div></div><div class=\"col-md-3 hidden-sm hidden-xs\"></div><div class=\"col-md-6 help\" ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div></div>");
  $templateCache.put("js/directive/form/account/template.html",
    "<div class=form><dir-field-text ng-info=fields.firstname></dir-field-text><dir-field-text ng-info=fields.lastname></dir-field-text><dir-field-select ng-info=fields.gender></dir-field-select><dir-field-select ng-info=fields.language></dir-field-select><dir-field-text ng-info=fields.email></dir-field-text><dir-field-text ng-info=fields.password></dir-field-text><dir-field-text ng-info=fields.repeatPassword></dir-field-text><div ng-bind-html=\"'--.registration.accept.condition' | translateText | text\"></div></div>");
  $templateCache.put("js/directive/form/address/template.html",
    "<div class=form><dir-field-select ng-info=fields.name></dir-field-select><dir-field-text ng-info=fields.customName></dir-field-text><dir-field-text ng-info=fields.street></dir-field-text><dir-field-text ng-info=fields.zip></dir-field-text><dir-field-text ng-info=fields.city></dir-field-text></div>");
  $templateCache.put("js/directive/form/business/template.html",
    "<div class=form><dir-field-text ng-info=fields.name></dir-field-text><dir-field-text ng-info=fields.vta></dir-field-text><dir-field-text-area ng-info=fields.description></dir-field-text-area><dir-field-text ng-info=fields.phone></dir-field-text><dir-field-text ng-info=fields.email></dir-field-text><dir-field-text ng-info=fields.website></dir-field-text></div>");
  $templateCache.put("js/directive/form/businessCategory/template.html",
    "<div class=form><div class=business-category ng-class=\"{'disabled' : isDisabled()}\"><img src=/assets/images/modal-loading.gif ng-show=\"loading\"><div ng-hide=loading><div>{{'--.business.category.description' | translateText}}</div><div class=\"panel panel-default\"><div class=panel-heading>{{'--.businessCategory.column.category' | translateText}}</div><div class=panel-body><div name={{category.name}} ng-disabled=isDisabled() ng-repeat=\"category in categories\" class=category-box ng-class=\"{'category-selected':category.selected === true}\" ng-click=select(category)>{{category.translationName | translateText}}</div></div></div><div class=\"panel panel-default\"><div class=panel-heading>{{'--.businessCategory.column.subcategory' | translateText}}</div><div class=panel-body><div name={{subcategory.name}} ng-repeat=\"subcategory in subcategories\" ng-disabled=isDisabled() class=category-box ng-class=\"{'subcategory-selected':subcategory.selected === true}\" ng-click=selectSubcategory(subcategory)>{{subcategory.translationName | translateText}}</div></div></div><div class=\"panel panel-default\"><div class=panel-heading>{{'--.businessCategory.column.subsubcategory' | translateText}}</div><div class=panel-body><div name={{subsubcategory.name}} ng-repeat=\"subsubcategory in subsubcategories\" ng-disabled=isDisabled() class=category-box ng-class=\"{'subsubcategory-selected':subsubcategory.selected === true}\" ng-click=selectSubSubcategory(subsubcategory)>{{subsubcategory.translationName | translateText}}</div></div></div></div></div></div>");
  $templateCache.put("js/directive/form/businessNotification/template.html",
    "<div class=form><dir-field-select ng-info=fields.interests></dir-field-select><dir-field-text ng-info=fields.title></dir-field-text><dir-field-text-area ng-info=fields.description></dir-field-text-area><dir-field-date-simple ng-info=fields.startDate></dir-field-date-simple><dir-field-date-simple ng-info=fields.endDate></dir-field-date-simple><dir-field-image-mutiple ng-info=fields.illustration></dir-field-image-mutiple><dir-field-text-area ng-info=fields.editionReason></dir-field-text-area><h3>{{'--.publication.previsualization' | translateText}}</h3><publication-widget-ctrl ng-info={publication:getInfo().dto,previsualization:true}></publication-widget-ctrl></div>");
  $templateCache.put("js/directive/form/businessSocialNetwork/template.html",
    "<div class=form><div class=modal-description>{{'--.business.socialNetwork.form.description' | translateText}}</div><dir-field-text ng-info=fields.facebook></dir-field-text><dir-field-text ng-info=fields.twitter></dir-field-text><dir-field-text ng-info=fields.instagram></dir-field-text>{{'--.business.socialNetwork.other' | translateText}} {{'--.business.socialNetwork.other' | translateText}}<dir-field-text ng-info=fields.delivery></dir-field-text><dir-field-text ng-info=fields.ecommerce></dir-field-text><dir-field-text ng-info=fields.opinion></dir-field-text><dir-field-text ng-info=fields.reservation></dir-field-text></div>");
  $templateCache.put("js/directive/form/claimBusiness/_template.html",
    "<div class=form><div>{{'--.business.claim.form.desc' | translateText}}</div><dir-field-text ng-info=fields.phone></dir-field-text><dir-field-text ng-info=fields.vta></dir-field-text></div>");
  $templateCache.put("js/directive/form/claimBusiness/template.html",
    "<div class=form><div>{{'--.business.claim.form.desc' | translateText}}</div><dir-field-text ng-info=fields.phone></dir-field-text><dir-field-text ng-info=fields.vta></dir-field-text></div>");
  $templateCache.put("js/directive/form/contact/template.html",
    "<div class=form><div class=modal-description>{{'--.contactForm.help'}}</div><dir-field-text ng-info=fields.email></dir-field-text><dir-field-text ng-info=fields.subject></dir-field-text><dir-field-text-area ng-info=fields.message></dir-field-text-area></div>");
  $templateCache.put("js/directive/form/customerInterest/template.html",
    "<div class=form><div class=\"row customer_interest_form_container\"><div class=customer_interest_form ng-repeat=\"interest in interests\"><div class=\"col-xs-12 col-sm-6 col-md-4\"><button class=\"interest btn\" ng-class={interest_selected:interest.registrationSelection} ng-click=select(interest)><input type=checkbox ng-checked=\"interest.registrationSelection\"> <span class=\"{{'gling-icon gling-icon-' + interest.name}}\"></span> {{interest.translationName | translateText}}</button></div></div></div></div>");
  $templateCache.put("js/directive/form/download/template.html",
    "<div class=form><dir-field-document ng-info=fields.file></dir-field-document><button type=button ng-show=\"fields.file.field!=null && fields.file.field.isImage!=true\" ng-click=download() class=button>{{'--.field.document.download' | translateText}} {{getInfo().field.name}}</button> <img ng-show=\"fields.file.field!=null && fields.file.field.isImage==true\" ng-src=\"/{{fileCall}}\"></div>");
  $templateCache.put("js/directive/form/image/template.html",
    "<div class=form><div class=modal-description ng-show=\"getInfo().details!=null\">{{getInfo().details | translateText}}</div><dir-field-document ng-info=imageParam></dir-field-document></div>");
  $templateCache.put("js/directive/form/login/_template.html",
    "<div class=\"form login-form\"><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn gling-button-dark\"><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.loginModal.facebook.btn' |translateText}}</span></button></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><dir-field-text ng-info=fields.email></dir-field-text><dir-field-text ng-info=fields.password></dir-field-text><div ng-bind-html=\"'--.registration.accept.condition' | translateText | text\"></div></div>");
  $templateCache.put("js/directive/form/login/template.html",
    "<div class=\"form login-form\"><div class=facebook-login-btn-container><a class=\"facebookShare ng-isolate-scope\" ng-click=fb_login()><div class=facebookButton><div class=pluginButton><div class=pluginButtonContainer><div class=pluginButtonImage><button type=button><i class=\"pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue\"></i></button></div><span class=pluginButtonLabel>{{'--.loginModal.facebook.btn' |translateText}}</span></div></div></div></a></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><dir-field-text ng-info=fields.email></dir-field-text><dir-field-text ng-info=fields.password></dir-field-text><div class=condition ng-bind-html=\"'--.registration.accept.condition' | translateText | text\"></div></div>");
  $templateCache.put("js/directive/form/promotion/template.html",
    "<div class=form><dir-field-select ng-info=fields.interests></dir-field-select><dir-field-text ng-info=fields.title></dir-field-text><dir-field-text-area ng-info=fields.description></dir-field-text-area><dir-field-date-simple ng-info=fields.startDate></dir-field-date-simple><dir-field-date-simple ng-info=fields.endDate></dir-field-date-simple><dir-field-image-mutiple ng-info=fields.illustration></dir-field-image-mutiple><table class=onoffswitchtable><tr><td>{{'--.promotion.simplePromotion' | translateText}}</td><td><div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitchFromPromotionForm checked ng-model=completePromotion><label class=onoffswitch-label for=myonoffswitchFromPromotionForm><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></td><td>{{'--.promotion.completePromotion' | translateText}}</td></tr></table><dir-field-text ng-info=fields.originalPrice></dir-field-text><dir-field-text ng-info=fields.offPercent></dir-field-text><dir-field-text ng-info=fields.offPrice></dir-field-text><dir-field-text-area ng-info=fields.editionReason></dir-field-text-area><h3>{{'--.publication.previsualization' | translateText}}</h3><publication-widget-ctrl ng-info={publication:getInfo().dto,previsualization:true}></publication-widget-ctrl></div>");
  $templateCache.put("js/directive/form/schedule/template.html",
    "<div class=schedule-form><div class=modal-description>{{'--.business.schedule.edit.modal.description' | translateText}}</div><div ng-show=\"startSection!=null\" class=schedule-info ng-style=infoStyle>{{selectedTiming}}</div><div><div class=schedule-form-radio><div class=attendance-close id=schedule-edit-btn-attendance-close ng-click=\"selectAttendance('CLOSE')\"><input type=radio ng-model=attendance_selected value=\"CLOSE\"> {{'--.schedule.closed' | translateText}}</div><div class=attendance-light id=schedule-edit-btn-attendance-light ng-click=\"selectAttendance('LIGHT')\"><input type=radio ng-model=attendance_selected value=\"LIGHT\"> {{'--.schedule.light' | translateText}}</div><div class=attendance-moderate id=schedule-edit-btn-attendance-moderate ng-click=\"selectAttendance('MODERATE')\"><input type=radio ng-model=attendance_selected value=\"MODERATE\"> {{'--.schedule.moderate' | translateText}}</div><div class=attendance-heavy id=schedule-edit-btn-attendance-heavy ng-click=\"selectAttendance('IMPORTANT')\"><input type=radio ng-model=attendance_selected value=\"IMPORTANT\"> {{'--.schedule.heavy' | translateText}}</div><div class=attendance-appointment id=schedule-edit-btn-attendance-appointment ng-click=\"selectAttendance('APPOINTMENT')\"><input type=radio ng-model=attendance_selected value=\"APPOINTMENT\"> {{'--.schedule.appointment' | translateText}}</div></div><table class=editable><tr><td></td><td ng-repeat=\"hour in hours\"><div class=hour-block-info><div>{{hour.text}}</div></div></td></tr><tr ng-repeat=\"day in days\"><td>{{day}}</td><td ng-repeat=\"section in sections[day]\"><button class=hour-block ng-class=attendance_class[section.attendance] ng-mousedown=select(day,section) ng-mouseover=progress($event,day,section)></button></td></tr></table></div></div>");
  $templateCache.put("js/directive/mobile/galleryMobile/template.html",
    "<div class=gallery-modal-mobile ng-show=display><div><div class=previous ng-click=previous() ng-show=\"images.length>1\"><div><span class=\"gling-icon gling-icon-arrow_left\"></span></div></div><button ng-click=close() class=\"btn-close glyphicon glyphicon-remove\"></button> <span class=helper></span> <img class=gallery-picture ng-src=\"{{image | image}}\"><div class=description ng-show=\"image.comment!=null\">{{image.comment}}</div><div class=close-area ng-click=close()></div><div class=next ng-click=next() ng-show=\"images.length>1\"><div><span class=\"gling-icon gling-icon-arrow_right\"></span></div></div></div></div>");
  $templateCache.put("js/directive/mobile/headerSearch/template.html",
    "<div class=\"navbar navbar-app navbar-absolute-top\" ng-class=\"{'header-with-advanced-search':advancedSearch}\"><div class=\"navbar-brand navbar-brand-center header-option-container\" style=\"padding-top: 5px\"><search-bar-ctrl ng-info={mobile:true}></search-bar-ctrl></div><div class=\"btn-group pull-left\"><div class=\"btn btn-navbar\" ng-click=back() ng-hide=\"displayMenu !== false\"><div class=nav-button ng-show=displayBack()><i class=\"glyphicon glyphicon-chevron-left\"></i></div></div><div class=\"btn btn-navbar nav-menu\" ng-click=showMenu() ng-show=\"displayMenu !== false\"><div class=nav-button><i class=\"fa fa-bars\"></i></div></div></div></div>");
  $templateCache.put("js/directive/mobile/title/template.html",
    "<div class=\"navbar navbar-app navbar-absolute-top\"><div class=\"navbar-brand navbar-brand-center\">{{title | translateText}}</div><div class=\"btn-group pull-left\"><div class=\"btn btn-navbar\" ng-click=back() ng-hide=\"displayMenu !== false\"><div class=nav-button ng-show=displayBack()><i class=\"glyphicon glyphicon-chevron-left\"></i></div></div><div class=\"btn btn-navbar nav-menu\" ng-click=showMenu() ng-show=\"displayMenu !== false\"><div class=nav-button><i class=\"fa fa-bars\"></i></div></div></div></div>");
  $templateCache.put("js/directive/superAdmin/menu/template.html",
    "<div><button ng-click=\"navigateTo('/admin/stat')\">Statistiques</button> <button ng-click=\"navigateTo('/admin/business')\">Business list</button> <button ng-click=\"navigateTo('/admin/categories_and_interests')\">Catégories et intérêts</button> <button ng-click=\"navigateTo('/admin/contact')\">Formuaire de contact</button> <button ng-click=\"navigateTo('/admin/map')\">Carte</button></div>");
  $templateCache.put("js/directive/town/newsFeedForTown/template.html",
    "<div class=news-feed-list><h3 style=\"text-align: center\">Suivez les nouveautés des commerces de votre commune</h3><div><h4 style=\"text-align: center\">Les dernières actualités</h4><a class=publication ng-repeat=\"notification in notifications\" href=http://www.shops1160.be/index.php/commerces/#/business/{{notification.businessId}}><table><tr><td rowspan=2><img ng-src=\"{{notification.businessIllustration | image}}\"></td><td class=title>{{notification.businessName}}</td></tr><tr><td>{{notification.title}}</td></tr></table></a><div ng-show=\"loading === true\"><img src=https://www.gling.be/assets/images/modal-loading.gif ng-show=\"loading\"></div></div><div><h4 style=\"text-align: center\">Les dernières promotions</h4><a class=promotion ng-repeat=\"promotion in promotions\" href=http://www.shops1160.be/index.php/commerces/#/business/{{promotion.businessId}}><table><tr><td rowspan=2><img ng-src=\"{{promotion.businessIllustration | image}}\"></td><td><span class=title>{{promotion.businessName}}</span> - {{promotion.endDate | date:'dd MMM yyyy hh:mm'}}</td></tr><tr><td>{{promotion.title}}<span style=\"float: right\" class=title>- {{(promotion.offPercent * 100) | number:0}} %</span></td></tr></table></a><div ng-show=\"loading === true\"><img src=https://www.gling.be/assets/images/modal-loading.gif ng-show=\"loading\"></div></div></div>");
  $templateCache.put("js/directive/town/publicationListForTown/template.html",
    "<div class=town-business-publication-list><div class=town-business-publication-list-element ng-repeat=\"publication in publications\"><div class=title>{{publication.title}} <span ng-show=\"publication.type === 'PROMOTION'\">{{publication.endDate | date:'medium'}}</span></div><table class=body><tr><td>{{publication.description}}</td><td ng-show=\"publication.pictures.length > 0\"><img ng-click=openGallery(publication.pictures[0],publication) ng-src=\"{{publication.pictures[0] | image}}\"></td></tr></table><div class=publicationDate>{{publication.endDate | date:'medium'}}</div></div></div>");
  $templateCache.put("js/directive/town/townBusiness/template.html",
    "<div><div class=town-business-list ng-show=\"elementToDisplay === 'list'\"><h3>Les commerces de votre commune.</h3><div class=search-box><div class=input-group><span class=\"input-group-addon glyphicon glyphicon-search\" id=basic-addon1></span> <input ng-model=search class=form-control placeholder=\"Par nom, adresse, type,...\" aria-describedby=basic-addon1> <span class=\"glyphicon glyphicon-remove form-control-feedback\" aria-hidden=true style=\"pointer-events: visible;cursor: pointer\" ng-show=\"search.length > 0\" ng-click=\"search = ''\"></span></div></div>Cliquer sur les images pour obtenir plus d'information<br><div><div class=town-business-list-element ng-hide=\"business.visible === false\" ng-repeat=\"business in businesses\" ng-click=selectBusiness(business)><img ng-src=\"{{business.illustration | image}}\"><div class=town-business-list-element-data><div class=business-name>{{business.name}}</div><div class=address>{{business.address.street}}</div></div></div></div><div ng-show=\"loading === true\"><img src=https://www.gling.be/assets/images/modal-loading.gif ng-show=\"loading\"></div><div ng-show=\"loading == false && emptyResult()\">Aucun résultat ne correspond à votre recherche</div></div><div ng-show=\"elementToDisplay === 'businessDetails'\"><div><button ng-click=backToList() class=\"btn gling-button-dark glyphicon glyphicon-chevron-left\">Retourner à la liste des commerces</button></div><div class=town-business-details><div class=town-business-details-left><div class=town-business-details-header><img ng-src=\"{{selectedBusiness.illustration | image}}\"><div><div class=business-header-name>{{selectedBusiness.name}}</div><div class=business-header-details>{{selectedBusiness.address.street}}<br>{{selectedBusiness.phone}}<br><a href=mailto:{{selectedBusiness.email}}>{{selectedBusiness.email}}</a></div></div></div><category-line-ctrl></category-line-ctrl><div class=business-description>{{selectedBusiness.description}}</div></div><div class=town-business-details-right>Dernières actualités<schedule-ctrl ng-info={dto:selectedBusiness.schedules}></schedule-ctrl><publication-list-for-town-ctrl ng-info={businessId:selectedBusiness.id}></publication-list-for-town-ctrl></div></div></div></div>");
  $templateCache.put("js/directive/web/footerBar/template.html",
    "<div class=footer-bar><a href=\"/legal/\" target=_blank>{{'--.footer.legal' | translateText}}</a> <a href=# ng-click=\"openContactForm('HELP')\">{{'--.footer.help' | translateText}}</a> <a href=# ng-click=\"openContactForm('CONTACT')\">{{'--.footer.contact' | translateText}}</a> <a href=https://www.facebook.com/gling.be target=_blank><img src=\"/assets/images/facebook/login_icon.png\"></a> <span style=\"float: right;font-size: 12px\">Gling © 2015</span></div>");
  $templateCache.put("js/directive/web/headerBar/template.html",
    "<div><div class=navigation-bar ng-class=\"{'header-with-advanced-search':advancedSearch}\"><div class=\"container header-option-container\"><h1 style=\"cursor : pointer\" id=welcome-btn-welcome class=\"gling-icon gling-icon-logoapp button-with-label\" ng-click=goToHome()><p>{{'--.headerBar.logo.label'}}</p></h1><img style=\"margin-top: -10px\" src=\"/assets/images/beta.png\"><search-bar-ctrl ng-info={mobile:false}></search-bar-ctrl><select class=gling-button-light ng-model=currentPosition ng-options=\"position.key as position.translation | translateText for position in positions\" style=\"display: inline-block;width: 150px\"></select><div class=profile-buttons-container ng-show=\"accountService.getMyself()==null\"><select class=gling-button-light ng-model=languageService.currentLanguage ng-options=\"lang.code as lang.language for lang in languageService.languages\"></select><button type=button id=welcome-btn-login class=gling-button ng-click=login()>{{'--.welcome.login' | translateText}}</button> <span>{{'--.generic.or' | translateText}}</span> <button type=button class=gling-button id=welcome-btn-registration ng-click=registration()>{{'--.welcome.signIn' | translateText}}</button></div><div class=profile-buttons-container ng-show=\"accountService.getMyself()!=null\" style=\"display : inline-block\"><div class=dropdown ng-show=\"accountService.getMyself()!=null\" style=\"display : inline-block\"><div class=menu-connection-button-container><div class=menu-connection-name>{{accountService.getMyself().firstname}}</div><div class=\"gling-icon gling-icon-profil menu-connection-icon\" data-toggle=dropdown id=dropdownMenu1 aria-expanded=true><span></span></div><ul class=\"dropdown-menu dropdown-menu-right\" role=menu aria-labelledby=dropdownMenu1><li role=presentation><a role=menuitem tabindex=-1 href=\"\" ng-click=\"navigateTo('/profile')\" id=welcome-btn-profile>{{'--.welcome.myProfile' | translateText}}</a></li><li role=presentation><a role=menuitem tabindex=-1 href=\"\" ng-click=logout() id=welcome-btn-logout>{{'--.generic.logout' | translateText}}</a></li><li><ul></ul></li></ul></div></div></div></div><div class=navigation-bar-menu><a href=/test>{{'--.welcome.welcome' | translateText}}</a> <a href=\"/\">{{'--.welcome.newsfeed' | translateText}}</a> <a href=/map>{{'--.welcome.map' | translateText}}</a> <a ng-show=\"accountService.getMyself()!=null\" href=/my-businesses>{{'--.welcome.myBusinesses' | translateText}}</a> <a ng-show=\"accountService.getMyself()!=null && accountService.getMyself().type == 'BUSINESS'\" href=/business/{{accountService.getMyself().businessId}}>{{'--.welcome.myBusiness' | translateText}}</a> <a style=\"float: right\" href=\"/welcome/\">{{'--.welcome.about' | translateText}}</a></div></div></div>");
  $templateCache.put("js/modal/AddressModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 ng-show=update class=modal-title>{{'--.account.address.modal.title.update' | translateText}}</h4><h4 ng-hide=update class=modal-title>{{'--.account.address.modal.title.create' | translateText}}</h4></div><div class=modal-body><address-form-ctrl ng-info=addressParam></address-form-ctrl></div><div class=modal-footer><button id=profile-btn-save ng-disabled=loading type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/BasicModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{title | translateText}}</h4></div><div class=\"modal-body inject-data\"></div><div class=modal-footer><button id=basic-modal-btn-save ng-disabled=loading type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/BusinessNotificationModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 ng-show=update class=modal-title>{{'--.businessNotification.modal.title.update' | translateText}}</h4><h4 ng-hide=update class=modal-title>{{'--.businessNotification.modal.title.create' | translateText}}</h4></div><div class=modal-body ng-style=getHeight()><business-notification-form-ctrl ng-info=businessNotificationParam></business-notification-form-ctrl></div><div class=modal-footer><button ng-disabled=loading id=promotion-modal-btn-save type=button class=\"btn gling-button-dark\" ng-click=save(false)>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/BusinessRegistrationModal/_view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.business.registrationModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login business-registration\"><div class=wizard><div ng-class=\"{'current':badgeSelected==1}\"><span class=badge ng-class=\"{'badge-inverse':badgeSelected==1}\">1</span> {{'--.customer.registrationModal.personal.title' | translateText}}</div><div ng-class=\"{'current':badgeSelected==2}\"><span class=badge ng-class=\"{'badge-inverse':badgeSelected==2}\">2</span> {{'--.business.registrationModal.business.title' | translateText}}</div></div><div ng-show=\"badgeSelected==1\"><div class=modal-description>{{'--.business.registrationModal.personal.desc' | translateText}}</div><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn gling-button-dark\" ng-disabled=loading><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.registrationModal.facebook.btn' |translateText}}</span></button></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><account-form-ctrl ng-info=accountParam></account-form-ctrl></div><div ng-show=\"badgeSelected==2\"><div class=modal-description>{{'--.business.registrationModal.business.desc' | translateText}}</div><br><div class=modal-description>{{'--.business.registration.importFromFacebook.desc' | translateText}}</div><dir-field-text ng-info=importFromFacebookParam></dir-field-text><button ng-show=\"badgeSelected==2\" ng-disabled=loading style=\"float: right\" type=button class=\"btn gling-button-dark\" ng-click=importBusinessFromFacebook()>{{'--.business.registration.importFromFacebook' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><div class=modal-description>{{'--.business.registration.data.desc' | translateText}}</div><dir-field-text ng-info=businessNameField></dir-field-text></div></div><div class=modal-footer><button ng-show=\"badgeSelected==1\" id=business-registration-btn-next ng-disabled=loading type=button class=\"btn gling-button-dark\" ng-click=createAccount()>{{'--.businessRegistration.createAccount' | translateText}}</button> <button ng-show=\"badgeSelected==2\" id=business-registration-btn-save ng-disabled=loading type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/BusinessRegistrationModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" ng-click=close() style=float:right></button><h4 class=modal-title>{{'--.business.registrationModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login business-registration\"><div class=wizard><div ng-class=\"{'current':badgeSelected==1}\"><span class=wizard-badge ng-class=\"{'badge-inverse':badgeSelected==1}\">1</span> {{'--.customer.registrationModal.personal.title' | translateText}}</div><div ng-class=\"{'current':badgeSelected==2}\"><span class=wizard-badge ng-class=\"{'badge-inverse':badgeSelected==2}\">2</span> {{'--.business.registrationModal.business.title' | translateText}}</div></div><div ng-show=\"badgeSelected==1\"><div class=modal-description>{{'--.business.registrationModal.personal.desc' | translateText}}</div><div class=facebook-login-btn-container><a class=\"facebookShare ng-isolate-scope\" ng-click=fb_login()><div class=facebookButton><div class=pluginButton><div class=pluginButtonContainer><div class=pluginButtonImage><button type=button><i class=\"pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue\"></i></button></div><span class=pluginButtonLabel>{{'--.registrationModal.facebook.btn' |translateText}}</span></div></div></div></a></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><account-form-ctrl ng-info=accountParam></account-form-ctrl></div><div ng-show=\"badgeSelected==2\"><div class=modal-description>{{'--.business.registrationModal.business.desc' | translateText}}</div><br><div class=modal-description>{{'--.business.registration.importFromFacebook.desc' | translateText}}</div><dir-field-text ng-info=importFromFacebookParam></dir-field-text><button class=\"btn gling-button-dark\" ng-show=\"badgeSelected==2\" ng-click=importBusinessFromFacebook() style=\"float: right\" type=button ng-disabled=loading>{{'--.business.registration.importFromFacebook' | translateText}}</button><img ng-show=loading src=/assets/images/modal-loading.gif style=float:right><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><div class=modal-description>{{'--.business.registration.data.desc' | translateText}}</div><dir-field-text ng-info=businessNameField></dir-field-text></div></div><div class=modal-footer><button id=business-registration-btn-next class=\"btn gling-button-dark\" ng-show=\"badgeSelected==1\" ng-click=createAccount() type=button ng-disabled=loading>{{'--.businessRegistration.createAccount' | translateText}}</button><button id=business-registration-btn-save class=\"btn gling-button-dark\" ng-show=\"badgeSelected==2\" ng-click=save() type=button ng-disabled=loading>{{'--.generic.save' | translateText}}</button><img ng-show=loading src=/assets/images/modal-loading.gif></div>");
  $templateCache.put("js/modal/ChangePassword/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.changePasswordModal.title' | translateText}}</h4></div><div class=\"modal-body form\"><dir-field-text ng-info=fields.oldPassword></dir-field-text><dir-field-text ng-info=fields.newPassword></dir-field-text><dir-field-text ng-info=fields.repeatPassword></dir-field-text></div><div class=modal-footer><button ng-disabled=loading type=button id=change-password-btn-save class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/ConfirmAndShareModal/view.html",
    "<div class=modal-body>{{'--.publication.success.message' | translateText}}<br><button class=gling-button-dark ng-click=share()><img style=\"width: 18px\" src=\"/assets/images/facebook/login_icon_white.png\"> {{'--.publication.success.shareOnFacebook' | translateText}}</button> <button ng-click=close() class=gling-button-dark>{{'--.generic.close' | translateText}}</button></div>");
  $templateCache.put("js/modal/CustomerRegistrationModal/_view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.customer.registrationModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login customer-registration\"><div class=modal-description>{{'--.customer.registrationModal.personal.desc' | translateText}}<br><span class=\"modal-login-link link\" ng-click=toBusinessRegistration()>{{'--.registrationModal.toBusinessRegistration' | translateText}}</span></div><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn gling-button-dark\" ng-disabled=loading><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.registrationModal.facebook.btn' |translateText}}</span></button></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><account-form-ctrl ng-info=accountParam></account-form-ctrl></div><div class=modal-footer><button id=customer-registration-modal-btn-save ng-disabled=loading type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/CustomerRegistrationModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" ng-click=close() style=float:right></button><h4 class=modal-title>{{'--.customer.registrationModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login customer-registration\"><div class=modal-description>{{'--.customer.registrationModal.personal.desc' | translateText}}<br><span class=\"modal-login-link link\" ng-click=toBusinessRegistration()>{{'--.registrationModal.toBusinessRegistration' | translateText}}</span></div><div class=facebook-login-btn-container><a class=\"facebookShare ng-isolate-scope\" ng-click=fb_login()><div class=facebookButton><div class=pluginButton><div class=pluginButtonContainer><div class=pluginButtonImage><button type=button><i class=\"pluginButtonIcon img sp_plugin-button-2x sx_plugin-button-2x_favblue\"></i></button></div><span class=pluginButtonLabel>{{'--.registrationModal.facebook.btn' |translateText}}</span></div></div></div></a></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><account-form-ctrl ng-info=accountParam></account-form-ctrl></div><div class=modal-footer><button id=customer-registration-modal-btn-save class=\"btn gling-button-dark\" ng-click=save() type=button ng-disabled=loading>{{'--.generic.save' | translateText}}</button><img ng-show=loading src=/assets/images/modal-loading.gif></div>");
  $templateCache.put("js/modal/DownloadFieldModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.downloadModal.title' | translateText}}</h4></div><div class=modal-body><dir-field-document ng-info=fields.file></dir-field-document></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/EditCustomerInterestModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.customer.editInterestModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login\"><customer-interest-form-ctrl ng-info=customerInterestParam></customer-interest-form-ctrl></div><div class=modal-footer><button ng-disabled=loading id=edit-customer-interest-btn-save type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/ForgotPasswordModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.forgotPassword.title' | translateText}}</h4></div><div class=modal-body><p>{{'--.forgotPassword.desc' | translateText}}</p><dir-field-text ng-info=fields.email></dir-field-text></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.submit' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/GalleryModal/view.html",
    "<div class=\"modal-body gallery-modal\"><div><img class=gallery-picture ng-src=\"{{image | image}}\"></div><div class=comment-container><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button> {{image.comment}}</div><table ng-show=\"images.length > 1\" style=\"width: 100%\"><tr><td><button type=button&quot; id=gallery-modal-btn-previous class=\"btn gling-button-dark\" ng-click=previous()>{{'--.gallery.modal.previous' | translateText}}</button></td><td><span id=gallery-modal-span-number-page>{{imageNb}} / {{images.length}}</span></td><td><button type=button&quot; id=gallery-modal-btn-next style=\"float: right\" class=\"btn gling-button-dark\" ng-click=next()>{{'--.gallery.modal.next' | translateText}}</button></td></tr></table></div>");
  $templateCache.put("js/modal/HelpModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.helpModal.title' | translateText}}</h4></div><div class=modal-body>{{message | translateText}}</div>");
  $templateCache.put("js/modal/IframeModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{title | translateText}}</h4></div><div class=modal-body><iframe src={{url}}></iframe></div>");
  $templateCache.put("js/modal/LoginModal/_view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.loginModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login\"><div class=help-div ng-show=\"helpMessage!=null\">{{helpMessage | translateText}}</div><login-form-ctrl ng-info=loginFormParam></login-form-ctrl><div class=link ng-click=toForgotPassword()>{{'--.login.form.button.forgotPassword' | translateText}}</div><div class=\"modal-login-link-box modal-description\"><div>{{'--.loginModal.notRegisterYet' | translateText}}</div><span class=\"modal-login-link link\" ng-click=toCustomerRegistration()>{{'--.loginModal.toCustomerRegistration' | translateText}}</span> <span class=\"modal-login-link link\" ng-click=toBusinessRegistration()>{{'--.loginModal.toBusinessRegistration' | translateText}}</span></div></div><div class=modal-footer><button ng-disabled=loginFormParam.loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button> <button ng-disabled=loginFormParam.loading id=login-modal-btn-save type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.login.btn' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loginFormParam.loading\"></div>");
  $templateCache.put("js/modal/LoginModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" ng-click=close() style=float:right></button><h4 class=modal-title>{{'--.loginModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login\"><div class=help-div ng-show=\"helpMessage!=null\"><i class=\"gling-icon gling-icon-info\"></i>{{helpMessage | translateText}}</div><login-form-ctrl ng-info=loginFormParam></login-form-ctrl><table class=login-action><tr><td>{{'--.login.form.button.forgotPassword' | translateText}}</td><td><a class=link ng-click=toForgotPassword()>{{'--.login.form.button.forgotPassword.action' | translateText}}</a></td></tr><tr><td>{{'--.loginModal.notRegisterYet' | translateText}}</td><td><span class=\"modal-login-link link\" ng-click=toCustomerRegistration()>{{'--.loginModal.toCustomerRegistration' | translateText}}</span><br><span class=\"modal-login-link link\" ng-click=toBusinessRegistration()>{{'--.loginModal.toBusinessRegistration' | translateText}}</span></td></tr></table></div><div class=modal-footer><button id=login-modal-btn-save class=\"btn gling-button-dark\" ng-click=save() type=button ng-disabled=loginFormParam.loading>{{'--.generic.login.btn' | translateText}}</button><img ng-show=loginFormParam.loading src=/assets/images/modal-loading.gif></div>");
  $templateCache.put("js/modal/MessageModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{title | translateText}}</h4></div><div class=modal-body>{{message | translateText}}</div><div class=modal-footer ng-show=displaySaveButton()><button ng-disabled=loading id=modal-message-btn-valid type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.valid' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/OneFieldModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 class=modal-title>{{'--.loginModal.title' | translateText}}</h4></div><div class=\"modal-body modal-login\"><dir-field-text ng-info=text></dir-field-text></div><div class=modal-footer><button ng-disabled=loading type=button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.valid' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/PromotionModal/view.html",
    "<div class=modal-header><button class=\"btn glyphicon glyphicon-remove\" style=float:right ng-click=close()></button><h4 ng-show=update class=modal-title>{{'--.promotion.modal.title.update' | translateText}}</h4><h4 ng-hide=update class=modal-title>{{'--.promotion.modal.title.create' | translateText}}</h4></div><div class=modal-body ng-style=getHeight()><promotion-form-ctrl ng-info=promotionParam></promotion-form-ctrl></div><div class=modal-footer><button ng-disabled=loading id=promotion-modal-btn-save type=button class=\"btn gling-button-dark\" ng-click=save(false)>{{'--.generic.save' | translateText}}</button> <img src=/assets/images/modal-loading.gif ng-show=\"loading\"></div>");
  $templateCache.put("js/modal/ResizeImageMobileModal/view.html",
    "<div class=modal-body><div style=\"margin: -15px\"><image-tool-ctrl ng-info=params></image-tool-ctrl></div><button style=\"margin-top: 30px\" ng-click=save()>save</button></div>");
  $templateCache.put("js/modal/mobile/AlertModal/view.html",
    "<div class=modal-body ng-click=close()>{{message}}</div>");
  $templateCache.put("js/modal/mobile/InterestSelectionModal/view.html",
    "<div class=modal-body ng-style=getHeight()><div style=\"overflow: auto\"><div style=\"margin: 10px 0\"><div ng-repeat=\"interest in customerInterests\" ng-click=selectInterest(interest)><span class=\"home-interest gling-icon {{'gling-icon-' + interest.name}}\" ng-class=\"{'selected':interest.selected === true}\"></span> {{interest.translationName | translateText}}</div></div></div></div><div class=modal-footer><button type=button class=\"btn btn-default\" ng-click=selectInterest(null)>{{'--.interest.selection.window.nothing' | translateText}}</button> <button ng-disabled=loading type=button class=\"btn btn-default\" ng-click=close()>{{'--.generic.close' | translateText}}</button></div>");
  $templateCache.put("js/modal/mobile/LoadingModal/view.html",
    "<div class=modal-body><img src=\"/assets/images/loading_big.gif\"><br>{{'--.generic.loading' | translateText}}</div>");
  $templateCache.put("js/tool/imageTool/template.html",
    "<div class=image-tool><div><button ng-disabled=\"displayPicture !== true\" class=\"gling-button-dark js-crop menu-btn\" ng-click=zoom(true)>+</button> <button ng-disabled=\"displayPicture !== true\" class=\"gling-button-dark js-crop menu-btn\" ng-click=zoom(false)>-</button> <button class=\"gling-button-dark js-crop glyphicon glyphicon-ok\" ng-click=crop()></button></div><div class=image-tool-container><div class=image-tool-overlay style=max-width:{{canvasWidth}}px;height:{{imageToolOverlayHeight}}px><div class=image-tool-overlay-inner><div class=resize-container ng-show=\"displayPicture === true\"><span class=\"resize-handle resize-handle-nw\"></span> <span class=\"resize-handle resize-handle-ne\"></span> <img class=resize-image alt=\"image for resizing\"> <span class=\"resize-handle resize-handle-se\"></span> <span class=\"resize-handle resize-handle-sw\"></span></div></div></div></div></div>");
  $templateCache.put("js/view/admin/CategoriesAndInterests.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><div class=category_and_interest>Recherche<input ng-model=search><button ng-click=\"disabled = !disabled\">Editer</button><button ng-click=importTranslation() ng-disabled=\"translationLoading === true\">Réimporter les traductions</button><img ng-show=\"translationLoading === true\" src=/assets/images/modal-loading.gif><table><tr><td></td><td ng-repeat=\"interest in interests\">{{interest.name}}</td></tr><tr ng-repeat=\"category in getCategoryList()\"><td>{{category.translationName | translateText}}</td><td ng-repeat=\"interest in interests\"><input ng-blur=save($event,category,interest) style=width:40px value={{getPriority(category,interest)}} ng-disabled=disabled></td></tr></table></div>");
  $templateCache.put("js/view/admin/_CategoriesAndInterests.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><div class=category_and_interest>Recherche<input ng-model=\"search\"> <button ng-click=\"disabled = !disabled\">Editer</button> <button ng-click=importTranslation() ng-disabled=\"translationLoading === true\">Réimporter les traductions</button> <img ng-show=\"translationLoading === true\" src=\"/assets/images/modal-loading.gif\"><table><tr><td></td><td ng-repeat=\"interest in interests\">{{interest.name}}</td></tr><tr ng-repeat=\"category in getCategoryList()\"><td>{{category.translationName | translateText}}</td><td ng-repeat=\"interest in interests\"><input ng-disabled=disabled style=width:40px value={{getPriority(category,interest)}} ng-blur=\"save($event,category,interest)\"></td></tr></table></div>");
  $templateCache.put("js/view/admin/_adminBusiness.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><div class=admin-business-page><h1>Commerces</h1><h2>Nouveaux commerces</h2><table class=import-table><tr><td>Importer un nouveau commerce depuis une page facebook</td><td><input ng-disabled=\"importBusinessLoading === true\" ng-model=importBusinessInput placeholder=\"Url de la page à importer\"></td><td><button ng-disabled=\"importBusinessLoading === true\" ng-click=importBusinessStart()>Importer !</button> <img src=/assets/images/modal-loading.gif ng-show=\"importBusinessLoading === true\"></td></tr></table><h2>Listes des commerces Total : {{businesses.length}})</h2><img src=/assets/images/modal-loading.gif ng-show=\"businessListLoading === true\"> <button ng-click=displayMapFct(!displayMap)>Afficher la carte</button><table ng-table=tableParams class=\"table business-list-param\" ng-show=\"businessListLoading===false\"><tr ng-repeat=\"business in $data\" ng-mouseover=startAnimation(business,true) ng-mouseleave=startAnimation(business,false)><td data-title=\"'--.generic.name' | translateText\" sortable>{{business.name}}</td><td data-title=\"'--.generic.status' | translateText\" sortable>{{business.businessStatus}}</td><td data-title=\"'Création'\" sortable>{{business.creationDate | date}}</td><td data-title=\"'Followers'\" sortable>{{business.totalFollowers}}</td><td data-title=\"'Email'\" sortable>{{business.email}}</td><td data-title=\"'Publication active/total'\" sortable>{{business.nbPublicationActive}} / {{business.nbPublication}}</td><td data-title=\"'--.generic.action' | translateText\" sortable><button ng-click=toBusiness(business.id)>{{'--.admin.business.toBusiness' | translateText}}</button> <button name=admin-business-btn-confirm-publication ng-click=confirmPublication(business) ng-show=\"business.businessStatus == 'WAITING_CONFIRMATION' \">{{'--.admin.business.confirmPublication' | translateText}}</button></td></tr></table><div class=map-panel ng-show=\"displayMap === true\"><button ng-click=\"displayMap = !displayMap\">Masquer la carte</button><div><map center=\"{{mapData.center.latitude}}, {{mapData.center.longitude}}\" zoom={{mapData.zoom}}></map></div></div></div>");
  $templateCache.put("js/view/admin/_adminContact.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><h1>contacter les commerçants</h1>Sujet<br><input ng-model=dto.subject style=\"width:800px\"><br><br>Message<br><textarea ng-model=dto.message style=width:800px;height:600px></textarea><br><br><button ng-click=send()>Envoyer</button>");
  $templateCache.put("js/view/admin/_adminMap.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><h1>Cartes</h1><map center=\"{{mapData.center.latitude}}, {{mapData.center.longitude}}\" zoom={{mapData.zoom}}></map>");
  $templateCache.put("js/view/admin/_adminStat.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><div class=my-tabs><div ng-click=\"setTab('main')\" ng-class=\"{'selected':tab == 'main'}\">Statistiques</div><div ng-click=\"setTab('users')\" ng-class=\"{'selected':tab == 'users'}\">Détails utilisateurs</div><div ng-click=\"setTab('interest')\" ng-class=\"{'selected':tab == 'interest'}\">Intérêts</div></div><div ng-show=\"tab == 'main'\"><h1>Stats</h1><table class=admin_stat><tr ng-repeat=\"(title, val) in stats\"><td>{{title}}</td><td>{{val.value1}}</td><td>{{val.value2 * 100 | number:2}} %</td></tr></table><button ng-click=refreshStat()>Refrech</button></div><div ng-show=\"tab == 'users'\"><h1>User Details</h1><table><tr ng-repeat=\"detail in details\"><td>{{detail.title}} ({{detail.total}})</td><td style=\"vertical-align: top\"><donut-chart-ctrl style=\"width: 300px;height: 300px;display: inline-block\" ng-info=detail.nbSessionChartParam></donut-chart-ctrl></td><td><donut-chart-ctrl style=\"width: 300px;height: 300px;display: inline-block\" ng-info=detail.nbFollowChartParam></donut-chart-ctrl></td><td><donut-chart-ctrl style=\"width: 300px;height: 300px;display: inline-block\" ng-info=detail.nbAddressChartParam></donut-chart-ctrl></td><td><donut-chart-ctrl style=\"width: 300px;height: 300px;display: inline-block\" ng-info=detail.sharePositionChartParam></donut-chart-ctrl></td></tr><tr collapse=2><button ng-click=refreshDetails()>Refrech</button></tr></table></div><div ng-show=\"tab == 'interest'\"><h1>Intérêts</h1><donut-chart-ctrl style=\"width: 600px;height: 600px;display: inline-block\" ng-info=interestGraph1></donut-chart-ctrl><donut-chart-ctrl style=\"width: 600px;height: 600px;display: inline-block\" ng-info=interestGraph7></donut-chart-ctrl><donut-chart-ctrl style=\"width: 600px;height: 600px;display: inline-block\" ng-info=interestGraph14></donut-chart-ctrl><donut-chart-ctrl style=\"width: 600px;height: 600px;display: inline-block\" ng-info=interestGraph28></donut-chart-ctrl><button ng-click=refreshInterest()>Refrech</button></div>");
  $templateCache.put("js/view/admin/adminBusiness.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><div class=admin-business-page><h1>Commerces</h1><h2>Nouveaux commerces</h2><table class=import-table><tr><td>Importer un nouveau commerce depuis une page facebook</td><td><input ng-model=importBusinessInput placeholder=\"Url de la page &agrave; importer\" ng-disabled=\"importBusinessLoading === true\"></td><td><button ng-click=importBusinessStart() ng-disabled=\"importBusinessLoading === true\">Importer !</button><img ng-show=\"importBusinessLoading === true\" src=/assets/images/modal-loading.gif></td></tr></table><h2>Listes des commerces Total : {{businesses.length}})</h2><img ng-show=\"businessListLoading === true\" src=/assets/images/modal-loading.gif><button ng-click=displayMapFct(!displayMap)>Afficher la carte</button><table class=\"table business-list-param\" ng-show=\"businessListLoading===false\" ng-table=tableParams><tr ng-mouseover=startAnimation(business,true) ng-repeat=\"business in $data\" ng-mouseleave=startAnimation(business,false)><td data-title=\"'--.generic.name' | translateText\" sortable>{{business.name}}</td><td data-title=\"'--.generic.status' | translateText\" sortable>{{business.businessStatus}}</td><td data-title=\"'Cr&eacute;ation'\" sortable>{{business.creationDate | date}}</td><td data-title=\"'Followers'\" sortable>{{business.totalFollowers}}</td><td data-title=\"'Email'\" sortable>{{business.email}}</td><td data-title=\"'Publication active/total'\" sortable>{{business.nbPublicationActive}} / {{business.nbPublication}}</td><td data-title=\"'--.generic.action' | translateText\" sortable><button ng-click=toBusiness(business.id)>{{'--.admin.business.toBusiness' | translateText}}</button><button ng-show=\"business.businessStatus == 'WAITING_CONFIRMATION' \" ng-click=confirmPublication(business) name=admin-business-btn-confirm-publication>{{'--.admin.business.confirmPublication' | translateText}}</button></td></tr></table><div class=map-panel ng-show=\"displayMap === true\"><button ng-click=\"displayMap = !displayMap\">Masquer la carte</button><div><map center=\"{{mapData.center.latitude}}, {{mapData.center.longitude}}\" zoom={{mapData.zoom}}></map></div></div></div>");
  $templateCache.put("js/view/admin/adminContact.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><h1>contacter les commerçants</h1>Sujet<br><input ng-model=dto.subject style=width:800px><br><br>Message<br><textarea ng-model=dto.message style=width:800px;height:600px></textarea><br><br><button ng-click=send()>Envoyer</button>");
  $templateCache.put("js/view/admin/adminMap.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><h1>Cartes</h1><map center=\"{{mapData.center.latitude}}, {{mapData.center.longitude}}\" zoom={{mapData.zoom}}></map>");
  $templateCache.put("js/view/admin/adminStat.html",
    "<super-admin-menu-ctrl></super-admin-menu-ctrl><div class=my-tabs><div ng-click=\"setTab('main')\" ng-class=\"{'selected':tab == 'main'}\">Statistiques</div><div ng-click=\"setTab('users')\" ng-class=\"{'selected':tab == 'users'}\">Détails utilisateurs</div><div ng-click=\"setTab('interest')\" ng-class=\"{'selected':tab == 'interest'}\">Intérêts</div></div><div ng-show=\"tab == 'main'\"><h1>Stats</h1><table class=admin_stat><tr ng-repeat=\"(title, val) in stats\"><td>{{title}}</td><td>{{val.value1}}</td><td>{{val.value2 * 100 | number:2}} %</td></tr></table><button ng-click=refreshStat()>Refrech</button></div><div ng-show=\"tab == 'users'\"><h1>User Details</h1><table><tr ng-repeat=\"detail in details\"><td>{{detail.title}} ({{detail.total}})</td><td style=\"vertical-align: top\"><donut-chart-ctrl style=\"width: 300px;height: 300px;display: inline-block\" ng-info=detail.nbSessionChartParam></donut-chart-ctrl></td><td><donut-chart-ctrl style=\"width: 300px;height: 300px;display: inline-block\" ng-info=detail.nbFollowChartParam></donut-chart-ctrl></td><td><donut-chart-ctrl style=\"width: 300px;height: 300px;display: inline-block\" ng-info=detail.nbAddressChartParam></donut-chart-ctrl></td><td><donut-chart-ctrl style=\"width: 300px;height: 300px;display: inline-block\" ng-info=detail.sharePositionChartParam></donut-chart-ctrl></td></tr><tr collapse=2><button ng-click=refreshDetails()>Refrech</button></tr></table></div><div ng-show=\"tab == 'interest'\"><h1>Intérêts</h1><donut-chart-ctrl style=\"width: 600px;height: 600px;display: inline-block\" ng-info=interestGraph1></donut-chart-ctrl><donut-chart-ctrl style=\"width: 600px;height: 600px;display: inline-block\" ng-info=interestGraph7></donut-chart-ctrl><donut-chart-ctrl style=\"width: 600px;height: 600px;display: inline-block\" ng-info=interestGraph14></donut-chart-ctrl><donut-chart-ctrl style=\"width: 600px;height: 600px;display: inline-block\" ng-info=interestGraph28></donut-chart-ctrl><button ng-click=refreshInterest()>Refrech</button></div>");
  $templateCache.put("js/view/mobile/_business.html",
    "<div class=\"navbar navbar-app navbar-absolute-top\" ng-class=\"{'header-with-advanced-search':advancedSearch}\"><div class=\"btn-group pull-left\"><div class=\"btn btn-navbar\" ng-click=back()><div class=nav-button><i class=\"glyphicon glyphicon-chevron-left\"></i></div></div></div><div class=\"btn-group pull-right\"><div class=\"btn btn-navbar\" ng-click=followed()><div class=\"nav-button business-page-follow\"><span class=selected ng-show=business.following>{{'--.followWidget.stopFollow' | translateText}}<i class=\"gling-icon gling-icon-bell\"></i></span> <span ng-hide=business.following>{{'--.followWidget.follow' | translateText}}<i class=\"gling-icon gling-icon-bell2\"></i></span></div></div></div></div><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"scrollable-content business-mobile-page scrollable-content-body\"><div class=scrollable-content-inner><div class=business-page-header ng-style=\"{'background-image':'url('+(business.landscape | image)+')' }\"><div class=\"edit-button-container landscape-edit\"></div><table ng-click=refreshPublications()><tr><td><div class=business-page-illustration-container><img class=business-illustration ng-src=\"{{business.illustration | image}}\"><div class=edit-button-container></div></div></td><td><div class=business-page-name>{{business.name}}<div class=edit-button-container></div></div></td></tr></table></div><category-line-ctrl ng-info=categoryLineParams></category-line-ctrl><div style=\"overflow: auto\"><div class=business-tab-set><div class=business-tab style=display:inline-block ng-class=\"{'selected':tabToDisplay === tab.name}\" ng-repeat=\"tab in tab\" ng-show=tab.display() ng-click=tab.action()><i class=\"gling-icon {{tab.icon}}\"></i> {{tab.translatableName | translateText}}</div></div></div><div ng-show=\"tabToDisplay=='home'\"><div ng-show=\"myBusiness===true\"><button id=business-btn-promotion-add class=\"btn gling-button-dark\" ng-click=createPromotion() ng-disabled=\"business.businessStatus !== 'PUBLISHED'\">{{'--.business.publication.btn.promotion' | translateText}}</button> <button class=\"btn gling-button-dark\" ng-click=createNotification() ng-disabled=\"business.businessStatus !== 'PUBLISHED'\">{{'--.business.publication.btn.notification' | translateText}}</button></div><publication-list-mobile-for-business-ctrl ng-info=publicationListParam></publication-list-mobile-for-business-ctrl></div><div class=section ng-show=\"tabToDisplay=='info'\"><table class=business-info-line ng-show=\"business.description !=null && business.description.length > 0\"><tr><td colspan=2><span ng-bind-html=\"business.description | text : descriptionLimit\"></span> <span ng-show=\"business.description.length > descriptionLimitBase && descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\" class=link>{{'--.textReuction.seeMore' | translateText}}</span> <span ng-show=\"business.description.length > descriptionLimitBase && descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\" class=link>{{'--.textReuction.seeLess' | translateText}}</span></td></tr></table><table class=business-info-line><tr><td colspan=2><div class=business-info-line-action><google-map-widget-ctrl ng-info=googleMapParams></google-map-widget-ctrl></div></td></tr><tr><td><div class=business-address>{{business.address.street}}<br>{{business.address.zip}},{{business.address.city}}</div></td><td class=td-action>{{business.distance / 1000 | number:2}} Km</td></tr></table><table class=business-info-line ng-show=\"business.phone!=null\"><tr><td>{{business.phone}}</td><td class=td-action><a class=\"business-info-line-action glyphicon glyphicon-earphone\" href=tel:{{business.phone}}></a></td></tr></table><table class=business-info-line ng-show=\"business.website!=null\"><tr><td>{{'--.generic.site' | translateText}}</td><td class=td-action><a href={{business.website}} target=_blank>{{business.website}}</a></td></tr></table><table class=business-info-line ng-show=\"business.email!=null\"><tr><td>{{business.email}}</td><td class=td-action><a class=\"business-info-line-action glyphicon glyphicon-envelope\" href=mailto:{{business.email}}></a></td></tr></table><table class=business-info-line ng-show=\"displaySocialNetwork() === true\"><tr><td><div ng-show=!!business.socialNetwork.facebookLink class=business-social-network-box><a id=welcome-link-facebook href={{business.socialNetwork.facebookLink}} title=Facebook target=_blank><img src=/assets/images/social_network/facebook.png></a></div><div ng-show=!!business.socialNetwork.twitterLink class=business-social-network-box><a id=welcome-link-twitter href={{business.socialNetwork.twitterLink}} title=Twitter target=_blank><img src=/assets/images/social_network/twitter.png></a></div><div ng-show=!!business.socialNetwork.instagramLink class=business-social-network-box><a id=welcome-link-instagram href={{business.socialNetwork.instagramLink}} title=Instagram target=_blank><img src=/assets/images/social_network/instagram.png></a></div><div ng-show=!!business.socialNetwork.deliveryLink class=business-social-network-box><a id=welcome-link-delivery href={{business.socialNetwork.deliveryLink}} title=\"{{'--.business.socialNetwork.delivery' | translateText}}\" target=_blank><img src=/assets/images/social_network/delivery.png></a></div><div ng-show=!!business.socialNetwork.reservationLink class=business-social-network-box><a href={{business.socialNetwork.reservationLink}} title=\"{{'--.business.socialNetwork.reservation' | translateText}}\" target=_blank><img src=/assets/images/social_network/reservation.png></a></div><div ng-show=!!business.socialNetwork.opinionLink class=business-social-network-box><a href={{business.socialNetwork.opinionLink}} title=\"{{'--.business.socialNetwork.opinion' | translateText}}\" target=_blank><img src=/assets/images/social_network/opinion.png></a></div><div ng-show=!!business.socialNetwork.ecommerceLink class=business-social-network-box><a href={{business.socialNetwork.ecommerceLink}} title=\"{{'--.business.socialNetwork.ecommerce' | translateText}}\" target=_blank><img src=/assets/images/social_network/e_commerce.png></a></div></td></tr></table><table class=business-info-line ng-show=\"displaySchedule() === true\"><tr><td><schedule-ctrl ng-info={dto:business.schedules}></schedule-ctrl></td></tr></table></div><div class=\"section gallery-mobile\" ng-show=\"tabToDisplay=='gallery'\"><h4>{{'--.generic.gallery' | translateText}}</h4><img ng-repeat=\"image in business.galleryPictures\" style=\"margin-top: 5px\" ng-click=openGallery(image) ng-src=\"{{image | image}}\"></div></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/_businessNotification.html",
    "<mobile-title-ctrl display-menu=false title=\"'--.businessNotification.modal.title.create'\"></mobile-title-ctrl><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"section scrollable-content scrollable-content-body\"><div class=scrollable-content-inner><div class=inject-box></div><button id=promotion-modal-btn-save type=button class=\"btn gling-button-dark\" ng-click=save(false)>{{'--.generic.save' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/_customer_registration.html",
    "<mobile-title-ctrl title=\"'--.page.customer_registration.title'\" display-menu=false></mobile-title-ctrl><div class=app-body><div class=\"app-content modal-login\"><div class=scrollable><div class=\"section customer-registration scrollable-content\"><div class=modal-description>{{'--.customer.registrationModal.help.business' |translateText}}<br></div><div class=facebook-login-btn-container><button ng-click=fb_login(); class=\"facebook-login-btn btn gling-button-dark\"><img src=\"/assets/images/facebook/login_icon.png\"> <span>{{'--.loginModal.facebook.btn' |translateText}}</span></button></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><account-form-ctrl ng-info=accountParam></account-form-ctrl><div class=generic-center><button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.registration' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/_followed_business_page.html",
    "<mobile-title-ctrl display-menu=false title=\"'--.followed-business.page.title'\"></mobile-title-ctrl><div class=app-body><div class=\"app-content modal-login\"><div class=scrollable><div class=\"section customer-registration scrollable-content followed-business\"><div ng-repeat=\"business in businesses\" class=followed-business-line><div ng-click=\"navigateTo('/business/'+business.id)\"><img class=illustration ng-src=\"{{business.illustration | image}}\"> {{business.name}} {{business.followingFrom | date}}</div><div><button class=\"btn btn-xs gling-button-dark\" ng-click=stopFollow(business)>{{'--.business.follow.stopFollowing' | translateText}}</button> <button class=\"btn btn-xs gling-button-dark\" ng-click=setNotification(business)><i class=\"glyphicon glyphicon-ok\" ng-show=business.followingNotification></i> <i class=\"glyphicon glyphicon-remove\" ng-hide=business.followingNotification></i> {{'--.generic.notification' | translateText}}</button></div></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/_forgotPassword.html",
    "<mobile-title-ctrl title=\"'--.page.forgot_password.title'\" display-menu=false></mobile-title-ctrl><div class=app-body><div class=app-content><div class=scrollable><div class=\"section customer-registration scrollable-content\"><p>{{'--.forgotPassword.desc' | translateText}}</p><dir-field-text ng-info=fields.email></dir-field-text><div class=generic-center><button ng-click=save() ng-disabled=loading type=button class=\"btn gling-button-dark\">{{'--.mobile.forgotPassword.btn' | translateText}}</button></div></div></div></div></div><div class=\"navbar navbar-app navbar-absolute-bottom\"><div class=\"btn-group navbar-brand-center\"><div style=\"text-align: center;width: 100%\"><div class=\"btn btn-navbar glyphicon glyphicon-home\" ng-click=\"navigateTo('/')\"></div></div></div></div>");
  $templateCache.put("js/view/mobile/_home.html",
    "<header-search-ctrl></header-search-ctrl><div class=app-body><div class=app-content><div class=scrollable><div class=\"scrollable-content scrollable-content-body\"><div class=scrollable-content-inner><div class=home-page-interest-box><div ng-click=selectInterest()><span class=gling-button>{{'--.home.mobile.selectInterest' | translateText}}</span> <i ng-show=\"getSelectedInterest()!=null\" class=\"home-interest gling-icon {{'gling-icon-' + getSelectedInterest().name}} selected\"></i></div></div><publication-list-mobile-ctrl ng-info=publicationListCtrl></publication-list-mobile-ctrl><div class=help-div ng-show=\"emptyMessage!==null\">{{'--.home.emptyResult.'+emptyMessage | translateText}}</div><business-list-mobile-ctrl ng-info=businessListParam ng-show=\"emptyMessage!==null\"></business-list-mobile-ctrl></div></div></div></div></div><div class=\"navbar navbar-app navbar-absolute-bottom\"><div class=\"btn-group navbar-brand-center\"><div class=home-footer><div class=\"home-interest-switch home-interest-box-background\"><div><button class=\"gling-button gling-icon gling-icon-location button-with-label home-interest\" ng-class=\"{'selected':followedMode !== true}\" ng-click=setFollowingMode(false)><p>{{'--.home.localisation.help' | translateText}}</p></button></div><div><div class=onoffswitch ng-click=setFollowingMode()><label class=onoffswitch-label ng-class=\"{'followedMode':followedMode}\"><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></div><div><button class=\"gling-button gling-icon gling-icon-bell button-with-label home-interest\" ng-class=\"{'selected':followedMode === true}\" ng-click=setFollowingMode(true)><p>{{'--.home.followning.help' | translateText}}</p></button></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/_legal.html",
    "<mobile-title-ctrl title=\"'--.page.legal.title'\" display-menu=false></mobile-title-ctrl><div class=app-body><div class=\"app-content modal-login\"><div class=scrollable><div class=\"section customer-registration scrollable-content\"><p lang=fr-FR align=center><strong>CONDITIONS</strong> <strong>GENERALES d’utilisation du site Gling</strong></p><h1>Préambule</h1><p align=justify>Le site www.gling.be est géré par la société en formation Gling ayant pour mission de mettre en relation des commerces et des consommateurs et de créer une nouvelle forme d’interactivité et de suivi entre ces deux acteurs.</p><p><strong>Article</strong> <strong>1 – DEFINITIONS</strong></p><p align=justify>Dans les présentes Conditions générales d’utilisation, les mots ou groupes de mots qui suivent ont la signification définie au présent article. La définition d’un mot donné au singulier vaut lorsque le mot est utilisé au pluriel dans les Conditions générales d’utilisation et inversement. Lorsque les mots ou groupes de mots définis sont utilisés dans les présentes Conditions générales d’utilisation, la première lettre du mot (ou de chaque mot) est une majuscule. Lorsque le même mot est employé dans les Conditions générales d’utilisation sans majuscule, il n'a pas le sens donné au présent article, mais celui du langage commun.</p><p lang=fr-FR align=justify><u>Conditions générales d’utilisation</u> : le terme « Conditions générales d’utilisations » désigne le présent document.</p><p lang=fr-FR align=justify><u>Site</u> : le terme « Site » vise le site internet <a href=http://www.gling.be>www.gling.be</a>.</p><p lang=fr-FR align=justify><u>Utilisateur</u> : le terme « Utilisateur » vise toute personne, quelle qu’elle soit, utilisant le Site à quelque fin que ce soit.</p><p lang=fr-FR align=justify><u>Commerce</u> : le terme « Commerce » vise toute personne qui exerce des actes qualifiés commerciaux par la loi et qui en font leur profession habituelle, soit à titre principal, soit à titre d'appoint et enregistré comme tel sur le Site.</p><p lang=fr-FR align=justify><u>Titulaire du site</u> : le terme « Titulaire du site » vise la société en formation de droit belge Gling ou toute société issue de la restructuration de celle-ci ou toute société contrôlée par celle-ci.</p><p lang=fr-FR align=justify><u>Compte</u> : le terme « Compte » vise le compte utilisateur tel que complété par l’Utilisateur lors de son inscription.</p><p lang=fr-FR align=justify><u>Produit</u> : le terme « Produit » vise tous biens ou services susceptibles de faire l'objet d'une publication par l’intermédiaire du Site.</p><p lang=fr-FR align=justify><strong>Article</strong> <strong>2</strong> <strong>–</strong> <strong>OBJET</strong></p><p lang=fr-FR align=justify>Le présent document a pour objet de déterminer les conditions générales d’utilisation du Site.</p><p lang=fr-FR align=justify>L’Utilisateur s’engage à utiliser le Site avec toute la prudence et diligence auxquelles il est tenu, dans le respect des dispositions légales et d’ordre public, nationales et internationales et des présentes dispositions.</p><p lang=fr-FR align=justify><strong>ARTICLE 3 – ENTREE EN VIGUEUR ET DUREE</strong></p><p lang=fr-FR align=justify>Les présentes Conditions entrent en vigueur à la date de mise en ligne du Site.</p><p lang=fr-FR align=justify><strong>Article 4 – ACCEPTATION</strong></p><p lang=fr-FR align=justify>L’utilisation du Site, à quelque titre que ce soit, suppose l’acceptation pleine et entière par l’Utilisateur, quel qu’il soit, ainsi que sa compréhension des présentes Conditions, en ce compris la primauté des Conditions sur toutes autres conditions générales que l’Utilisateur du Site pourrait invoquer.</p><p lang=fr-FR align=justify>L’acceptation des présentes conditions générales d’utilisation du site internet Gling donne mandat au Titulaire d’une part de mettre en relation les commerces et les utilisateurs et d’autre part, de réaliser toutes les opérations effectuées par l’intermédiaire du Site suivant les modalités précisées ci-après.</p><p lang=fr-FR align=justify><strong>Article 5 – MODIFICATION</strong></p><p lang=fr-FR align=justify>Le Titulaire se réserve le droit de modifier périodiquement, unilatéralement et sans avis préalable les Conditions, par exemple pour les adapter aux modifications législatives et réglementaires, ou modifier les fonctionnalités proposées. L’Utilisateur devra consulter régulièrement ces Conditions pour être informé des modifications effectuées. L’Utilisateur est présumé avoir pris connaissance, accepté et compris ces modifications par la poursuite de l’utilisation du Site.</p><p lang=fr-FR align=justify><strong>Article 6 – Prestation de Services</strong></p><p align=justify>Le Site a pour finalité d’offrir aux Utilisateurs un service leur permettant de suivre l’actualité des commerces bruxellois.</p><p align=justify>A ce titre, le Site constitue une plateforme de mise en relation entre des consommateurs et/ou des commerçants. En aucun cas, le Titulaire n’assume les obligations nées de l’exécution d’un contrat de vente.</p><p align=justify>Le Titulaire est un tiers par rapport aux Commerces et intervient qu’à titre d’intermédiaire entre les Commerces et les Utilisateurs qui les ont consultés. Le Titulaire ne peut voir sa responsabilité engagée en raison de la défaillance, à quelque titre que ce soit, ou de l’exactitude des informations publiées par les Commerces.</p><p align=justify>Les engagements pris par les Commerces souhaitant partager des offres promotionnelles constituent de simples promesses faites à l’égard de l’Utilisateur et n’engagent en aucune manière le Titulaire.</p><p lang=fr-FR align=justify><strong>Article 7 – FORMULAIRE D’ENREGISTREMENT – COMPTE UTILISATEUR</strong></p><p align=justify>Pour accéder aux services fournis par le Site, l’Utilisateur doit créer un Compte. Lors de son inscription, l’Utilisateur est tenu de fournir des informations complètes et exactes et s’engage à notifier au Titulaire sans délai toute modification de celles-ci.</p><p align=justify>En s'enregistrant, l’Utilisateur référence un identifiant unique et un mot de passe nominatif strictement personnels, qu'il s'engage à conserver confidentiels.</p><p align=justify>L’Utilisateur s'engage à ne pas prendre un identifiant injurieux, contraire à l’ordre public ou aux bonnes mœurs, portant atteinte aux droits de tiers, aux lois et aux règlements en vigueur en Belgique ainsi qu’à l’image de Gling.</p><p align=justify>L’Utilisateur s'engage à ne pas créer ou utiliser d'autres comptes que celui initialement créé, que ce soit sous sa propre identité ou celle d’un tiers. Toute dérogation à cette règle devra faire l'objet d'une demande explicite de la part de l’Utilisateur et d'une autorisation expresse du Titulaire. Le fait de créer ou d’utiliser de nouveaux comptes sous sa propre identité ou celle de tiers sans avoir demandé et obtenu l'autorisation préalable du Titulaire pourra entraîner la suspension immédiate des Comptes de l’Utilisateur de tous les services associés à ce Compte conformément à l’article 10 ci-après.</p><p align=justify>L’Utilisateur est seul responsable de la confidentialité, de la sécurité et de l’usage de son identifiant et du mot de passe liés à son Compte.</p><p align=justify>Le Titulaire ne pourra être tenu responsable de quelque dommage occasionné par la mention de données erronées ou non suffisamment précises par l’Utilisateur lors de l’inscription de son Compte.</p><p><strong>Article 7 – MAJORITE</strong></p><p align=justify>L’Utilisateur déclare être majeur et disposer de la capacité d’exercice pour s’engager aux termes des présentes Conditions.</p><p align=justify>L’Utilisateur veille à s’assurer que l’accès et/ou l’utilisation de son compte par tout tiers, en ce compris des mineurs d’âge, sans son autorisation préalable est bloqué. Le Titulaire ne peut en aucune manière voir sa responsabilité engagée, à quelque titre que ce soit, en raison de l’utilisation du Site et/ou du Compte utilisateur par un mineur d’âge, par quelque moyen que ce soit.</p><p><strong>Article 8 – Utilisation du site</strong></p><p align=justify>Les Utilisateurs s’engagent à utiliser les services offerts par le Site de bonne foi et à ne pas contrevenir aux présentes conditions générales.</p><p align=justify>Les Utilisateurs s’engagent expressément à ne pas utiliser les services offerts par le Site et le Titulaire à des fins illicites et contraires aux bonnes mœurs.</p><p align=justify>A cet effet, l’Utilisateur s’engage à ne pas reproduire, sans l’autorisation préalable et exprès de son auteur, sans que cette liste ne soit exhaustive, toute œuvre, illustration, image, photographie, texte, fichier, etc., et plus généralement tout contenu protégé par des droits de propriété intellectuelle et industrielle.</p><p align=justify>L’Utilisateur s’engage à procéder à toutes les vérifications nécessaires relativement aux droits attachés aux éléments reproduits dans sa (ses) publication(s) et, le cas échéant, à obtenir l’autorisation des titulaires de ces droits.</p><p align=justify>Le Commerce s’engage à intégralement garantir le Titulaire contre tout dommage souffert, directement ou indirectement par le Titulaire du fait de son comportement.</p><p align=justify>Le Titulaire se réserve la faculté de suspendre l’accès à toute publication qu’il considère comme violant les présentes conditions générales, une norme légale ou étant contraire aux bonnes mœurs. Dans une telle hypothèse, le Titulaire notifiera à l’Utilisateur concerné, par email, la mesure de suspension, en l’invitant à mettre fin au comportement fautif identifié dans la notification.</p><p><strong>Article 9 – OBLIGATIONS DE L’UTILISATEUR</strong></p><p align=justify>L’Utilisateur a l’obligation de se conformer aux instructions, messages, règles, termes et conditions mentionnés par le Titulaire lors de son utilisation du Site.</p><p align=justify>Toute instruction et note (par ex. Questions fréquemment posées) formulées par le Titulaire doivent être respectées par les Utilisateurs dans leur version actualisée éventuellement amendée. Si les Utilisateurs ne respectent pas l’une ou l’autre de leurs obligations issues des Conditions, quelle qu’elle soit, le Titulaire peux prendre les mesures appropriées (par ex., émettre un avertissement, bloquer ou effacer le contenu, rendre inaccessible l’accès des Utilisateurs ou les avertir).</p><p align=justify>Les Utilisateurs sont responsables, sans la moindre restriction, de leur conduite personnelle lors de leur utilisation. Ceci s’applique en particulier en cas de doute sur toute contribution publiée ou tout contenu utilisé par l’Utilisateur.</p><p align=justify>En ce qui concerne plus particulièrement le Commerce, il est supposé au préalable s’assurer que ses publications ne violent pas des règlementations particulières ou ne violent pas des règles publiques ou des droits de tiers (par ex. droit d’auteur, droit visant la protection des données). Le Commerce est seul responsable du contenu de sa page personnelle. Le Titulaire n’a pas l’obligation de vérifier le caractère correct ni de vérifier la légalité de ces contenus et contributions.</p><p align=justify>En publiant du contenu sur le Site, le Commerce confère au Titulaire les droits sur celui-ci. En fonction du contenu, ceci inclut notamment le droit de conserver, adapter, modifier le contenu et le rendre public. Le Commerce ne pourra que demander l’effacement subséquent du contenu posté sur le Site s’il existe des raisons importantes et justifiées de procéder ainsi.</p><p align=justify>Le Commerce libère et décharge le Titulaire des conséquences de toute plainte qui serait introduite contre lui par des tiers du fait de la violation par lui d’une obligation ou d’un droit, sauf s’il n’en est pas l’auteur. Les coûts raisonnables de défense devront également être remboursés au Titulaire.</p><p><a name=_Ref378666875></a> <strong>Article 10 – SUSPENSION DE L’ACCES AUX SITE – SUPPRESION DU COMPTE</strong></p><p align=justify>A défaut pour l’Utilisateur visé par la mesure de suspension visée à l’article 8, de remédier à la situation dénoncée, le Titulaire lui adressera une mise en demeure de se conformer immédiatement audit article.</p><p align=justify>Si nonobstant la mise en demeure, l’Utilisateur ne met pas fin volontairement au comportement fautif dénoncé, le Titulaire supprimera, sans nouvel avis ni préavis, le Compte sans indemnité au profit de ce dernier.</p><p align=justify>Le Titulaire se réserve la faculté de refuser la ré-inscription de l’Utilisateur qui a fait l’objet d’une suppression de son Compte.</p><p align=justify>De manière générale, le Titulaire se réserve la faculté de suspendre ou d’interrompre tout ou partie de l’accès au Site, ainsi que de prendre des mesures techniques ainsi que, le cas échéant, légales, en cas présomption, dans le chef de l’Utilisateur, qu’il porte atteinte, à quelque titre que ce soit, aux intérêts du Titulaire, du Site ou de tout tiers, en ce compris à ses droits de propriété intellectuelle.</p><p align=justify><strong>Article 11 – propriété intelectuelle</strong></p><p align=justify><a name=OLE_LINK6></a> La notion de « Propriété Intellectuelle » vise tout objet et droit de propriété intellectuelle et industrielle, en ce compris (sans y être limité) les droits d’auteur, les marques, les brevets, les modèles, les banques de données, les codes sources et tout autre matériel dont Le Titulaire est propriétaire.</p><p align=justify>La structure générale du Site ainsi que l'ensemble des contenus qui y sont diffusés (à savoir notamment les images, articles, photographies, illustrations, signes distinctifs, logos, marques, vidéos, interviews, sons, textes, etc.), y incluant d’éventuelles newsletters, sont protégés par la législation nationale et internationale en matière de propriété intellectuelle, et notamment le droit d'auteur, les droits voisins, le droit des marques, le droit à l'image.</p><p align=justify>Le Titulaire se réserve explicitement les droits de propriété intellectuelle et autres droits sur son nom, son logo et son identité visuelle. Il est interdit aux tiers d’utiliser ces noms, logos et identité visuelle sans l’autorisation écrite expresse préalable du Titulaire.</p><p align=justify>Les présentes Conditions n'entraînent le transfert d'aucun droit de propriété intellectuelle aux Utilisateurs qui ne sont pas autorisés à copier, envoyer, distribuer, diffuser, vendre, publier, émettre, faire circuler, arranger ou modifier le matériel du Site autrement que dans le cadre de l’utilisation et la gestion des listes créées.</p><p align=justify>Tous les droits de reproduction sont réservés au Titulaire, y compris pour les textes, les documents téléchargeables, les représentations iconographiques et photographiques. A ce titre, à défaut d'autorisation expresse du Titulaire, il est strictement interdit d'exploiter les contenus du Site et notamment de les reproduire, représenter, modifier ou adapter en tout ou partie.</p><p align=justify>Le Titulaire est conscient que son nom et son logo pourrait être détournés abusivement par des tiers dans le cadre d’activités frauduleuses. À cet égard, le Titulaire attire l’attention de ses Utilisateurs à être vigilants et recommande dès lors de ne pas entrer en contact avec les instigateurs de ces activités frauduleuses et de ne pas envoyer d'argent ni de révéler des informations bancaires ou relatives à une carte de crédit ou à une identité à quiconque prétendant représenter le Titulaire ou entretenir une relation bancaire avec le Titulaire sans s’être assuré au préalable de vérifier l’émetteur de la demande. En cas de doute, il vous est loisible de prendre contact avec le Titulaire à l’adresse info@@gling.be.</p><p align=justify>Le Titulaire ne peut en tout état de cause être tenu pour responsable de l’utilisation abusive ou frauduleuse de son nom, de son logo ou de son adresse. Il est demandé d’informer directement les services de police compétents ou les autorités judicaires de toute activité suspecte. Ces activités peuvent également être signalées au Titulaire.</p><p align=justify><strong>Article 12 –</strong> <strong>DONNÉES PERSONNELLES</strong></p><p align=justify>Soucieuse du respect de la vie privée des Utilisateurs du Site, le Titulaire s'engage à ce que la collecte et le traitement d'informations personnelles, soient effectués au sein du Site conformément à la loi belge du 8 décembre 1992 relative à la protection de la vie privée.</p><p align=justify>Moyennant une demande envoyée par e-mail, adressée à info@@gling.be, les Utilisateurs peuvent obtenir, gratuitement, la communication écrite des données à caractère personnel les concernant ainsi que, le cas échéant, la rectification de celles qui seraient inexactes, incomplètes ou non pertinentes.</p><p align=justify>Le Titulaire s'engage à faire ses meilleurs efforts pour protéger les données à caractère personnel, afin notamment d'empêcher qu'elles soient déformées, endommagées ou communiquées à des tiers non autorisés.</p><p align=justify>Le Titulaire peut divulguer les informations personnelles des Utilisateurs sur requête d'une autorité légale ou en toute bonne foi en considérant que cette action est requise :</p><p align=justify>- pour se conformer à toute loi ou réglementation en vigueur,</p><p align=justify>- pour protéger ou défendre les droits ou les biens du Titulaire ou du Site,</p><p align=justify>- et, pour intervenir, dans des circonstances extrêmes, dans le but de protéger la sécurité personnelle de l’Utilisateur du Site ou du public.</p><p align=justify><strong>Article 13 –</strong> <strong>RESPONSABILITE</strong></p><p>La responsabilité du Titulaire ne saurait être engagée dans les cas suivants :</p><ul><li><p lang=fr-FR align=justify>difficultés de fonctionnement du Site ou interruption de ses services indépendamment de sa volonté ;</p></li></ul><ul><li><p lang=fr-FR align=justify>interruptions momentanées des services ou du Site nécessaires à leur évolution, maintenance ou mise à jour ;</p></li></ul><ul><li><p lang=fr-FR align=justify>défaillances ou dysfonctionnement du réseau Internet dans la transmission de données, messages ou documents ;</p></li></ul><p align=justify>Le Titulaire fournit des efforts raisonnables pour donner des informations exactes sur le Site, qui peuvent être modifiées et mises à jour sans préavis ni notification. Le Titulaire, ainsi que tout autre partie mentionnée sur le Site ne supportent aucune responsabilité et n’assurent aucune garantie explicite ou implicite en ce qui concerne l’absence d’erreur, de virus ou de fonctionnement défectueux du Site et/ou sur le caractère correct, raisonnable, à jour et complet du contenu du Site et des pages.</p><p align=justify>Le Titulaire ne peut en aucun cas être tenu pour responsable de tout dommage direct ou indirect dans le sens le plus large, qui surviendrait de ou serait lié à l’usage du Site.</p><p align=justify><strong>Article 14 –</strong> <strong>INFORMATION SUR LE SITE</strong></p><p>Les descriptions des produits/services présentes sur le Site sont indiquées à titre purement informative. Elles ne sauraient engager la responsabilité de Titulaire, à quelque titre que ce soit.</p><p><strong>Article 15 – FORUM et commentaires</strong></p><p align=justify>Si le Titulaire permet aux Utilisateurs de laisser des commentaires sur certaines pages du Site, ces derniers s’engagent à respecter les législations généralement applicables et notamment à ne publier aucun propos dénigrant, diffamatoire injurieux, haineux, belliqueux, raciste, xénophobe ou incitant à la discrimination, à la haine ou à la violence à l'égard d'une personne, physique ou morale, d'un groupe, d'une communauté ou de leurs membres, en raison d'une prétendue race, de la couleur, de l'ascendance ou de l'origine nationale ou ethnique de ceux-ci ou de certains d'entre.</p><p align=justify>L’Utilisateur s’interdit de poster quelques images, illustrations, liens hypertextes, photos, etc., violant une quelconque disposition légale belge ou internationale.</p><p align=justify>Le Titulaire ne pourra en aucune manière voir sa responsabilité engagée du fait de quelque information ou matériel, quel qu’il soit, posté par quelque Utilisateur que ce soit sur le Site.</p><p align=justify><strong>Article 16 – Liminatation d’utilisation</strong></p><p align=justify>Le Commerce s’interdit d’utiliser le Site :</p><ul><li><p align=justify>comme plateforme de transfert de publicité, de newsletter, de virus et/ou de spam, sans que cette liste ne soit exhaustive ;</p></li></ul><ul><li><p align=justify>afin de promouvoir, diffuser des objets dont la commercialisation est interdite ou contraire aux bonnes mœurs.</p></li></ul><p align=justify><strong>Article 17 – Liens hypertextes</strong></p><p align=justify>Les liens hypertextes mis en œuvre en direction d'autres sites internet ne sauraient engager la responsabilité du Titulaire, celui-ci n'exerçant aucun contrôle sur le contenu de ces sites.</p><p align=justify>Si le Titulaire n’est pas opposé à la création de liens hypertextes vers son site, une autorisation doit cependant être demandée et obtenue préalablement par écrit. Le Titulaire se réserve néanmoins la faculté d’exiger la suppression d’un lien vers une des pages du Site s’il estime que le maintien du lien ne correspond pas à ses missions, valeurs ou serait susceptible de lui porter préjudice.</p><p align=justify><strong>Article 18 – Cookies</strong></p><p align=justify><a name=OLE_LINK7></a> <a name=OLE_LINK8></a> Gling entend vous informer au sujet de l’usage des cookies conformément à l’article 129,1°, de la loi du 13 juin 2005 relative aux communications électroniques. Le terme « cookies » est utilisé pour désigner notamment l’ensemble des fichiers de texte, « pixels tags » ou, lors de votre utilisation de notre application, des identifiants Android ou des « IDFA » qui sont susceptibles de s’installer sur votre ordinateur lors de vos visites sur le site Gling et son application. Ces fichiers comportent des informations telles que par exemple vos préférences linguistiques, votre dernière adresse de géolocalisation, vos intérêts, ou encore des données relatives à vos interactions avec le contenu du site Gling (nombres de visites sur la plateforme, pages visitées et produits pré-réservés ou achetés, publicités sur lesquelles vous cliquez…) de manière à ce que ces informations ne doivent plus être renseignés lors de vos visites ultérieures. Ainsi, les cookies facilitent votre visite et votre navigabilité sur le site Gling et nous permettent par la même occasion de sauvegarder vos préférences et de suivre l’évolution des modes d’utilisation du site.</p><p align=justify>Vous pouvez à tout moment modifier la configuration de vos cookies (vous pouvez par exemple demander à être avertis lorsque des requêtes de cookies sont adressées à votre ordinateur, ou refuser ces cookies) en modifiant les paramètres de votre navigateur internet (Internet Explorer, Firefox, Chrome, Safari ou Opera). Il convient toutefois de constater qu'il sera dans ce cas possible que vous ne puissiez plus vous enregistrer sur le site Gling.be ou utiliser certaines fonctionnalités pour lesquelles une identification ou un encodage préalables sont requis.</p><p align=justify>Le site internet de Gling utilise les types de cookies suivants:</p><p align=justify><strong>Cookies à finalité technique</strong></p><p align=justify><a name=OLE_LINK12></a> <a name=OLE_LINK13></a> <a name=OLE_LINK14></a> Il s'agit de cookies qui sont indispensables au fonctionnement du site internet. Sans ces cookies, le site ne pourrait pas fonctionner correctement. Ces cookies ne peuvent dès lors pas être désactivés.</p><p align=justify><strong>Cookies fonctionnels</strong></p><p align=justify>Il s'agit de cookies qui servent à améliorer la fonctionnalité du site internet Gling.be et l’usage personnel que vous en faites. Il peut par exemple s'agir de cookies qui retiennent le contenu que vous avez consulté ou l’adresse électronique et le mot de passe que vous avez introduits lorsque vous vous êtes identifiés lors d'une visite précédente. L'usage de cookies fonctionnels permet à Gling d'offrir un contenu adapté à vos centres d'intérêt, ce qui vous offre un gain de temps et vous évite de devoir systématiquement vous identifier ou remplir vos informations lors de chaque nouvelle utilisation du site Gling.be.</p><p align=justify><strong>Cookies analytiques</strong></p><p align=justify>Il s’agit des cookies qui permettent de connaître l’utilisation et les performances des diverses rubriques du site Gling.be et ce afin d’en améliorer le fonctionnement.</p><p align=justify><strong>Cookies publicitaires</strong></p><p align=justify>Il s’agit des cookies qui permettent de choisir en temps réel la publicité afficher sur des sites tiers, en fonction des contenus et services que vous avez consultés précédemment ou de vous proposer des produits et des contenus susceptibles de vous intéresser.</p><p align=justify><strong>Cookies de réseaux</strong></p><p align=justify>Enfin, les offres publiées sur Gling.be sont susceptibles d’être accompagnées d’une application informatique tierce permettant le partage de contenus par les utilisateurs de Gling sur les réseaux sociaux, tels que les boutons présents sous la mention \"Partager cette page\".</p><p align=justify>Gling décline tout contrôle sur le processus employé par les réseaux sociaux concernés (Facebook, Twitter, Google+ et Pinterest) pour collecter ces informations et nous vous invitons à consulter les politiques de confidentialité y afférentes.</p><p align=justify><strong>Article 19 – Dispositions diverses</strong></p><p align=justify>Les Utilisateurs acceptent que le Titulaire leur adresse des notifications, par courriel, par courrier postal ou par tout autre moyen de communication utile.</p><p align=justify>Si une ou plusieurs clauses des Conditions venaient à être déclarées nulles ou inapplicables, la nullité ou l’inapplicabilité ne saurait affecter la validité ou l’applicabilité des autres clauses.</p><p align=justify>Le fait que le Titulaire omette, à un moment donné, d’exiger la stricte application des Conditions, ne peut être considéré comme une renonciation aux droits dont elle dispose et n’empêchera pas le Titulaire d’en exiger la stricte observation.</p><p align=justify>Le fait que le Titulaire n’ait pas exigé le respect ou ait négligé de faire respecter une des dispositions des Conditions ne signifie pas qu’il ait renoncé aux droits qu’il détient en vertu des Conditions et n’affecte pas la validité en tout ou en partie desdites Conditions ni ne compromet l’exercice du droit du Titulaire de prendre les actions qui s’imposent.</p><p align=justify><strong>Article 20 – Loi applicable et clause attributive de compétence</strong></p><p align=justify>Sauf dérogation expresse et écrite, les Conditions sont exclusivement régis par le droit belge.</p><p align=justify>Les Utilisateurs s’efforcent de résoudre à l’amiable tout différend ou litige éventuel qui les opposeraient au Titulaire survenant à l’occasion de l’exécution des Conditions.</p><p align=justify><a name=_GoBack></a> A défaut de solution amiable, les cours et tribunaux francophones de l’arrondissement judiciaire de Bruxelles sont seuls compétents. La langue de la procédure sera le français.</p></div></div></div></div>");
  $templateCache.put("js/view/mobile/_profile.html",
    "<mobile-title-ctrl title=\"'--.page.profile.title'\" display-menu=true></mobile-title-ctrl><div class=\"app-body profile-page\"><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"section scrollable-content\"><div ui-state=activeTab default><ul class=\"nav nav-tabs\"><li ng-click=\"activeTab = 'personal'\" ng-class=\"{'active':activeTab == 'personal'}\"><a ui-set=\"{'activeTab': 1}\">{{'--.customer.profile.personalInformation' | translateText}}</a></li><li ng-click=\"activeTab = 'address'\" ng-class=\"{'active':activeTab == 'address'}\"><a ui-set=\"{'activeTab': 2}\">{{'--.customer.profile.myAddresses' | translateText}}</a></li><li ng-click=\"activeTab = 'interest'\" ng-class=\"{'active':activeTab == 'interest'}\"><a ui-set=\"{'activeTab': 3}\">{{'--.customer.profile.interest' | translateText}}</a></li></ul><div ng-show=\"activeTab == 'personal'\"><account-form-ctrl ng-info=accountParam></account-form-ctrl><button class=\"btn gling-button-dark glyphicon glyphicon-edit\" ng-show=accountParam.disabled ng-click=\"accountParam.disabled = false\">{{'--.generic.edit' |translateText}}</button> <button class=\"btn gling-button-dark\" ng-hide=accountParam.disabled ng-click=accountSave()>{{'--.generic.save' | translateText}}</button> <button class=\"btn gling-button-dark\" ng-hide=accountParam.disabled ng-click=accountCancel()>{{'--.generic.cancel' | translateText}}</button> <button ng-show=\"model.myself.loginAccount===true\" ng-click=editPassword() type=button class=\"btn gling-button-dark\">{{'--.changePasswordModal.title' | translateText}}</button><table class=profile-social-network-table><tr><th colspan=2>Lien avec vos réseaux sociaux</th></tr><tr><td><img src=\"assets/images/social_network/facebook.png\"></td><td><div class=link ng-click=fb_login(); ng-hide=\"model.myself.facebookAccount===true\">{{'--.profile.facebook.btn' |translateText}}</div><div ng-show=\"model.myself.facebookAccount===true\">Lié au compte facebook {{model.myself.facebookCredential.firstname}} {{model.myself.facebookCredential.lastname}}</div></td></tr></table></div><div ng-show=\"activeTab == 'address'\"><button class=\"btn gling-button-dark\" ng-click=addAddress()>{{'--.customer.profile.address.create' | translateText}}</button><div class=\"panel panel-gling\" ng-repeat=\"address in model.myself.addresses\"><div class=panel-heading>{{address.name}}</div><div class=panel-body><div class=address-box><div><span>{{'--.generic.street' | translateText}}</span>{{address.street}}</div><div><span>{{'--.generic.zip' | translateText}}</span>{{address.zip}}</div><div><span>{{'--.generic.city' | translateText}}</span>{{address.city}}</div><div><span>{{'--.generic.country' | translateText}}</span>{{address.country}}</div></div><button class=\"btn gling-button-dark glyphicon glyphicon-edit\" ng-click=editAddress(address)>{{'--.generic.edit' | translateText}}</button> <button class=\"btn gling-button-dark glyphicon glyphicon-remove\" ng-click=deleteAddress(address)>{{'--.generic.remove' |translateText}}</button></div></div></div><div ng-show=\"activeTab == 'interest'\"><div ng-repeat=\"interest in model.myself.customerInterests\" ng-show=interestParam.disabled class=category-box><span class=\"{{'gling-icon gling-icon-' + interest.name}}\"></span> {{interest.translationName |translateText}}</div><customer-interest-form-ctrl ng-hide=interestParam.disabled ng-info=interestParam></customer-interest-form-ctrl><button class=\"btn gling-button-dark glyphicon glyphicon-edit\" ng-show=interestParam.disabled ng-click=\"interestParam.disabled = false\">{{'--.generic.edit' |translateText}}</button> <button class=\"btn gling-button-dark\" ng-hide=interestParam.disabled ng-click=interestSave()>{{'--.generic.save' | translateText}}</button> <button class=\"btn gling-button-dark\" ng-hide=interestParam.disabled ng-click=\"interestParam.disabled = true\">{{'--.generic.cancel' | translateText}}</button></div></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/_promotion.html",
    "<mobile-title-ctrl display-menu=false title=\"'--.promotion.modal.title.create'\"></mobile-title-ctrl><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"section scrollable-content scrollable-content-body\"><div class=scrollable-content-inner><div class=inject-box></div><button id=promotion-modal-btn-save type=button class=\"btn gling-button-dark\" ng-click=save(false)>{{'--.generic.save' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/_search_page.html",
    "<header-search-ctrl display-menu=false></header-search-ctrl><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"scrollable-content scrollable-content-body\"><div ng-show=\"results == null\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-hide=\"results==null\"><tabset><tab ng-show=businessTab.display active=businessTab.active><tab-heading>{{'--.generic.business' | translateText}} ({{businessTab.totalToDisplay}})</tab-heading><business-list-mobile-ctrl ng-info={data:businessTab.data}></business-list-mobile-ctrl></tab><tab ng-show=publicationTab.display active=publicationTab.active><tab-heading>{{'--.generic.publication' | translateText}} ({{publicationTab.totalToDisplay}})</tab-heading><publication-list-mobile-ctrl ng-info={data:publicationTab.data}></publication-list-mobile-ctrl></tab><tab ng-show=categoryTab.display active=categoryTab.active><tab-heading>{{'--.generic.category' | translateText}} ({{categoryTab.totalToDisplay}})</tab-heading><div ng-show=\"categoryTab == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"(cat,value) in categoryTab.data\"><span class=\"search-category link search-category-lev1\" ng-click=\"navigateTo('/search/category:'+cat)\"></span> <span ng-repeat=\"(sCat,value2) in value\"><span class=\"search-category link search-category-lev2\" ng-click=\"navigateTo('/search/category:'+sCat)\"></span> <span ng-repeat=\"(ssCat,value3) in value2\"><span class=\"search-category link search-category-lev3\" ng-click=\"navigateTo('/search/category:'+ssCat)\">{{cat | translateText}} >> {{sCat | translateText}} >> {{ssCat | translateText}}</span><business-list-mobile-ctrl ng-info={data:value3,loading:false}></business-list-mobile-ctrl></span></span></div></tab></tabset></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/_welcome.html",
    "<div class=app-body><div class=\"app-content modal-login welcome-page\"><div class=scrollable><div class=\"section customer-registration scrollable-content\"><div class=welcome-header><select class=gling-button-light ng-model=languageService.currentLanguage ng-options=\"lang.code as lang.language for lang in languageService.languages\"></select><div><span class=\"logo gling-icon gling-icon-logoapp button-with-label\"></span><h2>What's up in my shops</h2></div></div><h3>{{'--.mobile.welcome.registration.desc' |translateText}}</h3><div class=generic-center><button class=gling-button-dark ng-click=\"navigateTo('/customer_registration')\">{{'--.mobile.welcome.toCustomerRegistration.btn' | translateText}}</button></div><div class=separator></div><h3>{{'--.mobile.welcome.login.desc' | translateText}}</h3><login-form-ctrl ng-info=loginFormParam></login-form-ctrl><div class=generic-center><button ng-click=login() ng-disabled=loading type=button class=gling-button-dark>{{'--.mobile.welcome.login.btn' | translateText}}</button></div><div class=link style=\"display: inline-block\" ng-click=\"navigateTo('/forgot_password')\">{{'--.login.form.button.forgotPassword' | translateText}}</div></div></div></div></div>");
  $templateCache.put("js/view/mobile/business.html",
    "<div class=\"navbar navbar-app navbar-absolute-top\" ng-class=\"{'header-with-advanced-search':advancedSearch}\"><div class=\"btn-group pull-left\"><div class=\"btn btn-navbar\" ng-click=back()><div class=nav-button><i class=\"glyphicon glyphicon-chevron-left\"></i></div></div></div><div class=\"btn-group pull-right\"><div class=\"btn btn-navbar\" ng-click=followed()><div class=\"nav-button business-page-follow\"><span class=selected ng-show=business.following>{{'--.followWidget.stopFollow' | translateText}}<i class=\"gling-icon gling-icon-bell\"></i></span><span ng-hide=business.following>{{'--.followWidget.follow' | translateText}}<i class=\"gling-icon gling-icon-bell2\"></i></span></div></div></div></div><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"scrollable-content business-mobile-page scrollable-content-body\"><div class=scrollable-content-inner><div class=business-page-header ng-style=\"{'background-image':'url('+(business.landscape | image)+')' }\"><div class=\"edit-button-container landscape-edit\"></div><table ng-click=refreshPublications()><tr><td><div class=business-page-illustration-container><img class=business-illustration ng-src=\"{{business.illustration | image}}\"><div class=edit-button-container></div></div></td><td><div class=business-page-name>{{business.name}}<div class=edit-button-container></div></div></td></tr></table></div><category-line-ctrl ng-info=categoryLineParams></category-line-ctrl><div style=\"overflow: auto\"><div class=business-tab-set><div class=business-tab ng-show=tab.display() ng-class=\"{'selected':tabToDisplay === tab.name}\" ng-click=tab.action() style=display:inline-block ng-repeat=\"tab in tab\"><i class=\"gling-icon {{tab.icon}}\"></i>{{tab.translatableName | translateText}}</div></div></div><div class=business-page-content ng-show=\"tabToDisplay=='home'\"><div ng-show=\"myBusiness===true\"><button id=business-btn-promotion-add class=\"btn gling-button-dark\" ng-click=createPromotion() ng-disabled=\"business.businessStatus !== 'PUBLISHED'\">{{'--.business.publication.btn.promotion' | translateText}}</button><button class=\"btn gling-button-dark\" ng-click=createNotification() ng-disabled=\"business.businessStatus !== 'PUBLISHED'\">{{'--.business.publication.btn.notification' | translateText}}</button></div><publication-list-mobile-for-business-ctrl ng-info=publicationListParam></publication-list-mobile-for-business-ctrl></div><div class=\"business-page-content section\" ng-show=\"tabToDisplay=='info'\"><table class=business-info-line ng-show=\"business.description !=null &amp;&amp; business.description.length &gt; 0\"><tr><td colspan=2><span ng-bind-html=\"business.description | text : descriptionLimit\"></span><span class=link ng-show=\"business.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\">{{'--.textReuction.seeMore' | translateText}}</span><span class=link ng-show=\"business.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\">{{'--.textReuction.seeLess' | translateText}}</span></td></tr></table><table class=business-info-line><tr><td colspan=2><div class=business-info-line-action><google-map-widget-ctrl ng-info=googleMapParams></google-map-widget-ctrl></div></td></tr><tr><td><div class=business-address>{{business.address.street}}<br>{{business.address.zip}},{{business.address.city}}</div></td><td class=td-action>{{business.distance / 1000 | number:2}} Km</td></tr></table><table class=business-info-line ng-show=\"business.phone!=null\"><tr><td>{{business.phone}}</td><td class=td-action><a class=\"business-info-line-action glyphicon glyphicon-earphone\" href=tel:{{business.phone}}></a></td></tr></table><table class=business-info-line ng-show=\"business.website!=null\"><tr><td>{{'--.generic.site' | translateText}}</td><td class=td-action><a href={{business.website}} target=_blank>{{business.website}}</a></td></tr></table><table class=business-info-line ng-show=\"business.email!=null\"><tr><td>{{business.email}}</td><td class=td-action><a class=\"business-info-line-action glyphicon glyphicon-envelope\" href=mailto:{{business.email}}></a></td></tr></table><table class=business-info-line ng-show=\"displaySocialNetwork() === true\"><tr><td><div class=business-social-network-box ng-show=!!business.socialNetwork.facebookLink><a id=welcome-link-facebook href={{business.socialNetwork.facebookLink}} title=Facebook target=_blank><img src=/assets/images/social_network/facebook.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.twitterLink><a id=welcome-link-twitter href={{business.socialNetwork.twitterLink}} title=Twitter target=_blank><img src=/assets/images/social_network/twitter.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.instagramLink><a id=welcome-link-instagram href={{business.socialNetwork.instagramLink}} title=Instagram target=_blank><img src=/assets/images/social_network/instagram.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.deliveryLink><a id=welcome-link-delivery href={{business.socialNetwork.deliveryLink}} title=\"{{'--.business.socialNetwork.delivery' | translateText}}\" target=_blank><img src=/assets/images/social_network/delivery.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.reservationLink><a href={{business.socialNetwork.reservationLink}} title=\"{{'--.business.socialNetwork.reservation' | translateText}}\" target=_blank><img src=/assets/images/social_network/reservation.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.opinionLink><a href={{business.socialNetwork.opinionLink}} title=\"{{'--.business.socialNetwork.opinion' | translateText}}\" target=_blank><img src=/assets/images/social_network/opinion.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.ecommerceLink><a href={{business.socialNetwork.ecommerceLink}} title=\"{{'--.business.socialNetwork.ecommerce' | translateText}}\" target=_blank><img src=/assets/images/social_network/e_commerce.png></a></div></td></tr></table><table class=business-info-line ng-show=\"displaySchedule() === true\"><tr><td><schedule-ctrl ng-info={dto:business.schedules}></schedule-ctrl></td></tr></table></div><div class=\"section gallery-mobile\" ng-show=\"tabToDisplay=='gallery'\"><h4>{{'--.generic.gallery' | translateText}}</h4><img ng-click=openGallery(image) ng-src=\"{{image | image}}\" ng-repeat=\"image in business.galleryPictures\" style=\"margin-top: 5px\"></div></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/businessNotification.html",
    "<mobile-title-ctrl display-menu=false title=\"'--.businessNotification.modal.title.create'\"></mobile-title-ctrl><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"section scrollable-content scrollable-content-body\"><div class=scrollable-content-inner><div class=inject-box></div><button id=promotion-modal-btn-save class=\"btn gling-button-dark\" ng-click=save(false) type=button>{{'--.generic.save' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/customer_registration.html",
    "<mobile-title-ctrl display-menu=false title=\"'--.page.customer_registration.title'\"></mobile-title-ctrl><div class=app-body><div class=\"app-content modal-login\"><div class=scrollable><div class=\"section customer-registration scrollable-content\"><div class=modal-description>{{'--.customer.registrationModal.help.business' |translateText}}<br></div><div class=facebook-login-btn-container><button class=\"facebook-login-btn btn gling-button-dark\" ng-click=fb_login();><img src=/assets/images/facebook/login_icon.png><span>{{'--.loginModal.facebook.btn' |translateText}}</span></button></div><table class=horizontal-split><tr><td><div></div></td><td>{{'--.generic.or' | translateText}}</td><td><div></div></td></tr></table><account-form-ctrl ng-info=accountParam></account-form-ctrl><div class=generic-center><button class=\"btn gling-button-dark\" ng-click=save()>{{'--.generic.registration' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/followed_business_page.html",
    "<mobile-title-ctrl display-menu=false title=\"'--.followed-business.page.title'\"></mobile-title-ctrl><div class=app-body><div class=\"app-content modal-login\"><div class=scrollable><div class=\"section customer-registration scrollable-content followed-business\"><div class=followed-business-line ng-repeat=\"business in businesses\"><div ng-click=\"navigateTo('/business/'+business.id)\"><img class=illustration ng-src=\"{{business.illustration | image}}\"> {{business.name}} {{business.followingFrom | date}}</div><div><button class=\"btn btn-xs gling-button-dark\" ng-click=stopFollow(business)>{{'--.business.follow.stopFollowing' | translateText}}</button><button class=\"btn btn-xs gling-button-dark\" ng-click=setNotification(business)><i class=\"glyphicon glyphicon-ok\" ng-show=business.followingNotification></i><i class=\"glyphicon glyphicon-remove\" ng-hide=business.followingNotification></i> {{'--.generic.notification' | translateText}}</button></div></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/forgotPassword.html",
    "<mobile-title-ctrl display-menu=false title=\"'--.page.forgot_password.title'\"></mobile-title-ctrl><div class=app-body><div class=app-content><div class=scrollable><div class=\"section customer-registration scrollable-content\"><p>{{'--.forgotPassword.desc' | translateText}}</p><dir-field-text ng-info=fields.email></dir-field-text><div class=generic-center><button class=\"btn gling-button-dark\" ng-click=save() type=button ng-disabled=loading>{{'--.mobile.forgotPassword.btn' | translateText}}</button></div></div></div></div></div><div class=\"navbar navbar-app navbar-absolute-bottom\"><div class=\"btn-group navbar-brand-center\"><div style=\"text-align: center;width: 100%\"><div class=\"btn btn-navbar glyphicon glyphicon-home\" ng-click=\"navigateTo('/')\"></div></div></div></div>");
  $templateCache.put("js/view/mobile/home.html",
    "<header-search-ctrl></header-search-ctrl><div class=app-body><div class=app-content><div class=scrollable><div class=\"scrollable-content scrollable-content-body\"><div class=scrollable-content-inner><div class=home-page-interest-box><div ng-click=selectInterest()><span class=gling-button>{{'--.home.mobile.selectInterest' | translateText}}</span><i class=\"home-interest gling-icon selected {{'gling-icon-' + getSelectedInterest().name}}\" ng-show=\"getSelectedInterest()!=null\"></i></div></div><publication-list-mobile-ctrl ng-info=publicationListCtrl></publication-list-mobile-ctrl><div class=help-div ng-show=\"emptyMessage!==null\">{{'--.home.emptyResult.'+emptyMessage | translateText}}</div><business-list-mobile-ctrl ng-show=\"emptyMessage!==null\" ng-info=businessListParam></business-list-mobile-ctrl></div></div></div></div></div><div class=\"navbar navbar-app navbar-absolute-bottom navbar-footer\"><div class=\"btn-group navbar-brand-center\"><div class=home-footer><div class=\"home-interest-switch home-interest-box-background\"><div><button class=\"gling-button gling-icon gling-icon-location button-with-label home-interest\" ng-class=\"{'selected':followingMode !== true}\" ng-click=setFollowingMode(false)><p>{{'--.home.localisation.help' | translateText}}</p></button></div><div><div class=onoffswitch ng-click=setFollowingMode()><label class=onoffswitch-label ng-class=\"{'followedMode':followingMode}\"><span class=onoffswitch-inner></span><span class=onoffswitch-switch></span></label></div></div><div><button class=\"gling-button gling-icon gling-icon-bell button-with-label home-interest\" ng-class=\"{'selected':followingMode === true}\" ng-click=setFollowingMode(true)><p>{{'--.home.followning.help' | translateText}}</p></button></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/profile.html",
    "<mobile-title-ctrl display-menu=true title=\"'--.page.profile.title'\"></mobile-title-ctrl><div class=\"app-body profile-page\"><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"section scrollable-content\"><div default ui-state=activeTab><ul class=\"nav nav-tabs\"><li ng-click=\"activeTab = 'personal'\" ng-class=\"{'active':activeTab == 'personal'}\"><a ui-set=\"{'activeTab': 1}\">{{'--.customer.profile.personalInformation' |translateText}}</a></li><li ng-click=\"activeTab = 'address'\" ng-class=\"{'active':activeTab == 'address'}\"><a ui-set=\"{'activeTab': 2}\">{{'--.customer.profile.myAddresses' | translateText}}</a></li><li ng-click=\"activeTab = 'interest'\" ng-class=\"{'active':activeTab == 'interest'}\"><a ui-set=\"{'activeTab': 3}\">{{'--.customer.profile.interest' | translateText}}</a></li></ul><div ng-show=\"activeTab == 'personal'\"><account-form-ctrl ng-info=accountParam></account-form-ctrl><button class=\"btn gling-button-dark glyphicon glyphicon-edit\" ng-show=accountParam.disabled ng-click=\"accountParam.disabled = false\">{{'--.generic.edit' |translateText}}</button><button class=\"btn gling-button-dark\" ng-click=accountSave() ng-hide=accountParam.disabled>{{'--.generic.save' | translateText}}</button><button class=\"btn gling-button-dark\" ng-click=accountCancel() ng-hide=accountParam.disabled>{{'--.generic.cancel' | translateText}}</button><button class=\"btn gling-button-dark\" ng-show=\"model.myself.loginAccount===true\" ng-click=editPassword() type=button>{{'--.changePasswordModal.title' | translateText}}</button><table class=profile-social-network-table><tr><th colspan=2>Lien avec vos réseaux sociaux</th></tr><tr><td><img src=assets/images/social_network/facebook.png></td><td><div class=link ng-click=fb_login(); ng-hide=\"model.myself.facebookAccount===true\">{{'--.profile.facebook.btn' |translateText}}</div><div ng-show=\"model.myself.facebookAccount===true\">Lié au compte facebook {{model.myself.facebookCredential.firstname}}{{model.myself.facebookCredential.lastname}}</div></td></tr></table></div><div ng-show=\"activeTab == 'address'\"><button class=\"btn gling-button-dark\" ng-click=addAddress()>{{'--.customer.profile.address.create' | translateText}}</button><div class=\"panel panel-gling\" ng-repeat=\"address in model.myself.addresses\"><div class=panel-heading>{{address.name}}</div><div class=panel-body><div class=address-box><div><span>{{'--.generic.street' | translateText}}</span>{{address.street}}</div><div><span>{{'--.generic.zip' | translateText}}</span>{{address.zip}}</div><div><span>{{'--.generic.city' | translateText}}</span>{{address.city}}</div><div><span>{{'--.generic.country' | translateText}}</span>{{address.country}}</div></div><button class=\"btn gling-button-dark glyphicon glyphicon-edit\" ng-click=editAddress(address)>{{'--.generic.edit' |translateText}}</button><button class=\"btn gling-button-dark glyphicon glyphicon-remove\" ng-click=deleteAddress(address)>{{'--.generic.remove' |translateText}}</button></div></div></div><div ng-show=\"activeTab == 'interest'\"><div class=category-box ng-show=interestParam.disabled ng-repeat=\"interest in model.myself.customerInterests\"><span ng-class=\"'gling-icon gling-icon-' + interest.name\"></span> {{interest.translationName |translateText}}</div><customer-interest-form-ctrl ng-hide=interestParam.disabled ng-info=interestParam></customer-interest-form-ctrl><button class=\"btn gling-button-dark glyphicon glyphicon-edit\" ng-show=interestParam.disabled ng-click=\"interestParam.disabled = false\">{{'--.generic.edit' |translateText}}</button><button class=\"btn gling-button-dark\" ng-click=interestSave() ng-hide=interestParam.disabled>{{'--.generic.save' | translateText}}</button><button class=\"btn gling-button-dark\" ng-click=\"interestParam.disabled = true\" ng-hide=interestParam.disabled>{{'--.generic.cancel' | translateText}}</button></div></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/promotion.html",
    "<mobile-title-ctrl display-menu=false title=\"'--.promotion.modal.title.create'\"></mobile-title-ctrl><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"section scrollable-content scrollable-content-body\"><div class=scrollable-content-inner><div class=inject-box></div><button id=promotion-modal-btn-save class=\"btn gling-button-dark\" ng-click=save(false) type=button>{{'--.generic.save' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/search_page.html",
    "<header-search-ctrl display-menu=false></header-search-ctrl><div class=app-body><div class=app-content><div class=body-mask ng-show=displayMask></div><div class=scrollable><div class=\"scrollable-content scrollable-content-body\"><div class=loading ng-show=\"results == null\"><img src=/assets/images/big_loading.gif></div><div ng-hide=\"results==null\"><tabset><tab ng-show=businessTab.display active=businessTab.active><tab-heading>{{'--.generic.business' | translateText}} ({{businessTab.totalToDisplay}})</tab-heading><business-list-mobile-ctrl ng-info={data:businessTab.data}></business-list-mobile-ctrl></tab><tab ng-show=publicationTab.display active=publicationTab.active><tab-heading>{{'--.generic.publication' | translateText}} ({{publicationTab.totalToDisplay}})</tab-heading><publication-list-mobile-ctrl ng-info={data:publicationTab.data}></publication-list-mobile-ctrl></tab><tab ng-show=categoryTab.display active=categoryTab.active><tab-heading>{{'--.generic.category' | translateText}} ({{categoryTab.totalToDisplay}})</tab-heading><div ng-show=\"categoryTab == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"(cat,value) in categoryTab.data\"><span class=\"search-category link search-category-lev1\" ng-click=\"navigateTo('/search/category:'+cat)\"></span><span ng-repeat=\"(sCat,value2) in value\"><span class=\"search-category link search-category-lev2\" ng-click=\"navigateTo('/search/category:'+sCat)\"></span><span ng-repeat=\"(ssCat,value3) in value2\"><span class=\"search-category link search-category-lev3\" ng-click=\"navigateTo('/search/category:'+ssCat)\">{{cat | translateText}} >> {{sCat | translateText}} >> {{ssCat | translateText}}</span><business-list-mobile-ctrl ng-info={data:value3,loading:false}></business-list-mobile-ctrl></span></span></div></tab></tabset></div></div></div></div></div>");
  $templateCache.put("js/view/mobile/welcome.html",
    "<div class=app-body><div class=\"app-content modal-login welcome-page\"><div class=scrollable><div class=\"section customer-registration scrollable-content\"><div class=welcome-header><select class=gling-button-light ng-model=languageService.currentLanguage ng-options=\"lang.code as lang.language for lang in languageService.languages\"></select><div><span class=\"logo gling-icon gling-icon-logoapp button-with-label\"></span><h2>What's up in my shops</h2></div></div><h3>{{'--.mobile.welcome.registration.desc' |translateText}}</h3><div class=generic-center><button class=gling-button-dark ng-click=\"navigateTo('/customer_registration')\">{{'--.mobile.welcome.toCustomerRegistration.btn' | translateText}}</button></div><div class=separator></div><h3>{{'--.mobile.welcome.login.desc' | translateText}}</h3><login-form-ctrl ng-info=loginFormParam></login-form-ctrl><div class=generic-center><button class=gling-button-dark ng-click=login() type=button ng-disabled=loading>{{'--.mobile.welcome.login.btn' | translateText}}</button></div><div class=link ng-click=\"navigateTo('/forgot_password')\" style=\"display: inline-block\">{{'--.login.form.button.forgotPassword' | translateText}}</div></div></div></div></div>");
  $templateCache.put("js/view/web/_business.html",
    "<div class=container-content><to-top-ctrl></to-top-ctrl><div ng-show=\"myBusiness === true\" class=\"panel panel-gling business-management\"><div class=management-block><h4>{{'--.business.page.management.title' | translateText}} <span style=\"float: right\">{{'--.business.page.management.status' | translateText}} <span ng-class=\"'business-status-'+business.businessStatus\"></span> {{'--.business.status.'+business.businessStatus | translateText}}</span></h4><div>{{'--.business.page.edit.description' | translateText}}</div></div><div class=management-block><h4>{{'--.business.manager.progress.createPublicationTitle' | translateText}}</h4><button id=business-btn-promotion-add class=\"btn gling-button-dark\" ng-click=createPromotion() ng-disabled=\"business.businessStatus !== 'PUBLISHED'\">{{'--.business.publication.btn.promotion' | translateText}}</button> <button class=\"btn gling-button-dark\" ng-click=createNotification() ng-disabled=\"business.businessStatus !== 'PUBLISHED'\">{{'--.business.publication.btn.notification' | translateText}}</button><div ng-hide=\"business.businessStatus==='PUBLISHED'\">{{'--.business.manager.createPublication.disabled.desc' | translateText}}</div><div ng-show=\"business.businessStatus==='PUBLISHED'\">{{'--.business.manager.createPublication.enabled.desc' | translateText}}</div></div><div><div style=\"width: 49%;display: inline-block;vertical-align: top\" class=business-management-progress><h4>{{'--.business.management.progression' | translateText}}</h4><div class=business-management-progress-bar><div ng-style=\"{'width':(300 * (computeProgression()/8))+'px'}\"></div><span>{{computeProgression()}} / 8</span></div><span>{{'--.business.management.progression.desc' | translateText}}</span><br><br><div class=business-management-progress-el><input type=checkbox ng-checked=\"business.address!=null\"> <span ng-class=\"{'completed':business.address!=null}\" ng-click=editAddress() class=link>{{'--.business.manager.progress.add.address' | translateText}}</span></div><div class=business-management-progress-el><input type=checkbox ng-checked=\"numberCategories()>0\"> <span ng-class=\"{'completed':numberCategories()>0}\" ng-click=editCategory() class=link>{{'--.business.manager.progress.add.category' | translateText}}</span></div><div class=business-management-progress-el><input type=checkbox ng-checked=\"business.description!=null\"> <span ng-class=\"{'completed':business.description!=null}\" ng-click=editbusiness() class=link>{{'--.business.manager.progress.add.description' | translateText}}</span></div><div class=business-management-progress-el><input type=checkbox ng-checked=\"business.illustration!=null\"> <span ng-class=\"{'completed':business.illustration!=null}\" ng-click=editIllustration() class=link>{{'--.business.manager.progress.add.illustration' | translateText}}</span></div><div class=business-management-progress-el><input type=checkbox ng-checked=\"business.landscape!=null\"> <span ng-class=\"{'completed':business.landscape!=null}\" ng-click=editLandscape() class=link>{{'--.business.manager.progress.add.landscape' | translateText}}</span></div><div class=business-management-progress-el><input type=checkbox ng-checked=\"business.galleryPictures.length>0\"> <span ng-class=\"{'completed':business.galleryPictures.length>0}\" ng-click=editGallery() class=link>{{'--.business.manager.progress.add.gallery' | translateText}}</span></div><div class=business-management-progress-el><input type=checkbox ng-checked=\"displaySocialNetwork()\"> <span ng-class=\"{'completed':displaySocialNetwork()}\" ng-click=editSocialNetwork() class=link>{{'--.business.manager.progress.add.socialNetwork' | translateText}}</span></div><div class=business-management-progress-el><input type=checkbox ng-checked=\"displaySchedule()\"> <span ng-class=\"{'completed':displaySchedule()}\" ng-click=editSchedule() class=link>{{'--.business.manager.progress.add.schedule' | translateText}}</span></div></div><div style=\"width: 49%;display: inline-block;vertical-align: top\"><h4>{{'--.business.page.management.changeStatus' | translateText}}</h4><div class=management-block><p><span ng-show=\"business.businessStatus === 'NOT_PUBLISHED'\">{{'--.business.page.edit.description.notPublished' |translateText}}</span> <span ng-show=\"business.businessStatus === 'WAITING_CONFIRMATION'\">{{'--.business.page.edit.description.waitConfirmation' | translateText}}</span> <span ng-show=\"business.businessStatus === 'PUBLISHED'\">{{'--.business.page.edit.descriptionPublished' |translateText}}</span> <button ng-show=\"business.businessStatus === 'NOT_PUBLISHED'\" ng-click=publish() id=business-btn-publish class=\"btn gling-button-dark\">{{'--.business.page.publication' | translateText}}</button> <button ng-show=\"business.businessStatus === 'WAITING_CONFIRMATION'\" ng-click=cancelPublishRequest() class=\"btn gling-button-dark\">{{'--.business.page.cancelPublishRequest' | translateText}}</button> <button ng-show=\"business.businessStatus === 'PUBLISHED'\" ng-click=stopPublish() class=\"btn gling-button-dark\">{{'--.business.page.stopPublication' | translateText}}</button></p></div><h4>{{'--.business.page.management.help.title' | translateText}}</h4><a class=\"btn gling-button-dark\" class=\"btn gling-button-dark\" href=/assets/document/business_help.pdf target=_blank>{{'--.business.manager.progress.help' | translateText}}</a> <button class=\"btn gling-button-dark\" ng-click=openContact()>{{'--.business.page.management.contact.btn' | translateText}}</button></div></div></div><div class=onoffswitch-container ng-show=displayEditMode()><div>{{'--.business.page.edit.editSwitchDisplay' | translateText}}</div><div class=onoffswitch><input type=checkbox name=onoffswitch class=onoffswitch-checkbox id=myonoffswitchFromBusiness checked ng-model=edit><label class=onoffswitch-label for=myonoffswitchFromBusiness><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div><div>{{'--.business.page.edit.editSwitchEdit' | translateText}}</div></div><div class=business-page ng-show=\"business!=null\"><div class=business-page-header><div class=\"business-page-header-landscape editable-element\" ng-style=\"{'background-image':'url('+(business.landscape | image)+')' }\"><button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" id=business-btn-landscape-edit ng-show=edit ng-click=editLandscape()></button><div class=\"business-page-illustration-container editable-element\" ng-click=refreshPublications()><img class=business-illustration ng-src=\"{{business.illustration | image}}\"> <button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit btn-sm\" id=business-btn-illustration-edit ng-show=edit ng-click=editIllustration()></button></div><div class=\"business-page-name editable-element\" ng-click=refreshPublications()><span>{{business.name}}</span> <button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" id=business-btn-name-edit ng-show=\"edit && business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editbusiness()></button></div></div><div class=business-page-bottom><div ng-show=\"business.hasOwner===false\">{{'--.business.page.noOwner' | translateText}} <span class=business-claimed-status><span ng-show=\"myself!=null && myself.claimedBusinessId == business.id\">{{'--.business.page.noOwner.alreadyClaimed' | translateText}}</span> <span ng-show=\"myself!=null && myself.claimedBusinessId!=null && myself.claimedBusinessId != business.id\">{{'--.business.page.noOwner.alreadyClaimedOther' | translateText}}</span></span> <button ng-click=tryClaimBusiness() ng-show=\"myself == null || myself.claimedBusinessId==null\" class=\"btn gling-button-dark btn-xs\">{{'--.business.page.claims' | translateText}}</button></div><div class=business-right-column><div class=business-page-description><div><div style=\"display: inline-block\"><category-line-ctrl ng-info=categoryLineParams></category-line-ctrl></div><button ng-show=edit id=business-btn-category-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-click=editCategory()></button></div><span ng-bind-html=\"business.description | text : descriptionLimit\"></span> <span ng-show=\"business.description.length > descriptionLimitBase && descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\" class=link>{{'--.textReuction.seeMore' | translateText}}</span> <span ng-show=\"business.description.length > descriptionLimitBase && descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\" class=link>{{'--.textReuction.seeLess' | translateText}}</span><br><button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editbusiness()></button></div></div><follow-widget-ctrl ng-info={business:business}></follow-widget-ctrl></div></div><div class=business-page-body><div class=business-page-body-center><div><select ng-model=publicationListParam.type ng-options=\"option.key as option.value | translateText for option in publicationOptions\"></select><publication-list-for-business-ctrl ng-info=publicationListParam></publication-list-for-business-ctrl></div></div><div class=business-page-body-right><div class=\"panel panel-gling\" ng-show=\"edit === true || (business.galleryPictures !=null && business.galleryPictures.length > 0)\"><div class=panel-heading>{{'--.business.gallery' | translateText}}</div><div class=panel-body><gallery-ctrl ng-info={images:business.galleryPictures}></gallery-ctrl><button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" id=welcome-btn-gallery-edit ng-show=edit ng-click=editGallery()></button></div></div><div class=\"panel panel-gling\"><div class=panel-heading>{{'--.generic.address' | translateText}}</div><div class=panel-body><google-map-widget-ctrl ng-info=googleMapParams></google-map-widget-ctrl><div class=business-address><div>{{business.address.street}}<br>{{business.address.zip}}, {{business.address.city}}</div><div>{{business.distance / 1000 | number:2}} Km</div></div><button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" id=business-btn-address-edit ng-show=\"edit && business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editAddress()></button></div></div><div class=\"panel panel-gling\"><div class=panel-heading>{{'--.generic.contact' | translateText}}</div><div class=panel-body><div id=welcome-contact-data-phone>{{business.phone}}</div><div><a href={{business.website}} target=_blank id=welcome-contact-data-website>{{business.website}}</a></div><div id=welcome-contact-data-email>{{business.email}}</div><button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" id=business-btn-contact-edit ng-show=edit ng-click=editbusiness()></button></div></div><div class=\"panel panel-gling business-social-panel\" ng-show=\"edit === true || displaySocialNetwork()\"><div class=panel-heading>{{'--.generic.socialNetwork' | translateText}}</div><div class=panel-body><div ng-show=!!business.socialNetwork.facebookLink class=business-social-network-box><a id=welcome-link-facebook href={{business.socialNetwork.facebookLink}} title=Facebook target=_blank><img src=/assets/images/social_network/facebook.png></a></div><div ng-show=!!business.socialNetwork.twitterLink class=business-social-network-box><a id=welcome-link-twitter href={{business.socialNetwork.twitterLink}} title=Twitter target=_blank><img src=/assets/images/social_network/twitter.png></a></div><div ng-show=!!business.socialNetwork.instagramLink class=business-social-network-box><a id=welcome-link-instagram href={{business.socialNetwork.instagramLink}} title=Instagram target=_blank><img src=/assets/images/social_network/instagram.png></a></div><div ng-show=!!business.socialNetwork.deliveryLink class=business-social-network-box><a id=welcome-link-delivery href={{business.socialNetwork.deliveryLink}} title=\"{{'--.business.socialNetwork.delivery' | translateText}}\" target=_blank><img src=/assets/images/social_network/delivery.png></a></div><div ng-show=!!business.socialNetwork.reservationLink class=business-social-network-box><a href={{business.socialNetwork.reservationLink}} title=\"{{'--.business.socialNetwork.reservation' | translateText}}\" target=_blank><img src=/assets/images/social_network/reservation.png></a></div><div ng-show=!!business.socialNetwork.opinionLink class=business-social-network-box><a href={{business.socialNetwork.opinionLink}} title=\"{{'--.business.socialNetwork.opinion' | translateText}}\" target=_blank><img src=/assets/images/social_network/opinion.png></a></div><div ng-show=!!business.socialNetwork.ecommerceLink class=business-social-network-box><a href={{business.socialNetwork.ecommerceLink}} title=\"{{'--.business.socialNetwork.ecommerce' | translateText}}\" target=_blank><img src=/assets/images/social_network/e_commerce.png></a></div><br><button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit id=business-btn-social-network-edit ng-click=editSocialNetwork()></button></div></div><div class=\"panel panel-gling\" ng-show=\"edit === true || displaySchedule()\"><div class=panel-heading>{{'--.business.profile.businessSchedule' | translateText}}</div><div class=panel-body><schedule-ctrl ng-info={dto:business.schedules}></schedule-ctrl><button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" id=business-btn-schedule-edit ng-show=edit ng-click=editSchedule()></button></div></div></div></div></div></div>");
  $templateCache.put("js/view/web/_followed_business_page.html",
    "<div class=container-content><div class=followed-business><div class=generic-inline-block>{{'--.generic.search'| translateText}}</div><div class=generic-inline-block><input class=form-control ng-model=\"filter.$\"></div><div style=\"float: right\"><a href=# ng-click=checkAll(true)>{{'--.followed-business.checkAll' | translateText}}</a> / <a href=# ng-click=checkAll(false)>{{'--.followed-business.uncheckAll' | translateText}}</a></div><table ng-table=tableParams class=table><tr ng-repeat=\"business in $data\"><td data-title=\"'--.followedBusiness.table.business' | translateText\" sortable class=first-cell><img class=illustration ng-click=\"navigateTo('/business/'+business.id)\" ng-src=\"{{business.illustration | image}}\"><div><span class=link ng-click=\"navigateTo('/business/'+business.id)\">{{business.name}}</span><br><button class=\"btn btn-xs gling-button-dark\" ng-click=stopFollow(business)>{{'--.business.follow.stopFollowing' | translateText}}</button></div></td><td data-title=\"'--.followedBusiness.table.categories' | translateText\"><span ng-repeat=\"(catLev1Key,lev2) in business.categories\"><span ng-repeat=\"(catLev2Key, lev3) in lev2\"><span ng-repeat=\"catLev3 in lev3\">{{catLev3.translationName |translateText}} /</span></span></span></td><td data-title=\"'--.followedBusiness.table.followingFrom' | translateText\" sortable style=\"text-align: center\">{{business.followingFrom | date}}</td><td data-title=\"'--.followedBusiness.table.notification' | translateText\" sortable style=\"text-align: center\"><div><input ng-click=setNotification(business) type=checkbox ng-model=business.followingNotification></div></td></tr></table></div></div>");
  $templateCache.put("js/view/web/_home.html",
    "<div class=container-content><div class=content-block><to-top-ctrl></to-top-ctrl><div class=help-div-geolocalisation ng-show=\"displaySharePositionWarning() && openGeolocationPopup !== true\"><button class=\"help-popup-close glyphicon glyphicon-remove\" ng-click=\"openGeolocationPopup=true\"></button><p compile=\"'--.home.geolocation.notAccepted'\"></p></div><div class=home-interest-box><div>{{'--.home.interest-switch.help' | translateText}}</div><div class=\"home-interest-switch home-interest-box-background\"><div><button class=\"gling-button gling-icon gling-icon-location button-with-label home-interest\" ng-class=\"{'selected':followedMode !== true}\" ng-click=setFollowedMode(false)><p>{{'--.home.localisation.help' | translateText}}</p></button></div><div><div class=onoffswitch ng-click=setFollowedMode()><label class=onoffswitch-label ng-class=\"{'followedMode':followedMode}\"><span class=onoffswitch-inner></span> <span class=onoffswitch-switch></span></label></div></div><div><button class=\"gling-button gling-icon gling-icon-bell button-with-label home-interest\" ng-class=\"{'selected':followedMode === true}\" ng-click=setFollowedMode(true)><p>{{'--.home.followning.help' | translateText}}</p></button></div></div></div><div class=home-interest-box><div>{{'--.home.interest.help' | translateText}}</div><div class=home-interest-box-background><button class=\"gling-button home-interest button-with-label-top {{'gling-icon gling-icon-' + interest.name}}\" ng-repeat=\"interest in interestDisplayed\" ng-show=\"interest.iconName!=null\" ng-click=searchByInterest(interest) ng-class=\"{'selected':interest.selected === true}\"><p>{{interest.translationName}}</p></button></div><div class=\"home-interest-box-background home-interest-box-background-second\"><button class=\"gling-button home-interest button-with-label {{'gling-icon gling-icon-' + interest.name}}\" ng-repeat=\"interest in interestDisplayed2\" ng-show=\"interest.iconName!=null\" ng-click=searchByInterest(interest) ng-class=\"{'selected':interest.selected === true}\"><p>{{interest.translationName}}</p></button></div></div><publication-list-ctrl ng-info=publicationListCtrl></publication-list-ctrl><div class=help-div ng-show=\"emptyMessage!==null\">{{'--.home.emptyResult.'+emptyMessage | translateText}}</div><business-list-ctrl ng-info=businessListParam ng-show=\"emptyMessage!==null\"></business-list-ctrl></div></div>");
  $templateCache.put("js/view/web/_map.html",
    "<div class=\"content-block map-page\" style=\"margin-top: 100px;height:{{height}}px\"><div class=map-content><div class=\"option-panel option-panel-left\" ng-hide=\"displayFilters===true\"><button ng-click=\"displayFilters=!displayFilters\">Filtre</button></div><div class=\"option-panel option-panel-right\" ng-hide=\"displayList===true\"><button ng-click=\"displayList=!displayList\">Liste des commerces</button></div><div style=\"height:{{height}}px !important\" id=map></div><div class=filter-panel ng-show=displayFilters><span class=\"filter-panel-close glyphicon glyphicon-remove\" ng-click=\"displayFilters=false\"></span><h3>Filters</h3><div class=list-container><div class=list-container-scroll><input type=checkbox ng-model=filters.following>Uniquement les commerces suivi<br><input type=checkbox ng-model=filters.open>Uniquement les commerces actuellement ouverts<h3>Intérêts</h3><span class=link ng-click=selectAllInterest(true)>Tout sélectionner</span> / <span class=link ng-click=selectAllInterest(false)>Rien sélectionner</span><div ng-repeat=\"interest in interests\"><input type=checkbox ng-model=interest.selected> <span class=\"{{'gling-icon gling-icon-' + interest.name}}\"></span> {{interest.translationName}}</div></div></div></div><div class=displayed-business-panel ng-show=displayList><span class=\"filter-panel-close glyphicon glyphicon-remove\" ng-click=\"displayList=false\"></span><h3>Commerces</h3><div class=list-container><div class=list-container-scroll><div ng-show=\"listDisplayedBusiness.length == 0\">Pas de commerce dans cette zone</div><div ng-repeat=\"business in listDisplayedBusiness\" class=list-element ng-mouseover=startAnimation(business,true) ng-mouseleave=startAnimation(business,false)><business-for-map-ctrl ng-info={business:business}></business-for-map-ctrl></div></div></div></div></div></div>");
  $templateCache.put("js/view/web/_profile.html",
    "<div class=container-content><div class=profile-page><div class=\"panel panel-gling main-panel panel-personal-information\"><div class=panel-heading>{{'--.customer.profile.personalInformation' | translateText}}</div><div class=panel-body><account-form-ctrl ng-info=accountParam></account-form-ctrl><button class=\"btn gling-button-dark\" id=profile-personal-btn-edit ng-show=accountParam.disabled ng-click=personalEdit()>{{'--.generic.edit' |translateText}}</button> <button class=\"btn gling-button-dark\" id=profile-personal-btn-save ng-hide=accountParam.disabled ng-click=personalSave()>{{'--.generic.save' | translateText}}</button> <button id=profile-personal-btn-cancel class=\"btn gling-button-dark\" ng-hide=accountParam.disabled ng-click=personalCancel()>{{'--.generic.cancel' | translateText}}</button><div class=col-md-3 ng-show=\"model.myself.loginAccount==true\"></div><button type=button ng-show=\"model.myself.loginAccount===true\" id=profile-personal-btn-edit-password class=\"btn gling-button-dark\" ng-click=editPassword()>{{'--.changePasswordModal.title' | translateText}}</button><table class=profile-social-network-table><tr><th colspan=2>Lien avec vos réseaux sociaux</th></tr><tr><td><img src=\"assets/images/social_network/facebook.png\"></td><td><div class=link ng-click=fb_login(); ng-hide=\"model.myself.facebookAccount===true\">{{'--.profile.facebook.btn' |translateText}}</div><div ng-show=\"model.myself.facebookAccount===true\">Lié au compte facebook {{model.myself.facebookCredential.firstname}} {{model.myself.facebookCredential.lastname}}</div></td></tr></table></div></div><div class=\"panel panel-gling main-panel\"><div class=panel-heading>{{'--.customer.profile.myAddresses' | translateText}}</div><div class=panel-body><div><accordion><accordion-group class=address-container ng-repeat=\"address in model.myself.addresses\" is-open=address.isOpen><accordion-heading>{{address.name}} <i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': address.isOpen, 'glyphicon-chevron-right': !address.isOpen}\"></i></accordion-heading><div class=address-box><div><span>{{'--.generic.street' | translateText}}</span> <span>{{address.street}}</span></div><div><span>{{'--.generic.zip' | translateText}}</span> <span>{{address.zip}}</span></div><div><span>{{'--.generic.city' | translateText}}</span> <span>{{address.city}}</span></div><div><span>{{'--.generic.country' | translateText}}</span> <span>{{address.country}}</span></div></div><button class=\"btn gling-button-dark\" ng-click=editAddress(address)>{{'--.generic.edit' | translateText}}</button> <button class=\"btn gling-button-dark glyphicon glyphicon-remove\" ng-click=deleteAddress(address)>{{'--.generic.remove' |translateText}}</button></accordion-group></accordion><button id=profile-btn-address-add class=\"btn gling-button-dark\" ng-click=addAddress()>{{'--.customer.profile.create' | translateText}}</button></div></div></div><div class=\"panel panel-gling main-panel\"><div class=panel-heading>{{'--.customer.profile.interest' | translateText}}</div><div class=\"panel-body category-list\"><div><div ng-repeat=\"interest in model.myself.customerInterests\" class=category-box><span class=\"{{'gling-icon gling-icon-' + interest.name}}\"></span> {{interest.translationName |translateText}}</div><button class=\"btn gling-button-dark\" id=profile-interest-btn-edit ng-click=interestEdit()>{{'--.generic.edit' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("js/view/web/_search_page.html",
    "<div class=container-content><to-top-ctrl></to-top-ctrl><div class=search-page><div ng-show=\"results == null\" class=loading><img src=\"/assets/images/big_loading.gif\"></div><div ng-hide=\"results==null\"><tabset><tab ng-show=businessTab.display active=businessTab.active><tab-heading>{{'--.generic.business' | translateText}} ({{businessTab.totalToDisplay}})</tab-heading><business-list-ctrl ng-info={data:businessTab.data}></business-list-ctrl></tab><tab ng-show=publicationTab.display active=publicationTab.active><tab-heading>{{'--.generic.publication' | translateText}} ({{publicationTab.totalToDisplay}})</tab-heading><publication-list-ctrl ng-info={data:publicationTab.data}></publication-list-ctrl></tab><tab ng-show=categoryTab.display active=categoryTab.active><tab-heading>{{'--.generic.category' | translateText}} ({{categoryTab.totalToDisplay}})</tab-heading><div ng-show=\"categoryTab == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"(cat,value) in categoryTab.data\"><div class=\"search-category link search-category-lev1\" ng-click=\"navigateTo('/search/category:'+cat)\">{{cat | translateText}}</div><div ng-repeat=\"(sCat,value2) in value\"><div class=\"search-category link search-category-lev2\" ng-click=\"navigateTo('/search/category:'+sCat)\">{{sCat | translateText}}</div><div ng-repeat=\"(ssCat,value3) in value2\"><div class=\"search-category link search-category-lev3\" ng-click=\"navigateTo('/search/category:'+ssCat)\">{{ssCat | translateText}}</div><business-list-ctrl ng-info={data:value3,loading:false}></business-list-ctrl></div></div></div></tab></tabset></div></div></div>");
  $templateCache.put("js/view/web/business.html",
    "<div class=container-content><to-top-ctrl></to-top-ctrl><div class=\"panel panel-gling business-management\" ng-show=\"myBusiness === true\"><div class=management-block><h4>{{'--.business.page.management.title' | translateText}}<span style=\"float: right\">{{'--.business.page.management.status' | translateText}}<span ng-class=\"'business-status-'+business.businessStatus\"></span> {{'--.business.status.'+business.businessStatus | translateText}}</span></h4><div>{{'--.business.page.edit.description' | translateText}}</div></div><div class=management-block><h4>{{'--.business.manager.progress.createPublicationTitle' | translateText}}</h4><button id=business-btn-promotion-add class=\"btn gling-button-dark\" ng-click=createPromotion() ng-disabled=\"business.businessStatus !== 'PUBLISHED'\">{{'--.business.publication.btn.promotion' | translateText}}</button><button class=\"btn gling-button-dark\" ng-click=createNotification() ng-disabled=\"business.businessStatus !== 'PUBLISHED'\">{{'--.business.publication.btn.notification' | translateText}}</button><div ng-hide=\"business.businessStatus==='PUBLISHED'\">{{'--.business.manager.createPublication.disabled.desc' | translateText}}</div><div ng-show=\"business.businessStatus==='PUBLISHED'\">{{'--.business.manager.createPublication.enabled.desc' | translateText}}</div></div><div><div class=business-management-progress style=\"width: 49%;display: inline-block;vertical-align: top\"><h4>{{'--.business.management.progression' | translateText}}</h4><div class=business-management-progress-bar><div ng-style=\"{'width':(300 * (computeProgression()/8))+'px'}\"></div><span>{{computeProgression()}} / 8</span></div><span>{{'--.business.management.progression.desc' | translateText}}</span><br><br><div class=business-management-progress-el><input ng-checked=\"business.address!=null\" type=checkbox><span class=link ng-class=\"{'completed':business.address!=null}\" ng-click=editAddress()>{{'--.business.manager.progress.add.address' | translateText}}</span></div><div class=business-management-progress-el><input ng-checked=numberCategories()&gt;0 type=checkbox><span class=link ng-class=\"{'completed':numberCategories()&gt;0}\" ng-click=editCategory()>{{'--.business.manager.progress.add.category' | translateText}}</span></div><div class=business-management-progress-el><input ng-checked=\"business.description!=null\" type=checkbox><span class=link ng-class=\"{'completed':business.description!=null}\" ng-click=editbusiness()>{{'--.business.manager.progress.add.description' | translateText}}</span></div><div class=business-management-progress-el><input ng-checked=\"business.illustration!=null\" type=checkbox><span class=link ng-class=\"{'completed':business.illustration!=null}\" ng-click=editIllustration()>{{'--.business.manager.progress.add.illustration' | translateText}}</span></div><div class=business-management-progress-el><input ng-checked=\"business.landscape!=null\" type=checkbox><span class=link ng-class=\"{'completed':business.landscape!=null}\" ng-click=editLandscape()>{{'--.business.manager.progress.add.landscape' | translateText}}</span></div><div class=business-management-progress-el><input ng-checked=business.galleryPictures.length&gt;0 type=checkbox><span class=link ng-class=\"{'completed':business.galleryPictures.length&gt;0}\" ng-click=editGallery()>{{'--.business.manager.progress.add.gallery' | translateText}}</span></div><div class=business-management-progress-el><input ng-checked=displaySocialNetwork() type=checkbox><span class=link ng-class=\"{'completed':displaySocialNetwork()}\" ng-click=editSocialNetwork()>{{'--.business.manager.progress.add.socialNetwork' | translateText}}</span></div><div class=business-management-progress-el><input ng-checked=displaySchedule() type=checkbox><span class=link ng-class=\"{'completed':displaySchedule()}\" ng-click=editSchedule()>{{'--.business.manager.progress.add.schedule' | translateText}}</span></div></div><div style=\"width: 49%;display: inline-block;vertical-align: top\"><h4>{{'--.business.page.management.changeStatus' | translateText}}</h4><div class=management-block><p><span ng-show=\"business.businessStatus === 'NOT_PUBLISHED'\">{{'--.business.page.edit.description.notPublished' |translateText}}</span><span ng-show=\"business.businessStatus === 'WAITING_CONFIRMATION'\">{{'--.business.page.edit.description.waitConfirmation' | translateText}}</span><span ng-show=\"business.businessStatus === 'PUBLISHED'\">{{'--.business.page.edit.descriptionPublished' |translateText}}</span><button id=business-btn-publish class=\"btn gling-button-dark\" ng-show=\"business.businessStatus === 'NOT_PUBLISHED'\" ng-click=publish()>{{'--.business.page.publication' | translateText}}</button><button class=\"btn gling-button-dark\" ng-show=\"business.businessStatus === 'WAITING_CONFIRMATION'\" ng-click=cancelPublishRequest()>{{'--.business.page.cancelPublishRequest' | translateText}}</button><button class=\"btn gling-button-dark\" ng-show=\"business.businessStatus === 'PUBLISHED'\" ng-click=stopPublish()>{{'--.business.page.stopPublication' | translateText}}</button></p></div><h4>{{'--.business.page.management.help.title' | translateText}}</h4><a class=\"btn gling-button-dark\" href=/assets/document/business_help.pdf target=_blank>{{'--.business.manager.progress.help' | translateText}}</a><button class=\"btn gling-button-dark\" ng-click=openContact()>{{'--.business.page.management.contact.btn' | translateText}}</button></div></div></div><div class=onoffswitch-container ng-show=displayEditMode()><div>{{'--.business.page.edit.editSwitchDisplay' | translateText}}</div><div class=onoffswitch><input id=myonoffswitchFromBusiness class=onoffswitch-checkbox ng-model=edit name=onoffswitch checked type=checkbox><label class=onoffswitch-label for=myonoffswitchFromBusiness><span class=onoffswitch-inner></span><span class=onoffswitch-switch></span></label></div><div>{{'--.business.page.edit.editSwitchEdit' | translateText}}</div></div><div class=business-page ng-show=\"business!=null\"><div class=business-page-header><div class=\"business-page-header-landscape editable-element\" ng-style=\"{'background-image':'url('+(business.landscape | image)+')' }\"><button id=business-btn-landscape-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editLandscape()></button><div class=\"business-page-illustration-container editable-element\" ng-click=refreshPublications()><img class=business-illustration ng-src=\"{{business.illustration | image}}\"><button id=business-btn-illustration-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit btn-sm\" ng-show=edit ng-click=editIllustration()></button></div><div class=\"business-page-name editable-element\" ng-click=refreshPublications()><span>{{business.name}}</span><button id=business-btn-name-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=\"edit &amp;&amp; business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editbusiness()></button></div></div><div class=business-page-bottom><div ng-show=\"business.hasOwner===false\">{{'--.business.page.noOwner' | translateText}}<span class=business-claimed-status><span ng-show=\"myself!=null &amp;&amp; myself.claimedBusinessId == business.id\">{{'--.business.page.noOwner.alreadyClaimed' | translateText}}</span><span ng-show=\"myself!=null &amp;&amp; myself.claimedBusinessId!=null &amp;&amp; myself.claimedBusinessId != business.id\">{{'--.business.page.noOwner.alreadyClaimedOther' | translateText}}</span></span><button class=\"btn gling-button-dark btn-xs\" ng-show=\"myself == null || myself.claimedBusinessId==null\" ng-click=tryClaimBusiness()>{{'--.business.page.claims' | translateText}}</button></div><div class=business-right-column><div class=business-page-description><div><div style=\"display: inline-block\"><category-line-ctrl ng-info=categoryLineParams></category-line-ctrl></div><button id=business-btn-category-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editCategory()></button></div><span ng-bind-html=\"business.description | text : descriptionLimit\"></span><span class=link ng-show=\"business.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit==descriptionLimitBase\" ng-click=\"descriptionLimit = 10000\">{{'--.textReuction.seeMore' | translateText}}</span><span class=link ng-show=\"business.description.length &gt; descriptionLimitBase &amp;&amp; descriptionLimit!=descriptionLimitBase\" ng-click=\"descriptionLimit = descriptionLimitBase\">{{'--.textReuction.seeLess' | translateText}}</span><br><button class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editbusiness()></button></div></div><follow-widget-ctrl ng-info={business:business}></follow-widget-ctrl></div></div><div class=business-page-body><div class=business-page-body-center><div><select ng-model=publicationListParam.type ng-options=\"option.key as option.value | translateText for option in publicationOptions\"></select><publication-list-for-business-ctrl ng-info=publicationListParam></publication-list-for-business-ctrl></div></div><div class=business-page-body-right><div class=\"panel panel-gling\" ng-show=\"edit === true || (business.galleryPictures !=null &amp;&amp; business.galleryPictures.length &gt; 0)\"><div class=panel-heading>{{'--.business.gallery' | translateText}}</div><div class=panel-body><gallery-ctrl ng-info={images:business.galleryPictures}></gallery-ctrl><button id=welcome-btn-gallery-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editGallery()></button></div></div><div class=\"panel panel-gling\"><div class=panel-heading>{{'--.generic.address' | translateText}}</div><div class=panel-body><google-map-widget-ctrl ng-info=googleMapParams></google-map-widget-ctrl><div class=business-address><div>{{business.address.street}}<br>{{business.address.zip}}, {{business.address.city}}</div><div>{{business.distance / 1000 | number:2}} Km</div></div><button id=business-btn-address-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=\"edit &amp;&amp; business.businessStatus === 'NOT_PUBLISHED'\" ng-click=editAddress()></button></div></div><div class=\"panel panel-gling\"><div class=panel-heading>{{'--.generic.contact' | translateText}}</div><div class=panel-body><div id=welcome-contact-data-phone>{{business.phone}}</div><div><a id=welcome-contact-data-website href={{business.website}} target=_blank>{{business.website}}</a></div><div id=welcome-contact-data-email>{{business.email}}</div><button id=business-btn-contact-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editbusiness()></button></div></div><div class=\"panel panel-gling business-social-panel\" ng-show=\"edit === true || displaySocialNetwork()\"><div class=panel-heading>{{'--.generic.socialNetwork' | translateText}}</div><div class=panel-body><div class=business-social-network-box ng-show=!!business.socialNetwork.facebookLink><a id=welcome-link-facebook href={{business.socialNetwork.facebookLink}} title=Facebook target=_blank><img src=/assets/images/social_network/facebook.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.twitterLink><a id=welcome-link-twitter href={{business.socialNetwork.twitterLink}} title=Twitter target=_blank><img src=/assets/images/social_network/twitter.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.instagramLink><a id=welcome-link-instagram href={{business.socialNetwork.instagramLink}} title=Instagram target=_blank><img src=/assets/images/social_network/instagram.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.deliveryLink><a id=welcome-link-delivery href={{business.socialNetwork.deliveryLink}} title=\"{{'--.business.socialNetwork.delivery' | translateText}}\" target=_blank><img src=/assets/images/social_network/delivery.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.reservationLink><a href={{business.socialNetwork.reservationLink}} title=\"{{'--.business.socialNetwork.reservation' | translateText}}\" target=_blank><img src=/assets/images/social_network/reservation.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.opinionLink><a href={{business.socialNetwork.opinionLink}} title=\"{{'--.business.socialNetwork.opinion' | translateText}}\" target=_blank><img src=/assets/images/social_network/opinion.png></a></div><div class=business-social-network-box ng-show=!!business.socialNetwork.ecommerceLink><a href={{business.socialNetwork.ecommerceLink}} title=\"{{'--.business.socialNetwork.ecommerce' | translateText}}\" target=_blank><img src=/assets/images/social_network/e_commerce.png></a></div><br><button id=business-btn-social-network-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editSocialNetwork()></button></div></div><div class=\"panel panel-gling\" ng-show=\"edit === true || displaySchedule()\"><div class=panel-heading>{{'--.business.profile.businessSchedule' | translateText}}</div><div class=panel-body><schedule-ctrl ng-info={dto:business.schedules}></schedule-ctrl><button id=business-btn-schedule-edit class=\"btn gling-button-dark btn-xs glyphicon glyphicon-edit\" ng-show=edit ng-click=editSchedule()></button></div></div></div></div></div></div>");
  $templateCache.put("js/view/web/followed_business_page.html",
    "<div class=container-content><div class=followed-business><div class=generic-inline-block>{{'--.generic.search'| translateText}}</div><div class=generic-inline-block><input class=form-control ng-model=filter.$></div><div style=\"float: right\"><a ng-click=checkAll(true) href=#>{{'--.followed-business.checkAll' | translateText}}</a> /<a ng-click=checkAll(false) href=#>{{'--.followed-business.uncheckAll'| translateText}}</a></div><table class=table ng-table=tableParams><tr ng-repeat=\"business in $data\"><td class=first-cell data-title=\"'--.followedBusiness.table.business' | translateText\" sortable><img class=illustration ng-click=\"navigateTo('/business/'+business.id)\" ng-src=\"{{business.illustration | image}}\"><div><span class=link ng-click=\"navigateTo('/business/'+business.id)\">{{business.name}}</span><br><button class=\"btn btn-xs gling-button-dark\" ng-click=stopFollow(business)>{{'--.business.follow.stopFollowing' | translateText}}</button></div></td><td data-title=\"'--.followedBusiness.table.categories' | translateText\"><span ng-repeat=\"(catLev1Key,lev2) in business.categories\"><span ng-repeat=\"(catLev2Key, lev3) in lev2\"><span ng-repeat=\"catLev3 in lev3\">{{catLev3.translationName |translateText}} /</span></span></span></td><td data-title=\"'--.followedBusiness.table.followingFrom' | translateText\" style=\"text-align: center\" sortable>{{business.followingFrom | date}}</td><td data-title=\"'--.followedBusiness.table.notification' | translateText\" style=\"text-align: center\" sortable><div><input ng-model=business.followingNotification ng-click=setNotification(business) type=checkbox></div></td></tr></table></div></div>");
  $templateCache.put("js/view/web/home.html",
    "<div class=container-content><div class=content-block><to-top-ctrl></to-top-ctrl><div class=help-div-geolocalisation ng-show=\"displaySharePositionWarning() &amp;&amp; openGeolocationPopup !== true\"><button class=\"help-popup-close glyphicon glyphicon-remove\" ng-click=\"openGeolocationPopup=true\"></button><p compile=\"'--.home.geolocation.notAccepted'\"></p></div><div class=home-interest-box><div>{{'--.home.interest-switch.help' | translateText}}</div><div class=\"home-interest-switch home-interest-box-background\"><div><button class=\"gling-button gling-icon gling-icon-location button-with-label home-interest\" ng-class=\"{'selected':followingMode !== true}\" ng-click=setFollowedMode(false)><p>{{'--.home.localisation.help' | translateText}}</p></button></div><div><div class=onoffswitch ng-click=setFollowedMode()><label class=onoffswitch-label ng-class=\"{'followedMode':followingMode}\"><span class=onoffswitch-inner></span><span class=onoffswitch-switch></span></label></div></div><div><button class=\"gling-button gling-icon gling-icon-bell button-with-label home-interest\" ng-class=\"{'selected':followingMode === true}\" ng-click=setFollowedMode(true)><p>{{'--.home.followning.help' | translateText}}</p></button></div></div></div><div class=home-interest-box><div>{{'--.home.interest.help' | translateText}}</div><div class=home-interest-box-background><button class=\"gling-button home-interest button-with-label-top {{'gling-icon gling-icon-' + interest.name}}\" ng-show=\"interest.iconName!=null\" ng-click=searchByInterest(interest) ng-class=\"{'selected':interest.selected === true}\" ng-repeat=\"interest in interestDisplayed\"><p>{{interest.translationName}}</p></button></div><div class=\"home-interest-box-background home-interest-box-background-second\"><button class=\"gling-button home-interest button-with-label {{'gling-icon gling-icon-' + interest.name}}\" ng-show=\"interest.iconName!=null\" ng-click=searchByInterest(interest) ng-class=\"{'selected':interest.selected === true}\" ng-repeat=\"interest in interestDisplayed2\"><p>{{interest.translationName}}</p></button></div></div><publication-list-ctrl ng-info=publicationListCtrl></publication-list-ctrl><div class=help-div ng-show=\"emptyMessage!==null\">{{'--.home.emptyResult.'+emptyMessage | translateText}}</div><business-list-ctrl ng-show=\"emptyMessage!==null\" ng-info=businessListParam></business-list-ctrl></div></div>");
  $templateCache.put("js/view/web/map.html",
    "<div class=\"content-block map-page\" style=\"margin-top: 100px;height:{{height}}px\"><div class=map-content><div class=\"option-panel option-panel-left\" ng-hide=\"displayFilters===true\"><button ng-click=\"displayFilters=!displayFilters\">Filtre</button></div><div class=\"option-panel option-panel-right\" ng-hide=\"displayList===true\"><button ng-click=\"displayList=!displayList\">Liste des commerces</button></div><div id=map style=\"height:{{height}}px !important\"></div><div class=filter-panel ng-show=displayFilters><span class=\"filter-panel-close glyphicon glyphicon-remove\" ng-click=\"displayFilters=false\"></span><h3>Filters</h3><div class=list-container><div class=list-container-scroll><input ng-model=filters.following type=checkbox>Uniquement les commerces suivi<br><input ng-model=filters.open type=checkbox>Uniquement les commerces actuellement ouverts<h3>Intérêts</h3><span class=link ng-click=selectAllInterest(true)>Tout sélectionner</span> /<span class=link ng-click=selectAllInterest(false)>Rien sélectionner</span><div ng-repeat=\"interest in interests\"><input ng-model=interest.selected type=checkbox><span ng-class=\"'gling-icon gling-icon-' + interest.name\"></span> {{interest.translationName}}</div></div></div></div><div class=displayed-business-panel ng-show=displayList><span class=\"filter-panel-close glyphicon glyphicon-remove\" ng-click=\"displayList=false\"></span><h3>Commerces</h3><div class=list-container><div class=list-container-scroll><div ng-show=\"listDisplayedBusiness.length == 0\">Pas de commerce dans cette zone</div><div class=list-element ng-mouseover=startAnimation(business,true) ng-repeat=\"business in listDisplayedBusiness\" ng-mouseleave=startAnimation(business,false)><business-for-map-ctrl ng-info={business:business}></business-for-map-ctrl></div></div></div></div></div></div>");
  $templateCache.put("js/view/web/profile.html",
    "<div class=container-content><div class=profile-page><div class=\"panel panel-gling main-panel panel-personal-information\"><div class=panel-heading>{{'--.customer.profile.personalInformation' | translateText}}</div><div class=panel-body><account-form-ctrl ng-info=accountParam></account-form-ctrl><button id=profile-personal-btn-edit class=\"btn gling-button-dark\" ng-show=accountParam.disabled ng-click=personalEdit()>{{'--.generic.edit' |translateText}}</button><button id=profile-personal-btn-save class=\"btn gling-button-dark\" ng-click=personalSave() ng-hide=accountParam.disabled>{{'--.generic.save' | translateText}}</button><button id=profile-personal-btn-cancel class=\"btn gling-button-dark\" ng-click=personalCancel() ng-hide=accountParam.disabled>{{'--.generic.cancel' | translateText}}</button><div class=col-md-3 ng-show=\"model.myself.loginAccount==true\"></div><button id=profile-personal-btn-edit-password class=\"btn gling-button-dark\" ng-show=\"model.myself.loginAccount===true\" ng-click=editPassword() type=button>{{'--.changePasswordModal.title' | translateText}}</button><table class=profile-social-network-table><tr><th colspan=2>Lien avec vos réseaux sociaux</th></tr><tr><td><img src=assets/images/social_network/facebook.png></td><td><div class=link ng-click=fb_login(); ng-hide=\"model.myself.facebookAccount===true\">{{'--.profile.facebook.btn' |translateText}}</div><div ng-show=\"model.myself.facebookAccount===true\">Lié au compte facebook {{model.myself.facebookCredential.firstname}}{{model.myself.facebookCredential.lastname}}</div></td></tr></table></div></div><div class=\"panel panel-gling main-panel\"><div class=panel-heading>{{'--.customer.profile.myAddresses' | translateText}}</div><div class=panel-body><div><accordion><accordion-group class=address-container is-open=address.isOpen ng-repeat=\"address in model.myself.addresses\"><accordion-heading>{{address.name}}<i class=\"pull-right glyphicon\" ng-class=\"{'glyphicon-chevron-down': address.isOpen, 'glyphicon-chevron-right': !address.isOpen}\"></i></accordion-heading><div class=address-box><div><span>{{'--.generic.street' | translateText}}</span><span>{{address.street}}</span></div><div><span>{{'--.generic.zip' | translateText}}</span><span>{{address.zip}}</span></div><div><span>{{'--.generic.city' | translateText}}</span><span>{{address.city}}</span></div><div><span>{{'--.generic.country' | translateText}}</span><span>{{address.country}}</span></div></div><button class=\"btn gling-button-dark\" ng-click=editAddress(address)>{{'--.generic.edit' | translateText}}</button><button class=\"btn gling-button-dark glyphicon glyphicon-remove\" ng-click=deleteAddress(address)>{{'--.generic.remove' |translateText}}</button></accordion-group></accordion><button id=profile-btn-address-add class=\"btn gling-button-dark\" ng-click=addAddress()>{{'--.customer.profile.create' | translateText}}</button></div></div></div><div class=\"panel panel-gling main-panel\"><div class=panel-heading>{{'--.customer.profile.interest' | translateText}}</div><div class=\"panel-body category-list\"><div><div class=category-box ng-repeat=\"interest in model.myself.customerInterests\"><span ng-class=\"'gling-icon gling-icon-' + interest.name\"></span> {{interest.translationName |translateText}}</div><button id=profile-interest-btn-edit class=\"btn gling-button-dark\" ng-click=interestEdit()>{{'--.generic.edit' | translateText}}</button></div></div></div></div></div>");
  $templateCache.put("js/view/web/search_page.html",
    "<div class=container-content><to-top-ctrl></to-top-ctrl><div class=search-page><div class=loading ng-show=\"results == null\"><img src=/assets/images/big_loading.gif></div><div ng-hide=\"results==null\"><tabset><tab ng-show=businessTab.display active=businessTab.active><tab-heading>{{'--.generic.business' | translateText}} ({{businessTab.totalToDisplay}})</tab-heading><business-list-ctrl ng-info={data:businessTab.data}></business-list-ctrl></tab><tab ng-show=publicationTab.display active=publicationTab.active><tab-heading>{{'--.generic.publication' | translateText}} ({{publicationTab.totalToDisplay}})</tab-heading><publication-list-ctrl ng-info={data:publicationTab.data}></publication-list-ctrl></tab><tab ng-show=categoryTab.display active=categoryTab.active><tab-heading>{{'--.generic.category' | translateText}} ({{categoryTab.totalToDisplay}})</tab-heading><div ng-show=\"categoryTab == 0\">{{'--.list.nothing' | translateText}}</div><div ng-repeat=\"(cat,value) in categoryTab.data\"><div class=\"search-category link search-category-lev1\" ng-click=\"navigateTo('/search/category:'+cat)\">{{cat | translateText}}</div><div ng-repeat=\"(sCat,value2) in value\"><div class=\"search-category link search-category-lev2\" ng-click=\"navigateTo('/search/category:'+sCat)\">{{sCat | translateText}}</div><div ng-repeat=\"(ssCat,value3) in value2\"><div class=\"search-category link search-category-lev3\" ng-click=\"navigateTo('/search/category:'+ssCat)\">{{ssCat | translateText}}</div><business-list-ctrl ng-info={data:value3,loading:false}></business-list-ctrl></div></div></div></tab></tabset></div></div></div>");
  $templateCache.put("js/view/web/welcome.html",
    "<div class=container-content><div class=content-block><div class=welcome-page><div class=welcome-header><div class=\"gling-icon gling-icon-logoapp logo\"></div><p>What's up in my shops</p></div><div class=left-column><div class=event-block><img src=/assets/images/event/sn.jpg><div><div class=block-title>Saint Nicolas a aussi ses commerces de proximité favoris!</div><p>Magasins de jeux et jouets, marchand de spéculoos et même légumier pour ses carottes… Saint Nicolas aime consommer local!<br>Alors vous aussi, faites vous plaisir dans vos commerces de proximité et restez au courant de leurs actualités grâce à Gling.<br>Et… N’oubliez pas de rester sage!</p></div></div><div class=publication-block><div class=\"see-more link\" ng-click=\"goTo('/')\">Voir plus...</div><div class=block-title>Les dernières actualités de vos commerces</div><publication-list-ctrl ng-info=publicationListCtrl></publication-list-ctrl><button class=gling-button ng-click=\"goTo('/')\">Décrouvrez plus d'actualités</button></div></div><div class=right-column><div class=facebook-block><div class=block-title>Participez sur notre page Facebook!</div><div class=fb-post data-width=370 data-href=https://www.facebook.com/gling.be/posts/1695721087310165></div></div><div class=map-block><div class=\"see-more link\" ng-click=\"goTo('/map/')\">Voir plus...</div><div class=block-title>Les quartiers actifs</div><li><ul>Etterbeek</ul></li><img src=/assets/images/map/1160.png></div><div class=last-business-block><div class=block-title>Connaissez-vous ?</div><div class=welcome-business-list><div class=welcome-business-list-el ng-repeat=\"business in businesses\"><table><tr><td ng-click=\"goTo('/business/'+business.id)\" rowspan=2><img class=illustration ng-src=\"{{business.illustration | image}}\"></td><td ng-click=\"goTo('/business/'+business.id)\"><div class=title>{{business.name}}</div></td></tr><tr><td><div class=address>{{business.address.street}}, {{business.address.zip}} {{business.address.city}} - {{business.distance / 1000 | number:2}} km<br></div></td></tr></table><category-line-ctrl ng-info={categories:business.categories,level1:false}></category-line-ctrl><follow-widget-ctrl ng-info={displayText:true,business:business}></follow-widget-ctrl></div></div></div></div></div></div></div>");
}]);

myApp.controller('BasicModalCtrl', ['$scope', '$flash', '$modalInstance', 'businessService', 'accountService', 'translationService', 'param', '$compile', 'directiveName', 'save', '$timeout', 'title', function ($scope, $flash, $modalInstance, businessService, accountService, translationService, param, $compile, directiveName, save, $timeout, title) {

    $scope.title = title;

    var directive = $compile("<" + directiveName + " ng-info=\"param\"/>")($scope);

    $timeout(function () {
        $('.inject-data:first').append(directive)
    }, 1);


    $scope.loading = false;

    $scope.param = param;


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.setLoading = function(value){
        param.disabled = value;
        $scope.loading = value;
    };

    $scope.save = function () {
        var isValid = true;
        if(param.callBackSave!=null){
            param.callBackSave();
        }
        console.log(param.isValid);
        if (param.isValid != undefined) {
            isValid = param.isValid;
            param.displayErrorMessage = true;
        }
        if (isValid) {
            $scope.setLoading(true);
            save($scope.close,$scope.setLoading);
        }
    }


}]);
myApp.directive('imageToolCtrl', ['$rootScope', 'businessService', 'geolocationService', 'directiveService', '$timeout', 'fileService', '$filter', '$flash', function ($rootScope, businessService, geolocationService, directiveService, $timeout, fileService, $filter, $flash) {

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
    }]
)
;
myApp.controller('ConfirmAndShareModalCtrl', ['$scope', 'facebookService', 'businessId', 'publicationId', '$modalInstance', function ($scope, facebookService, businessId, publicationId,$modalInstance) {

    $scope.share = function () {
        facebookService.sharePublication(businessId, publicationId);
        $scope.close();
    };

    $scope.close = function () {
        $modalInstance.close();
    };

}]);