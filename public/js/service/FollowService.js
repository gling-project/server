myApp.service("followService", function ($flash, $http) {

    var self = this;

    this.model = {
        myself: null
    };

    this.setNotification = function (businessId,sendNotification, callbackSuccess, callbackError) {
        var dto = {
            sendNotification:sendNotification,
            businessId:businessId
        };
        
        $http({
            'method': "POST",
            'url': "/rest/follow/notification",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data':dto
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



    this.addFollow = function (follow,businessId, callbackSuccess, callbackError) {
        var dto = {
            follow:follow,
            businessId:businessId
        };

        $http({
            'method': "POST",
            'url': "/rest/follow",
            'headers': "Content-Type:application/json;charset=utf-8",
            data:dto
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

    this.getFollows = function (callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/rest/follow",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
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