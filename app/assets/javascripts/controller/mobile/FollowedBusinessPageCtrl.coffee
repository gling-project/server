#mobile controller
#list my followed businesses
myApp.controller 'FollowedBusinessPageCtrl', ($rootScope, $scope, businessService, ngTableParams, $filter, followService, modalService) ->

    $scope.businessListParams =
        loading: true

    #call service : load list of followaed businesses
    businessService.getFollowedBusinesses (data) ->

        $scope.businesses = data

        #set notification
        $scope.setNotification = (business) ->
            business.followingNotification = !business.followingNotification
            #call service
            followService.setNotification business.id, business.followingNotification

        #stop follow business
        $scope.stopFollow = (business) ->
            #remove business from the list
            for key of $scope.businesses
                if $scope.businesses[key] == business
                    $scope.businesses.splice key, 1
            #call service
            followService.addFollow false, business.id

    #initialization
    #back to the top of the page
    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'
    modalService.closeLoadingModal()