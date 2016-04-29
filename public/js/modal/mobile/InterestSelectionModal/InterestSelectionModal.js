myApp.controller('InterestSelectionModalCtrl', function ($scope, $flash, $modalInstance, callback, customerInterestService, listInterest) {

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.getHeight = function(){
        var h = {height:($(window).height() - 190)+'px'};
        return h;
    };

    $scope.customerInterests = listInterest;

    $scope.selectInterest = function (target) {
        callback(target);
        $scope.close();
    }

});