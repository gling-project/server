myApp.directive 'publicationListMobileForBusinessCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $timeout) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/component/publicationListMobileForBusiness/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #params
            scope.descriptionLimitBase = 250
            scope.currentPage = 0
            scope.allLoaded = false
            scope.loadSemaphore = false
            scope.publications = []
            scope.loading = false

            #test if the publication is archived
            scope.isArchived = (publication) ->
                return publication.endDate < (new Date).getTime()

            #scrolling
            $('.scrollable-content-body').on 'scroll', ->
                scrollBottom = $('.scrollable-content-body').scrollTop() + $('.scrollable-content-body').height()
                if $('.scrollable-content-inner').height() - scrollBottom < 200
                    if scope.loadSemaphore == false
                        console.log '-- SERACH FROM SCROOL'
                        scope.loadSemaphore = true
                        scope.currentPage = scope.currentPage + 1
                        scope.search()

            #open gallery modal
            scope.openGallery = (image, publication) ->
                $rootScope.$broadcast 'DISPLAY_PICTURE_IN_GALLERY',
                    list: publication.pictures
                    first: image

            #return the interest class. can be null if the interest is null
            scope.getInterestClass = (publication) ->
                if publication.interest != null
                    return 'gling-icon-' + publication.interest.name
                return null

            #refresh the publication list
            scope.getInfo().refresh = (type) ->
                scope.currentPage = 0
                scope.publications = []
                scope.type = type
                scope.search()

            #loading success
            scope.success = (data) ->
                if scope.currentPage == 0
                    scope.publications = []
                if data.length == 0
                    scope.allLoaded = true
                scope.loadSemaphore = false
                for d in data
                    scope.publications.push d
                for publication in scope.publications
                    publication.descriptionLimit = scope.descriptionLimitBase
                    publication.interval = (publication.endDate - (new Date)) / 1000
                $timeout (->
                    if scope.getInfo().scrollTo != null
                        $('.main-body').scrollTop $('#publication' + scope.getInfo().scrollTo).offset().top
                        scope.$apply()
                ), 1
                scope.loading = false

            #call loading request
            scope.search = ->
                if scope.allLoaded == true
                    return
                scope.loading = true
                searchService.byBusiness scope.currentPage, scope.getInfo().businessId, scope.success

            #initialization
            console.log '-- SERACH FROM initialization'
            scope.search()