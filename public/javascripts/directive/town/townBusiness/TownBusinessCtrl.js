myApp.directive("townBusinessCtrl", function (townService) {
    return {
        restrict: "E",
        scope: {},
        templateUrl: "/assets/javascripts/directive/town/townBusiness/template.html",
        replace: true,
        compile: function () {
            return {
                post: function (scope) {

                    townService.getBusinessByZip(1160, 0,function (data) {
                        scope.businesses = data;
                    });

                    scope.elementToDisplay = 'list';

                    scope.selectBusiness = function (business) {
                        scope.elementToDisplay = 'businessDetails';
                        scope.selectedBusiness = business;
                    };
                    scope.backToList = function(){
                        scope.elementToDisplay = 'list';
                    }
                }
            }
        }
    }
});
