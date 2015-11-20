myApp.directive 'businessForMapCtrl', ($rootScope, businessService, geolocationService, directiveService) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/javascripts/directive/component/map/businessForMap/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            scope.$watch 'getInfo().business.following', (n, o) ->
                if n? and o? and n != o
                    scope.getInfo().followingCallback(scope.getInfo().business)

            scope.goTo = (target)->
                $location.path(target);

            return