myApp.service("followService", function ($flash, $http) {

    var self = this;

    this.model = {
        myself: null
    };

    this.addFollow = function (follow,businessId, callbackSuccess, callbackError) {
        var dto = {
            follow:follow,
            businessId:businessId
        };
        console.log(dto);
        $http({
            'method': "POST",
            'url': "/follow",
            'headers': "Content-Type:application/json",
            data:dto
        }).success(function (data, status) {
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.getFollows = function (callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/follow",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.value);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };
});