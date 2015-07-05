myApp.service("superAdminService", function ($http, $flash, $rootScope) {


    this.confirmPublication = function (businessId, callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/business/confirmPublication/" + businessId,
            'headers': "Content-Type:application/json"
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

});