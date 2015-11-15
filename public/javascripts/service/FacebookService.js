myApp.service("facebookService", function ($http, accountService, $locale, languageService, $FB, constantService, $location, $flash) {


    this.facebookAppId;
    this.facebookAuthorization = 'public_profile,email,publish_actions';

    //
    // initialization
    //
    this.ini = function () {
        FB.init({
            appId: this.facebookAppId,
            cookie: true,
            xfbml: true,
            version: 'v2.3'
        });
        $FB.init(this.facebookAppId);

        FB.getLoginStatus(function (response) {
            if (response.status == 'connected') {
                isConnected = true;
                authResponse = response.authResponse
            }
        });
    };

    var isConnected = false, authResponse = null;

    this.isConnected = function () {
        return isConnected;
    };


    //
    // registration
    //
    this.registration = function (successCallback, failCallback) {

        console.log("je suis registration");

        // From now on you can use the  service just as Facebook api says
        FB.login(function (response) {

            console.log("FB.login : " + response.status);

            if (response.status === 'connected') {

                successCallback(response.authResponse);
                isConnected = true;
            }
            else {
                failCallback();
            }
        }, {
            scope: self.facebookAuthorization
        });
    };

    //
    // login
    //
    this.login = function (successCallback, callbackError) {

        if (isConnected) {
            loginToServer(authResponse, successCallback, callbackError);
        }
        else {
            // From now on you can use the  service just as Facebook api says
            FB.login(function (response) {

                if (response.status === 'connected') {

                    authResponse = response.authResponse;

                    loginToServer(authResponse, successCallback, callbackError);
                    isConnected = true;
                }
                else {

                    if (callbackError != null) {
                        callbackError(data, status);
                    }

                }
            }, {
                scope: self.facebookAuthorization
            });
        }
    };

    //this.recover = function (successCallback, failCallback) {
    //    //From now on you can use the  service just as Facebook api says
    //    FB.getLoginStatus(function (response) {
    //
    //    });
    //};

    //
    // login
    //
    me = function (successCallback, failCallback) {
        // From now on you can use the  service just as Facebook api says
        FB.api('/me', {
            fields: self.facebookAuthorization
        }, function (response) {
            if (!response || response.error) {
                failCallback(response.status, response.error);
            } else {
                successCallback(response);
            }
        });
    };

    //
    // get login : test if the user is currently connected
    //if the user is connected, connect to the server
    //
    //this.testToReconnectServer = function () {
    //
    //    FB.getLoginStatus(function (response) {
    //
    //        console.log(response);
    //
    //        if (response.status === 'connected') {
    //
    //            //the user is now connected by facebook
    //            isConnected = true;
    //
    //            loginToServer(response.authResponse, function (data) {
    //                //success
    //                //store connected user
    //                accountService.setMyself(data);
    //
    //                //test lang
    //                languageService.changeLanguage(data.lang.code);
    //
    //                console.log('facebook conneciton');
    //                if (data.type == 'BUSINESS') {
    //                    console.log('redireection !! ');
    //                    $location.path('/business/' + accountService.getMyself().businessId);
    //                }
    //            });
    //        }
    //    });
    //};

    //this.logout = function () {
    //
    //    //if (this.isConnected()) {
    //    //FB.logout(function (response) {
    //    //});
    //    //
    //};

    this.sharePublication = function (businessId, publicationId) {
        var url = constantService.urlBase + '/business/' + businessId + '/publication/' + publicationId;
        console.log('url:' + url);
        var obj = {method: 'share', href: url};

        function callback(response) {
        }

        FB.ui(obj, callback);
    };

    this.loginServer = function (callbackSuccess, callbackError) {
        loginToServer(authResponse, callbackSuccess, callbackError);
    };

    loginToServer = function (authResponse, callbackSuccess, callbackError) {

        var access_token = authResponse.accessToken;
        var user_id = authResponse.userID;

        $http({
            'method': "GET",
            'url': "/rest/login/facebook/" + access_token + "/" + user_id,
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data) {
            if (data != null && data != undefined && data != "") {
                if (callbackSuccess != null) {
                    callbackSuccess(data);
                }
            }
        })
            .error(function (data, status) {
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };

    this.loginToServerSimple = function (accessToken, callbackSuccess, callbackError) {

        $http({
            'method': "GET",
            'url': "/rest/login/facebook/" + accessToken + "/null",
            'headers': "Content-Type:application/json;charset=utf-8"
        }).success(function (data) {
            if (data != null && data != undefined && data != "") {
                if (callbackSuccess != null) {
                    callbackSuccess(data);
                }
            }
        })
            .error(function (data, status) {
                if (callbackError != null) {
                    callbackError(data, status);
                }
            });
    };


});