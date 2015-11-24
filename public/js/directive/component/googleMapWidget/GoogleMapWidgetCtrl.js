myApp.directive('googleMapWidgetCtrl', function($rootScope, businessService, geolocationService, directiveService, $timeout) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/googleMapWidget/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          return scope.$watch('getInfo().address', function() {
            scope.getInfo().refreshNow = function() {
              return scope.getInfo().centerMap();
            };
            scope.$watch('getInfo().address', function() {
              return scope.getInfo().centerMap();
            }, true);
            scope.$watch('getInfo().map', function(n) {
              return scope.getInfo().centerMap();
            });
            scope.getInfo().centerMap = function() {
              var marker;
              if (scope.getInfo().address != null) {
                scope.map = new google.maps.Map(document.getElementsByClassName('map')[0], {
                  zoom: 14,
                  disableDefaultUI: true,
                  center: {
                    lat: scope.getInfo().address.posx,
                    lng: scope.getInfo().address.posy
                  }
                });
                marker = new google.maps.Marker({});
                marker.setPosition(new google.maps.LatLng(scope.getInfo().address.posx, scope.getInfo().address.posy));
                return marker.setMap(scope.map);
              }
            };
            scope.toGoogleMap = function() {
              var iOSversion, protocol, ver;
              iOSversion = function() {
                var v;
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                  v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                  return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                }
              };
              if (navigator.platform.indexOf('iPhone') !== -1 || navigator.platform.indexOf('iPod') !== -1) {
                ver = iOSversion() || [0];
                protocol = '';
                if (ver[0] >= 6) {
                  protocol = 'maps://';
                } else {
                  protocol = 'http://';
                }
                return window.location = protocol + scope.complete('maps.apple.com/?address=');
              } else {
                return window.open(scope.complete('https://www.google.be/maps/place/'));
              }
            };
            return scope.complete = function(url) {
              var add;
              add = scope.getInfo().address.street + ',' + scope.getInfo().address.zip + ',' + scope.getInfo().address.city + ',' + scope.getInfo().address.country;
              return url += add.replace(RegExp(' ', 'g'), '+');
            };
          });
        }
      };
    }
  };
});