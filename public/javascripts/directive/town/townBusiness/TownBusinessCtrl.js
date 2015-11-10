myApp.directive("townBusinessCtrl", function (townService, $location) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/town/townBusiness/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    scope.loading = true;
                    scope.elementToDisplay = 'list';


                    scope.selectBusiness = function (business) {
                        scope.elementToDisplay = 'businessDetails';
                        scope.selectedBusiness = business;
                        var baseUrl = $location.url().split('#')[0]
                        $location.url('business/' + business.id);
                    };
                    scope.backToList = function () {
                        scope.elementToDisplay = 'list';
                        $location.url('');
                    };


                    townService.getBusinessByZip(1160, function (data) {
                        scope.businesses = data;
                        scope.loading = false;


                        if ($location.url().indexOf('business/') != -1) {
                            //go to business
                            var myRegexp =/business\/([0-9]+)/;
                            var match = myRegexp.exec($location.url());
                            var businessId = match[1];
                            for (var key in scope.businesses) {
                                if (scope.businesses[key].id == businessId) {
                                    scope.elementToDisplay = 'businessDetails';
                                    scope.selectedBusiness = scope.businesses[key];
                                }
                            }
                        }

                        scope.testCategories = function (categories, search) {
                            for (var key in categories) {
                                if (categories[key].translationName.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                                    return true;
                                }
                            }
                            return false;
                        };

                        scope.searchBusiness = function (business, search) {
                            var searchEls = search.split(' ');
                            for (var key in searchEls) {
                                var searchEl = searchEls[key];
                                if (business.name.toLowerCase().indexOf(searchEl.toLowerCase()) == -1 &&
                                    business.address.street.toLowerCase().indexOf(searchEl.toLowerCase()) == -1 &&
                                    scope.testCategories(business.businessCategories, searchEl) == false) {
                                    business.visible = false;
                                    return;
                                }
                            }
                            business.visible = true;
                        };

                        scope.$watch('search', function (n, o) {
                            if (n != o) {
                                if (n != null && n != "") {
                                    for (var key in scope.businesses) {
                                        scope.searchBusiness(scope.businesses[key], n);
                                    }
                                }
                                else {
                                    for (var key in scope.businesses) {
                                        scope.businesses[key].visible = true;
                                    }
                                }
                            }
                        });

                        scope.emptyResult = function () {
                            for (var key in scope.businesses) {
                                if (scope.businesses[key].visible !== false) {
                                    return false;
                                }
                            }
                            return true;
                        }
                    });
                }
            }
        }
    }
});
