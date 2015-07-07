myApp.service("searchService", function ($http, $flash, $rootScope,geolocationService) {


    this.default = function (callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/search/publication/default",
            'headers': "Content-Type:application/json",
            'data': geolocationService.position
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


    this.byBusiness = function (businessId, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/search/publication/business/"+businessId,
            'headers': "Content-Type:application/json",
            'data': geolocationService.position
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
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
});