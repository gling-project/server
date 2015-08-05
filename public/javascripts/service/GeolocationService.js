myApp.service("geolocationService", function (geolocation, $http, accountService, $timeout, $rootScope, $window) {


        this.position = null;
        this.currentPosition = null;

        $http({
            'method': "GET",
            'url': "http://ipinfo.io/json",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            if (self.currentPosition == null) {
                var pos = data.loc.split(',');
                self.currentPosition = {
                    x: pos[0],
                    y: pos[1]
                };
                //$rootScope.$broadcast('POSITION_CHANGED');
                console.log('posiition computed !!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.log(self.currentPosition);
            }
        }).error(function (data, status) {
            console.log('failed');
            console.log(data);
        });


        if ($window.navigator && $window.navigator.geolocation) {

            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    console.log('---------------------------------------------------- ok !! ');
                    console.log(position);
                    self.currentPosition = {
                        x: position.coords.latitude,
                        y: position.coords.longitude
                    };
                    computePosition();
                    $timeout(function () {
                        $rootScope.$broadcast('POSITION_CHANGED');
                    }, 1);
                },
                function (error) {
                    console.log('---------------------------------------------------- ceci est un erreur : ');
                    console.log(error);
                });
        }
        else {
            console.log('PAS ok !! ');

        }

        //geolocation.getLocation().then(function (data) {
        //    self.currentPosition = {
        //        x: data.coords.latitude,
        //        y: data.coords.longitude
        //    };
        //    //$rootScope.$broadcast('POSITION_CHANGED');
        //    //self.position = {
        //    //    x: data.coords.latitude,
        //    //    y: data.coords.longitude
        //    //};
        //});

        $rootScope.$on('error', function () {
            console.log('errrrrrrrrrrrrrrrrrrrrrrr 1')
        });
        $rootScope.$on('error', function () {
            console.log('errrrrrrrrrrrrrrrrrrrrrrr 2')
        });

        var self = this;

        var computePosition = function () {

            if (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null) {
                if (self.currentPosition == null) {
                    console.log('compute position  ...');

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
                    console.log('catch position');
                    self.position = {
                        x: self.currentPosition.x,
                        y: self.currentPosition.y
                    };
                }
                //console.log('current position : '+self.position.x+'-'+self.position.y)
            }
            else {
                self.position = {
                    x: accountService.getMyself().selectedAddress.posx,
                    y: accountService.getMyself().selectedAddress.posy
                };
                console.log('seelted address : ' + self.position.x + '-' + self.position.y)
            }
            //console.log(self.position.x + '<->' + self.position.y);
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


        /**
         * useless ??
         */
            //geolocation.getLocation().then(function (data) {
            //    if (accountService.getMyself() == null || accountService.getMyself().selectedAddress == null) {
            //        self.position = {
            //            x: data.coords.latitude,
            //            y: data.coords.longitude
            //        };
            //    }
            //    else {
            //        self.position = {
            //            x: accountService.getMyself().selectedAddress.posx,
            //            y: accountService.getMyself().selectedAddress.posy
            //        };
            //    }
            //});

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
