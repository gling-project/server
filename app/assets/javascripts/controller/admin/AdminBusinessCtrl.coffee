#business controller
#display data about businesses
#can create a business page from a facebook profile
#can change the status of the business
myApp.controller 'AdminBusinessCtrl', ($scope, superAdminService, ngTableParams, $filter, $window, modalService, $flash) ->

    #params
    $scope.displayMap = false
    #import business params
    $scope.importBusinessInput = ''
    $scope.importBusinessLoading = false
    #map params
    $scope.map =
        center:
            latitude: 50.8471417
            longitude: 4.3528959

    #refresh business data
    $scope.refresh = ->
        $scope.businesses = []

        #call service
        superAdminService.getAllBusinesses (data) ->
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
                    $defer.resolve orderedData.slice((params.page() - 1) * params.count(),params.page() * params.count())
            )

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
        urlEncoded=encodeURIComponent $scope.importBusinessInput
        console.log urlEncoded
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