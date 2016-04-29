myApp.directive('followWidgetCtrl', function(accountService, modalService, followService, directiveService, $filter, $flash) {
  return {
    restrict: 'E',
    scope: directiveService.autoScope({
      ngInfo: '='
    }),
    templateUrl: '/assets/js/directive/component/followWidget/template.html',
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
            scope.getInfo().business.following = !scope.getInfo().business.following;
            if (scope.getInfo().business.following === true) {
              scope.getInfo().business.totalFollowers++;
              $flash.success($filter('translateText')('--.followWidget.message.add'));
            } else {
              $flash.success($filter('translateText')('--.followWidget.message.remove'));
              scope.getInfo().business.totalFollowers--;
            }
            return followService.addFollow(scope.getInfo().business.following, scope.getInfo().business.id);
          };
        }
      };
    }
  };
});