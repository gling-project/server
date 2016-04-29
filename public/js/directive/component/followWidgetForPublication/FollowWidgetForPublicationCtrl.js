myApp.directive('followWidgetForPublicationCtrl', function(accountService, modalService, followService, directiveService, $filter, $flash) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/followWidgetForPublication/template.html',
    replace: true,
    transclude: true,
    compile: function() {
      return {
        post: function(scope) {
          directiveService.autoScopeImpl(scope);
          scope.follow = function() {
            if (accountService.getMyself() != null) {
              return scope.followed();
            } else {
              return modalService.openLoginModal(scope.followed, null, '--.loginModal.help.follow');
            }
          };
          scope.getInfo().maskTotal = true;
          return scope.followed = function() {
            scope.getInfo().publication.following = !scope.getInfo().publication.following;
            if (scope.getInfo().publication.following === true) {
              scope.getInfo().publication.totalFollowers++;
              $flash.success($filter('translateText')('--.followWidget.message.add'));
            } else {
              $flash.success($filter('translateText')('--.followWidget.message.remove'));
              scope.getInfo().publication.totalFollowers--;
            }
            return followService.addFollow(scope.getInfo().publication.following, scope.getInfo().publication.businessId);
          };
        }
      };
    }
  };
});