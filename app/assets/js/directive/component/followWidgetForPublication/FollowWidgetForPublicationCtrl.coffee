myApp.directive 'followWidgetForPublicationCtrl', (accountService, modalService, followService, directiveService, $filter, $flash) ->
    restrict: 'E'
    scope: directiveService.autoScope(ngInfo: '=')
    templateUrl: '/assets/js/directive/component/followWidgetForPublication/template.html'
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
                scope.getInfo().publication.following = !scope.getInfo().publication.following
                if scope.getInfo().publication.following == true
                    scope.getInfo().publication.totalFollowers++
                    $flash.success $filter('translateText')('--.followWidget.message.add')
                else
                    $flash.success $filter('translateText')('--.followWidget.message.remove')
                    scope.getInfo().publication.totalFollowers--
                followService.addFollow scope.getInfo().publication.following, scope.getInfo().publication.businessId