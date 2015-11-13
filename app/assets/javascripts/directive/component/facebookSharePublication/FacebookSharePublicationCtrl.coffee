myApp.directive 'facebookSharePublicationCtrl', ($rootScope, businessService, geolocationService, directiveService, facebookService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/component/facebookSharePublication/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #share
            scope.share = ->
                facebookService.sharePublication scope.getInfo().businessId, scope.getInfo().publicationId