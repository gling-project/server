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
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.edit = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/business",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            accountService.getMyself().business = data;
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

    this.editBusinessCategory = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/business/category",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            accountService.getMyself().business.businessCategories = data.list;
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

    this.editImage = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/business/image",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            accountService.getMyself().business.image = dto;
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

    this.findByPromotion = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/business/promotions",
            'headers': "Content-Type:application/json",
            'data': dto
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