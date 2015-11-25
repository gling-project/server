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
    $scope.importFromFacebookParam =
        name: 'facebookUrl'
        validationRegex: "^($|https://www.facebook\.com/.*$)"
        validationMessage: '--.generic.validation.facebook'
        fieldTitle: "Facebook"
        field: $scope.business
        disabled:->
            return $scope.loading
        fieldName: 'facebookUrl'



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

    #after business creation
    $scope.saveSuccess = (data)->
        accountService.setMyself data
        $location.path '/business/' + accountService.getMyself().businessId
        $scope.close()
        $scope.setLoading false

    #create business
    $scope.save = ->
        if !$scope.businessNameField.isValid
            $scope.businessNameField.displayErrorMessage = true
            $flash.error translationService.get('--.generic.error.complete.fields')
        else
            $scope.setLoading true
            businessService.createBusiness accountService.getMyself().id,$scope.business.name,(data)->
                $scope.saveSuccess data
            , ->
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
            $flash.error $filter('translateText')('--.generic.error.complete.fields')
        else
            $scope.setLoading true
            accountService.registration $scope.accountParam.dto, (->
                $scope.setLoading false
                $scope.toBusinessStep()
            ), ->
                $scope.setLoading false

    #import business data from facebook page
    $scope.importBusinessFromFacebook = ->
        if !$scope.importFromFacebookParam.isValid
            $scope.importFromFacebookParam.displayErrorMessage = true
            $flash.error $filter('translateText')('--.generic.error.complete.fields')
        else
            $scope.setLoading true
            urlEncoded=encodeURIComponent $scope.business.facebookUrl
            businessService.importBusinessFormFacebook urlEncoded, (data)->
                $scope.saveSuccess data
            , ->
                #callback failed
                $scope.setLoading false
