myApp.controller('ForgotPasswordModalCtrl', function ($scope, $http, $flash, $modalInstance, $filter, email, accountService) {

    $scope.loading = false;

    $scope.dto = {
        email:email
    };

    $scope.fields = {
        email: {
            fieldType: "email",
            name: 'email',
            fieldTitle: "--.changeEmailModal.email",
            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            validationMessage: "--.generic.validation.email",
            focus: function () {
                return true;
            },
            disabled: function () {
                return $scope.loading;
            },
            field: $scope.dto,
            fieldName: 'email'
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    //
    // validation : watching on field
    //
    $scope.$watch('fields', function () {
        var validation = true;

        for (var key in $scope.fields) {
            var obj = $scope.fields[key];
            if ($scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                obj.firstAttempt = !$scope.displayErrorMessage;
                validation = false;
            }
        }
        $scope.isValid = validation;
    }, true);

    //
    // display error watching
    //
    $scope.$watch('displayErrorMessage', function () {
        for (var key in $scope.fields) {
            var obj = $scope.fields[key];
            obj.firstAttempt = !$scope.displayErrorMessage;
        }
    });

    $scope.save = function () {

        if ($scope.isValid) {

            $scope.loading = true;

            accountService.forgotPassword($scope.dto, function () {
                    $flash.success($filter('translateText')('--.forgotPassword.success'));
                    $scope.loading = false;
                    $scope.close();
                },
                function () {
                    $scope.loading = false;
                });
        }
        else {
            $scope.displayErrorMessage = true;
        }
    };

});