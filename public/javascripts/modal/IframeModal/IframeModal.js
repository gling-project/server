myApp.controller('iframeModalCtrl', function ($scope, $flash, $modalInstance,title,url) {


    $scope.title=title;
    $scope.url=url;

    $scope.close = function () {
        $modalInstance.close();
    };

});