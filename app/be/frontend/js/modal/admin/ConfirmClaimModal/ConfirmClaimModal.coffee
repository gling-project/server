myApp.controller 'ConfirmClaimModalCtrl', ($scope, $flash, $modal, $modalInstance, business,callback,superAdminService) ->

    #close modal
    $scope.close = ->
        $modalInstance.close()

    #initialize
    $scope.business=business

    $scope.confirm =->
        $scope.loading=true
        superAdminService.confirmClaim business.id, ->
            $flash.success 'Le commerçant est maintenant propriétaire de son commerce'
            $scope.loading=false
            business.hasOwner=false
            business.claimBusiness=null
            $scope.close()
        , ->
            $scope.loading=false