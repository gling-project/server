# mobile controller
# my profile
# the user can consult and edit his own profile
myApp.controller 'ProfileCtrl', ($rootScope, $scope, modalService, accountService) ->

    #params
    $scope.model = accountService.model
    $scope.activeTab = 'personal'
    #account param
    $scope.accountParam =
        updateMode: true
        dto: angular.copy(accountService.getMyself())
        disabled: true
    #interest
    $scope.interestParam =
        result: angular.copy(accountService.getMyself().customerInterests)
        disabled: true

    #edit password => open the editPassword modal
    $scope.editPassword = ->
        modalService.openEditPasswordModal()

    # save account changes
    $scope.accountSave = ->
        $scope.accountParam.disabled = true
        accountService.editAccount $scope.accountParam.dto

    #cancel account changes
    $scope.accountCancel = ->
        $scope.accountParam.dto = angular.copy(accountService.getMyself())
        $scope.accountParam.disabled = true

    # add address => open address modal
    $scope.addAddress = ->
        modalService.addressModal true, null, false

    # edit existing address
    $scope.editAddress = (address) ->
        modalService.addressModal true, address, false

    #remove existing address
    $scope.deleteAddress = (address) ->
        accountService.deleteAddress address
        if accountService.getMyself().selectedAddress?.id == address.id
            accountService.getMyself().selectedAddress=null

    #change interest save
    $scope.interestSave = ->
        accountService.editCustomerInterest { customerInterests: $scope.interestParam.result }, (->
            accountService.getMyself().customerInterests = $scope.interestParam.result
            $scope.interestParam.disabled = true
            $scope.loading = false
        ), ->
            $scope.loading = false

    #initialization
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'
    modalService.closeLoadingModal()