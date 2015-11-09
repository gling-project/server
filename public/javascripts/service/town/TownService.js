myApp.service("townService", function ($flash, $http) {

    //???
    this.ROOT_URL = "http://localhost:9000";
    //this.ROOT_URL = "";

    this.getBusinessByZip = function (zip, page,callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': this.ROOT_URL +"/rest/town/business/zip/" + zip+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8"
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

    this.getBusinessByZipAndSearch = function (zip, search,page,callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': this.ROOT_URL +"/rest/town/business/zip/" + zip+"/"+search+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8"
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

    this.getPublicationByBusiness = function (businessId,page, callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': this.ROOT_URL +"/rest/town/publication/business/" + businessId+'/'+page,
            'headers': "Content-Type:application/json;charset=utf-8"
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

    this.getInitialization = function (callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': this.ROOT_URL +"/rest/town/initialization",
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



    this.getPublications = function (zip,page,callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': this.ROOT_URL +"/rest/town/publications/"+zip+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8"
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

    this.getPromotions = function (zip,page,callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': this.ROOT_URL +"/rest/town/promotions/"+zip+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8"
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


});