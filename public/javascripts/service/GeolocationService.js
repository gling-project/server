myApp.service("geolocationService", function (geolocation, $http) {


    this.position = null;

    var self = this;


    $http({
        'method': "GET",
        'url': "http://ipinfo.io/json",
        'headers': "Content-Type:application/json"
    }).success(function (data, status) {
        if (self.position == null) {
            var pos = data.loc.split(',');
            self.position = {
                x: pos[0],
                y: pos[1]
            };
        }
    });

    geolocation.getLocation().then(function (data) {
        self.position = {
            x: data.coords.latitude,
            y: data.coords.longitude
        };
    });
});
