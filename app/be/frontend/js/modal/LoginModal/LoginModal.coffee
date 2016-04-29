myApp.controller 'LoginModalCtrl', ($scope, $flash, $filter,facebookService, translationService, $modal, $modalInstance, accountService, $location, modalService, fctToExecute, fctToExecuteParams, helpMessage) ->

    #params
    $scope.fctToExecute = fctToExecute
    $scope.helpMessage = helpMessage
    $scope.loginFormParam =
        facebookSuccess: (data) ->
            if fctToExecute?
                fctToExecute fctToExecuteParams
            $scope.close()
        loading: false

    $scope.close = ->
        $modalInstance.close()

    #save
    $scope.save = ->

        if !$scope.loginFormParam.isValid
            $scope.loginFormParam.displayErrorMessage = true
            $flash.error translationService.get('--.generic.error.complete.fields')
        else
            $scope.loginFormParam.loading = true
            accountService.login $scope.loginFormParam.dto, ->
                $flash.success translationService.get('--.login.flash.success')
                $scope.loading = false
                $scope.close()
                if accountService.getMyself().type == 'BUSINESS'
                    $location.path '/business/' + accountService.getMyself().businessId
                if fctToExecute?
                    fctToExecute fctToExecuteParams
            , ->
                $scope.loginFormParam.loading = false

    #go to forgot password
    $scope.toForgotPassword = ->
        modalService.openForgotPasswordModal $scope.loginFormParam.dto.email
        $scope.close()
        return

    # got to busness registration
    $scope.toBusinessRegistration = ->
        $scope.close()
        modalService.openBusinessRegistrationModal()

    # got to customer registration
    $scope.toCustomerRegistration = ->
        $scope.close()
        modalService.openCustomerRegistrationModal fctToExecute, fctToExecuteParams