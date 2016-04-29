# mobile controller
# forgot password
myApp.controller 'ForgotPasswordCtrl', ($rootScope, $scope, facebookService, accountService, $location, $filter, $flash, modalService) ->

    #params
    $scope.loading = false
    $scope.dto = {}
    $scope.fields =
        email:
            fieldType: 'email'
            name: 'email'
            fieldTitle: '--.changeEmailModal.email'
            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            validationMessage: '--.generic.validation.email'
            focus: ->
                true
            disabled: ->
                $scope.loading
            field: $scope.dto
            fieldName: 'email'

    #
    # validation : watching on field
    #
    $scope.$watch 'fields', (->
        validation = true
        for obj in $scope.fields
            if $scope.fields.hasOwnProperty(key) and (obj.isValid == null or obj.isValid == false)
                obj.firstAttempt = !$scope.displayErrorMessage
                validation = false
        $scope.isValid = validation
    ), true

    #
    # display error watching
    #
    $scope.$watch 'displayErrorMessage', ->
        for obj in $scope.fields
            obj.firstAttempt = !$scope.displayErrorMessage

    #save
    $scope.save = ->
        #control validity
        if $scope.isValid
            #loading
            $scope.loading = true
            #call service
            accountService.forgotPassword $scope.dto, (->
                #success
                $flash.success $filter('translateText')('--.forgotPassword.success')
                $scope.loading = false
                #go  to default page
                $location.path '/'
            ), ->
                $scope.loading = false
        else
            $scope.displayErrorMessage = true

    #initialization
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'
    modalService.closeLoadingModal()