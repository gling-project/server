myApp.directive('businessInfoCtrl', function (directiveService, businessService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/businessInfo/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.$watch('getInfo().businessId', function () {

                        if (scope.getInfo().businessId != null) {
                            businessService.getBusiness(scope.getInfo().businessId(), function (data) {
                                scope.business = data;
                                console.log(scope.business);
                                if(scope.business.illustration!=null){
                                    scope.business.illustration.link = '/file/'+scope.business.illustration.id;
                                }

                                scope.scheduleParam={
                                    disabled : true,
                                    dto:scope.business.schedules
                                };
                            });
                        }
                    });

                }
            }
        }
    }
});