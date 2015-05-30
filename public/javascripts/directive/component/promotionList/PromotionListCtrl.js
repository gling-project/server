myApp.directive('promotionListCtrl', function ($rootScope, businessService, geolocationService) {

    return {
        restrict: "E",
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
                                    if (data[i].image!= null) {
                                        data[i].image.link = "/file/" + data[i].image.id;
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