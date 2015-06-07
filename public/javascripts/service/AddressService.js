myApp.service("addressService", function ($flash, $http) {


    this.testAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "address/test",
            'headers': "Content-Type:application/json",
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




});