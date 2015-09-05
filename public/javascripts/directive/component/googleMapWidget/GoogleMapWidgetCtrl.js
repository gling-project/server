myApp.directive('googleMapWidgetCtrl', function ($rootScope, businessService, geolocationService, directiveService, $window) {

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
                            scope.getInfo().centerMap();
                        };

                        scope.getInfo().setAddress = function(address){
                            scope.getInfo().address = address;
                            scope.getInfo().centerMap();
                        };

                        if (scope.getInfo().address != null) {


                            //test
                            scope.getInfo().centerMap = function () {
                                console.log("centerMap !! : ");
                                console.log(scope.getInfo().address);
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
});