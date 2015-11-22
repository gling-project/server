# mobile controller
# my profile
# the user can consult and edit his own profile
myApp.controller 'ProfileCtrl', ($rootScope, $scope, modalService, accountService, facebookService, $flash, translationService, $location, constantService) ->

    #params
    $scope.model = accountService.model
    $scope.activeTab = 'personal'
    $scope.facebookAppId = facebookService.facebookAppId
    $scope.facebookAuthorization = facebookService.facebookAuthorization
    $scope.basic_url = location.host + '/profile'
    #create the basic url
    if $scope.basic_url.indexOf('http') == -1
        if $scope.basic_url.indexOf('localhost') != -1
            $scope.basic_url = 'http://' + $scope.basic_url
        else
            $scope.basic_url = 'https://' + $scope.basic_url

    #account param
    $scope.accountParam =
        updateMode: true
        dto: angular.copy(accountService.getMyself())
        disabled: true
    #interest
    $scope.interestParam =
        result: angular.copy(accountService.getMyself().customerInterests)
        disabled: true

    #edit password => open the editPassword modal
    $scope.editPassword = ->
        modalService.openEditPasswordModal()

    # save account changes
    $scope.accountSave = ->
        $scope.accountParam.disabled = true
        accountService.editAccount $scope.accountParam.dto

    #cancel account changes
    $scope.accountCancel = ->
        $scope.accountParam.dto = angular.copy(accountService.getMyself())
        $scope.accountParam.disabled = true

    # add address => open address modal
    $scope.addAddress = ->
        modalService.addressModal true, null, false

    # edit existing address
    $scope.editAddress = (address) ->
        modalService.addressModal true, address, false

    #remove existing address
    $scope.deleteAddress = (address) ->
        accountService.deleteAddress address
        if constantService.compareNumber accountService.getMyself().selectedAddress?.id,address.id
            accountService.getMyself().selectedAddress = null

    #change interest save
    $scope.interestSave = ->
        accountService.editCustomerInterest {customerInterests: $scope.interestParam.result}, (->
            accountService.getMyself().customerInterests = $scope.interestParam.result
            $scope.interestParam.disabled = true
            $scope.loading = false
        ), ->
            $scope.loading = false

    #facebook link success
    $scope.facebookSuccess = (data)->
        accountService.setMyself data
        $flash.success translationService.get('--.profile.linkFacebook.success')

    #link to facebook
    $scope.fb_login = ->
        $scope.loading = true
        if facebookService.isConnected()
            facebookService.linkToAccount null, (data) ->
                $scope.facebookSuccess data
                $scope.loading = false
            , ->
                $scope.loading = false
        else
            url = 'https://www.facebook.com/dialog/oauth/?scope='+facebookService.facebookAuthorization+'&client_id=' + $scope.facebookAppId + '&redirect_uri=' + $scope.basic_url + '/&state=BELGIUM&scope=' + $scope.facebookAuthorization + '&response_type=token'
            window.open url, '_self'

    #return a specific url param
    $scope.getUrlParam = (name, url) ->
        if !url
            url = location.href
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
        regexS = '[\\?&]' + name + '=([^&#]*)'
        regex = new RegExp(regexS)
        results = regex.exec(url)
        if results == null then null else results[1]

    # try to catch facebook connection
    # mobile version
    if location.href.indexOf('access_token') != -1
        access_token = $scope.getUrlParam('access_token', location.href)

        if access_token?
            $scope.loading = true
            facebookService.linkToAccount access_token, (data) ->
                $scope.facebookSuccess data
            , ->
                $scope.loading = false

        $location.url($location.path());

    #initialization
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'
    modalService.closeLoadingModal()

    return