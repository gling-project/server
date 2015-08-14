myApp.directive('businessCategoryFormCtrl', function ($flash, directiveService, businessCategoryService, $timeout) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/businessCategory/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.isDisabled = function () {
                        return scope.getInfo().disabled;
                    };

                    scope.getInfo().isValid = false;

                    var value = scope.getInfo().value;

                    //scope.selectedCategory = null;
                    //scope.subsubselectedCategory = [];

                    scope.displayValue = function () {
                        if (scope.getInfo().value != null && scope.getInfo().value.length > 0) {
                            for (var catSKey in scope.getInfo().value) {
                                var catSelected = scope.getInfo().value[catSKey];
                                for (var cat in scope.categories) {
                                    for (var subcat in scope.categories[cat].children) {
                                        for (var subsubcat in scope.categories[cat].children[subcat].children) {

                                            if (scope.categories[cat].children[subcat].children[subsubcat].name == catSelected.name) {

                                                scope.subcategories = scope.categories[cat].children;
                                                scope.subsubcategories = scope.categories[cat].children[subcat].children;
                                                scope.categories[cat].selected = true;
                                                scope.categories[cat].children[subcat].selected = true;
                                                scope.categories[cat].children[subcat].children[subsubcat].selected = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    };
                    ;

                    businessCategoryService.getAll(function (data) {
                        scope.categories = data.list;
                        scope.displayValue();
                    });

                    scope.$watch('getInfo().value', function () {
                        scope.displayValue();
                    });

                    scope.select = function (category) {

                        if (category.selected != true) {

                            scope.cleanSubSubCat();
                            scope.cleanSubCat();
                            scope.cleanCat();

                            category.selected = true;
                            scope.subcategories = category.children;
                            scope.subsubcategories = null;
                            scope.compileValue();
                        }
                    };

                    scope.selectSubcategory = function (subCategory) {

                        if (subCategory.selected != true) {

                            scope.cleanSubSubCat();
                            scope.cleanSubCat();
                            scope.subsubcategories = subCategory.children;
                            subCategory.selected = true;
                            scope.compileValue();
                        }
                    };

                    scope.selectSubSubcategory = function (subSubCategory) {

                        if (subSubCategory.selected === true) {
                            subSubCategory.selected = false;
                        }
                        else {
                            subSubCategory.selected = true;
                        }
                        scope.compileValue();
                    };

                    scope.cleanCat = function () {
                        for (var key in scope.categories) {
                            scope.categories[key].selected = false;
                        }
                    };

                    scope.cleanSubCat = function () {
                        for (var key in scope.subcategories) {
                            scope.subcategories[key].selected = false;
                        }
                    };

                    scope.cleanSubSubCat = function () {
                        for (var key in scope.subsubcategories) {
                            scope.subsubcategories[key].selected = false;
                        }
                    };

                    scope.compileValue = function () {

                        scope.getInfo().isValid = false;
                        scope.getInfo().value.splice(0, scope.getInfo().value.length);

                        if (scope.subsubcategories != null) {
                            for (var key in scope.subsubcategories) {
                                if (scope.subsubcategories[key].selected == true) {
                                    scope.getInfo().value.push(scope.subsubcategories[key]);
                                    scope.getInfo().isValid = true;
                                }
                            }
                        }
                    }
                }

            }
        }
    }


})
;