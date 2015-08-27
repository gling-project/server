myApp.controller('ChangePasswordModalCtrl', function ($scope,  $flash, $modalInstance,accountService,$timeout) {

    $scope.loading=false;

    $scope.dto={};

    $scope.fields = {
        oldPassword: {
            id:'change-password-input-password',
            name:'password',
            fieldTitle: "--.generic.oldPassword",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            focus: function () {
                return true;
            },
            disabled:function(){
                return $scope.loading;
            },
            field: $scope.dto,
            fieldName: 'oldPassword'
        },
        newPassword: {
            id:'change-password-input-new-password',
            name:'newPassword',
            fieldTitle: "--.changePasswordModal.newPassword",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            details:'--.registration.form.password.help',
            disabled:function(){
                return $scope.loading;
            },
            field: $scope.dto,
            fieldName: 'newPassword'
        },
        repeatPassword: {
            id:'change-password-input-repeat-password',
            name:'repeatNewPassword',
            fieldTitle: "--.generic.repeatPassword",
            fieldType: 'password',
            validationMessage: "--.generic.validation.repeatPassword",
            validation: function () {
                return $scope.dto.newPassword === $scope.dto.repeatPassword;
            },
            disabled:function(){
                return $scope.loading;
            },
            field: $scope.dto,
            fieldName: 'repeatPassword'
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

            $scope.loading=true;

            accountService.changePassword(
                $scope.dto.oldPassword,
                $scope.dto.newPassword,
            function(){
                $scope.loading=false;
                $scope.close();
            },
            function(){
                $scope.loading=false;
            });
        }
    };

});