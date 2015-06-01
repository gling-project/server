myApp.service("promotionService", function ($http, $flash, $rootScope) {

    this.add = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/promotion",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
            $rootScope.$broadcast('$refreshPromotion');
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    }

    this.edit = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/promotion/" + dto.id,
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
            $rootScope.$broadcast('$refreshPromotion');
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.getMine = function (callbackSuccess, callbackError) {
        var promise = $http({
            'method': "GET",
            'url': "/promotion",
            'headers': "Content-Type:application/json"
        });
        promise.success(function (data, status, headers, d) {
            console.log("promotion");
            console.log(d);
            console.log(data);
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        });
        promise.error(function (data, status) {
            $flash.error(data.message);
            if (callbackError != null) {
                callbackError(data, status);
            }
        });
    };


    this.delete = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "DELETE",
            'url': "/promotion/" + dto.id,
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
            $rootScope.$broadcast(self.REFRESH_BUSINESS_NOTIFICAITON);
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

});