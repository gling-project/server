myApp.directive 'publicationListMobileCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $location, modalService, $timeout) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/component/publicationListMobile/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope
            scope.getInfo().loading = true
            scope.$watch 'getInfo().data', ->
                scope.publications = scope.getInfo().data
                for publication in scope.publications
                    publication.descriptionLimit = scope.descriptionLimitBase
                    publication.interval = publication.endDate - (new Date)