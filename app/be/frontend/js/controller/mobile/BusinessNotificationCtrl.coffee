#mobile controller
#page to create or edit businessNotification
myApp.controller 'BusinessNotificationCtrl', ($rootScope, $scope, accountService, $flash, translationService, facebookService, modalService, businessNotificationService, businessService, $compile) ->

    #load business
    businessService.getBusiness accountService.getMyself().businessId, (business) ->

        #param
        $scope.business = business
        $scope.businessNotificationFormParam =
            dto: null
            business: $scope.business

        #close the loading modal
        modalService.closeLoadingModal()

        #inject form  directive
        #inject after business loading to avoid nullPointerException
        directive = $compile('<business-notification-form-ctrl ng-info=\'businessNotificationFormParam\'></business-notification-form-ctrl>')($scope)
        $('.inject-box').append directive

        #save function
        $scope.save = (share) ->

            #if the form is not valid, display error message
            if !$scope.businessNotificationFormParam.isValid
                $scope.businessNotificationFormParam.displayErrorMessage = true
            else
                #open loading modal
                modalService.openLoadingModal()
                #call service
                businessNotificationService.add $scope.businessNotificationFormParam.dto, ((data) ->
                    #close loading modal
                    modalService.closeLoadingModal()
                    #navigate to business page
                    $scope.navigateTo '/business/' + $scope.business.id
                    #display success modal
                    modalService.successAndShare data
                ), ->
                    modalService.closeLoadingModal()