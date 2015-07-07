myApp.directive('promotionListCtrl', function ($rootScope, businessService, geolocationService,directiveService,searchService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/promotionList/template.html",
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

                            searchService.default(function (data) {
                                for (var i in data) {
                                    if (data[i].illustration!= null) {
                                        data[i].illustration.link = "/file/" + data[i].illustration.id;
                                    }
                                    data[i].interval = (data[i].endDate - new Date()) / 1000;
                                    scope.params.push({
                                        promotion:data[i],
                                        selectCallback:function(businessId){
                                            if(scope.getInfo().displayBusiness !=null){
                                                scope.getInfo().displayBusiness(businessId);
                                            }
                                        }
                                    });

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