myApp.service("searchService", function ($http, $flash, $rootScope, geolocationService, $q) {


    this.currentSearch = "";

    var canceler = null;

    this.default = function (callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();
        
        $http({
            'method': "POST",
            'url': "/rest/search/publication/default",
            'headers': "Content-Type:application/json",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
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

    this.searchByStringLittle = function (searchText, callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/text/little",
            'headers': "Content-Type:application/json",
            'data': {
                search: searchText,
                position: geolocationService.position
            },
            'config': {
                timeout: canceler.promise
            }
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

    this.searchByString = function (searchText, callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/text",
            'headers': "Content-Type:application/json",
            'data': {
                search: searchText,
                position: geolocationService.position
            },
            'config': {
                timeout: canceler.promise
            }
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

    this.byFollowed = function (callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/followed",
            'headers': "Content-Type:application/json",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
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

    this.byFollowedAndInterest = function (interestId,callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/followed/interest/"+interestId,
            'headers': "Content-Type:application/json",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
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

        if (canceler != null) {
            canceler.resolve();
        }
        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/business/" + businessId,
            'headers': "Content-Type:application/json",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
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

    this.byInterest = function (interestId, callbackSuccess, callbackError) {

        if (canceler != null) {
            canceler.resolve();
        }

        canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/interest/" + interestId,
            'headers': "Content-Type:application/json",
            'data': geolocationService.position,
            'config': {
                timeout: canceler.promise
            }
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