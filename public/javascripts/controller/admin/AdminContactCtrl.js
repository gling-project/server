myApp.controller('AdminContactCtrl', function ($scope, superAdminService,$flash) {

    $scope.dto = {
        subject: 'ceci est un sujet',
        contact: ''
    };

    $scope.send = function () {
        superAdminService.getEmailToBusinesses($scope.dto, function () {
            $flash.success("--.generic.success");
        })
    }


});