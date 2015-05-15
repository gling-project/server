myApp.controller('AccountFusionFacebookModalCtrl', function ($scope, $http, $flash, $modalInstance,modelService,accountFusion) {

    $scope.loading=false;

    $scope.email = accountFusion.email;

    $scope.fields = {
        password: {
            name:'password',
            fieldTitle: "--.generic.password",
            validationRegex: "^[a-zA-Z0-9-_%]{6,18}$",
            validationMessage: "--.generic.validation.password",
            fieldType: 'password',
            focus: function () {
                return true;
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

            accountFusion.password = $scope.fields.password.field;

            $scope.loading=true;

            $http({
                'method': "POST",
                'url': "/account/fusion",
                'headers': "Content-Type:application/json",
                'data': accountFusion
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