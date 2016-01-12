myApp.controller 'BusinessCtrl', ($rootScope, $scope, modalService, businessService, $routeParams, accountService, $window, addressService, geolocationService, translationService, $flash, $timeout, contactService, $filter, constantService) ->

    #params
    if $routeParams.publicationId != null
        $scope.publicationIdToGo = $routeParams.publicationId
    $scope.displayError = false
    $scope.loading = true
    $scope.business = null
    $scope.edit = false
    $scope.myBusiness = false
    $scope.businessId = $routeParams.businessId
    $scope.descriptionLimitBase = 200
    $scope.descriptionLimit = $scope.descriptionLimitBase
    if accountService.model.myself?
        $scope.myself = accountService.model.myself
    else
        $scope.$watch ->
            return accountService.model
        , (n)->
            if n? && accountService.model.myself
                $scope.myself = accountService.model.myself
        ,true

    #publication timing
    $scope.publicationOptions = [
        {
            key: 'BASIC'
            value: '--.business.publication.basic'
        }
        {
            key: 'ARCHIVE'
            value: '--.business.publication.archive'
        }
    ]
    #address
    $scope.googleMapParams =
        staticMap: true

    $scope.displayEditMode = ->
        return $scope.myBusiness == true or (accountService.getMyself()? and accountService.getMyself().role == 'SUPERADMIN')

    #publication
    $scope.publicationListParam =
        scrollTo: $scope.publicationIdToGo
        displayRemoveIcon: $scope.edit
        type: 'BASIC'
        businessId: $routeParams.businessId
    $scope.$watch 'edit', ->
        $scope.publicationListParam.displayRemoveIcon = $scope.edit

    #loading
    businessService.getBusiness $routeParams.businessId, (data) ->
        $scope.loading = false
        $scope.business = data
        #publication
        $scope.publicationListParam.business = $scope.business

        #edit mode ?
        $scope.$watch 'business.businessStatus', ->
            if accountService.getMyself()? and constantService.compareNumber(accountService.getMyself().businessId,$routeParams.businessId)
                if $scope.business.businessStatus != 'WAITING_CONFIRMATION'
                    $scope.edit = true
                $scope.myBusiness = true
            if $scope.myBusiness
                $scope.publicationOptions.push
                    key: 'PREVISUALIZATION'
                    value: '--.business.publication.previsualization'

        #distance
        $scope.computeDistance = ->
            if $scope.business.address?
                addressService.distance $scope.business.address.id, (data) ->
                    $scope.business.distance = data.distance
                    return
            return

        #initlaization
        $scope.computeDistance()
        $scope.$on 'POSITION_CHANGED', ->
            $scope.computeDistance()

        #publish
        $scope.publish = ->
            modalService.messageModal '--.business.page.askPublication.window.title', '--.business.page.askPublication.window.message', (close) ->
                businessService.publishBusiness()
                close()
                $flash.info translationService.get('--.business.page.askPublication.window.flash')
                $scope.business.businessStatus = 'WAITING_CONFIRMATION'

        #cancel publish status
        $scope.cancelPublishRequest = ->
            modalService.messageModal '--.business.page.cancelPublishRequest.window.title', '--.business.page.cancelPublishRequest.window.message', (close) ->
                businessService.cancelPublishRequest()
                close()
                $flash.info translationService.get('--.business.page.cancelPublishRequest.window.flash')
                $scope.business.businessStatus = 'NOT_PUBLISHED'

        #stop publish
        $scope.stopPublish = ->
            modalService.messageModal '--.business.page.stopPublication.window.title', '--.business.page.stopPublication.window.message', (close) ->
                businessService.stopPublication()
                close()
                $flash.info translationService.get('--.business.page.stopPublication.window.flash')
                $scope.business.businessStatus = 'NOT_PUBLISHED'

        #edit name
        $scope.editbusiness = ->
            business = angular.copy($scope.business)
            modalService.basicModal '--.business.edit.data.modal.title', 'business-form-ctrl', {
                dto: business
                status: business.businessStatus
            }, (close, setLoading) ->
                businessService.edit business, ((data) ->
                    $scope.business.name = data.name
                    $scope.business.description = data.description
                    $scope.business.phone = data.phone
                    $scope.business.website = data.website
                    $scope.business.email = data.email
                    close()
                ), ->
                    setLoading false

        #edit illustration
        $scope.editIllustration = ->
            business = angular.copy($scope.business)
            modalService.basicModal '--.business.edit.illustration.modal.title', 'image-form-ctrl', {
                dto: business
                target: 'business_illustration'
                fieldName: 'illustration'
                details: '--.business.logo.edit.modal.description'
            }, (close, setLoading) ->
                businessService.editIllustration business.id, business.illustration, (->
                    $scope.business.illustration = business.illustration
                    close()
                    return
                ), ->
                    setLoading false

        #edit landscape
        $scope.editLandscape = ->
            business = angular.copy($scope.business)
            modalService.basicModal '--.business.edit.landscape.modal.title', 'image-form-ctrl', {
                dto: business
                target: 'business_landscape'
                fieldName: 'landscape'
                details: '--.business.landscape.edit.modal.description'
            }, (close, setLoading) ->
                businessService.editLandscape business.id, business.landscape, (->
                    $scope.business.landscape = business.landscape
                    close()
                ), ->
                    setLoading false

        #address
        $scope.googleMapParams.address = $scope.business.address
        $timeout (->
            if $scope.business.address?
                $scope.googleMapParams.refreshNow()
        ), 1

        #edit address
        $scope.editAddress = ->
            if $scope.business.businessStatus == 'PUBLISHED'
                $flash.success $filter('translateText')('--.business.error.editAddress.wrongStatus')
            else
                address = angular.copy($scope.business.address)
                if !address?
                    address = {}
                modalService.basicModal '--.business.edit.address.modal.title', 'address-form-ctrl', {
                    dto: address
                    addName: false
                }, (close, setLoading) ->
                    #scope.business
                    businessService.editAddress $scope.business.id, address, (data) ->
                        $scope.business.address = data
                        $scope.googleMapParams.address =  data
                        close()
                    , ->
                        setLoading false

        $scope.categoryLineParams =
            categories: $scope.business.categories

        #edit category
        $scope.editCategory = ->
            catList = []
            for k,lev2 of $scope.business.categories
                for k2,lev3 of lev2
                    for k3,lev4 of lev3
                        catList.push lev4
            modalService.basicModal '--.business.edit.category.modal.title', 'business-category-form-ctrl', {value: catList}, (close, setLoading) ->
                #scope.business
                businessService.editBusinessCategory $scope.business.id, catList, (data) ->
                    $scope.business.categories = data.categories
                    $scope.categoryLineParams.categories = $scope.business.categories
                    close()
                , ->
                    setLoading false

        #schedule
        $scope.editSchedule = ->
            schedules = angular.copy($scope.business.schedules)
            modalService.basicModal '--.business.edit.schedule.modal.title', 'schedule-form-ctrl', {
                dto: schedules
                disabled: false
            }, (close, setLoading) ->
                businessService.createSchedule $scope.business.id, {schedules: schedules}, (data) ->
                    $scope.business.schedules = schedules
                    close()
                , ->
                    setLoading false

        $scope.editGallery = ->
            business = angular.copy($scope.business)
            modalService.basicModal '--.business.edit.address.modal.title', 'dir-field-image-mutiple', {
                fieldTitle: '--.business.modal.gallery.title'
                validationMessage: '--.error.validation.image'
                help: '--.business.gallery.download.help'
                details: '--gallery.maximumImage'
                field: business
                maxImage: 10
                multiple: true
                target: 'galley_picture'
                fieldName: 'galleryPictures'
            }, (close, setLoading) ->
                #scope.business
                businessService.editGallery $scope.business.id, {list: business.galleryPictures}, (data) ->
                    $scope.business.galleryPictures = data
                    close()
                , ->
                    setLoading false

        #edit social network
        $scope.editSocialNetwork = ->
            socialNetwork = angular.copy($scope.business.socialNetwork)
            if !socialNetwork?
                socialNetwork = {}
            modalService.basicModal '--.business.edit.socialNetwork.modal.title', 'business-social-network-ctrl', {dto: socialNetwork}, (close, setLoading) ->
                #scope.business
                businessService.editSocialNetwork $scope.business.id, socialNetwork, (data) ->
                    $scope.business.socialNetwork = socialNetwork
                    accountService.getMyself().facebookPageToPublish=$scope.business.socialNetwork.facebookLink
                    close()
                , ->
                    setLoading false

        #create publication
        $scope.createPromotion = ->
            modalService.openPromotionModal null, $scope.business, ->
                $scope.$broadcast 'RELOAD_PUBLICATION'

        $scope.createNotification = ->
            modalService.openBusinessNotificationModal null, $scope.business, ->
                $scope.$broadcast 'RELOAD_PUBLICATION'

        $scope.$on 'POSITION_CHANGED', ->
            $scope.$broadcast 'RELOAD_PUBLICATION'
            return
        $scope.$watch 'publicationListParam.type', (o, n) ->
            if o != n
                $scope.$broadcast 'RELOAD_PUBLICATION'

        $scope.refreshPublications = ->
            $scope.$broadcast 'RELOAD_PUBLICATION'

        $scope.$on 'RELOAD_PUBLICATION', ->
            $scope.publicationListParam.refresh $scope.publicationListParam.type

        $scope.numberCategories = ->
            return Object.keys($scope.business.categories).length

        #initialization
        if geolocationService.currentPosition?
            $scope.$broadcast 'RELOAD_PUBLICATION'

        $scope.displaySchedule = ->
            for key of $scope.business.schedules
                if $scope.business.schedules[key].length > 0
                    return true
            return false

        $scope.displaySocialNetwork = ->
            s = $scope.business.socialNetwork
            if !s?
                return false
            return s.facebookLink? or s.twitterLink? or s.instagramLink? or s.deliveryLink? or s.opinionLink? or s.reservationLink? or s.pinterestLink? or s.googlePlusLink?

        $scope.computeProgression = ->
            total = 0
            if $scope.business.address?
                total++
            if $scope.numberCategories() > 0
                total++
            if $scope.business.description?
                total++
            if $scope.business.illustration?
                total++
            if $scope.business.landscape?
                total++
            if $scope.business.galleryPictures.length > 0
                total++
            if $scope.displaySocialNetwork()
                total++
            if $scope.displaySchedule()
                total++
            total

        $scope.getProgressionStyle = ->
            return 'width:' + 300 * $scope.computeProgression() / 5 + 'px'

        $scope.tryClaimBusiness = ->
            if accountService.getMyself()?
                $scope.claimBusiness()
            else
                modalService.openLoginModal $scope.claimBusiness, null, '--.loginModal.help.claimBusiness'

        $scope.claimBusiness = ->
            dto = {}
            modalService.basicModal '--.business.claim.modal.title', 'claim-business-ctrl', {dto: dto}, (close,setLoading) ->
                businessService.claimBusiness $scope.business.id, dto.phone, dto.vta, ->
                    $flash.success $filter('translateText')('--.business.claim.modal.success')
                    close()
                    accountService.model.myself.claimedBusinessId = $scope.business.id
                    $scope.myself.claimedBusinessId = $scope.business.id
                    setLoading false
                , ->
                    setLoading false

        $scope.openContact = ->
            dto =
                target: 'HELP'
            modalService.basicModal '--.contactForm.modal.title', 'contact-form-ctrl', {dto: dto}, (close,setLoading) ->
                contactService.contact dto, ->
                    $flash.success $filter('translateText')('--.contactForm.send.success')
                    close()
                    setLoading false
                , ->
                    setLoading false
    , ->
        $scope.loading = false
        $scope.displayError = true

    #back to the top of the page
    $(window).scrollTop 0
    $rootScope.$broadcast 'PROGRESS_BAR_STOP'