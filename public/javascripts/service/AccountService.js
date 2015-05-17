myApp.service("accountService", function ($flash, $http) {

    this.testEmail = function (email, callback) {
        $http({
            'method': "GET",
            'url': "email/test/" + email,
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            callback(data.value);
        })
            .error(function (data, status) {
                $flash.error(data.message);
            });
    }

});