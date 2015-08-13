myApp.service("businessService", function ($flash, $http, accountService) {


    this.getBusiness = function (id, callbackSuccess, callbackError) {
        $http({
            'method': "GET",
            'url': "/rest/business/" + id,
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
    };

    this.registration = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/registration/business",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            accountService.setMyself(data);
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

    this.edit = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/business",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            accountService.getMyself().business = data;
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

    this.editSocialNetwork = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/business/social_network",
            'headers': "Content-Type:application/json",
            'data': dto
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

    this.editBusinessCategory = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/business/category",
            'headers': "Content-Type:application/json",
            'data': {list: dto}
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

    this.publishBusiness = function (callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/ask_publication",
            'headers': "Content-Type:application/json",
            'data': {}
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

    this.cancelPublishRequest =function (callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/cancel_publication_request",
            'headers': "Content-Type:application/json",
            'data': {}
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

    this.stopPublication = function (callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/stop_publish",
            'headers': "Content-Type:application/json",
            'data': {}
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


    this.editIllustration = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/business/illustration",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            //accountService.getMyself().business.illustration = dto;
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

    this.editLandscape = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/business/landscape",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {
            //accountService.getMyself().business.illustration = dto;
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

    this.editAddress = function (dto, callbackSuccess, callbackError) {
        $http({
            'method': "PUT",
            'url': "/rest/business/address",
            'headers': "Content-Type:application/json",
            'data': dto
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


    this.createSchedule = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/schedule",
            'headers': "Content-Type:application/json",
            'data': dto
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

    this.editGallery = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/business/edit/gallery",
            'headers': "Content-Type:application/json",
            'data': dto
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