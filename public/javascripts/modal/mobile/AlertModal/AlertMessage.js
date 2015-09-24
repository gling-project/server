myApp.controller('AlertMessageCtrl', function ($scope, $flash, $modalInstance,  $compile, message) {

    $scope.message = message;

    $scope.close = function () {
        $modalInstance.close();
    };


});