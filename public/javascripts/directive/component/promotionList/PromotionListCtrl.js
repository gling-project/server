myApp.directive('promotionListCtrl', function (businessService) {

    return {
        restrict: "E",
        templateUrl: "/assets/javascripts/directive/component/promotionList/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {

                    businessService.findByPromotion({},function(data){
                        for(var i in data){
                            if(data[i].image!=null){
                                data[i].image.link = "/file/"+data[i].image.id;
                            }
                        }
                        scope.businesses = data;
                    });

                }
            }
        }
    }
})
;