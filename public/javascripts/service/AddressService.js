myApp.service("addressService", function ($flash, $http, geolocationService) {


    this.testAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/address/test",
            'headers': "Content-Type:application/json;charset=utf-8",
            data: dto
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

    this.distance = function (addressId, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/address/distance/" + addressId,
            'headers': "Content-Type:application/json;charset=utf-8",
            data: geolocationService.getPositionWithoutNull()
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.changeAddress = function (addressText, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/address/current",
            'headers': "Content-Type:application/json;charset=utf-8",
            data: {
                addressName: addressText
            }
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
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