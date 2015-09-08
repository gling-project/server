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

                    var url = 'https://lynk-test.herokuapp.com/business/'+scope.getInfo().publication.businessId+'/publication/'+scope.getInfo().publication.id;

                    scope.openPopup = function(){
                        window.open('https://www.facebook.com/sharer/sharer.php?u='+url, "Share on Facebook", "width=500,height=500");
                    };

                    scope.getDescription = function(){
                        return scope.getInfo().publication.description;
                    };

                    scope.getIllustration = function(){
                        if(scope.getInfo().publication.pictures.length>0){
                            return scope.getInfo().publication.pictures[0];
                        }
                        return scope.getInfo().publication.businessIllustration;
                    }

                }
            }
        }
    }
});