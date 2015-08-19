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
                            scope.centerMap();
                        };

                        if (scope.getInfo().address != null) {
                            //test
                            scope.centerMap = function () {
                                scope.map = {
                                    center: {
                                        latitude: scope.getInfo().address.posx,
                                        longitude: scope.getInfo().address.posy
                                    }
                                };
                            };

                            scope.toGoogleMap = function () {

                                var address = scope.getInfo().address;
                                var url = "";
                                if (scope.getInfo().mobile) {
                                    url = "maps://www.google.be/maps/place/";
                                }
                                else {
                                    url = "https://www.google.be/maps/place/";
                                }
                                url += address.posx + ",+" + address.posy;
                                url += "/@" + address.posx + ",+" + address.posy + "," + 16 + "z";
                                $window.open(url, '_blank');
                            }
                        }
                    });

                }
            }
        }
    }
});