myApp.directive 'followWidgetCtrl', (accountService, modalService, followService, directiveService, $filter, $flash) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/followWidget/template.html'
    replace: true
    transclude: true
    compile: ->
        post: (scope) ->
            directiveService.autoScopeImpl scope

            #follow or dis-follow
            scope.follow = ->
                if accountService.getMyself()?
                    scope.followed()
                else
                    modalService.openLoginModal scope.followed, null, '--.loginModal.help.follow'

            #TEMP
            scope.getInfo().maskTotal = true

            scope.followed = ->
                scope.getInfo().business.following = !scope.getInfo().business.following
                if scope.getInfo().business.following == true
                    scope.getInfo().business.totalFollowers++
                    $flash.success $filter('translateText')('--.followWidget.message.add')
                else
                    $flash.success $filter('translateText')('--.followWidget.message.remove')
                    scope.getInfo().business.totalFollowers--
                followService.addFollow scope.getInfo().business.following, scope.getInfo().business.id