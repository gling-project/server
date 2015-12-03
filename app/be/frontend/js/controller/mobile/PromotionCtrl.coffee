#mobile controller
#create / edit promotion
myApp.controller 'PromotionCtrl', ($rootScope, $scope, accountService, $flash, translationService, facebookService, modalService, promotionService, businessService, $compile) ->

    #load business
    businessService.getBusiness accountService.getMyself().businessId, (business) ->

        $scope.business = business

        #param
        $scope.publicationFormParam =
            dto: null
            business: $scope.business

        #inject directive
        directive = $compile('<promotion-form-ctrl ng-info=\'publicationFormParam\'></promotion-form-ctrl>')($scope)
        $('.inject-box').append directive

        #save
        $scope.save = (share) ->
            #test validity
            if !$scope.publicationFormParam.isValid
                $scope.publicationFormParam.displayErrorMessage = true
            else if $scope.publicationFormParam.minimalQuantity > $scope.publicationFormParam.quantity
                # test quantity
                $flash.error translationService.get('--.promotion.validation.minimalQuantityMustBeLowerThanQuantity')
            else
                #loading
                modalService.openLoadingModal()
                #call service
                promotionService.add $scope.publicationFormParam.dto, ((data) ->
                    #success
                    modalService.closeLoadingModal()
                    #go to business
                    $scope.navigateTo '/business/' + $scope.business.id
                    modalService.successAndShare $scope.publicationFormParam.business.id, data.id
                ), ->
                    modalService.closeLoadingModal()

        #initalization
        modalService.closeLoadingModal()