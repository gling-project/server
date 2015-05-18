myApp.service("accountService", function ($flash, $http,modelService) {

    this.myself = null;

    this.testEmail = function (email, callbackSuccess, callbackFail) {
        $http({
            'method': "GET",
            'url': "email/test/" + email,
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            callbackSuccess(data.value);
        })
            .error(function (data, status) {
                callbackFail(data);
                $flash.error(data.message);
            });
    };

    this.registration = function (dto, callbackSuccess, callbackFail) {
        $http({
            'method': "POST",
            'url': "registration/customer",
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

    this.testFacebook = function (dto, callbackSuccess, callbackFail) {
        $http({
            'method': "POST",
            'url': "facebook/test",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            callbackSuccess(data);

        })
            .error(function (data, status) {
                callbackFail(data);
                $flash.error(data.message);
            });
    }

});