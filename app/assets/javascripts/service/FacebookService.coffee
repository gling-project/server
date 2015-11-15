myApp.service 'facebookService', ($http, accountService, $locale, languageService, constantService,$flash) ->

    @facebookAppId
    @facebookAuthorization = 'public_profile,email,publish_actions'
    isConnected = false
    authResponse = null
    _this = this

    #
    # initialization
    #
    @ini = ->

        #initialize facebook api
        FB.init
            appId: @facebookAppId
            cookie: true
            xfbml: true
            version: 'v2.3'

        #recover the status
        FB.getLoginStatus (response) ->
            if response.status == 'connected'
                isConnected = true
                authResponse = response.authResponse

    #share a publication
    #this function doesn't need a facebook loggin
    @sharePublication = (businessId, publicationId) ->
        url = constantService.urlBase + '/business/' + businessId + '/publication/' + publicationId
        obj =
            method: 'share'
            href: url
        FB.ui obj, callback

    #try to log the server
    @loginToServer = (callbackSuccess, callbackError) ->

        access_token = authResponse.accessToken
        user_id = authResponse.userID

        $http(
            'method': 'GET'
            'url': '/rest/login/facebook/' + access_token + '/' + user_id
            'headers': 'Content-Type:application/json;charset=utf-8').success((data) ->
                if data? != ''
                    if callbackSuccess?
                        callbackSuccess data
            ).error (data, status) ->
                $flash.error data.message
                if callbackError?
                    callbackError data, status

    @loginToServerSimple = (accessToken, callbackSuccess, callbackError) ->
        $http(
            'method': 'GET'
            'url': '/rest/login/facebook/' + accessToken + '/null'
            'headers': 'Content-Type:application/json;charset=utf-8').success((data) ->
                if data? != ''
                    if callbackSuccess?
                        callbackSuccess data
            ).error (data, status) ->
                $flash.error data.message
                if callbackError?
                    callbackError data, status

    @linkToAccount = (accessToken, callbackSuccess, callbackError) ->

        if !accessToken?
            accessToken = authResponse.accessToken

        $http(
            'method': 'GET'
            'url': '/rest/facebook/link/' + accessToken + '/null'
            'headers': 'Content-Type:application/json;charset=utf-8')
        .success (data) ->
            if data? != ''
                if callbackSuccess?
                    callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status




    #
    # login
    # log the user to facebook and to the server
    #
    @login = (successCallback, callbackError) ->

        #is facebook is connected, call the server with authResponse
        console.log 'je suis DEJA contect ?'+isConnected
        if isConnected
            @loginToServer successCallback, callbackError
        else
            # else, log to facebook
            FB.login ((response) ->
                if response.status == 'connected'

                    #... and log to server
                    authResponse = response.authResponse
                    _this.loginToServer successCallback, callbackError
                    isConnected = true
                else
                    if callbackError?
                        callbackError()
            )

    #getter
    @isConnected = ->
        return isConnected

    return