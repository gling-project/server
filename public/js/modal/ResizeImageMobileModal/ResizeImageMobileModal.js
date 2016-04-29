myApp.controller('ResizeImageMobileModalCtrl', function ($scope, $flash, $modalInstance,params,save) {

    $scope.params=params;

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {
        var isValid = true;
        if(params.callBackSave!=null){
            params.callBackSave();
        }
        if (params.isValid != undefined) {
            isValid = params.isValid;

            params.displayErrorMessage = true;
        }
        if (isValid) {
            $scope.loading = true;
            save($scope.close,$scope.setLoading);
        }
    }

});