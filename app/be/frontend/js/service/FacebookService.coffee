myApp.service 'facebookService', ($http, accountService, $locale, languageService, constantService, $flash, $filter) ->
    @facebookAppId
    @facebookAuthorization = 'public_profile,email' #,manage_pages,publish_pages'
    @facebookAuthorizationForPublishing = 'manage_pages,publish_pages'
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
                console.log response
                if response.status == 'connected'
                    authResponse = response.authResponse
                    isConnected = true
                    console.log 'FB3:' + isConnected
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
            return) document, 'script', 'facebook-jssdk'

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
            , {
                    scope: @facebookAuthorization,
                    auth_type: 'rerequest'
                }


    #
    # login
    # log the user to facebook and to the server
    #
    @login = (successCallback, callbackError) ->
        console.log 'LOOOGIN ????'
        #is facebook is connected, call the server with authResponse
        if isConnected
            @loginToServer successCallback, callbackError
        else
# else, log to facebook
            console.log 'LOOOGIN'
            console.log FB
            FB.login (response) ->
                if response.status == 'connected'

                    r = '/oauth/access_token?grant_type=fb_exchange_token&client_id=1446672245627002&client_secret=20052ab259a900cdfe062d383fc0329b&fb_exchange_token='+response.authResponse.accessToken

                    $http
                        'method': 'GET'
                        'url': 'https://graph.facebook.com'+r
                        'headers': 'Content-Type:application/json;charset=utf-8'
                    .success (data, status) ->
                        console.log('success')
                        console.log(data)


                        $http
                            'method': 'GET'
                            'url': 'https://graph.facebook.com/v2.5/me/accounts?'+data
                            'headers': 'Content-Type:application/json;charset=utf-8'
                        .success (data, status) ->
                            console.log 'permanent access ??'
                            console.log data

#                        FB.api '/me/accounts?access_token='+data.access_token, 'get', {}, (response) ->
#                            console.log 'permanent access ??'
#                            console.log response

                    .error (data, status) ->
                        console.log('error')
                        console.log(data)


#                    FB.api r, 'get', {}, (response) ->
#                        console.log 'oauth ? '
#                        console.log response

#                    # catch id of the page
#                    FB.api '/' + myself.facebookPageToPublish, 'get', {}, (response) ->
#                        console.log 'share 2'
#                        pageId = response.id
#
#                        //oauth/access_token?grant_type=fb_exchange_token&client_id=1446672245627002&client_secret=20052ab259a900cdfe062d383fc0329b&fb_exchange_token=CAACEdEose0cBAEJmcxuQ7lYYw9qiRKrCNRWxoFcd7HVFqCUUESZARXLSoLZAs6ZCvc7ZCtq5GBr4IdQn30SKWHxEZB27sVRJUukBNZCffDH9PBsMor9wxeNJCt7MHkKzoo9Axr0sJLmeOafmuZB1mhyQweZBuQFY2eleYBvCZCfniSP0YscmaQLbELRCyW0bsrH5D0uLAr1qRft5UyITCefZCZA
#
#                    $http
#                        'method': 'POST'
#                        'url': 'https://graph.facebook.com/v2.5/oauth/access_token'
#                        'headers': 'Content-Type:application/json;charset=utf-8'
#                        'data':
#                            'grant_type': 'fb_exchange_token'
#                            'client_id': '1446672245627002'
#                            'client_secret': '20052ab259a900cdfe062d383fc0329b'
#                            'fb_exchange_token': response.authResponse.accessToken
#                    .success (data, status) ->
#                        console.log('prout success');
#                        console.log(data);
#                    .error (data, status) ->
#                        console.log('prot fail');
#                        console.log(data);


                    #... and log to server
                    authResponse = response.authResponse
                    #... and log
                    _this.loginToServer successCallback, callbackError
                    isConnected = true
                else
                    if callbackError?
                        callbackError()
            , {
                    scope: @facebookAuthorization,
                    auth_type: 'rerequest'
                }

    @publish = (publication, successCallback, callbackError) ->

#        @sharePublication(publication.businessId,publication.id)
        data =
            message: publication.title + "\n\n" + publication.description

        myself = accountService.model.myself

        #if publication.pictures.length > 0
        #    data.pictureLink = $filter('image')(publication.pictures[0])

        if publication.pictures.length > 0
            if myself.type == 'BUSINESS' && myself.facebookPageToPublish? && isConnected

                expectedAlbumName = 'publication'

                # catch id of the page
                FB.api '/' + myself.facebookPageToPublish, 'get', {}, (response) ->
                    console.log 'share 2'
                    pageId = response.id

                    FB.login (response) ->
                        console.log 'share 4.1'
                        console.log response


                        addPhotos = (albumId, token)->
# add photos
                            for p in publication.pictures
                                FB.api "/" + albumId + "/photos?access_token=" + token, "POST",
                                    url: $filter('image')(p)
                                    caption: data.message
#                                                no_story:true
                                , (response) ->
                                    console.log 'share 6'
                                    console.log response

                        # first : looking for page token
                        FB.api '/me/accounts', 'get', {}, (response) ->
                            console.log 'share 3'
                            for a in response.data
                                console.log 'share 3.5:' + a.id + '/' + pageId
                                if a.id == pageId
                                    console.log 'share 4 !!!!! :' + a.access_token
                                    token = a.access_token

                                    # load albums
                                    albumId = null
                                    FB.api "/me/albums?access_token=" + token, "GET", {}, (response) ->
                                        for d in response.data
                                            if d.name == expectedAlbumName
                                                albumId = d.id
                                                addPhotos(albumId, token)
                                                break

                                        if !albumId?
# 1 create an album
                                            FB.api "/me/albums?access_token=" + token, "POST",
                                                name: expectedAlbumName
                                            , (albumResponse) ->
                                                console.log 'share 5'
                                                addPhotos(albumResponse.id, token)


        else
            if myself.type == 'BUSINESS' && myself.facebookPageToPublish? && isConnected

                console.log 'share 1'

                # catch id of the page
                FB.api '/' + myself.facebookPageToPublish, 'get', {}, (response) ->
                    console.log 'share 2'
                    pageId = response.id

                    FB.login (response) ->
                        console.log 'share 4.1'
                        console.log response

                        # first : looking for page token
                        FB.api '/me/accounts', 'get', {}, (response) ->
                            console.log 'share 3'
                            for a in response.data
                                console.log 'share 3.5:' + a.id + '/' + pageId
                                if a.id == pageId
                                    console.log 'share 4 !!!!! :' + a.access_token
                                    token = a.access_token

                                    #                                    if data.pictureLink?
                                    #                                        FB.api "/me/photos?access_token=" + token, "POST",
                                    #                                            url: data.pictureLink
                                    #                                            caption: data.message
                                    #                                        , (response) ->
                                    #                                            console.log 'share 5'
                                    #                                            console.log response
                                    #                                    else
                                    FB.api '/me/feed?access_token=' + token, 'get', 'post', data, (response) ->
                                    console.log 'share 5'
                                    console.log response

                    , {scope: 'manage_pages,publish_pages'}

    #getter
    @isConnected = ->
        return isConnected

    return