myApp.service 'facebookService', ($http, accountService, $locale, languageService, constantService, $flash,$filter) ->
    @facebookAppId
    @facebookAuthorization = 'public_profile,email,manage_pages,publish_pages'
    isConnected = false
    authResponse = null
    _this = this

    #
    # initialization
    #
    @ini = ->
        window.fbAsyncInit = ->
            FB.init(
                appId: _this.facebookAppId
                cookie: true
                xfbml: true
                version: 'v2.5'
            )

            console.log 'FB1'
            FB.getLoginStatus (response) ->
                console.log 'FB2'
                if response.status == 'connected'
                    authResponse = response.authResponse
                    isConnected=true
                    console.log 'FB3:'+isConnected
                    return

        ((d, s, id) ->
            js = undefined
            fjs = d.getElementsByTagName(s)[0]
            if d.getElementById(id)
                return
            js = d.createElement(s)
            js.id = id
            js.src = 'https://connect.facebook.net/en_US/sdk.js'
            fjs.parentNode.insertBefore js, fjs
            return
        ) document, 'script', 'facebook-jssdk'

    #share a publication
    #this function doesn't need a facebook loggin
    @sharePublication = (businessId, publicationId) ->
        url = constantService.urlBase + '/business/' + businessId + '/publication/' + publicationId
        obj =
            method: 'share'
            href: url
        FB.ui obj

    #try to log the server
    @loginToServer = (callbackSuccess, callbackError) ->
        access_token = authResponse.accessToken
        user_id = authResponse.userID

        console.log "response"
        console.log access_token + '/' + user_id

        $http(
            'method': 'GET'
            'url': '/rest/login/facebook/' + access_token + '/' + user_id
            'headers': 'Content-Type:application/json;charset=utf-8'
        ).success((data) ->
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
            'headers': 'Content-Type:application/json;charset=utf-8')
        .success((data) ->
            if data? != ''
                if callbackSuccess?
                    callbackSuccess data
        ).error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @linkToAccount = (callbackSuccess, callbackError) ->
        linkFct = (accessTokenToLink, facebookId) ->
            $http(
                'method': 'GET'
                'url': '/rest/login/facebook/' + accessTokenToLink + '/' + facebookId
                'headers': 'Content-Type:application/json;charset=utf-8')
            .success (data) ->
                if data? != ''
                    if callbackSuccess?
                        callbackSuccess data
            .error (data, status) ->
                $flash.error data.message
                if callbackError?
                    callbackError data, status

        #is facebook is connected, call the server with authResponse
        if isConnected
            linkFct authResponse.accessToken, authResponse.userID
        else
            # else, log to facebook
            FB.login (response) ->
                if response.status == 'connected'

                    #... and log to server
                    authResponse = response.authResponse
                    isConnected = true
                    #... and log
                    linkFct authResponse.accessToken, authResponse.userID
                else
                    if callbackError?
                        callbackError()
            , {scope: @facebookAuthorization}


    #
    # login
    # log the user to facebook and to the server
    #
    @login = (successCallback, callbackError) ->

        #is facebook is connected, call the server with authResponse
        if isConnected
            @loginToServer successCallback, callbackError
        else
            # else, log to facebook
            console.log 'LOOOGIN'
            console.log FB
            FB.login (response) ->
                if response.status == 'connected'

                    #... and log to server
                    authResponse = response.authResponse
                    #... and log
                    _this.loginToServer successCallback, callbackError
                    isConnected = true
                else
                    if callbackError?
                        callbackError()
            , {scope: @facebookAuthorization}

    @publish = (publication,successCallback, callbackError) ->

#        @sharePublication(publication.businessId,publication.id)

        data =
            message: publication.title+"\n\n"+publication.description

        if publication.pictures.length > 0
            data.pictureLink =  $filter('image')(publication.pictures[0])



        myself = accountService.model.myself

        console.log data

        console.log 'share 0 : '+(myself.type == 'BUSINESS')+'/'+(myself.facebookPageToPublish?)+'/'+(isConnected)
        console.log 'share 0 : '+isConnected

        if myself.type == 'BUSINESS' && myself.facebookPageToPublish? && isConnected

            console.log 'share 1'

            # catch id of the page
            FB.api '/'+myself.facebookPageToPublish, 'get',{},(response) ->
                console.log 'share 2'
                pageId = response.id

                # first : looking for page token
                FB.api '/me/accounts', 'get', {}, (response) ->
                    console.log 'share 3'
                    for a in response.data
                        console.log 'share 3.5:'+a.id+'/'+pageId
                        if a.id == pageId
                            console.log 'share 4 !!!!! :'+a.access_token
                            token = a.access_token

#                            FB.api '/me/feed?access_token='+token, 'get', 'post', data, (response) ->
#                                console.log 'share 5'
#                                console.log response

                            FB.api "/me/photos?access_token="+token,"POST",
                                url: data.pictureLink
                                caption:data.message
                            ,(response) ->
                                console.log 'share 5'
                                console.log response

#        console.log 'share !! '
#        FB.api '/1635544633340811/feed', 'post', { message: 'je suis un message' }, (response) ->
#            if !response or response.error
#                alert 'Error occured'
#                console.log response
#            else
#                console.log response

    #getter
    @isConnected = ->
        return isConnected

    return