myApp.directive('scheduleFormCtrl', function ($flash, directiveService) {

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

                    scope.sections = ['e'];

                    scope.clockParam = {
                        schedule: [],
                        min: true
                    };
                    scope.clockParamMin = {
                        schedule: scope.clockParam.schedule
                    };

                    //scope.display = function (day) {
                    //    if (scope.getInfo().dto[day] == undefined) {
                    //        scope.getInfo().dto[day] = []
                    //    }
                    //    scope.currentSchedule = scope.getInfo().dto[day];
                    //    scope.clockParam.schedule = scope.currentSchedule;
                    //    scope.decompile();
                    //};


                    scope.nbPair = function (nb) {
                        if (nb / 2 == Math.round(nb / 2)) return true;
                        else return false;
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


                    scope.openSchedules = [
                        {key: 0, value: '0h00'},
                        {key: 30, value: '0h30'}
                    ]


                    //var down = false;
                    //$(document).mousedown(function () {
                    //    down = true;
                    //}).mouseup(function () {
                    //    down = false;
                    //});

                    scope.startSection = null;

                    scope.select = function (day, section) {
                        section.attendance = scope.attendance_selected;
                        scope.startSection = section;
                        scope.select_day = day;
                    };

                    $(document).mouseup(function () {
                        scope.startSection = null;
                        scope.select_day=null;
                    });

                    var sectionToString = function (section) {
                        return Math.floor(section.minutes/60%24) + 'h' + section.minutes%60;
                    };

                    scope.progress = function (event, day, section) {

                        if (scope.select_day == day) {

                            scope.infoStyle = {
                                left: event.pageX+'px',
                                top: (event.pageY-50)+'px'
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
                                    scope.selectedTiming = sectionToString(section) + " to " + sectionToString(scope.startSection);

                                }
                                else {
                                    for (var key in scope.sections[day]) {
                                        var obj = scope.sections[day][key];
                                        if (obj.minutes <= section.minutes &&
                                            obj.minutes >= scope.startSection.minutes) {
                                            obj.attendance = scope.attendance_selected;
                                        }
                                    }
                                    scope.selectedTiming = sectionToString(scope.startSection) + " to " + sectionToString(section);
                                }
                            }
                        }
                    };

                }
            }
        }
    }
})
;