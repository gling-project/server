myApp.directive 'publicationWidgetCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/component/publicationWidget/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope
            scope.descriptionLimit = 200
            scope.descriptionLimitBase = scope.descriptionLimit

            #navigate to
            scope.navigateTo = (target) ->
                $location.path target

            #get the class by interest
            # can be null
            scope.getInterestClass = (publication) ->
                if publication.interest?
                    return 'gling-icon-' + publication.interest.name
                null

            #test if a string is empty
            isEmpty = (val) ->
                val == undefined or val == null or val == ''

            #test if the description is empty
            scope.descriptionIsEmpty = (publication) ->
                publication.type != 'PROMOTION' and isEmpty(publication.description)

            #open gallery modal
            scope.openGallery = (image, publication) ->
                modalService.galleryModal image, publication.pictures

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