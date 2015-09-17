myApp.service("contactService", function ($flash, $http) {

    this.contact= function (contactFrom, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/contact",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': contactFrom
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