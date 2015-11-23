myApp.directive 'categoryLineCtrl', ($rootScope, directiveService, $location) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/categoryLine/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #go to category search
            scope.searchCat = (categoryName) ->
                $location.path '/search/category:' + categoryName