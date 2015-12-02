myApp.directive 'headerBarCtrl', (addressService, $rootScope, languageService, $location, accountService, facebookService, modalService, $timeout, geolocationService, addressService) ->
    restrict: 'E'
    scope: {}
    templateUrl: '/assets/js/directive/web/headerBar/template.html'
    replace: true
    compile: ->
        post: (scope) ->

            #params
            scope.currentLang = languageService.currentLang
            scope.languageService = languageService
            #use the model
            scope.myself = accountService.getMyself()
            scope.accountService = accountService

            scope.testPath = (url) ->
                $location.path().indexOf(url) > -1

            scope.goToHome = ->
                $(window).scrollTop 0
                scope.navigateTo '/home'

            scope.navigateTo = (target) ->
                $location.path target

            #login open modal
            scope.login = ->
                modalService.openLoginModal()

            #registration open modal
            scope.registration = ->
                modalService.openCustomerRegistrationModal()

            #edit profile
            scope.editProfile = ->
                modalService.openEditProfileModal()

            #log out
            scope.logout = ->
                $rootScope.$broadcast 'LOGOUT'
                accountService.logout ->
                    $location.path '/'

            #
            # change lang
            #
            scope.$watch 'lang', ->
                if !angular.isUndefined(scope.lang)
                    languageService.changeLanguage scope.lang
            #
            # POSITION
            #
            scope.currentPosition = null
            scope.suspendWatching = false
            scope.positionBasicData = [
                key: 'currentPosition'
                translation: '--.position.current'
            ,
                key: 'createNewAddress'
                translation: '--.position.newAddress'
            ]
            #the user has selected a new address
            $rootScope.$on 'CHANGE_ADDRESS_SELECTED', ->
                if !accountService.getMyself().selectedAddress?
                    if !geolocationService.position?
                        scope.currentPosition = 'default'
                    else
                        scope.currentPosition = 'currentPosition'
                scope.currentPosition = accountService.getMyself().selectedAddress.name

            $timeout ->
                completePositions()
                scope.$watch 'currentPosition', (n, o) ->
                    console.log n + '/' + o + '=>' + scope.suspendWatching
                    if n? and o != n and scope.suspendWatching != true
                        scope.suspendWatching = true
                        if scope.currentPosition == 'createNewAddress'
                            scope.currentPosition = o
                            if accountService.getMyself()?
                                #open modal to create new address
                                modalService.addressModal true, null, false, (data) ->
                                    $timeout ->
                                        scope.currentPosition = data.name
                                    , 1
                            else
                                modalService.openLoginModal scope.createNewAddress, angular.copy(o), '--.loginModal.help.address'
                        else if scope.currentPosition == 'currentPosition' and !geolocationService.position?
                            scope.currentPosition = o
                            modalService.messageModal '--.message.modal.notLocalised.title', '--.message.modal.notLocalised.content'
                        else if scope.currentPosition != scope.positionCurrenltyComputed
                            scope.positionCurrenltyComputed = scope.currentPosition
                            addressService.changeAddress scope.currentPosition, (result) ->
                                if accountService.getMyself()?
                                    if result.__type.indexOf('AddressDTO') == -1
                                        accountService.getMyself().selectedAddress = null
                                    else
                                        accountService.getMyself().selectedAddress = result
                                $timeout ->
                                    $rootScope.$broadcast 'POSITION_CHANGED'
                                , 1
                        $timeout ->
                            scope.suspendWatching = false
                        , 1
                $rootScope.$watch ->
                    accountService.model.myself
                ,  ->
                    completePositions()
            , 1

            $rootScope.$on 'POSITION_CHANGED', ->
                completePositions()

            completePositions = ->
                scope.positions = angular.copy(scope.positionBasicData)
                if !geolocationService.position?
                    scope.positions.splice 0, 0,
                        key: 'default'
                        translation: '--.position.brussel'
                else
                    if scope.currentPosition == 'default'
                        scope.currentPosition = 'currentPosition'
                if accountService.getMyself()?
                    for key of accountService.getMyself().addresses
                        scope.positions.splice scope.positions.length - 1, 0,
                            key: accountService.getMyself().addresses[key].name
                            translation: accountService.getMyself().addresses[key].name
                scope.currentPosition = geolocationService.getLocationText()

            $rootScope.$watch ->
                accountService.model.myself
            , ->
                completePositions()
            , true