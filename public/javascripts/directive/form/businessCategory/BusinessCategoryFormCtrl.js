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

                    businessCategoryService.getAll(function (data) {
                        scope.categories = data.list;
                    });

                    scope.selectedCategory = null;

                    scope.select = function(category){
                        if(category!=scope.selectedCategory) {
                            scope.selectedCategory = category;
                            scope.subcategories = category.children;
                            scope.subselectedCategory = null;
                            scope.getInfo().isValid=false;
                        }
                    };

                    scope.selectSubcategory = function(subCategory){
                        scope.subselectedCategory = subCategory;
                        scope.getInfo().isValid = true;
                    };

                    $timeout(function() {
                        scope.loadingFinish = true;
                    },800);
                }

            }
        }
    }


});