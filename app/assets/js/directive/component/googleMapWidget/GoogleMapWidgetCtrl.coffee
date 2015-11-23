myApp.directive 'googleMapWidgetCtrl', ($rootScope, businessService, geolocationService, directiveService,$timeout) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/googleMapWidget/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope
            scope.$watch 'getInfo().address', ->


                # refresh map
                scope.getInfo().refreshNow = ->
                    scope.getInfo().centerMap()

                #watch address and create map
                scope.$watch 'getInfo().address', ->
                    scope.getInfo().centerMap()
                ,true

                #watch on map
                scope.$watch 'getInfo().map', (n) ->
                    scope.getInfo().centerMap()

                #center on the map and add a marker on the address
                scope.getInfo().centerMap = ->
                    console.log 'map centre !! '
                    if scope.getInfo().address?
                        scope.map = new google.maps.Map document.getElementsByClassName('map')[0], {
                            zoom: 14
                            disableDefaultUI: true
                            center:
                                lat: scope.getInfo().address.posx
                                lng: scope.getInfo().address.posy
                        }
                        marker = new (google.maps.Marker)({})
                        marker.setPosition new (google.maps.LatLng)(scope.getInfo().address.posx, scope.getInfo().address.posy)
                        marker.setMap scope.map

                # go to google map
                scope.toGoogleMap = ->
                    iOSversion = ->
                        if /iP(hone|od|ad)/.test(navigator.platform)
                            # supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
                            v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
                            return [
                                parseInt(v[1], 10)
                                parseInt(v[2], 10)
                                parseInt(v[3] or 0, 10)
                            ]

                    if navigator.platform.indexOf('iPhone') != -1 or navigator.platform.indexOf('iPod') != -1
                        ver = iOSversion() or [ 0 ]
                        protocol = ''
                        if ver[0] >= 6
                            protocol = 'maps://'
                        else
                            protocol = 'http://'
                        #http://maps.apple.com/?address=
                        window.location = protocol + scope.complete('maps.apple.com/?address=')
                    else
                        #https://www.google.be/maps/place/
                        window.open scope.complete('https://www.google.be/maps/place/')

                scope.complete = (url) ->
                    add = scope.getInfo().address.street + ',' + scope.getInfo().address.zip + ',' + scope.getInfo().address.city + ',' + scope.getInfo().address.country
                    url += add.replace(RegExp(' ', 'g'), '+')
