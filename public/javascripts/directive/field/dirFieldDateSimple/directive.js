myApp.directive("dirFieldDateSimple", function (directiveService, $filter, generateId, $filter) {
    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/field/dirFieldDateSimple/template.html",
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
});
