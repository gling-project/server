myApp.service("businessService", function ($flash, $http, accountService) {

    this.registration = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "registration/business",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            accountService.setMyself(data);
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                if (callbackError != null) {
                    callbackError(data, status);
                }
                $flash.error(data.message);
            });
    };

});