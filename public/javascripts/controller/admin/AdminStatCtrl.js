myApp.controller('AdminStatCtrl', function ($scope, superAdminService, ngTableParams, $filter, $window, modalService) {

    superAdminService.getStat(function (data) {
        $scope.stats = data;
    });

});