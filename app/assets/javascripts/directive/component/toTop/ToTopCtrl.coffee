myApp.directive 'toTopCtrl', ($window) ->
    restrict: 'E'
    scope: {}
    templateUrl: '/assets/javascripts/directive/component/toTop/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->

            #to top
            scope.toTop = ->
                $(window).scrollTop 0

            #display button if the scroll is bigger than 100 px
            scope.displayToTopButton = $(window).scrollTop() > 100

            angular.element($window).bind 'scroll', ->
                scope.displayToTopButton = $(window).scrollTop() > 100
                scope.$apply()