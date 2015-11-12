# mobile controller
# welcome controller
myApp.controller 'WelcomeCtrl', ($rootScope, $scope, $location, accountService, $flash, translationService, $timeout, modalService, languageService) ->

    #
    # change lang
    #
    $scope.$watch 'lang', ->
        if !angular.isUndefined($scope.lang)
            languageService.changeLanguage $scope.lang

    $scope.languageService = languageService
    $scope.loginFormParam =
        dto: {}
        mobileVersion: true
        facebookSuccess: (data) ->
            $location.url '/home'

    # loading
    $scope.login = ->
        if $scope.loginFormParam.isValid
            $scope.setLoading true
            accountService.login $scope.loginFormParam.dto, (->
                $timeout (->
                    $scope.setLoading false
                    $flash.success translationService.get('--.login.flash.success')
                    $location.url '/home'
                ), 1
            ), ->
                $scope.setLoading false
        else
            $scope.loginFormParam.displayErrorMessage = true

    #set loading
    $scope.setLoading = (b) ->
        if b == true
            modalService.openLoadingModal()
        else
            modalService.closeLoadingModal()

    #initialization
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'
    modalService.closeLoadingModal()
