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

                    //attendance-heavy
                    //attendance-moderate
                    //attendance-lightsections



                    scope.attendance_selected ='light';
                    scope.attendance_class = {
                        light:'attendance-light',
                        moderate:'attendance-moderate',
                        heavy:'attendance-heavy'
                    };

                    scope.sections = [];

                    scope.clockParam = {
                        schedule :scope.sections
                    };


                    scope.nbPair = function (nb) {
                        if (nb / 2 == Math.round(nb / 2)) return true;
                        else return false;
                    };

                    for (var i = 0; i < 48; i++) {
                        var hour = "";
                        if (scope.nbPair(i)) {
                            hour = i / 2 + "h";
                        }
                        scope.sections.push({
                            hour: hour,
                            minutes:i*30
                        });
                    }

                    scope.select = function (section,force) {
                        if (down || force) {
                            section.attendance = scope.attendance_selected
                        }
                    };

                    var down = false;
                    $(document).mousedown(function () {
                        down = true;
                    }).mouseup(function () {
                        down = false;
                    });

                }
            }
        }
    }
})
;