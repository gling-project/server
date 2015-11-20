myApp.service 'mapService', ($http, $flash) ->

    #load map data form business
    @loadMapDataBusiness = (callbackSuccess,callbackError)->
        $http(
            'method': "GET",
            'url': "/rest/map/business",
            'headers': "Content-Type:application/json;charset=utf-8"
        ).success (data, status)->
            if callbackSuccess?
                callbackSuccess data.list
        .error (data, status)->
            $flash.error data.message
            if callbackError?
                callbackError data, status

    return