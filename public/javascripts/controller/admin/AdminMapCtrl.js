myApp.controller('AdminMapCtrl', function ($scope, superAdminService, ngTableParams, $filter, $window, modalService) {

    superAdminService.getCustomerPositions(function (data) {
        $scope.positions = data;

    });


    $scope.map = {
        center: {
            latitude: 50.8471417,
            longitude: 4.3528959
        }
    };

});