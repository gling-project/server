myApp.service("geolocationService", function ($rootScope, geolocation, $http, accountService, $timeout, $window) {


        this.position = null;
        this.currentPosition = null;
        this.geoPositionAlreadyComputed = false;
        var self = this;
        this.sharePosition = false;

        this.getPositionWithoutNull = function () {
            if (this.position == null) {
                return {};
            }
            return this.position;
        };

        if ($window.navigator && $window.navigator.geolocation && this.geoPositionAlreadyComputed == false) {

            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    self.currentPosition = {
                        x: position.coords.latitude,
                        y: position.coords.longitude
                    };
                    computePosition();
                    self.sharePosition = true;
                    this.geoPositionAlreadyComputed = true;
                    $timeout(function () {
                        $rootScope.$broadcast('POSITION_CHANGED');
                    }, 1);
                }, function () {
                }, {
                    maximumAge: 5 * 60 * 1000,
                    timeout: 2 * 1000
                });
        }

        var computePosition = function () {

            if (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null) {
                //if (self.currentPosition == null) {
                //
                //    $rootScope.$watch(function () {
                //        return self.currentPosition;
                //    }, function watchCallback(n, o) {
                //        if (n != null) {
                //            self.position = {
                //                x: self.currentPosition.x,
                //                y: self.currentPosition.y
                //            };
                //
                //        }
                //    });
                //
                //}
                //else {
                    self.position = angular.copy(self.currentPosition);
                //}
            }
            else {
                self.position = {
                    x: accountService.getMyself().selectedAddress.posx,
                    y: accountService.getMyself().selectedAddress.posy
                };
            }
        };

        $timeout(function () {
            computePosition();
        }, 1);

        $rootScope.$watch(function () {
            if (accountService.model.myself != null) {
                return accountService.model.myself.selectedAddress;
            }
            return null;
        }, function watchCallback(newValue, oldValue) {
            computePosition();
        });

        this.getLocationText = function () {
            if (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null) {
                if (this.currentPosition != null) {
                    return "currentPosition";
                }
                else {
                    return "default";
                }
            }
            else {
                return accountService.getMyself().selectedAddress.name;
            }
        };
    }
)
;
