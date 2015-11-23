myApp.controller('ConfirmAndShareModalCtrl', function ($scope, facebookService, businessId, publicationId,$modalInstance) {

    $scope.share = function () {
        facebookService.sharePublication(businessId, publicationId);
        $scope.close();
    };

    $scope.close = function () {
        $modalInstance.close();
    };

});