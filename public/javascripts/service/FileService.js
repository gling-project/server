myApp.service("fileService", function ($flash, $http) {

    this.uploadFile64 = function (name, img, callbackSuccess, callbackError) {

        var dto = {image: img, name: name};

        $http({
            'method': "POST",
            'url': "/rest/file64",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': dto
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