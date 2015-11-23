myApp.controller('BasicModalCtrl', function ($scope, $flash, $modalInstance, businessService, accountService, translationService, param, $compile, directiveName, save, $timeout, title) {

    $scope.title = title;

    var directive = $compile("<" + directiveName + " ng-info=\"param\"/>")($scope);

    $timeout(function () {
        $('.inject-data:first').append(directive)
    }, 1);


    $scope.loading = false;

    $scope.param = param;


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.setLoading = function(value){
        param.disabled = value;
        $scope.loading = value;
    };

    $scope.save = function () {
        var isValid = true;
        if(param.callBackSave!=null){
            param.callBackSave();
        }
        console.log(param.isValid);
        if (param.isValid != undefined) {
            isValid = param.isValid;
            param.displayErrorMessage = true;
        }
        if (isValid) {
            $scope.setLoading(true);
            save($scope.close,$scope.setLoading);
        }
    }


});