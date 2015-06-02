myApp.directive('promotionListCtrl', function ($rootScope, businessService, geolocationService) {

    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/component/promotionList/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {

                    $rootScope.$watch(function () {
                        return geolocationService.position;
                    }, function watchCallback(newValue, oldValue) {

                        if (geolocationService.position != null) {

                            businessService.findByPromotion(geolocationService.position, function (data) {
                                for (var i in data) {
                                    if (data[i].illustration!= null) {
                                        data[i].illustration.link = "/file/" + data[i].illustration.id;
                                    }
                                    data[i].interval = (data[i].endDate - new Date()) / 1000;
                                }
                                scope.promotions = data;
                            });
                        }
                    });
                }
            }
        }
    }
})
;