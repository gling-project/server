myApp.directive 'publicationListMobileCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService, $timeout) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/publicationListMobile/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope
            scope.getInfo().loading = true

            scope.changeInterestCallback = (businessId, value)->
                console.log 'callback !! '
                for publication in scope.publications
                    if publication.businessId == businessId
                        publication.following = value

            scope.$watch 'getInfo().data', (n)->
                if n?
                    scope.publications = n
                    for publication in scope.publications
                        publication.descriptionLimit = scope.descriptionLimitBase
                        publication.interval = publication.endDate - (new Date)