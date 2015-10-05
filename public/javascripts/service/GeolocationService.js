myApp.service("geolocationService", function ($rootScope, geolocation, $http, accountService, $timeout, $rootScope, $window) {


        this.position = null;
        this.currentPosition = {};
        this.geoPositionAlreadyComputed = false;
        var self = this;
        this.sharePosition = false;


        //$http({
        //    'method': "GET",
        //    //'url': "https://freegeoip.net/json/",
        //    'url': "https://www.telize.com/geoip",
        //    'headers': "Content-Type:application/json;charset=utf-8"
        //}).success(function (data, status) {
        //    console.log("je suis position IP");
        //    if (self.currentPosition == null) {
        //        var pos = [2];
        //        pos[0] = data.latitude;
        //        pos[1] = data.longitude;
        //        self.currentPosition = {
        //            x: pos[0],
        //            y: pos[1]
        //        };
        //        computePosition();
        //        $timeout(function () {
        //            console.log("je suis position IP POSITION_CHANGED");
        //            $rootScope.$broadcast('POSITION_CHANGED');
        //        }, 1);
        //    }
        //},function(data){
        //    console.log("je suis position IP FAILEd");
        //    console.log(data);
        //});


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
                if (self.currentPosition == null) {

                    $rootScope.$watch(function () {
                        return self.currentPosition;
                    }, function watchCallback(n, o) {
                        if (n != null) {
                            self.position = {
                                x: self.currentPosition.x,
                                y: self.currentPosition.y
                            };

                        }
                    });

                }
                else {
                    self.position = {
                        x: self.currentPosition.x,
                        y: self.currentPosition.y
                    };
                }
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
                return "currentPosition";
            }
            else {
                return accountService.getMyself().selectedAddress.name;
            }
        };
    }
)
;
