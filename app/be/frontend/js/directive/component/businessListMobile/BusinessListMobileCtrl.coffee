myApp.directive 'businessListMobileCtrl', ($rootScope, businessService, geolocationService, directiveService, searchService, $location) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/businessListMobile/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #params
            scope.descriptionLimitBase = 200
            scope.descriptionLimit = scope.descriptionLimitBase
            scope.getInfo().loading = true

            #navigate to
            scope.navigateTo = (target) ->
                $location.path target

            #watch data
            scope.$watch 'getInfo().data', ->
                scope.businesses = scope.getInfo().data