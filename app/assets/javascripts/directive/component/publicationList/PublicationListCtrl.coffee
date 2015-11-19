myApp.directive 'publicationListCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/component/publicationList/template.html'
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
            scope.$watch 'getInfo().data', ->
                scope.publications = scope.getInfo().data
                for publication in scope.publications
                    publication.interval = publication.endDate - (new Date)