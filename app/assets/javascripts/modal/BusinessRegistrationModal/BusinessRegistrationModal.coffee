myApp.controller 'BusinessRegistrationModalCtrl', ($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, businessService,$location) ->

    #params
    $scope.badgeSelected = 1
    $scope.accountParam ={}
    $scope.account=null
    $scope.business={}
    $scope.businessNameField =
        name: 'name'
        fieldTitle: "--.generic.name"
        validationRegex: "^.{2,50}$"
        validationMessage: ['--.generic.validation.size', '2', '250']
        field: $scope.business
        disabled:->
            return $scope.loading
        fieldName: 'name'


    #loading
    $scope.setLoading = (b)->
        $scope.loading=b
        $scope.accountParam.disabled = b

    #close modal
    $scope.close = ->
        $modalInstance.close()
        return

    #go to business step
    $scope.toBusinessStep = ->
        if accountService.getMyself().type == 'BUSINESS'
            $flash.success translationService.get('--.businessRegistration.alreadyBusiness')
            $scope.close()
        else
            $scope.badgeSelected = 2

    #create business
    $scope.save = ->
        $scope.setLoading true
        businessService.createBusiness accountService.getMyself().id,$scope.business.name,((data)->
            accountService.setMyself data
            $location.path '/business/' + accountService.getMyself().businessId
            $scope.close()
            $scope.setLoading false
        ), ->
            $scope.loading = false

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
        else
            $scope.setLoading true
            accountService.registration $scope.accountParam.dto, (->
                $scope.setLoading false
                $scope.toBusinessStep()
            ), ->
                $scope.setLoading false
