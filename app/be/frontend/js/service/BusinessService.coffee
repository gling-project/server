myApp.service 'businessService', ($flash, $http, accountService,geolocationService) ->

    @loadLastBusiness = (businessNb, callbackSuccess, callbackError) ->
        $http
            'method': 'POST'
            'url': '/rest/business/last/'+businessNb
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': geolocationService.getPositionWithoutNull()
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data.list
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @createBusiness = (accountId, businessName, callbackSuccess, callbackError) ->
        $http
            'method': 'POST'
            'url': '/rest/createBusiness'
            'headers': 'Content-Type:application/json;charset=utf-8'
            data:
                accountId: accountId
                businessName: businessName
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @importBusinessFormFacebook = (urlFacebook, callbackSuccess, callbackError) ->
        $http
            'method': 'GET'
            'url': '/rest/createBusinessFromFacebook/' + urlFacebook
            'headers': 'Content-Type:application/json;charset=utf-8'
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @getBusiness = (id, callbackSuccess, callbackError) ->
        $http
            'method': 'GET'
            'url': '/rest/business/' + id
            'headers': 'Content-Type:application/json;charset=utf-8'
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @getFollowedBusinesses = (callbackSuccess, callbackError) ->
        $http
            'method': 'GET'
            'url': '/rest/business/followed'
            'headers': 'Content-Type:application/json;charset=utf-8'
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data.list
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @edit = (dto, callbackSuccess, callbackError) ->
        $http
            'method': 'PUT'
            'url': '/rest/business/' + dto.id
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': dto
        .success (data, status) ->
            accountService.getMyself().business = data
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @editSocialNetwork = (businessId, dto, callbackSuccess, callbackError) ->
        $http
            'method': 'PUT'
            'url': '/rest/business/' + businessId + '/social_network'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': dto
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @editBusinessCategory = (businessId, dto, callbackSuccess, callbackError) ->
        $http
            'method': 'PUT'
            'url': '/rest/business/' + businessId + '/category'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': list: dto
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @publishBusiness = (callbackSuccess, callbackError) ->
        $http
            'method': 'POST'
            'url': '/rest/business/ask_publication'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': {}
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @cancelPublishRequest = (callbackSuccess, callbackError) ->
        $http
            'method': 'POST'
            'url': '/rest/business/cancel_publication_request'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': {}
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @stopPublication = (callbackSuccess, callbackError) ->
        $http
            'method': 'POST'
            'url': '/rest/business/stop_publish'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': {}
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @editIllustration = (businessId, dto, callbackSuccess, callbackError) ->
        $http
            'method': 'PUT'
            'url': '/rest/business/' + businessId + '/illustration'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': dto
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @editLandscape = (businessId, dto, callbackSuccess, callbackError) ->
        $http
            'method': 'PUT'
            'url': '/rest/business/' + businessId + '/landscape'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': dto
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @editAddress = (businessId, dto, callbackSuccess, callbackError) ->
        $http
            'method': 'PUT'
            'url': '/rest/business/' + businessId + '/address'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': dto
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @createSchedule = (businessId, dto, callbackSuccess, callbackError) ->
        $http
            'method': 'POST'
            'url': '/rest/business/' + businessId + '/schedule'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': dto
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data.list
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @editGallery = (businessId, dto, callbackSuccess, callbackError) ->
        $http
            'method': 'POST'
            'url': '/rest/business/' + businessId + '/edit/gallery'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': dto
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data.list
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @getInterests = (callbackSuccess, callbackError) ->
        $http
            'method': 'GET'
            'url': '/rest/business/interests'
            'headers': 'Content-Type:application/json;charset=utf-8'
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data.list
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @claimBusiness = (businessId, phone, vta, callbackSuccess, callbackError) ->
        $http
            'method': 'POST'
            'url': '/rest/business/claim'
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data':
                phone: phone
                vta: vta
                businessId: businessId
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    return