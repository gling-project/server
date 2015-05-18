myApp.service("businessService", function ($flash, $http,modelService) {

    this.registration = function (dto, callbackSuccess, callbackFail) {
        $http({
            'method': "POST",
            'url': "registration/business",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            this.myself = data;
            //TODO temp
            modelService.set(modelService.MY_SELF, data);
            callbackSuccess(data);
        })
        .error(function (data, status) {
            callbackFail(data);
            $flash.error(data.message);
        });
    };

});