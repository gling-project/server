#business controller
#display data about businesses
#can create a business page from a facebook profile
#can change the status of the business
myApp.controller 'AdminBusinessCtrl', ($scope, superAdminService, ngTableParams, $filter, $window, modalService, $flash,$timeout) ->

    #params
    $scope.displayMap = false
    #import business params
    $scope.importBusinessInput = ''
    $scope.importBusinessLoading = false
    #map params
    #used to get map params to ngMap
    $scope.mapData =
        center:{}
        zoom: 11
    $scope.displayMap = false

    #refresh business data
    $scope.refresh = ->
        $scope.businesses = []
        $scope.businessListLoading = true

        #call service
        superAdminService.getAllBusinesses (data) ->
            $scope.businessListLoading = false
            $scope.businesses = data.list

            #create table
            $scope.tableParams = new ngTableParams({
                    page: 1
                    count: 50
                    sorting:
                        creationDate: 'desc'
                },
                total: $scope.businesses.length

            #this function is used to sorting
                getData: ($defer, params) ->
                    # use build-in angular filter
                    orderedData = if params.sorting() then $filter('orderBy')($scope.businesses,params.orderBy()) else $scope.businesses
                    $defer.resolve orderedData.slice((params.page() - 1) * params.count(),
                        params.page() * params.count())
            )

            $scope.generateMapMarkers()

    #display map
    $scope.displayMapFct = (value)->
        $scope.displayMap = value
        $scope.mapData.center.latitude = 50.8471417
        $scope.mapData.center.longitude = 4.3528959
        $timeout ->
            google.maps.event.trigger $scope.map, 'resize'
        ,1000

    $scope.startAnimation = (business, inthere) ->
        console.log business.id+'/'+inthere
        if inthere
            for marker in $scope.mks
                if marker.id == business.id
                        marker.setAnimation google.maps.Animation.BOUNCE
        else
            $timeout ->
                for marker in $scope.mks
                    if marker.id == business.id
                        marker.setAnimation null
            , 2000

    $scope.mks = [];

    #generate map marker
    $scope.generateMapMarkers = ->
        if $scope.map? and $scope.businesses?
            #called when the ngMap is initialized AND the positions are loaded
            for business in $scope.businesses
                if business.address?
                    marker = new (google.maps.Marker)({})
                    marker.id = business.id
                    marker.setPosition new (google.maps.LatLng)(business.address.posx, business.address.posy)
                    marker.setTitle business.name
                    if business.businessStatus == 'WAITING_CONFIRMATION'
                        marker.setIcon '/assets/images/google-map-marker/marker_orange.png'
                    else if business.businessStatus == 'NOT_PUBLISHED'
                        marker.setIcon '/assets/images/google-map-marker/marker_red.png'
                    else if business.businessStatus == 'PUBLISHED'
                        if business.hasOwner
                            marker.setIcon '/assets/images/google-map-marker/marker_green_light.png'
                        else
                            marker.setIcon '/assets/images/google-map-marker/marker_black.png'
                    marker.setMap $scope.map
                    $scope.mks.push marker


    # navigation : go to the business page
    $scope.toBusiness = (businessId) ->
        $window.open '/#business/' + businessId, '_blank'

    #confirm the request to be published from the business
    $scope.confirmPublication = (business) ->
        modalService.messageModal '--.admin.business.confirmPublication.modal.title', '--.admin.business.confirmPublication.modal.message', (close) ->
            #callback function to close the confirmation modal
            close()
            #send request to confirm the new status
            superAdminService.confirmPublication business.id, ->
                #callback success : change the status
                business.businessStatus = 'PUBLISHED'

    #import business data from a facebook page
    $scope.importBusinessStart = ->
        $scope.importBusinessLoading = true
        urlEncoded = encodeURIComponent $scope.importBusinessInput
        superAdminService.importBusiness urlEncoded, (->
            #callback success
            $scope.importBusinessLoading = false
            $flash.success 'le commerce a bien été importé'
            $scope.refresh()
        ), ->
            #callback failed
            $scope.importBusinessLoading = false

    #initlization
    $scope.refresh()