myApp.directive 'businessListCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $location) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/businessList/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope
            console.log 'et merde encore 2'

            #params
            scope.descriptionLimitBase = 200
            scope.descriptionLimit = scope.descriptionLimitBase
            scope.getInfo().loading = true

            #go to
            scope.navigateTo = (target) ->
                $location.path target

            #warch data
            scope.$watch 'getInfo().data', (n)->
                if n?
                    scope.businesses = n