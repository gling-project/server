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

    this.editIllustration = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/business/illustration",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            accountService.getMyself().business.illustration = dto;
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

    this.editAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/address/" + dto.id,
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            accountService.getMyself().business.address = data;
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

    this.findByPromotion = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
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
    };

    this.createSchedule = function(dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/business/schedule",
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