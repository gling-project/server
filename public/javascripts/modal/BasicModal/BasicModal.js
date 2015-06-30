myApp.controller('BasicModalCtrl', function ($scope, $flash, $modalInstance, businessService, accountService, translationService, param, $compile,directiveName,save,$timeout) {

    var directive = $compile("<" + directiveName + " ng-info=\"param\"/>")($scope);

    $timeout(function(){
    $('.inject-data:first').append(directive)
    },1);


    $scope.loading = false;

    $scope.param = param;


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        save($scope.close);
    }


});