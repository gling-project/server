myApp.controller('CustomerRegistrationCtrl', function ($rootScope, $scope, $flash, accountService, facebookService, translationService, modalService, $location, addressService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    var facebookAuthentication = null;

    $scope.accountParam = {
        mobileVersion: true
    };

    //
    // facebook connection
    //
    $scope.fb_login = function () {
        $scope.accountParam.disabled = true;
        $scope.loading(true);
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

                    $scope.loading(false);

                    if (data2.status == 'ALREADY_REGISTRERED') {
                        $flash.success('--.customer.registrationModal.alredyRegistred.success');
                        accountService.setMyself(data2.myself);
                        $location.path('/');
                    }
                    else if (data2.status == 'ACCOUNT_WITH_SAME_EMAIL') {
                        $scope.fusion(data2.accountFusion);
                    }
                    else if (data2.status == 'OK') {
                        $scope.accountParam.dto.firstname = data2.firstname;
                        $scope.accountParam.dto.lastname = data2.lastname;
                        $scope.accountParam.dto.email = data2.email;
                        $scope.accountParam.dto.gender = data2.gender;
                        $scope.accountParam.dto.password = '*********';
                        $scope.accountParam.maskPassword();
                        facebookAuthentication = dto;
                        $flash.info('--.registration.facebook.validSLAMessage');
                    }
                });
            },
            function (data, status) {
                $flash.error(data.message);
                $scope.loading(false);
                $scope.accountParam.disabled = false;
            });
    };

    $scope.loading = function(b){
        if(b) {
            modalService.loadingModal();
        }
        else{
            modalService.closeLoadingModal();
        }
    };

    $scope.fusion = function (accountFusion) {

        modalService.openFacebookFusionModal(accountFusion);
    };

    $scope.save = function () {

        if (!$scope.accountParam.isValid && facebookAuthentication == null) {
            $scope.accountParam.displayErrorMessage = true;
        }
        else {

            var dto = {
                accountRegistration: $scope.accountParam.dto,
                facebookAuthentication: facebookAuthentication
            };

            $scope.loading = true;
            accountService.registration(dto, function () {
                    $scope.loading(false);
                    $flash.success(translationService.get("--.login.flash.success"));
                    $location.path('/');
                },
                function () {
                    $scope.loading(false);
                });
        }
    }


});