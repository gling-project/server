myApp.directive('businessCategoryFormCtrl', function ( $flash, directiveService,businessCategoryService,$timeout) {

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

                    scope.getInfo().isValid=false;

                    var value = scope.getInfo().value;


                    businessCategoryService.getAll(function (data) {
                        scope.categories = data.list;

                        //TODO multiple ?
                        console.log(scope.getInfo().value);
                        if(scope.getInfo().value!=null && scope.getInfo().value.length>0){
                            var catSelected = scope.getInfo().value[0];
                            console.log('----------------------'+catSelected.name);
                            console.log(scope.categories);
                            for(var cat in scope.categories){
                                for(var subcat in scope.categories[cat].children){
                                    if(scope.categories[cat].children[subcat].name == catSelected.name){
                                        scope.selectedCategory = scope.categories[cat];
                                        scope.subcategories = scope.categories[cat].children;
                                        scope.subselectedCategory = scope.categories[cat].children[subcat];
                                        break;
                                    }
                                }
                            }
                        }
                    });



                    scope.selectedCategory = null;

                    scope.select = function(category){
                        if(category!=scope.selectedCategory) {
                            scope.selectedCategory = category;
                            scope.subcategories = category.children;
                            scope.subselectedCategory = null;
                            //TODO more than one cat ?
                            scope.getInfo().value = [];
                            scope.getInfo().isValid=false;
                        }
                    };

                    scope.selectSubcategory = function(subCategory){
                        scope.subselectedCategory = subCategory;
                        //TODO more than one cat ?
                        scope.getInfo().value = [scope.subselectedCategory];
                        scope.getInfo().isValid = true;
                    };
                }

            }
        }
    }


});