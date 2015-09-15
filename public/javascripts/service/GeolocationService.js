myApp.service("geolocationService", function ($rootScope, geolocation, $http, accountService, $timeout, $rootScope, $window) {


        this.position = null;
        this.currentPosition = null;
        this.geoPositionAlreadyComputed = false;
        var self = this;
        this.sharePosition = false;
        console.log("$window.navigator catch : " + navigator.geolocation != null);
        console.log(navigator.geolocation);


        //1) test compatibility
        if (navigator.geolocation) {
            console.log('Geolocation is supported!');
        }
        else {
            console.log('Geolocation is not supported for this Browser/OS version yet.');
        }


        navigator.geolocation.watchPosition(function (position) {
            console.log("------------- this is the position");
            console.log(position);
            self.sharePosition=true;
        }, function (error) {
            console.log("------------- this is an error !! ");
            console.log(error);
        }, {
            maximumAge: 5 * 60 * 1000,
            timeout: 2 * 1000
        });

        //

        //$rootScope.$watch(function () {
        //    return navigator.geolocation;
        //}, function (o, n) {
        //    console.log("$window.navigator catch : " + n);
        //    this.sharePosition = n;
        //});

        //navigator.geolocation.watchPosition(function (position) {
        //        console.log("i'm tracking you!");
        //        console.log(position);
        //    },
        //    function (error) {
        //        if (error.code == error.PERMISSION_DENIED)
        //            console.log("you denied me :-(");
        //    });


        $http({
            'method': "GET",
            'url': "https://www.telize.com/geoip",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (self.currentPosition == null) {
                var pos = [2];
                pos[0] = data.latitude;
                pos[1] = data.longitude;
                self.currentPosition = {
                    x: pos[0],
                    y: pos[1]
                };
                computePosition();
                $timeout(function () {
                    $rootScope.$broadcast('POSITION_CHANGED');
                }, 1);
            }
        });


        if ($window.navigator && $window.navigator.geolocation && this.geoPositionAlreadyComputed == false) {

            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    self.currentPosition = {
                        x: position.coords.latitude,
                        y: position.coords.longitude
                    };
                    computePosition();
                    this.geoPositionAlreadyComputed = true;
                    $timeout(function () {
                        $rootScope.$broadcast('POSITION_CHANGED');
                    }, 1);
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
