myApp.service("addressService", function ($flash, $http, geolocationService) {


    this.testAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "address/test",
            'headers': "Content-Type:application/json",
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

        if (geolocationService.position != null) {
            $http({
                'method': "POST",
                'url': "address/distance/" + addressId,
                'headers': "Content-Type:application/json",
                data: geolocationService.position
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
        }
    };

});