myApp.directive('publicationBigListCtrl', function ($rootScope, businessService, geolocationService,directiveService,searchService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationBigList/template.html",
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

                            scope.params = [];

                            searchService.byBusiness(scope.getInfo().businessId,function (data) {
                                for (var i in data) {
                                    if (data[i].illustration!= null) {
                                        data[i].illustration.link = "/file/" + data[i].illustration.id;
                                    }
                                    data[i].interval = (data[i].endDate - new Date()) / 1000;
                                    scope.params.push(data[i]);

                                }
                            });
                        }
                    });
                }
            }
        }
    }
})
;