myApp.directive('publicationListMobileForBusinessCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $timeout, publicationService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationListMobileForBusiness/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    //scrolling
                    $('.scrollable-content-body').on('scroll', function () {
                        var scrollBottom = $('.scrollable-content-body').scrollTop() + $('.scrollable-content-body').height();
                        if ($('.scrollable-content-inner').height() - scrollBottom < 200) {

                            if (scope.loadSemaphore == false) {
                                scope.loadSemaphore = true;
                                scope.currentPage = scope.currentPage + 1;
                                scope.search();
                            }
                        }
                    });


                    scope.getInfo().refresh = function (type) {
                        scope.currentPage = 0;
                        scope.publications = [];
                        scope.type = type;
                        scope.search();
                    };

                    scope.search = function () {
                        searchService.byBusiness(scope.currentPage, scope.getInfo().businessId, scope.success);
                    };

                    scope.success = function (data) {

                        if(scope.currentPage==0){
                            scope.publications = [];
                        }

                        scope.loadSemaphore = false;
                        for (var key in data) {
                            scope.publications.push(data[key])
                        }
                        for (var i in scope.publications) {
                            scope.publications[i].interval = (scope.publications[i].endDate - new Date()) / 1000;
                        }

                        $timeout(function () {
                            if (scope.getInfo().scrollTo != null) {
                                $('.main-body').scrollTop($("#publication" + scope.getInfo().scrollTo).offset().top);
                                scope.$apply();
                            }
                        }, 1);
                    };
                }
            }
        }
    }
})
;