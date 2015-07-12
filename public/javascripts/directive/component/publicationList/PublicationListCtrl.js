myApp.directive('publicationListCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location, accountService, followService, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationList/template.html",
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
                        scope.publications = scope.getInfo().data;
                        for (var i in scope.publications) {
                            scope.publications[i].interval = (scope.publications[i].endDate - new Date());
                        }
                    });

                    scope.follow = function (publication) {
                        if (accountService.getMyself() != null) {
                            scope.followed(publication);
                        }
                        else {
                            modalService.openLoginModal(scope.followed, publication);
                        }
                    };

                    scope.followed = function (publication) {
                        var followed = publication.following;
                        followService.addFollow(!followed, publication.businessId, function () {
                            publication.following = !followed;
                            if (publication.following) {
                                publication.totalFollowers++;
                            }
                            else {
                                publication.totalFollowers--;
                            }
                            for (var i in scope.publications) {
                                if (scope.publications[i].businessId == publication.businessId) {
                                    scope.publications[i].following = publication.following;
                                    scope.publications[i].totalFollowers=publication.totalFollowers;
                                }
                            }
                        });
                    }
                }
            }
        }
    }
});