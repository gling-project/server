myApp.controller('EditProfileModalCtrl', function ($scope, $http, $flash, $modalInstance,$modal,languageService,modelService) {

    $scope.loading = false;

    $scope.account = angular.copy(modelService.get(modelService.MY_SELF));

    $scope.fields = {
        gender:{
            name:'gender',
            fieldTitle: "--.generic.gender",
            options:[{key:'male',value:'--.generic.male'},{key:'female',value:'--.generic.female'}],
            disabled: function () {
                return $scope.loading;
            },
            field:($scope.account.male)?'male':'female'

        },
        language:{
            name:'language',
            fieldTitle: "--.generic.yourLanguage",
            options:languageService.languagesStructured,
            disabled: function () {
                return $scope.loading;
            },
            field:$scope.account.lang.code

        },
        firstname: {
            name:'firstname',
            fieldTitle: "--.generic.firstname",
            validationRegex: "^.{2,50}$",
            validationMessage: ['--.generic.validation.size', '2', '50'],
            disabled: function () {
                return $scope.loading;
            },
            field:$scope.account.firstname
        },
        lastname: {
            name:'lastname',
            fieldTitle: "--.generic.lastname",
            validationRegex: "^.{2,50}$",
            validationMessage: ['--.generic.validation.size', '2', '50'],
            disabled: function () {
                return $scope.loading;
            },
            field:$scope.account.lastname
        },
        login: {
            fieldType:"email",
            name:'email',
            fieldTitle: "--.generic.email",
            field:$scope.account.email,
            isValid:true
        },
        password: {
            name: 'password',
            fieldTitle: "--.registration.form.password",
            fieldType: 'password',
            disabled: function () {
                return true;
            },
            field:'********',
            isValid:true
        }
    };

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.allFieldValid = function () {

        var validation = true;

        for (var key in $scope.fields) {
            var obj = $scope.fields[key];
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
                languageCode:$scope.fields.language.field
            }

            $scope.loading = true;

            console.log(dto);

            $http({
                'method': "PUT",
                'url': "/account/"+$scope.account.id,
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
    };

    $scope.editPassword = function(){

        $modal.open({
            templateUrl: "/assets/javascripts/modal/ChangePassword/view.html",
            controller: "ChangePasswordModalCtrl",
            size:"l"
        });
    }

});