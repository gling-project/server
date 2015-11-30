myApp.controller 'ConfirmClaimModalCtrl', ($scope, $flash, $modal, $modalInstance, claimBusiness,callback,superAdminService) ->

    #close modal
    $scope.close = ->
        $modalInstance.close()

    #initialize
    $scope.claimBusiness=claimBusiness

    $scope.save =->
        $scope.loading=true
        superAdminService.confirmClaim business.id, ->
            $flash.success 'Le commerçant est maintenant propriétaire de son commerce'
            $scope.loading=false
            callback()
        , ->
            $scope.loading=false