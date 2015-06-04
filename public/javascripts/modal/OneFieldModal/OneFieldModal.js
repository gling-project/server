myApp.controller('OneFieldModalCtrl', function ($scope, $flash, facebookService, translationService, $modal, $modalInstance, accountService, $location, field,callback) {

    var value = {
        data: null
    };

    $scope.text = {
        fieldTitle: field.name,
        validationRegex: "^.{1,255}$",
        validationMessage: ['--.generic.validation.size', '1', '255'],
        field: value,
        fieldName: 'data'
    };

    $scope.loading = false;

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.save = function () {

        if ($scope.text.isValid) {
            callback(value.data);
            $modalInstance.close();
        }
        else {
            $scope.text.firstAttempt = false;
        }
    };

})
;