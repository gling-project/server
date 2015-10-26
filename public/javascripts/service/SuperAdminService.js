myApp.service("superAdminService", function ($http, $flash, $rootScope) {


    this.confirmPublication = function (businessId, callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/business/confirmPublication/" + businessId,
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

    this.getAllBusinesses = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/business/all",
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


    this.getUserDetails = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/accountDetails",
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


    this.getUserDetailsForToday = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/accountDetailsForToday",
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

    this.getCategoriesAndInterests = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/categories_interests",
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

    this.saveNewCategoryInterestRelation = function (categoryName, interestName, newValue, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/superadmin/category_interest_link/" + categoryName + "/" + interestName + "/" + newValue,
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


    this.getStat = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/stats",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.stats);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };


    this.getEmailToBusinesses = function (dto, callbackSuccess, callbackError) {

        console.log("dto");
        console.log(dto);

        $http({
            'method': "POST",
            'url': "/rest/superadmin/emailToBusinesses",
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