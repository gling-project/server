myApp.service("facebookService", function ($http, accountService, $locale, languageService) {


    this.facebookAppId;

    //
    // initialization
    //
    this.ini = function () {
        //FB.init({
        //    appId: this.facebookAppId,
        //    cookie: true,
        //    xfbml: true,
        //    version: 'v2.3'
        //});
    };

    var isConnected = false;

    this.isConnected = function () {
        return isConnected;
    };


    //
    // registration
    //
    this.registration = function (successCallback, failCallback) {
        //// From now on you can use the  service just as Facebook api says
        //FB.login(function (response) {
        //
        //    if (response.status === 'connected') {
        //
        //        console.log('connected !! ');
        //
        //        successCallback(response.authResponse);
        //        isConnected = true;
        //    }
        //    else {
        //        failCallback();
        //    }
        //}, {
        //    scope: 'public_profile, email'
        //});
    };

    //
    // login
    //
    this.login = function (successCallback, failCallback) {
        //// From now on you can use the  service just as Facebook api says
        //FB.login(function (response) {
        //
        //    if (response.status === 'connected') {
        //
        //        loginToServer(response.authResponse, successCallback, failCallback);
        //        isConnected = true;
        //    }
        //    else {
        //        failCallback();
        //    }
        //}, {
        //    scope: 'public_profile, email'
        //});
    };

    this.recover = function (successCallback, failCallback) {
        // From now on you can use the  service just as Facebook api says
        //FB.login(function (response) {
        //
        //    }
        //)
    };

    //
    // login
    //
    me = function (successCallback, failCallback) {
        //// From now on you can use the  service just as Facebook api says
        //FB.api('/me', {
        //    fields: 'first_name,last_name,email,gender,locale'
        //}, function (response) {
        //    if (!response || response.error) {
        //        failCallback(response.status, response.error);
        //    } else {
        //        successCallback(response);
        //    }
        //});
    };

    //
    // get login : test if the user is currently connected
    //if the user is connected, connect to the server
    //
    this.getLoginStatus = function () {

        //FB.getLoginStatus(function (response) {
        //    if (response.status === 'connected') {
        //
        //        //the user is now connected by facebook
        //        isConnected = true;
        //
        //        loginToServer(response.authResponse, function (data) {
        //                //success
        //                //store connected user
        //                accountService.setMyself(data);
        //
        //                //test lang
        //                languageService.changeLanguage(data.lang.code);
        //
        //                console.log("connected by facebook");
        //            },
        //            function () {
        //                //connection failed
        //            });
        //    } else {
        //        //connection failed
        //    }
        //});
    };

    this.logout = function () {

        //console.log('Facebook logout');
        //
        ////if (this.isConnected()) {
        //FB.logout(function (response) {
        //    console.log('Facebook logout : ');
        //    console.log(response);
        //});
        ////
    };

    loginToServer = function (authResponse, callbackSuccess, callbackError) {

        //var access_token = authResponse.accessToken;
        //var user_id = authResponse.userID;
        //
        ////send request
        //var dto = {
        //    userId: user_id,
        //    token: access_token
        //};
        //
        //$http({
        //    'method': "POST",
        //    'url': "/login/facebook",
        //    'headers': "Content-Type:application/json",
        //    'data': dto
        //}).success(function (data) {
        //    if (callbackSuccess != null) {
        //        callbackSuccess(data);
        //    }
        //    ;
        //})
        //    .error(function (data, status) {
        //        if (callbackError != null) {
        //            callbackError(data, status);
        //        }
        //    });
    };


});