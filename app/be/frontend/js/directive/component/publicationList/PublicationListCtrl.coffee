myApp.directive 'publicationListCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/publicationList/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope
            scope.getInfo().loading = true

            scope.changeInterestCallback = (businessId, value)->
                for publication in scope.publications
                    if publication.businessId == businessId
                        publication.following = value

            #catch data
            scope.$watch 'getInfo().data', (n)->
                if n?
                    scope.publications = n
                    for publication in scope.publications
                        publication.interval = publication.endDate - (new Date)