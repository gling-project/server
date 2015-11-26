myApp.service 'publicationService', ($http, $flash,geolocationService) ->
    @delete = (dto, callbackSuccess, callbackError) ->
        $http
            'method': 'DELETE'
            'url': '/rest/publication/' + dto.id
            'headers': 'Content-Type:application/json;charset=utf-8'
        .success (data, status) ->
            if callbackSuccess?
                callbackSuccess data
        .error (data, status) ->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    @loadByIds = (listId, callbackSuccess, callbackError) ->

        $http
            'method': 'POST'
            'url': '/rest/publication/ids/' + listId
            'headers': 'Content-Type:application/json;charset=utf-8'
            'data': geolocationService.getPositionWithoutNull()
        .success (data, status) ->
            console.log 'SUCCESS'
            console.log data
            if callbackSuccess?
                callbackSuccess data.list
        .error (data, status) ->
            console.log 'ERROR'
            $flash.error data.message
            if callbackError?
                callbackError data, status

    return