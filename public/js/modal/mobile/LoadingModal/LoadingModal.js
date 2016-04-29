myApp.controller('LoadingModalCtrl', function ($scope, $flash, $modalInstance,  $compile) {

    $scope.close = function () {
        $modalInstance.close();
    };


});