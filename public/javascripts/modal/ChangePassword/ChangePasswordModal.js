myApp.controller('ChangePasswordModalCtrl', function ($scope, $http, $flash, $modalInstance,modelService) {

    $scope.loading=false;

    $scope.fields = {
        oldPassword: {
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
            }
        },
        newPassword: {
            fieldTitle: "--.changePasswordModal.newPassword",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            details:'--.registration.form.password.help',
            disabled:function(){
                return $scope.loading;
            }
        },
        repeatPassword: {
            fieldTitle: "--.generic.repeatPassword",
            fieldType: 'password',
            validationMessage: "--.generic.validation.repeatPassword",
            validation: function () {
                return $scope.o.newPassword === $scope.o.repeatPassword;
            },
            disabled:function(){
                return $scope.loading;
            }
        }
    };


    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.allFieldValid = function () {

        var validation = true;

        for (var key in $scope.fields) {
            var obj = $scope.fields[key];
            console.log(obj);
            if ($scope.fields.hasOwnProperty(key) && (obj.isValid == null || obj.isValid === false)) {
                obj.firstAttempt = false;
                validation= false;
            }
        }
        return validation;
    };

    $scope.save = function () {

        if ($scope.allFieldValid()) {

            var dto = {
                oldPassword: $scope.fields.oldPassword.field,
                newPassword: $scope.fields.newPassword.field
            };

            $scope.loading=true;

            $http({
                'method': "PUT",
                'url': "/account/password/" + modelService.get(modelService.MY_SELF).id,
                'headers': "Content-Type:application/json",
                'data': dto
            }).success(function (data, status) {
                $scope.loading=false;
                $scope.close();
            })
            .error(function (data, status) {
                $scope.loading=false;
                $flash.error(data.message);
            });
        }
    }


});