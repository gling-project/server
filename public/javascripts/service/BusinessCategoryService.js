myApp.service("businessCategoryService", function ($sce,$http,$flash) {


    var businessCategory = null;


    var loadAll = function (callback) {
        $http({
            'method': "GET",
            'url': "businessCategory",
            'headers': "Content-Type:application/json"
        }).success(function (data, status) {
            businessCategory = data;
            callback(data);
        })
            .error(function (data, status) {
                $flash.error(data.message);
            });
    };

    this.getAll = function (callback) {
        if (businessCategory == null) {
            loadAll(callback);
        }
        else {
            callback(businessCategory);
        }

    }

});