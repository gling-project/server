myApp.directive('promotionCtrl', function (directiveService, followService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publication/promotion/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.promotion = scope.getInfo().promotion;
                    scope.business = scope.getInfo().business;

                    if (scope.promotion.illustration != null) {
                        scope.illustration = "/file/" + scope.promotion.illustration.id;
                    }
                    else if (scope.business != null && scope.business.illustration != null) {
                        scope.illustration = "/file/" + scope.business.illustration.id;
                    }
                    else {
                        scope.illustration = "assets/images/default_promotion_illustration.png"
                    }

                    scope.follow = function (follow) {
                        followService.addFollow(follow,scope.promotion.businessId);
                        scope.promotion.following = follow;
                        if(follow){
                            scope.promotion.totalFollowers++;
                        }
                        else{
                            scope.promotion.totalFollowers--;
                        }
                    }

                }
            }
        }
    }
})
;