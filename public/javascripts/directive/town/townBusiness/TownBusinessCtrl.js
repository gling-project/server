myApp.directive("townBusinessCtrl", function (townService) {
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
                    };
                    scope.backToList = function () {
                        scope.elementToDisplay = 'list';
                    };


                    townService.getBusinessByZip(1160, function (data) {
                        scope.businesses = data;
                        scope.loading = false;

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
                            console.log(n);
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
