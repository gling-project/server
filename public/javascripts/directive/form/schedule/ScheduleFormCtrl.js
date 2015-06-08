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


                    scope.attendance_selected ='LIGHT';
                    scope.attendance_class = {
                        LIGHT:'attendance-light',
                        MODERATE:'attendance-moderate',
                        IMPORTANT:'attendance-heavy'
                    };

                    scope.selectAttendance = function(attendance){
                        scope.attendance_selected=attendance;
                    };

                    scope.sections = [];

                    scope.clockParam = {
                        schedule :scope.getInfo().dto
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
                            minutes:i*30,
                            attendance:'CLOSE'
                        });
                    }

                    scope.select = function (section,force) {
                        if (down || force) {
                            section.attendance = scope.attendance_selected
                        }
                    };
                    scope.$watch('sections',function(){
                        scope.compile();
                    },true);

                    scope.compile = function(){
                        scope.getInfo().dto.parts = [];
                        var newPart = null;
                        for (var key in scope.sections) {
                            var obj = scope.sections[key];
                            if (obj.attendance!='CLOSE') {

                                if(newPart!=null){
                                    if(newPart.attendance == obj.attendance){
                                        //extend
                                        newPart.to= obj.minutes + 30;
                                        continue;
                                    }
                                    else{
                                        scope.getInfo().dto.parts.push(newPart);
                                        newPart=null;
                                    }
                                }
                                newPart = {
                                    attendance:obj.attendance,
                                    from: obj.minutes ,
                                    to: obj.minutes + 30
                                };
                            }
                            else if(newPart!=null){
                                scope.getInfo().dto.parts.push(newPart);
                                newPart=null;
                            }


                        }
                        if(newPart!=null){
                            scope.getInfo().dto.parts.push(newPart);
                            newPart=null;
                        }
                    };

                    scope.decompile = function(){

                        for( var key in scope.getInfo().dto.parts){
                            var obj = scope.getInfo().dto.parts[key];

                            for (var key2 in scope.sections) {
                                var obj2 = scope.sections[key2];
                                if(obj2.minutes>=obj.from &&
                                    (obj2.minutes + 30)<= obj.to){
                                    obj2.attendance = obj.attendance;
                                }
                            }

                        }
                    };
                    scope.decompile();


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