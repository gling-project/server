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
            scope.$watch 'getInfo().data', ->
                scope.publications = scope.getInfo().data
                for publication of scope.publications
                    publication.interval = publication.endDate - (new Date)