myApp.service("accountService", function ($flash, $http) {

    var self=this;
    
    this.model = {
        myself: null
    };

    this.testEmail = function (email, callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "email/test/" + email,
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.value);
            }
        })
            .error(function (data, status) {
                if (callbackError != null) {
                    callbackError(data, status);
                }
                $flash.error(data.message);
            });
    };

    this.registration = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "registration/customer",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            self.setMyself(data);
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

    this.testFacebook = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "facebook/test",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
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
    }

    this.logout = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "logout",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            self.setMyself(null);
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

    this.accountFusion = function (accountFusion, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/account/fusion",
            'headers': "Content-Type:application/json",
            'data': accountFusion
        }).success(function (data, status) {
            $flash.success(translationService.get("--.login.flash.success"));
            self.setMyself(data);
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

    this.getMyself = function () {
        return this.model.myself;
    };

    this.setMyself = function (dto) {
        this.model.myself = dto;
        console.log(this.model.myself);
    };
});