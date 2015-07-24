myApp.directive('businessListCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, accountService, followService, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/businessList/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    scope.getInfo().loading = true;


                    scope.navigateTo = function (target) {
                        $location.path(target);
                    };

                    scope.$watch("getInfo().data", function () {
                        scope.businesses = scope.getInfo().data;
                    });

                    scope.follow = function (business) {
                        if (accountService.getMyself() != null) {
                            scope.followed(business);
                        }
                        else {
                            modalService.openLoginModal(scope.followed, business);
                        }
                    };


                    scope.followed = function (business) {
                        var followed = business.following;
                        followService.addFollow(!followed, business.id, function () {
                            business.following = !followed;
                            if (business.following) {
                                business.totalFollowers++;
                            }
                            else {
                                business.totalFollowers--;
                            }
                        });
                    }
                }
            }
        }
    }
});