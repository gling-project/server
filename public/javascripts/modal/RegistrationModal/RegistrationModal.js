myApp.controller('RegistrationModalCtrl', function ($scope, $http, $flash, $modalInstance,modelService) {

    $scope.loading = false;

    $scope.fields = {
        gender:{
            name:'gender',
            fieldTitle: "--.generic.gender",
            options:[{key:'male',value:'generic.male'},{key:'female',value:'generic.female'}],
            disabled: function () {
                return $scope.loading;
            }
        },
        firstname: {
            name:'firstname',
            fieldTitle: "--.generic.firstname",
            validationRegex: "^.{2,50}$",
            validationMessage: ['--.generic.validation.size', '2', '50'],
            disabled: function () {
                return $scope.loading;
            }
        },
        lastname: {
            name:'lastname',
            fieldTitle: "--.generic.lastname",
            validationRegex: "^.{2,50}$",
            validationMessage: ['--.generic.validation.size', '2', '50'],
            disabled: function () {
                return $scope.loading;
            }
        },
        login: {
            fieldType:"email",
            name:'email',
            fieldTitle: "--.generic.email",
            validationRegex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            validationMessage: "--.generic.validation.email",
            disabled: function () {
                return $scope.loading;
            }
        },
        password: {
            name: 'password',
            fieldTitle: "--.registration.form.password",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            details:'--.registration.form.password.help',
            disabled: function () {
                return $scope.loading;
            }
        },
        repeatPassword: {
            name: 'password',
            fieldTitle: "--.registration.form.repeatPassword",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            disabled: function () {
                return $scope.loading;
            },
            validation: function () {
                return $scope.fields.password === $scope.fields.repeatPassword;
            }
        },
        openSession:{
            fieldTitle: "--.registration.form.keepSessionOpen",
            field:false,
            disabled: function () {
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
                male:($scope.fields.gender.field=='male'),
                firstname:$scope.fields.firstname.field,
                lastname:$scope.fields.lastname.field,
                email:$scope.fields.login.field,
                password: $scope.fields.password.field,
                keepSessionOpen:$scope.fields.openSession.field
            }

            $scope.loading = true;

            $http({
                'method': "POST",
                'url': "/registration",
                'headers': "Content-Type:application/json",
                'data': dto
            }).success(function (data, status) {
                $scope.loading = false;
                $scope.close();
                modelService.set(modelService.MY_SELF,data);
            })
                .error(function (data, status) {
                    $scope.loading = false;
                    $flash.error(data.message);
                });
        }
    }


});