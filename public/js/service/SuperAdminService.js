myApp.service("superAdminService", function ($http, $flash) {


    this.confirmPublication = function (businessId, callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/business/confirmPublication/" + businessId,
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

    this.getClaims = function (businessId, callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/getClaims/" + businessId,
            'headers': "Content-Type:application/json;charset=utf-8",
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

    }

    this.confirmClaim = function (businessId,accountId, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/superadmin/confirmClaim/" + businessId+"/"+accountId,
            'headers': "Content-Type:application/json;charset=utf-8",
            data:{}
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

    this.importTranslation = function (callbackSuccess, callbackError) {
        $http({
            'method': "POST",
            'url': "/rest/import_category_translation",
            'headers': "Content-Type:application/json;charset=utf-8",
            data:{}
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

    this.getAllBusinesses = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/business/all",
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


    this.getUserDetails = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/accountDetails",
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


    this.getUserDetailsForToday = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/accountDetailsForToday",
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

    this.getCategoriesAndInterests = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/categories_interests",
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

    this.saveNewCategoryInterestRelation = function (categoryName, interestName, newValue, callbackSuccess, callbackError) {

        $http({
            'method': "PUT",
            'url': "/rest/superadmin/category_interest_link/" + categoryName + "/" + interestName + "/" + newValue,
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


    this.getStat = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/stats",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data, status) {
            if (callbackSuccess != null) {
                callbackSuccess(data.stats);
            }
        })
            .error(function (data, status) {
                $flash.error(data.message);
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });

    };


    this.getEmailToBusinesses = function (dto, callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/superadmin/emailToBusinesses",
            'headers': "Content-Type:application/json;charset=utf-8",
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


    this.getCustomerPositions = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/customerPosition",
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

    this.importBusiness = function (name, callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/importBusiness/" + name,
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

    this.getInterestStats = function (callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/superadmin/interestStats",
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


    this.createPromotion = function (businessId,promotion,callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/superadmin/createPromotion/"+businessId,
            'headers': "Content-Type:application/json;charset=utf-8",
            data:promotion
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



    this.createBusinessNotification = function (businessId,businessNotification,callbackSuccess, callbackError) {

        $http({
            'method': "POST",
            'url': "/rest/superadmin/createBusinessNotification/"+businessId,
            'headers': "Content-Type:application/json;charset=utf-8",
            data:businessNotification
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


});