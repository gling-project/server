myApp.controller('MessageModalCtrl', function ($scope, $flash, $modalInstance,  $compile, title,message, save) {

    $scope.message = message;

    $scope.title=title;

    $scope.loading = false;


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.displaySaveButton = function(){
        return save!=null && save != undefined;
    };

    $scope.save = function () {
        save($scope.close);
    }


});