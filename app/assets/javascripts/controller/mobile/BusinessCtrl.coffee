# mobile controller
# display the business page
# can call form to create new publication if this is the business of the logged user
myApp.controller 'BusinessCtrl', ($rootScope, $scope, $routeParams, businessService, geolocationService, addressService, $timeout, $flash, followService, $filter, modalService, accountService) ->

    #params
    #loading
    $scope.temp = 6
    $scope.loading = true
    #business params
    $scope.publicationListParam =
        businessId: $routeParams.businessId
    #true if this is the business of the logged user
    $scope.myBusiness = accountService.getMyself().businessId == $scope.publicationListParam.businessId
    #description limitation size
    $scope.descriptionLimitBase = 200
    $scope.descriptionLimit = $scope.descriptionLimitBase
    #address
    $scope.googleMapParams = staticMap: true

    #if there is an history in the window, display the 'back' button
    $scope.displayBack = ->
        window.history.length > 0

    #back action
    $scope.back = ->
        window.history.back()

    #follow / disfollow this business
    $scope.followed = ->
        #change value
        $scope.business.following= !$scope.business.following

        #display success message
        if $scope.business.following
            $flash.success $filter('translateText')('--.followWidget.message.add')
        else
            $flash.success $filter('translateText')('--.followWidget.message.remove')

        #call server with new value
        followService.addFollow $scope.business.following, $scope.business.id

    #open the gallery when the user click on a picture
    $scope.openGallery = (image) ->
        $rootScope.$broadcast 'DISPLAY_PICTURE_IN_GALLERY',
            list: $scope.business.galleryPictures
            first: image

    #return true if there is a schedule, false is not
    $scope.displaySchedule = ->
        if $scope.business?.schedules?
            for schedule in $scope.business.schedules
                if schedule.length > 0
                    return true
        false

    #load business data
    businessService.getBusiness $routeParams.businessId, (data) ->
        
        #stop loading icons
        $rootScope.$broadcast 'PROGRESS_BAR_STOP'
        modalService.closeLoadingModal()
        $scope.loading = false
        $scope.business = data
        $scope.tabToDisplay = 'home'
        $scope.categoryLineParams = categories: $scope.business.categories
        #address
        $scope.googleMapParams.address = $scope.business.address
        $scope.googleMapParams.mobile = true
        
        #watch on tabToDisplay
        $scope.$watch 'tabToDisplay', ->
            #refresh the google map when it is displayed
            if $scope.tabToDisplay == 'info'
                $timeout (->
                    $scope.googleMapParams.refreshNow()
                    return
                ), 1

        #return true if socialnetwork line can be displayed
        $scope.displaySocialNetwork = ->
            s = $scope.business.socialNetwork
            if s?
                return false
            return s.facebookLink? or s.twitterLink? or s.instagramLink? or s.deliveryLink? or s.opinionLink? or s.reservationLink?

        #list of tab available
        $scope.tab = [
            {
                name: 'home'
                translatableName: '--.business.action.home'
                icon: 'gling-icon-home'
                action: ->
                    $scope.tabToDisplay = 'home'
                    return
                display: ->
                    true

            }
            {
                name: 'info'
                translatableName: '--.business.action.info'
                icon: 'gling-icon-info'
                action: ->
                    $scope.tabToDisplay = 'info'
                    return
                display: ->
                    true

            }
            {
                name: 'gallery'
                icon: 'gling-icon-images'
                translatableName: '--.business.action.gallery'
                action: ->
                    $scope.tabToDisplay = 'gallery'
                    return
                display: ->
                    $scope.business.galleryPictures != null and $scope.business.galleryPictures.length > 0

            }
        ]

        #compute distance
        $scope.computeDistance = ->
            #call server
            addressService.distance $scope.business.address.id, (data) ->
                $scope.business.distance = data.distance

        #catch change position event and call compteDistance
        $scope.$on 'POSITION_CHANGED', ->
            $scope.computeDistance()
            $scope.$broadcast 'RELOAD_PUBLICATION'

        #refresh publication when user click on the business illustration
        $scope.refreshPublications = ->
            $scope.tabToDisplay = 'home'
            $scope.$broadcast 'RELOAD_PUBLICATION'

        #reload publication listener
        $scope.$on 'RELOAD_PUBLICATION', ->
            $scope.publicationListParam.refresh()

        #initialization
        if geolocationService.currentPosition != null
            $scope.$broadcast 'RELOAD_PUBLICATION'
        $scope.computeDistance()

    #create publications
    $scope.createPromotion = ->
        modalService.openLoadingModal()
        $scope.navigateTo '/promotion'

    $scope.createNotification = ->
        modalService.openLoadingModal()
        $scope.navigateTo '/businessNotification'