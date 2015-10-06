myApp.service("searchService", function ($http, $flash, $rootScope, geolocationService, $q) {


    this.currentSearch = "";

    this.canceler = null;

    this.default = function (page,callbackSuccess, callbackError) {

        console.log("search default : "+page);

        if (this.canceler != null) {$
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/default/"+page,
            'headers': "Content-Type:application/json; charset=utf-8",
            'dataType':"json",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.searchByStringLittle = function (searchText, callbackSuccess, callbackError) {

        console.log("search by string little : "+searchText);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/text/little",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {
                search: searchText,
                position: geolocationService.getPositionWithoutNull()
            },
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.searchByString = function (page,searchText, callbackSuccess, callbackError) {

        console.log("search by string : "+searchText+"/"+page);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/text",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': {
                page:page,
                search: searchText,
                position: geolocationService.getPositionWithoutNull()
            },
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byFollowed = function (page,callbackSuccess, callbackError) {

        console.log("search by follow : "+page);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/followed/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byFollowedAndInterest = function (page,interestId,callbackSuccess, callbackError) {

        console.log("search by follow and interest : "+page+"/"+interestId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/followed/interest/"+interestId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.byBusiness = function (page,businessId, callbackSuccess, callbackError) {

        console.log("search by business : "+page+"/"+businessId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "GET",
            'url': "/rest/search/publication/business/" + businessId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.byBusinessArchived = function (page,businessId, callbackSuccess, callbackError) {

        console.log("search by business archived : "+page+"/"+businessId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "GET",
            'url': "/rest/search/publication/business/archive/" + businessId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


    this.byBusinessPrevisualization = function (page,businessId, callbackSuccess, callbackError) {

        console.log("search by business previsualization : "+page+"/"+businessId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }
        this.canceler = $q.defer();

        $http({
            'method': "GET",
            'url': "/rest/search/publication/business/previsualization/" + businessId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.byInterest = function (page,interestId, callbackSuccess, callbackError) {

        console.log("search by interst : "+page+"/"+interestId);

        if (this.canceler != null) {
            this.canceler.resolve();
        }

        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/publication/interest/" + interestId+"/"+page,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };

    this.nearBusiness = function (callbackSuccess, callbackError) {

        console.log("search near business");

        if (this.canceler != null) {
            this.canceler.resolve();
        }

        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/business/near",
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };


    this.nearBusinessByInterest = function (interestId,callbackSuccess, callbackError) {

        console.log("search near business by interest");


        if (this.canceler != null) {
            this.canceler.resolve();
        }

        this.canceler = $q.defer();

        $http({
            'method': "POST",
            'url': "/rest/search/business/near/interest/"+interestId,
            'headers': "Content-Type:application/json;charset=utf-8",
            'data': geolocationService.getPositionWithoutNull(),
            timeout: this.canceler.promise
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.list);
            }
        })
            .error(function (data, status) {
                if(data!=null) {
                    $flash.error(data.message);
                }
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };
});