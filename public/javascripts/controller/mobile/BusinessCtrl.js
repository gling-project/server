myApp.controller('BusinessCtrl', function ($scope, $routeParams,businessService) {

    $scope.loading = true;

    businessService.getBusiness($routeParams.businessId,
        function (data) {
            $scope.loading = false;
            $scope.business = data;
        });

});