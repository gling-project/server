myApp.directive 'publicationListForBusinessCtrl', ($rootScope, directiveService, searchService, $timeout, publicationService, modalService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/publicationListForBusiness/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope
            scope.descriptionLimitBase = 250
            scope.currentPage = 0
            scope.allLoaded = false
            scope.loadSemaphore = false
            scope.publications = []
            scope.loading = false

            scope.isArchived = (publication) ->
                publication.endDate < (new Date).getTime()

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

                if scope.getInfo().scrollTo?
                    #if the user looking for a publication, scroll to it
                    $timeout (->
                        target = '#publication' + scope.getInfo().scrollTo
                        $(window).scrollTop $(target).offset().top - 70
                        #scrollTo null to scroll only one time
                        scope.getInfo().scrollTo = null
                        scope.$apply()
                    ), 1
                scope.loading = false

            #scrolling
            $(window).on 'scroll', ->
                scrollBottom = $(window).scrollTop() + $(window).height()
                if $('.container-content').height() - scrollBottom < 200
                    if scope.loadSemaphore == false
                        scope.loadSemaphore = true
                        scope.currentPage = scope.currentPage + 1
                        console.log '-- from scrolling'
                        scope.search()

            scope.getInfo().refresh = (type) ->
                scope.currentPage = 0
                scope.publications = []
                if scope.type != type
                    scope.type = type
                    #will be reloaded by type watching
                else
                    scope.allLoaded = false
                    console.log '-- from refresh'
                    scope.search()

            scope.search = ->
                if scope.allLoaded == true
                    return
                scope.loading = true
                if scope.type? and scope.type != undefined and scope.type == 'ARCHIVE'
                    searchService.byBusinessArchived scope.currentPage, scope.getInfo().businessId, scope.success
                else if scope.type? and scope.type != undefined and scope.type == 'PREVISUALIZATION'
                    searchService.byBusinessPrevisualization scope.currentPage, scope.getInfo().businessId, scope.success
                else
                    searchService.byBusiness scope.currentPage, scope.getInfo().businessId, scope.success

            scope.$watch 'type', (n, o) ->
                if n != o
                    scope.allLoaded = false
                    scope.search()

            #initialization
            console.log '-- SERACH FROM initialization'
            scope.search()
            #remove

            scope.removePublication = (publication) ->
                modalService.messageModal '--.business.publication.remove.confirmationModal.title', '--.business.publication.remove.confirmationModal.body', (close) ->
                    publicationService.delete publication, ->
                        $rootScope.$broadcast 'RELOAD_PUBLICATION'
                        close()

            #edit
            scope.editPublication = (publication) ->
                if publication.type == 'PROMOTION'
                    modalService.openPromotionModal publication, scope.getInfo().business, ->
                        $rootScope.$broadcast 'RELOAD_PUBLICATION'
                else
                    modalService.openBusinessNotificationModal publication, scope.getInfo().business, ->
                        $rootScope.$broadcast 'RELOAD_PUBLICATION'

            scope.getInterestClass = (publication) ->
                if publication.interest?
                    return 'gling-icon-' + publication.interest.name
                return null

            isEmpty = (val) ->
                !val? or val == ''

            scope.descriptionIsEmpty = (publication) ->
                publication.type != 'PROMOTION' and isEmpty(publication.description)

            scope.openGallery = (image, publication) ->
                modalService.galleryModal image, publication.pictures

            scope.getIllustrationClass = (picture) ->
                if picture != undefined and picture.height > picture.width
                    'publication-illustration-high'
                else
                    'publication-illustration'