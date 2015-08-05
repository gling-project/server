myApp.service("searchService", function ($http, $flash, $rootScope, geolocationService,$q) {


    this.currentSearch = "";

    var canceler = null;

    this.default = function (callbackSuccess, callbackError) {





        geolocalisedSearch(function (unbindWatcher) {
            if(canceler!=null){
                canceler.resolve();
            }
            canceler = $q.defer();

            console.log('search default : '+geolocationService.position.x+'-'+geolocationService.position.y);
            $http({
                'method': "POST",
                'url': "/search/publication/default",
                'headers': "Content-Type:application/json",
                'data': geolocationService.position,
                'config':{
                    timeout: canceler.promise
                }
            }).success(function (data, status) {
                if (callbackSuccess != null) {
                    callbackSuccess(data.list);
                }
                if (unbindWatcher != null) {
                    unbindWatcher();
                }
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                    if (callbackError != null) {
                        callbackError(data, status);
                    }
                    if (unbindWatcher != null) {
                        unbindWatcher();
                    }
                });
        });
    };

    this.searchByStringLittle = function (searchText, callbackSuccess, callbackError) {

        if(canceler!=null){
            canceler.resolve();
        }
        canceler = $q.defer();

        geolocalisedSearch(function (unbindWatcher) {
            $http({
                'method': "POST",
                'url': "/search/text/little",
                'headers': "Content-Type:application/json",
                'data': {
                    search: searchText,
                    position: geolocationService.position
                },
                'config':{
                    timeout: canceler.promise
                }
            }).success(function (data, status) {
                if (callbackSuccess != null) {
                    callbackSuccess(data);
                    if (unbindWatcher != null) {
                        unbindWatcher();
                    }
                }
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                    if (callbackError != null) {
                        callbackError(data, status);
                        if (unbindWatcher != null) {
                            unbindWatcher();
                        }
                    }
                });
        });
    };

    this.searchByString = function (searchText, callbackSuccess, callbackError) {

        if(canceler!=null){
            canceler.resolve();
        }
        canceler = $q.defer();

        geolocalisedSearch(function (unbindWatcher) {
            $http({
                'method': "POST",
                'url': "/search/text",
                'headers': "Content-Type:application/json",
                'data': {
                    search: searchText,
                    position: geolocationService.position
                },
                'config':{
                    timeout: canceler.promise
                }
            }).success(function (data, status) {
                if (callbackSuccess != null) {
                    callbackSuccess(data);
                    if (unbindWatcher != null) {
                        unbindWatcher();
                    }
                }
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                    if (callbackError != null) {
                        callbackError(data, status);
                        if (unbindWatcher != null) {
                            unbindWatcher();
                        }
                    }
                });
        });
    };

    this.byFollowed = function (callbackSuccess, callbackError) {

        if(canceler!=null){
            canceler.resolve();
        }
        canceler = $q.defer();

        geolocalisedSearch(function (unbindWatcher) {
            $http({
                'method': "POST",
                'url': "/search/publication/followed",
                'headers': "Content-Type:application/json",
                'data': geolocationService.position,
                'config':{
                    timeout: canceler.promise
                }
            }).success(function (data, status) {
                if (callbackSuccess != null) {
                    callbackSuccess(data.list);
                    if (unbindWatcher != null) {
                        unbindWatcher();
                    }
                }
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                    if (callbackError != null) {
                        callbackError(data, status);
                        if (unbindWatcher != null) {
                            unbindWatcher();
                        }
                    }
                });
        });
    };


    this.byBusiness = function (businessId, callbackSuccess, callbackError) {

        if(canceler!=null){
            canceler.resolve();
        }
        canceler = $q.defer();

        geolocalisedSearch(function (unbindWatcher) {
            $http({
                'method': "POST",
                'url': "/search/publication/business/" + businessId,
                'headers': "Content-Type:application/json",
                'data': geolocationService.position,
                'config':{
                    timeout: canceler.promise
                }
            }).success(function (data, status) {
                if (callbackSuccess != null) {
                    callbackSuccess(data.list);
                    if (unbindWatcher != null) {
                        unbindWatcher();
                    }
                }
                $rootScope.$broadcast('$refreshPromotion');
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                    if (callbackError != null) {
                        callbackError(data, status);
                        if (unbindWatcher != null) {
                            unbindWatcher();
                        }
                    }
                });
        });
    };

    this.byInterest = function (interestId, callbackSuccess, callbackError) {

        if(canceler!=null){
            canceler.resolve();
        }

        canceler = $q.defer();

        geolocalisedSearch(function (unbindWatcher) {
            $http({
                'method': "POST",
                'url': "/search/publication/interest/" + interestId,
                'headers': "Content-Type:application/json",
                'data': geolocationService.position,
                'config':{
                    timeout: canceler.promise
                }
            }).success(function (data, status) {
                if (callbackSuccess != null) {
                    callbackSuccess(data.list);
                    if (unbindWatcher != null) {
                        unbindWatcher();
                    }
                }
                $rootScope.$broadcast('$refreshPromotion');
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                    if (callbackError != null) {
                        callbackError(data, status);
                        if (unbindWatcher != null) {
                            unbindWatcher();
                        }
                    }
                });
        });

    };

    var geolocalisedSearch = function (request) {

        var unbindWatcher = null;

        var start = function () {
            request(unbindWatcher);
        };

        if (geolocationService.position != null) {
            start();
        }
        else {
            unbindWatcher = $rootScope.$watch(function () {
                return geolocationService.position;
            }, function watchCallback(newValue, oldValue) {
                console.log('watcher');
                if (geolocationService.position != null) {
                    start();
                }
            });
        }
    }
});