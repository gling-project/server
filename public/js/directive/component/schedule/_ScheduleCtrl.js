myApp.directive('scheduleCtrl', function (directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/component/schedule/template.html",
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
                        APPOINTMENT:'attendance-appointment',
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
})
;