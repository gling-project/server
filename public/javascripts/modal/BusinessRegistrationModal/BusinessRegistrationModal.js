myApp.controller('BusinessRegistrationModalCtrl', function ($scope, $http, $flash, $modal,$modalInstance, translationService, accountService, facebookService,businessService) {

    var facebookAuthentication = null;

    $scope.badgeSelected = 1;

    $scope.accountParam = {};

    $scope.addressFormParam = {
        addName: false
    };
    $scope.businessCategoryFormParam = {
    };

    $scope.businessFormParam = {};

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.skip = function () {
        $scope.badgeSelected++;
    };

    $scope.next = function () {
        var notValid = false;
        if ($scope.badgeSelected == 1) {
            if (!$scope.accountParam.isValid) {
                $scope.accountParam.displayErrorMessage = true;
                $flash.error(translationService.get("--.generic.stepNotValid"));
            }
            else {
                $scope.accountParam.disabled = true;
                $scope.loading = true;
                accountService.testEmail($scope.accountParam.dto.email, function (value) {
                    $scope.accountParam.disabled = false;
                    $scope.loading = false;
                    if (value) {
                        $flash.error(translationService.get("--.error.email_already_used"));
                    }
                    else {
                        $scope.badgeSelected++;
                    }
                });
            }
            //control email
            notValid = true;
        }
        else if($scope.badgeSelected == 2) {
            if (!$scope.addressFormParam.isValid ||
                !$scope.businessFormParam.isValid) {
                $scope.addressFormParam.displayErrorMessage = true;
                $scope.businessFormParam.displayErrorMessage = true;
                $flash.error(translationService.get("--.generic.stepNotValid"));
                notValid = true;
            }
        }
        if (!notValid) {
            $scope.badgeSelected++;
        }
    };

    //
    // facebook connection
    //
    $scope.fb_login = function () {
        $scope.accountParam.disabled = true;
        $scope.loading = true;
        facebookService.registration(function (data) {

                var access_token = data.accessToken;
                var user_id = data.userID;

                //send request
                var dto = {
                    userId: user_id,
                    token: access_token,
                    accountType:'BUSINESS'
                };

                accountService.testFacebook(dto, function (data2) {

                    console.log('data2');
                    console.log(data2);
                    $scope.loading = false;

                    if (data2.status == 'ALREADY_REGISTRERED') {
                        $flash.success('--.customer.registrationModal.alredyRegistred.success');
                        $scope.close();
                    }
                    else if (data2.status == 'ACCOUNT_WITH_SAME_EMAIL') {
                        $scope.fusion(data2.accountFusion);
                    }
                    else if (data2.status == 'OK') {
                        //TODO
                        //$scope.loading = false;
                        //$scope.accountParam.disabled = false;
                        //$scope.accountParam.dto.firstname = data.first_name;
                        //$scope.accountParam.dto.lastname = data.last_name;
                        //$scope.accountParam.dto.email= data.email;
                        //$scope.accountParam.dto.male= data.gender=='male';
                        //$scope.accountParam.dto.password= '*********';
                        facebookAuthentication = dto;
                        $scope.skip();
                    }
                });
            },
            function (data, status) {
                $flash.error(data.message);
                $scope.loading = false;
                $scope.accountParam.disabled = false;
            });
    };

    $scope.fusion = function (accountFusion) {

        var resolve = {
            accountFusion: function () {
                return accountFusion;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/AccountFusionFacebookModal/view.html",
            controller: "AccountFusionFacebookModalCtrl",
            size: "l",
            resolve: resolve
        });
        $scope.close();
    };

    $scope.previous = function () {
        $scope.badgeSelected--;
    };

    $scope.save = function () {

        //todo control address and business
        if(!$scope.businessFormParam.isValid ||
            !$scope.addressFormParam.isValid ||
            !$scope.businessCategoryFormParam.isValid){
            $scope.businessFormParam.displayErrorMessage=true;
            $scope.addressFormParam.displayErrorMessage=true;
            $scope.accountParam.displayErrorMessage=true;
            $scope.businessCategoryFormParam.displayErrorMessage=true;
            $flash.error(translationService.get("--.generic.stepNotValid"));
        }
        else {

            var businessDTO = $scope.businessFormParam.dto;
            businessDTO.address = $scope.addressFormParam.dto;
            businessDTO.category = $scope.businessCategoryFormParam.value;

            var dto = {
                accountRegistration: $scope.accountParam.dto,
                facebookAuthentication: facebookAuthentication,
                business:businessDTO
            };
            console.log('------------------------------------');
            console.log(dto);

            $scope.loading = true;
            businessService.registration(dto, function () {
                    $scope.loading = false;
                    $flash.success(translationService.get("--.login.flash.success"));
                    $scope.close();
                },
                function () {
                    $scope.loading = false;
                });
        }
    }

});