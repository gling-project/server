myApp.controller('ConfirmAndShareModalCtrl', function ($scope, facebookService, publication,$modalInstance,accountService) {

    $scope.share = function () {
        facebookService.publish(publication);
        $scope.close();
    };

    $scope.shareIsActive = function(){
        return facebookService.isConnected()===true && accountService.getMyself().type === 'BUSINESS' && accountService.getMyself().facebookPageToPublish!=null;
    };

    $scope.close = function () {
        $modalInstance.close();
    };

});