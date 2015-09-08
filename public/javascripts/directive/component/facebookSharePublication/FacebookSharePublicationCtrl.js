myApp.directive('facebookSharePublicationCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/facebookSharePublication/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    //var url = 'https://lynk-test.herokuapp.com/business/'+scope.getInfo().publication.businessId+'/publication/'+scope.getInfo().publication.id'

                    var url = 'https://lynk-test.herokuapp.com/business/1/publication/4';

                    scope.openPopup = function(){
                        window.open('https://www.facebook.com/sharer/sharer.php?u='+url, "Share on Facebook", "width=500,height=500");
                    };

                }
            }
        }
    }
});