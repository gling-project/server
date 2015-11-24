myApp.controller 'FollowedBusinessPageCtrl', ($rootScope, $scope, businessService, ngTableParams, $filter, followService) ->

    #params
    $scope.businessListParams =
        loading: true

    #loading
    businessService.getFollowedBusinesses (data) ->
        $scope.businesses = data
        $scope.$watch 'filter.$', (o, n) ->
            if n != o
                $scope.tableParams.reload()
        $scope.tableParams = new ngTableParams {
                page: 1
                count: 10
                sorting:
                    name: 'asc'
            },
            counts: []
            total: $scope.businesses.length
            getData: ($defer, params) ->
                filteredData = $filter('filter')($scope.businesses, $scope.filter)
                orderedData = if params.sorting() then $filter('orderBy')(filteredData, params.orderBy()) else filteredData
                #// use build-in angular filter
                $defer.resolve orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())

        $scope.checkAll = (check) ->
            for business in  $scope.businesses
                if business.followingNotification != check
                    business.followingNotification = check
                    $scope.setNotification business

        $scope.setNotification = (business) ->
            followService.setNotification business.id, business.followingNotification

        $scope.stopFollow = (business) ->
            followService.addFollow false, business.id, ->
                for key of $scope.businesses
                    if $scope.businesses[key] == business
                        $scope.businesses.splice key, 1
                $scope.tableParams.reload()

    , ->
        $scope.loading = false
        $scope.displayError = true

    # initialization
    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'