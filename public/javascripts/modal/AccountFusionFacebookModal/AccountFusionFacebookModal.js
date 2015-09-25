myApp.controller('AccountFusionFacebookModalCtrl', function ($scope, $flash, $modalInstance, accountFusion, accountService,closeRegistrationModal) {

    $scope.loading = false;

    $scope.email = accountFusion.email;

    var isValid=false;

    $scope.fields = {
        password: {
            name: 'password',
            fieldTitle: "--.generic.password",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            focus: function () {
                return true;
            },
            disabled: function () {
                return $scope.loading;
            },
            field: accountFusion,
            fieldName: 'password'
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
                obj.firstAttempt = accountFusion.displayErrorMessage;
                validation = false;
            }
        }
        isValid = validation;
    }, true);

    $scope.save = function () {

        if (!isValid) {
            accountFusion.displayErrorMessage = true;
        }
        else {
            $scope.loading = true;

            console.log(accountFusion);

            accountService.accountFusion(accountFusion, function () {
                    $scope.loading = false;
                    $scope.close();
                    closeRegistrationModal();
                },
                function () {
                    $scope.loading = false;
                });
        }
    }


});