#mobile controller
#customer registraton
myApp.controller 'CustomerRegistrationCtrl', ($rootScope, $scope, $flash, accountService, facebookService, translationService, modalService, $location) ->

    #param
    $scope.facebookAppId = facebookService.facebookAppId
    $scope.facebookAuthorization = facebookService.facebookAuthorization
    #basic url to redict after facebook connection
    $scope.basic_url = location.host
    #add http - only for localhost mode
    if $scope.basic_url.indexOf('http') == -1
        $scope.basic_url = 'http://' + $scope.basic_url
    facebookAuthentication = null
    $scope.accountParam =
        mobileVersion: true

    #
    # facebook connection
    # this function is called if Facebook is connected to the application.
    # This function will be connect the facebook account to the backend
    # the access_token is the access_token from Facebook
    #
    $scope.facebookSuccess = (access_token) ->
        #send request
        dto =
            token: access_token
            accountType: 'CUSTOMER'
        #test the facebook account
        accountService.testFacebook dto, (data2) ->
            $scope.loading false
            # An account using the facebook account already exists. The user is now connected.
            # The user is redirect to the default page
            if data2.status == 'ALREADY_REGISTRERED'
                $flash.success '--.customer.registrationModal.alredyRegistred.success'
                accountService.setMyself data2.myself
                $location.url '/'
            else if data2.status == 'ACCOUNT_WITH_SAME_EMAIL'
                $scope.fusion data2.accountFusion
            else if data2.status == 'OK'
                #assign data from Facebook to fields
                $scope.accountParam.dto.firstname = data2.firstname
                $scope.accountParam.dto.lastname = data2.lastname
                $scope.accountParam.dto.email = data2.email
                $scope.accountParam.dto.gender = data2.gender
                $scope.accountParam.dto.password = '*********'
                $scope.accountParam.maskPassword()
                #complete facebookAuthentication DTO
                facebookAuthentication = dto
                facebookAuthentication.userId = data2.userId
                #control data. If one of required data are missing, the user need to complete data.
                if $scope.accountParam.dto.firstname == null or $scope.accountParam.dto.length == 0 or $scope.accountParam.dto.lastname == null or $scope.accountParam.dto.lastname.length == 0 or $scope.accountParam.dto.email == null or $scope.accountParam.dto.email.length == 0 or $scope.accountParam.dto.gender == null or $scope.accountParam.dto.gender.length == 0
                    $scope.accountParam.disabled = false
                    $flash.info '--.registration.facebook.someDataEmpty'
                else
                    #if all required data are present, the user need to accept the SLA
                    $flash.info '--.registration.facebook.validSLAMessage'

    #return the value of the param 'name'
    $scope.getUrlParam = (name, url) ->
        if !url
            url = location.href
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
        regexS = '[\\?&]' + name + '=([^&#]*)'
        regex = new RegExp(regexS)
        results = regex.exec(url)
        if results == null then null else results[1]

    #try to catch the access token back from facebeook connection
    #mobile version
    if location.href.indexOf('access_token') != -1
        access_token = $scope.getUrlParam('access_token', location.href)
        #window.location.hash = '#';
        if access_token != null
            $scope.facebookSuccess access_token

    $scope.loading = (b) ->
        if b == true
            modalService.openLoadingModal()
        else
            modalService.closeLoadingModal()
        return

    #if the email is already used but for a
    $scope.fusion = (accountFusion) ->
        modalService.openFacebookFusionModal accountFusion, $scope.close
        return

    #save function
    $scope.save = ->
        #test is the form is valie
        if !$scope.accountParam.isValid
            $scope.accountParam.displayErrorMessage = true
        else
            #create dto
            dto =
                accountRegistration: $scope.accountParam.dto
                facebookAuthentication: facebookAuthentication
            #display loading
            $scope.loading true
            #call service
            accountService.registration dto, (->
                #success
                #the account was already stored into accountService by the accountService.registration function
                $scope.loading false
                $flash.success translationService.get('--.login.flash.success')
                #go to default page
                $location.url '/'
            ), ->
                $scope.loading false

    #initalization
    #stop progress bar
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'

    #close loading modal
    modalService.closeLoadingModal()