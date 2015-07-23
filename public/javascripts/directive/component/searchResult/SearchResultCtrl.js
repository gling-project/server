myApp.directive('searchResultCtrl', function (directiveService, $location, searchBarService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/component/searchResult/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);


                    var counter = 0;
                    scope.$watch('getInfo().result', function () {
                        if (scope.getInfo().result != null) {
                            counter = 0;
                            for (var i in scope.getInfo().result.businesses) {
                                scope.getInfo().result.businesses[i].index = counter;
                                counter++;
                            }
                            for (var i in scope.getInfo().result.categories) {
                                scope.getInfo().result.categories[i].index = counter;
                                counter++;
                            }
                            for (var i in scope.getInfo().result.publications) {
                                scope.getInfo().result.publications[i].index = counter;
                                counter++;
                            }
                        }
                        else {
                            scope.getInfo().display = false;
                        }
                        scope.indexSelected = null;
                    });

                    scope.indexSelected = null;

                    $(document).keydown(function (e) {
                        if (e.keyCode == 40) {
                            if (scope.indexSelected == null ||
                                scope.indexSelected == counter - 1) {
                                scope.indexSelected = 0;
                            }
                            else {
                                scope.indexSelected++;
                            }
                            scope.$apply();
                        }
                        else if (e.keyCode == 38) {
                            if (scope.indexSelected == null ||
                                scope.indexSelected == 0) {
                                scope.indexSelected = counter - 1;
                            }
                            else {
                                scope.indexSelected--;
                            }
                            scope.$apply();
                        }
                        else if (e.keyCode == 13) {
                            for (var i in scope.getInfo().result.businesses) {
                                if (scope.indexSelected == scope.getInfo().result.businesses[i].index) {
                                    scope.goToBusiness(scope.getInfo().result.businesses[i]);
                                    break;
                                }
                            }
                            for (var i in scope.getInfo().result.categories) {
                                if (scope.indexSelected == scope.getInfo().result.categories[i].index) {
                                    scope.goToCategory(scope.getInfo().result.categories[i]);
                                    break;
                                }
                            }
                            for (var i in scope.getInfo().result.publications) {
                                if (scope.indexSelected == scope.getInfo().result.publications[i].index) {
                                    scope.goToPublication(scope.getInfo().result.publications[i]);
                                    break;
                                }
                            }
                            scope.$apply();
                        }
                        else if (e.keyCode == 27) {
                            scope.getInfo().display = false;
                            scope.indexSelected = null;
                            scope.$apply();
                        }
                    });

                    $(document).click(function () {
                        if (!($('#searchContainer').is(':hover'))) {
                            scope.getInfo().display = false;
                            scope.indexSelected = null;
                            scope.$apply();
                        }
                    });

                    scope.select =function(index){
                      scope.indexSelected=index;
                    };

                    scope.seeAll = function () {
                        scope.navigateTo('search/' + searchBarService.currentSearch);
                    };

                    scope.goToPublication = function (publication) {
                        scope.navigateTo('business/' + publication.businessId + '/publication/' + publication.id);
                    };

                    scope.goToBusiness = function (business) {
                        scope.navigateTo('business/' + business.id);
                    };


                    scope.seeAllPublication = function () {
                        scope.navigateTo('search/publication:' + removeCriteria(searchBarService.currentSearch));
                    };

                    scope.seeAllBusiness = function () {
                        scope.navigateTo('search/business:' + removeCriteria(searchBarService.currentSearch));
                    };

                    scope.seeAllCategory = function () {
                        scope.navigateTo('search/category:' + removeCriteria(searchBarService.currentSearch));
                    };

                    scope.goToCategory = function (category) {

                        var target = null;

                        if (category.subSubCategory != null) {
                            target = category.subSubCategory.translationName;
                        }
                        else if (category.subCategory != null) {
                            target = category.subCategory.translationName;
                        }
                        else {
                            target = category.category.translationName;
                        }
                        scope.navigateTo('search/category:' + removeCriteria(target));
                    };

                    var removeCriteria = function (s) {

                        if (s.indexOf(":") != -1) {
                            return s.split(':')[1];
                        }
                        else {
                            return s;
                        }
                    };

                    scope.navigateTo = function (target) {
                        $location.path(target);
                        scope.getInfo().display = false;
                        scope.getInfo().cleanSearch();
                    };

                }
            }
        }
    }
});