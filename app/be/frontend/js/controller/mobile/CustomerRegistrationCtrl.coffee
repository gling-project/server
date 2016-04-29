#mobile controller
#customer registraton
myApp.controller 'CustomerRegistrationCtrl', ($rootScope, $scope, $flash, accountService, facebookService, translationService, modalService, $location) ->

    #param
    $scope.facebookAppId = facebookService.facebookAppId
    $scope.facebookAuthorization = facebookService.facebookAuthorization
    #basic url to redict after facebook connection
    $scope.basic_url = location.host


    #return the value of the param 'name'
    $scope.getUrlParam = (name, url) ->
        if !url
            url = location.href
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
        regexS = '[\\?&]' + name + '=([^&#]*)'
        regex = new RegExp(regexS)
        results = regex.exec(url)
        if results == null then null else results[1]

    $scope.setLoading = (b) ->
        if b == true
            modalService.openLoadingModal()
        else
            modalService.closeLoadingModal()
        return

    #
    #facebook success
    #
    $scope.facebookSuccess = (data) ->
        accountService.setMyself data
        if data.type == 'BUSINESS'
            $location.path '/business/' + accountService.getMyself().businessId
        else
            $location.path '/'
        $scope.setLoading false

    #
    # facebook connection
    #
    $scope.fb_login = ->

        success = (data) ->
            $scope.facebookSuccess data
            $scope.setLoading false

        failed = (data) ->
            $flash.error data.message
            $scope.setLoading false
            $scope.$apply()

        $scope.setLoading true
        #if the facebook account is already logged, log the server
        if facebookService.isConnected()
            facebookService.loginToServer success, failed
        else
            #open an url to log the user to facebook
            url = 'https://www.facebook.com/dialog/oauth/?scope='+facebookService.facebookAuthorization+'&client_id=' + $scope.facebookAppId + '&redirect_uri=' + $scope.basic_url + '/&state=BELGIUM&$scope=' + $scope.facebookAuthorization + '&response_type=token'
            window.open url, '_self'


    # try to catch facebook connection
    if location.href.indexOf('access_token') != -1
        access_token = $scope.getUrlParam('access_token', location.href)
        if access_token != null
            $scope.setLoading true
            facebookService.loginToServerSimple access_token, ((data) ->
                $scope.facebookSuccess data
            ), (data, status) ->
                $scope.setLoading false

    #save function
    $scope.save = ->
        #test is the form is valie
        if !$scope.accountParam.isValid
            $scope.accountParam.displayErrorMessage = true
        else
            #display loading
            $scope.setLoading true
            #call service
            accountService.registration $scope.accountParam.dto, (->
                #success
                #the account was already stored into accountService by the accountService.registration function
                $scope.setLoading false
                $flash.success translationService.get('--.login.flash.success')
                #go to default page
                $location.url '/'
            ), ->
                $scope.setLoading false

    #initalization

    #add http - only for localhost mode
    if $scope.basic_url.indexOf('http') == -1
        $scope.basic_url = 'http://' + $scope.basic_url
    $scope.accountParam =
        mobileVersion: true

    #stop progress bar
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    #close loading modal
    modalService.closeLoadingModal()