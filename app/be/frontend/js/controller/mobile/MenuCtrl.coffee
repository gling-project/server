#mobile controller
#menu
#manage the menu content
myApp.controller 'MenuCtrl', ($rootScope, $scope, facebookService, accountService, $location, $timeout, geolocationService, modalService, addressService) ->

    #params
    $scope.showmenu = false
    $scope.myBusiness = null
    #position
    $scope.currentPosition = null
    $scope.semaphoreComputeAddress = false
    $scope.positionBasicData = [
        {
            key: 'currentPosition'
            translation: '--.position.current'
        }
        {
            key: 'createNewAddress'
            translation: '--.position.newAddress'
        }
    ]

    #if there user have a business, add access to my business
    if accountService.getMyself()? and accountService.getMyself().businessId?
        $scope.myBusiness = accountService.getMyself().businessId

    #watch the businessId
    $scope.$watch (->
        return accountService.getMyself()? and accountService.getMyself().businessId
    ), (->
        $scope.myBusiness = accountService.getMyself()? and accountService.getMyself().businessId
    )

    #this is the toggle function
    $scope.$on 'toggleMenu', ->
        $scope.showmenu = if $scope.showmenu then false else true

    #close the menu
    $scope.closeMenu = ->
        $scope.showmenu = false

    #navigate to
    $scope.navigateTo = (target) ->
        $scope.showmenu = false
        if $location.path().indexOf(target) == -1
            #display progress bar and loading modal
            $rootScope.$broadcast 'PROGRESS_BAR_START'
            modalService.openLoadingModal()
            $rootScope.$broadcast 'SEARCH_CLEAN'
            $timeout (->
                #go to target
                $location.path target
            ), 1

    #logout the user
    $scope.logout = ->
        #broadcast logout
        $scope.$broadcast 'LOGOUT'
        #call service
        accountService.logout ->
            $location.path '/'
            $scope.closeMenu()

    #
    # POSITION
    #
    #the user has selected a new address
    $rootScope.$on 'CHANGE_ADDRESS_SELECTED', ->
        if accountService.getMyself().selectedAddress == null
            if geolocationService.position == null
                $scope.currentPosition = 'default'
            else
                $scope.currentPosition = 'currentPosition'
        $scope.currentPosition = accountService.getMyself().selectedAddress.name


    #change position listener
    $rootScope.$on 'POSITION_CHANGED', ->
        console.log 'je suis POSITION_CHANGED : ' + $scope.suspendWatching
        completePositions()

    #complete the list of addresses usable
    completePositions = ->
        $scope.positions = angular.copy($scope.positionBasicData)
        if geolocationService.position == null
            $scope.positions.splice 0, 0,
                key: 'default'
                translation: '--.position.brussel'
        else
            if $scope.currentPosition == 'default'
                $scope.currentPosition = 'currentPosition'
        if accountService.getMyself()?
            for address in accountService.getMyself().addresses
                $scope.positions.splice $scope.positions.length - 1, 0,
                    key: address.name
                    translation: address.name
        $scope.currentPosition = geolocationService.getLocationText()

    #complete position if the myself change
    $rootScope.$watch (->
        accountService.model.myself
    ), ((n, o) ->
        completePositions()
        return
    ), true

    #initialisation
    $timeout (->
        #complete position
        completePositions()
        # if the current position change
        $scope.$watch 'currentPosition', (n, o) ->
            if n? and o? and !$scope.semaphoreComputeAddress
                $scope.semaphoreComputeAddress = true

                #the user want to create a new address
                if $scope.currentPosition == 'createNewAddress'
                    #select the old position by default
                    $scope.currentPosition = o
                    #if the user is logger, open the addresModal
                    if accountService.getMyself()?
                        #open modal to create new address
                        modalService.addressModal true, null, false, (data) ->
                            #success
                            $timeout (->
                                $scope.currentPosition = data.name
                            ), 1
                    else
                        #if the user is not logger, open the loginModal
                        modalService.openLoginModal $scope.createNewAddress, angular.copy(o), '--.loginModal.help.address'
                #is the selected address is currentPosition but the geolocation is  not acitve, display error message
                else if $scope.currentPosition == 'currentPosition' and !geolocationService.currentPosition?
                    #swtich to old position
                    $scope.currentPosition = o
                    modalService.messageModal '--.message.modal.notLocalised.title', '--.message.modal.notLocalised.content'
                #else, change position
                else if $scope.currentPosition != $scope.positionCurrenltyComputed
                    $scope.positionCurrenltyComputed = $scope.currentPosition

                    #change address
                    if accountService.getMyself()!=null &&  ((accountService.getMyself().selectedAddress==null && $scope.currentPosition!='currentPosition' && $scope.currentPosition!='default') || (accountService.getMyself().selectedAddress!=null && accountService.getMyself().selectedAddress.name != $scope.currentPosition))
                        #change address
                        if $scope.currentPosition == 'default' || $scope.currentPosition == 'currentPosition'
                                accountService.getMyself().selectedAddress = null
                            else
                                for address in accountService.getMyself().addresses
                                    if address.name == $scope.currentPosition
                                        accountService.getMyself().selectedAddress = address
                        $timeout (->
                            $rootScope.$broadcast 'POSITION_CHANGED'
                        ), 1

                        #call service
                        addressService.changeAddress $scope.currentPosition

                #after operation, disabled semaphore
                $timeout (->
                    $scope.semaphoreComputeAddress = false
                ), 1
            return

        #watch myself
        $rootScope.$watch (->
            accountService.model.myself
        ), () ->
            completePositions()
    ), 1