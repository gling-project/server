myApp.controller('CustomerRegistrationModalCtrl', function ($scope, $flash, $modal, $modalInstance, translationService, accountService, facebookService, modalService) {

    var facebookAuthentication = null;

    $scope.badgeSelected = 1;

    $scope.addressFormParam = {
        addName: true
    };

    $scope.customerInterestParam = {};

    $scope.accountParam = {};

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.skip = function () {
        if ($scope.badgeSelected == 3) {
            $scope.save(true);
        }
        else {
            $scope.badgeSelected++;
        }

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
        else if ($scope.badgeSelected == 2) {
            if (!$scope.customerInterestParam.isValid) {
                $scope.customerInterestParam.displayErrorMessage = true;
                $flash.error(translationService.get("--.generic.stepNotValidOrSkip"));
                notValid = true;
            }
        }
        else {
            if (!$scope.addressFormParam.isValid) {
                $scope.addressFormParam.displayErrorMessage = true;
                $flash.error(translationService.get("--.generic.stepNotValidOrSkip"));
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
                    accountType: 'CUSTOMER'
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

        modalService.openFacebookFusionModal(accountFusion);
    };

    $scope.previous = function () {
        $scope.badgeSelected--;
    };

    $scope.save = function (skipStep3) {

        if(!skipStep3){
            if(!$scope.addressFormParam.isValid){
                $scope.addressFormParam.displayErrorMessage = true;
                $flash.error(translationService.get("--.generic.stepNotValidOrSkip"));
                return;
            }
        }
        var dto = {
            accountRegistration: $scope.accountParam.dto,
            customerInterests: $scope.customerInterestParam.result,
            facebookAuthentication: facebookAuthentication
        };
        if ($scope.addressFormParam.isValid) {
            dto.address = $scope.addressFormParam.dto;
        }

        $scope.loading = true;
        accountService.registration(dto, function () {
                $scope.loading = false;
                $flash.success(translationService.get("--.login.flash.success"));
                $scope.close();
            },
            function () {
                $scope.loading = false;
            });
    }

});