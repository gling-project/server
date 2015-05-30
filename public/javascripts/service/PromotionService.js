myApp.service("promotionService", function ($http, $flash,$rootScope) {

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

    this.getAll = function (callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/promotion",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    }
});