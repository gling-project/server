myApp.controller 'BusinessRegistrationModalCtrl', ($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, businessService,$location) ->

    #params
    $scope.badgeSelected = 1
    $scope.accountParam ={}
    $scope.account=null

    # business registration params
    $scope.businessRegistrationParams =
        callbackSuccess:(data)->
            accountService.setMyself data
            $location.path '/business/' + accountService.getMyself().businessId
            $scope.close()
            $scope.setLoading false
        callbackFail: ->
            return

    #loading
    $scope.setLoading = (b)->
        $scope.loading=b
        $scope.accountParam.disabled = b

    #close modal
    $scope.close = ->
        $modalInstance.close()

    #go to business step
    $scope.toBusinessStep = ->
        if accountService.getMyself().type == 'BUSINESS'
            $flash.success translationService.get('--.businessRegistration.alreadyBusiness')
            $scope.close()
        else
            $scope.badgeSelected = 2

    #create account by facebook
    $scope.fb_login = ->
        $scope.setLoading true
        facebookService.login ((data) ->
            accountService.setMyself data
            $scope.setLoading false
            $scope.toBusinessStep()
        ), (data) ->
            $flash.error data.message

    

    #create account with credential
    $scope.createAccount = ->
        if !$scope.accountParam.isValid
            $scope.accountParam.displayErrorMessage = true
            $flash.error $filter('translateText')('--.generic.error.complete.fields')
        else
            $scope.setLoading true
            accountService.registration $scope.accountParam.dto, (->
                $scope.setLoading false
                $scope.toBusinessStep()
            ), ->
                $scope.setLoading false
