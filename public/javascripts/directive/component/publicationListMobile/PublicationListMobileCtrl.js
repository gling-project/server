myApp.directive('publicationListMobileCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $location) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationListMobile/template.html",
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

                    //scope.share = function (publication) {
                    //    facebookService.share('http://lynk-test.herokuapp.com/publication/'+publication.id);
                    //};


                    //(function(d, s, id) {
                    //    var js, fjs = d.getElementsByTagName(s)[0];
                    //    if (d.getElementById(id)) return;
                    //    js = d.createElement(s); js.id = id;
                    //    js.src = "//connect.facebook.net/fr_FR/sdk.js#xfbml=1&version=v2.4&appId=1446672245627002";
                    //    fjs.parentNode.insertBefore(js, fjs);
                    //}(document, 'script', 'facebook-jssdk'));


                }
            }
        }
    }
});