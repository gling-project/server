myApp.controller('InterestSelectionModalCtrl', function ($scope, $flash, $modalInstance, callback, customerInterestService, listInterest) {

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.customerInterests = listInterest;

    $scope.selectInterest = function (target) {
        callback(target);
        $scope.close();
    }

});