myApp.directive('imageFormCtrl', function ($flash, directiveService) {

    return {
        restrict: "E",
        scope: directiveService.autoScope({
            ngInfo: '='
        }),
        templateUrl: "/assets/javascripts/directive/form/image/template.html",
        replace: true,
        transclude: true,
        compile: function () {
            return {
                pre: function (scope) {
                    return directiveService.autoScopeImpl(scope);
                },
                post: function (scope) {
                    directiveService.autoScopeImpl(scope);

                    scope.imageParam = {
                        fieldTitle: "",
                        validationMessage: '--.error.validation.image',
                        target: scope.getInfo().target,
                        field: scope.getInfo().dto,
                        fieldName:scope.getInfo().fieldName,
                        fullSize:true
                    };
                }
            }
        }
    }


})
;