myApp.directive('publicationListForBusinessCtrl', function ($rootScope, businessService, geolocationService, directiveService, searchService, $timeout, publicationService, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/publicationListForBusiness/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.currentPage = 0;
                    scope.allLoaded = false;
                    scope.loadSemaphore = false;
                    scope.publications = [];

                    scope.success = function (data) {
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


                    //scrolling
                    $('.main-body').on('scroll', function () {
                        var scrollBottom = $('.main-body').scrollTop() + $('.main-body').height();
                        if ($('.global-content-container').height() - scrollBottom < 200) {
                            scope.currentPage = scope.currentPage + 1;
                            scope.search();
                        }
                    });

                    scope.getInfo().refresh = function (type) {
                        scope.currentPage = 0;
                        scope.publications = [];
                        scope.type = type;
                        scope.search();
                    };

                    scope.search = function () {
                        if (scope.loadSemaphore == false) {
                            scope.loadSemaphore = true;
                            if (scope.type != null && scope.type != undefined && scope.type == 'ARCHIVE') {
                                searchService.byBusinessArchived(scope.currentPage, scope.getInfo().businessId, scope.success);
                            }
                            else if (scope.type != null && scope.type != undefined && scope.type == 'PREVISUALIZATION') {
                                searchService.byBusinessPrevisualization(scope.currentPage, scope.getInfo().businessId, scope.success);
                            }
                            else {
                                searchService.byBusiness(scope.currentPage, scope.getInfo().businessId, scope.success);
                            }
                        }
                    };

                    scope.removePublication = function (publication) {
                        modalService.messageModal('--.business.publication.remove.confirmationModal.title',
                            '--.business.publication.remove.confirmationModal.body',
                            function (close) {
                                publicationService.delete(publication, function () {
                                    $rootScope.$broadcast('RELOAD_PUBLICATION');
                                    close();
                                });
                            });
                    }
                }
            }
        }
    }
});