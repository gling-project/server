myApp.directive 'scheduleCtrl', (directiveService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/component/schedule/template.html'
    replace: true
    transclude: true
    compile: ->
        pre: (scope) ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #params
            scope.sections = []
            scope.days = [
                'MONDAY'
                'TUESDAY'
                'WEDNESDAY'
                'THURSDAY'
                'FRIDAY'
                'SATURDAY'
                'SUNDAY'
            ]
            scope.daysTranslation =
                'MONDAY': 'day_abrv_monday'
                'TUESDAY': 'day_abrv_tuesday'
                'WEDNESDAY': 'day_abrv_wednesday'
                'THURSDAY': 'day_abrv_thusday'
                'FRIDAY': 'day_abrv_friday'
                'SATURDAY': 'day_abrv_saturday'
                'SUNDAY': 'day_abrv_sunday'
            scope.attendance_class =
                APPOINTMENT: 'attendance-appointment'
                LIGHT: 'attendance-light'
                MODERATE: 'attendance-moderate'
                IMPORTANT: 'attendance-heavy'

            # return true if the number is event
            scope.isEven = (nb) ->
                !(nb % 2)

            scope.$watch 'getInfo().dto', (->

                #extract today day and hour
                console.log new Date().getDay()
                nowDay = scope.days[new Date().getDay()-1];
                nowMinutes = (new Date().getHours() * 60) + new Date().getMinutes();

                if scope.getInfo().dto? and Object.keys(scope.getInfo().dto).length > 0
                    minMinute = null
                    maxMinute = null
                    #1. looking for the min and max values
                    for day in scope.days
                        for obj in scope.getInfo().dto[day]
                            if minMinute == null or minMinute > obj.from
                                minMinute = obj.from
                            if maxMinute == null or maxMinute < obj.to
                                maxMinute = obj.to

                    if minMinute % 60 == 30
                        minMinute -= 30
                    if maxMinute % 60 == 30
                        maxMinute += 30
                    scope.hours = []
                    i = minMinute / 30
                    while i <= maxMinute / 30
                        hour = ''
                        if scope.isEven(i)
                            hour = i / 2
                        # + "h";
                        scope.hours.push text: hour
                        i++
                    displayWK = true
                    if scope.getInfo().dto['SATURDAY'].length == 0 and scope.getInfo().dto['SUNDAY'].length == 0
                        displayWK = false

                    for day in scope.days

                        #exclude weekend
                        if (day == 'SUNDAY' or day == 'SATURDAY') and displayWK == false
                            i++
                            continue

                        #create day section
                        scope.sections[day] = []
                        i = minMinute / 30

                        #create section : close by default
                        while i < maxMinute / 30
                            scope.sections[day].push
                                minutes: i * 30
                                attendance: 'CLOSE'
                            i++

                    #fill section
                    for day in scope.days
                        for obj in scope.getInfo().dto[day]
                            for obj2 in scope.sections[day]
                                if day == nowDay && obj2.minutes < nowMinutes && (obj2.minutes + 30) > nowMinutes
                                    scope.isOpenNow = true
                                if obj2.minutes >= obj.from and obj2.minutes + 30 <= obj.to
                                    obj2.attendance = obj.attendance
            ), true