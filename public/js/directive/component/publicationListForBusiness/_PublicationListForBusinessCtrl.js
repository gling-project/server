myApp.directive('publicationListForBusinessCtrl', function ($rootScope, directiveService, searchService, $timeout, publicationService, modalService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/js/directive/component/publicationListForBusiness/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.descriptionLimitBase=250;
                    scope.currentPage = 0;
                    scope.allLoaded = false;
                    scope.loadSemaphore = false;
                    scope.publications = [];
                    scope.loading=false;



                    scope.isArchived = function(publication){
                        return publication.endDate < new Date().getTime();
                    };

                    scope.success = function (data) {

                        if (scope.currentPage == 0) {
                            scope.publications = [];
                        }

                        if (data.length == 0) {
                            scope.allLoaded = true;
                        }

                        scope.loadSemaphore = false;
                        for (var key in data) {
                            scope.publications.push(data[key])
                        }
                        for (var i in scope.publications) {
                            scope.publications[i].descriptionLimit=scope.descriptionLimitBase;
                            scope.publications[i].interval = (scope.publications[i].endDate - new Date()) / 1000;
                        }

                        if (scope.getInfo().scrollTo != null) {

                            //if the user looking for a publication, scroll to it
                            $timeout(function () {
                                var target = "#publication" + scope.getInfo().scrollTo;
                                $(window).scrollTop($(target).offset().top - 70);

                                //scrollTo null to scroll only one time
                                scope.getInfo().scrollTo = null;
                                scope.$apply();
                            }, 1);
                        }
                        scope.loading=false;
                    };


                    //scrolling
                    $(window).on('scroll', function () {
                        var scrollBottom = $(window).scrollTop() + $(window).height();
                        if ($('.container-content').height() - scrollBottom < 200) {
                            if (scope.loadSemaphore == false) {
                                scope.loadSemaphore = true;
                                scope.currentPage = scope.currentPage + 1;

                                console.log("-- from scrolling");
                                scope.search();
                            }
                        }
                    });

                    scope.getInfo().refresh = function (type) {
                        scope.currentPage = 0;
                        scope.publications = [];
                        if(scope.type!=type) {
                            scope.type = type;
                            //will be reloaded by type watching
                        }
                        else{
                            scope.allLoaded = false;
                            console.log("-- from refresh");
                            scope.search();
                        }

                    };

                    scope.search = function () {
                        console.log("scope.search !! : "+scope.type+"/"+scope.currentPage);
                        if (scope.allLoaded == true) {
                            return;
                        }
                        scope.loading=true;
                        if (scope.type != null && scope.type != undefined && scope.type == 'ARCHIVE') {
                            searchService.byBusinessArchived(scope.currentPage, scope.getInfo().businessId, scope.success);
                        }
                        else if (scope.type != null && scope.type != undefined && scope.type == 'PREVISUALIZATION') {
                            searchService.byBusinessPrevisualization(scope.currentPage, scope.getInfo().businessId, scope.success);
                        }
                        else {
                            searchService.byBusiness(scope.currentPage, scope.getInfo().businessId, scope.success);
                        }
                    };

                    scope.$watch('type', function (n, o) {
                        if (n != o) {
                            scope.allLoaded = false;
                            console.log("-- from watch type");
                            scope.search();
                        }
                    });

                    //initialization
                    console.log('-- SERACH FROM initialization');
                    scope.search();

                    //remove
                    scope.removePublication = function (publication) {
                        modalService.messageModal('--.business.publication.remove.confirmationModal.title',
                            '--.business.publication.remove.confirmationModal.body',
                            function (close) {
                                publicationService.delete(publication, function () {
                                    $rootScope.$broadcast('RELOAD_PUBLICATION');
                                    close();
                                });
                            });
                    };

                    //edit
                    scope.editPublication = function (publication) {
                        if (publication.type == 'PROMOTION') {
                            modalService.openPromotionModal(publication, scope.getInfo().business, function () {
                                $rootScope.$broadcast('RELOAD_PUBLICATION');
                            });
                        }
                        else {
                            modalService.openBusinessNotificationModal(publication, scope.getInfo().business, function () {
                                $rootScope.$broadcast('RELOAD_PUBLICATION');
                            });
                        }
                    };

                    scope.getInterestClass = function (publication) {
                        if (publication.interest != null) {
                            return 'gling-icon-' + publication.interest.name;
                        }
                        return null;
                    };

                    var isEmpty = function (val) {
                        return val == undefined || val === null || val === "";
                    };

                    scope.descriptionIsEmpty = function (publication) {
                        return publication.type != 'PROMOTION' && isEmpty(publication.description);
                    };

                    scope.openGallery = function (image, publication) {
                        modalService.galleryModal(image, publication.pictures);
                    };


                    scope.getIllustrationClass = function (picture) {

                        if (picture!= undefined && picture.height > picture.width) {
                            return 'publication-illustration-high';
                        }
                        else {
                            return 'publication-illustration';
                        }
                    };
                }
            }
        }
    }
});