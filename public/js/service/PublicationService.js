myApp.service("publicationService", function ($http, $flash, $rootScope) {

    this.delete = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "DELETE",
            'url': "/rest/publication/"+dto.id,
            'headers': "Content-Type:application/json;charset=utf-8"
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