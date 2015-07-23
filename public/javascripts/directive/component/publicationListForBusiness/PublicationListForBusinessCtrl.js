myApp.directive('publicationListForBusinessCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $timeout) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationListForBusiness/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    $rootScope.$watch(function () {
                        return geolocationService.position;
                    }, function watchCallback(newValue, oldValue) {

                        if (geolocationService.position != null) {

                            searchService.byBusiness(scope.getInfo().businessId, function (data) {
                                scope.publications = data;
                                for (var i in scope.publications) {
                                    scope.publications[i].interval = (scope.publications[i].endDate - new Date()) / 1000;
                                };

                                $timeout(function () {
                                    if (scope.getInfo().scrollTo != null) {
                                        $('.main-body').scrollTop($("#publication" + scope.getInfo().scrollTo).offset().top);
                                        scope.$apply();
                                    }
                                }, 1);

                            });
                        }
                    });
                }
            }
        }
    }
})
;