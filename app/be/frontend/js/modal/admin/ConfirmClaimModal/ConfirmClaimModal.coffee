myApp.controller 'ConfirmClaimModalCtrl', ($scope, $flash, $modal, $modalInstance, business,callback,superAdminService) ->

    superAdminService.getClaims business.id, (data) ->
        $scope.claims = data

    #close modal
    $scope.close = ->
        $modalInstance.close()

    #initialize
    $scope.business=business

    $scope.confirm = (claim)->
        $scope.loading=true
        superAdminService.confirmClaim business.id, claim.account.id,->
            $flash.success 'Le commerçant est maintenant propriétaire de son commerce'
            $scope.loading=false
            business.hasOwner=true
            business.isClaimed=false
            $scope.close()
        , ->
            $scope.loading=false