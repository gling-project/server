myApp.controller 'BusinessCreationModalCtrl', ($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, businessService,$location) ->

    #params
    # business registration params
    $scope.businessRegistrationParams =
        callbackSuccess:(data)->
            accountService.setMyself data
            $location.path '/business/' + accountService.getMyself().businessId
            $scope.close()
        callbackFail: ->
            return

    #close modal
    $scope.close = ->
        $modalInstance.close()
