myApp.service("geolocationService", function (geolocation, $http, accountService, $timeout, $rootScope, $window) {


        this.position = null;
        this.currentPosition = null;
        var self = this;

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
                computePosition();
                $timeout(function () {
                    $rootScope.$broadcast('POSITION_CHANGED');
                }, 1);
                //$rootScope.$broadcast('POSITION_CHANGED');
                console.log('posiition computed !!!!!!!!!!!!!!!!!!!!!!!!!!');
                console.log(self.currentPosition);
            }
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
