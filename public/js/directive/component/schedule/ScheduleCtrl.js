myApp.directive('scheduleCtrl', function(directiveService) {
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
});