myApp.service("customerInterestService", function ($sce, $http, $flash) {


    var customerInterests = null;


    var loadAll = function (callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/rest/customerInterest",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            customerInterests = data.list;
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if (callbackError != null) {
                    callbackError(data, status);
                }
                $flash.error(data.message);
            });
    };

    this.getAll = function (callback) {
        if (customerInterests == null) {
            loadAll(callback);
        }
        else {
            callback(angular.copy(customerInterests));
        }

    }

});