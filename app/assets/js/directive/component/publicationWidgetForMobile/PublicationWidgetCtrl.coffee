myApp.directive 'publicationWidgetCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService, $timeout) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/publicationWidgetForMobile/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #params
            scope.descriptionLimitBase = 250
            scope.descriptionLimit = scope.descriptionLimitBase

            #get class by interest
            scope.getInterestClass = (publication) ->
                if publication.interest?
                    return 'gling-icon-' + publication.interest.name
                null

            #navigate to
            scope.navigateTo = (target) ->
                $rootScope.$broadcast 'PROGRESS_BAR_START'
                modalService.openLoadingModal()
                $timeout (->
                    $location.path target
                ), 1

            #open gallery modal
            scope.openGallery = (image, publication) ->
                $rootScope.$broadcast 'DISPLAY_PICTURE_IN_GALLERY',
                    list: publication.pictures
                    first: image

            #initialization
            scope.getInfo().loading = true

            #get the illustration class. Depend of the size of the picture
            scope.getIllustrationClass = (picture) ->
                if picture != undefined and picture.height > picture.width
                    'publication-illustration-high'
                else
                    'publication-illustration'

            #call callback if the following is changed
            scope.$watch 'getInfo().publication.following',(n,o)->
                if n!=o && scope.getInfo().changeInterestCallback?
                    scope.getInfo().changeInterestCallback scope.getInfo().publication.businessId,n