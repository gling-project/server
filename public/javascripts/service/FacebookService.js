myApp.service("facebookService", function ($http,modelService,$locale,languageService) {

    //
    // initialization
    //
    this.ini = function(){
        var appId = modelService.get(modelService.APP_ID);
        FB.init({
            appId: appId,
            cookie: true,
            xfbml: true,
            version: 'v2.3'
        });
    }

    var isConnected=false;

    this.isConnected = function(){
        return isConnected;
    };

    //
    // login
    //
    this.login = function (successCallback, failCallback) {
        // From now on you can use the  service just as Facebook api says
        FB.login(function (response) {
            console.log(response);

            if (response.status === 'connected') {

                loginToServer(response.authResponse, successCallback, failCallback);
            }
            else{
                failCallback();
            }
        }, {
            scope: 'public_profile, email'
        });
    };

    //
    // get login : test if the user is currently connected
    //if the user is connected, connect to the server
    //
    this.getLoginStatus = function () {

        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') {

                //the user is now connected by facebook
                isConnected = true;

                loginToServer(response.authResponse, function (data) {
                            //success
                            //store connected user
                            modelService.set(modelService.MY_SELF, data);

                            //test lang
                            languageService.changeLanguage(data.lang.code);

                            console.log("connected by facebook");
                        },
                        function () {
                            //connection failed
                        });
                } else {
                    //connection failed
                }
        });
    };

    this.logout = function(){
        FB.logout(function(response) {
        });
    }

    loginToServer = function (authResponse, successCallback, failCallback) {

        var access_token = authResponse.accessToken;
        var user_id = authResponse.userID;

        //send request
        var dto = {
            userId: user_id,
            token: access_token
        };

        $http({
            'method': "POST",
            'url': "/login/facebook",
            'headers': "Content-Type:application/json",
            'data': dto
        }).success(function (data, status) {

            successCallback(data);
        })
            .error(function (data, status) {
                failCallback(data, status);
            });
    };


});