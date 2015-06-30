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

                    scope.isDisabled= function(){
                        return scope.getInfo().disabled;
                    };

                    scope.getInfo().isValid = false;

                    var value = scope.getInfo().value;

                    scope.selectedCategory = null;
                    scope.subsubselectedCategory = [];

                    scope.displayValue = function(){
                        if (scope.getInfo().value != null && scope.getInfo().value.length > 0) {
                            var catSelected = scope.getInfo().value[0];
                            for (var cat in scope.categories) {
                                for (var subcat in scope.categories[cat].children) {
                                    for (var subsubcat in scope.categories[cat].children[subcat].children) {

                                        if (scope.categories[cat].children[subcat].children[subsubcat].name == catSelected.name) {

                                            scope.subcategories = scope.categories[cat].children;
                                            scope.subsubcategories = scope.categories[cat].children[subcat].children;
                                            scope.selectedCategory = scope.categories[cat];
                                            scope.subselectedCategory = scope.categories[cat].children[subcat];
                                            scope.subsubselectedCategory.push(scope.categories[cat].children[subcat].children[subsubcat]);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    };;

                    businessCategoryService.getAll(function (data) {
                        scope.categories = data.list;
                        scope.displayValue();
                    });

                    scope.$watch('getInfo().value',function(){
                        scope.displayValue();
                    });

                    scope.select = function (category) {
                        if (category != scope.selectedCategory) {
                            scope.selectedCategory = category;
                            scope.subcategories = category.children;
                            scope.subselectedCategory = null;
                            scope.subsubselectedCategory = [];
                            scope.subsubcategories = null;
                            //TODO more than one cat ?
                            scope.getInfo().value = [];
                            scope.getInfo().isValid = false;
                        }
                    };

                    scope.selectSubcategory = function (subCategory) {
                        scope.subselectedCategory = subCategory;
                        scope.subsubcategories = subCategory.children;
                        scope.subsubselectedCategory = [];
                        //TODO more than one cat ?
                        scope.getInfo().value = [scope.subselectedCategory];
                        scope.getInfo().isValid = true;
                    };

                    scope.selectSubSubcategory = function (subBubCategory) {
                        console.log(subBubCategory);
                        scope.subsubselectedCategory.push(subBubCategory);
                        console.log(scope.subsubselectedCategory);
                        //TODO more than one cat ?
                        scope.getInfo().value = [scope.subsubselectedCategory];
                        scope.getInfo().isValid = true;
                    };
                }

            }
        }
    }


});