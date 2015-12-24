myApp.controller('ConfirmAndShareModalCtrl', function ($scope, facebookService, publication,$modalInstance) {

    $scope.share = function () {
        facebookService.publish(publication);
        $scope.close();
    };

    $scope.close = function () {
        $modalInstance.close();
    };

});