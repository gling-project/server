myApp.service("customerInterestService", function ($sce,$http,$flash) {


    var customerInterests = null;


    var loadAll = function (callback) {
        $http({
            'method': "GET",
            'url': "customerInterest",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            customerInterests = data;
            callback(data);
        })
            .error(function (data, status) {
                $flash.error(data.message);
            });
    };

    this.getAll = function (callback) {
        if (customerInterests == null) {
            loadAll(callback);
        }
        else {
            callback(customerInterests);
        }

    }

});