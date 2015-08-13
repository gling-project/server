myApp.service("superAdminService", function ($http, $flash, $rootScope) {


    this.confirmPublication = function (businessId, callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/business/confirmPublication/" + businessId,
            'headers': "Content-Type:application/json"
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

    }

    this.getAllBusinesses = function(callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/business/all",
            'headers': "Content-Type:application/json"
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

    }

});