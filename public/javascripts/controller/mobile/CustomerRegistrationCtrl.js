myApp.controller('CustomerRegistrationCtrl', function ($rootScope, $scope, $flash, accountService, facebookService, translationService, modalService, $location) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    modalService.closeLoadingModal();


    $scope.facebookAppId = facebookService.facebookAppId;
    $scope.facebookAuthorization = facebookService.facebookAuthorization;
    $scope.basic_url = location.host;
    if ($scope.basic_url.indexOf('http') == -1) {
        $scope.basic_url = 'http://' + $scope.basic_url;
    }

    var facebookAuthentication = null;

    $scope.accountParam = {
        mobileVersion: true
    };

    //
    // facebook connection
    // this function is called if Facebook is connected to the application.
    // This function will be connect the facebook account to the backend
    // the access_token is the access_token from Facebook
    //
    $scope.facebookSuccess = function (access_token) {

        //send request
        var dto = {
            token: access_token,
            accountType: 'CUSTOMER'
        };

        //test the facebook account
        accountService.testFacebook(dto, function (data2) {

            $scope.loading(false);

            // An account using the facebook account already exists. The user is now connected.
            // The user is redirect to the default page
            if (data2.status == 'ALREADY_REGISTRERED') {
                $flash.success('--.customer.registrationModal.alredyRegistred.success');
                accountService.setMyself(data2.myself);
                $location.url('/');
            }
            // an account already used the email from the Facebook account but this is not an Facebbok account.
            // fusion with this account and the facebook account is possible
            else if (data2.status == 'ACCOUNT_WITH_SAME_EMAIL') {
                $scope.fusion(data2.accountFusion);
            }
            //the facebook account is not used and can be used to create a new account.
            else if (data2.status == 'OK') {

                //assign data from Facebook to fields
                $scope.accountParam.dto.firstname = data2.firstname;
                $scope.accountParam.dto.lastname = data2.lastname;
                $scope.accountParam.dto.email = data2.email;
                $scope.accountParam.dto.gender = data2.gender;
                $scope.accountParam.dto.password = '*********';
                $scope.accountParam.maskPassword();

                //complete facebookAuthentication DTO
                facebookAuthentication = dto;
                facebookAuthentication.userId = data2.userId;

                //control data. If one of required data are missing, the user need to complete data.
                if (($scope.accountParam.dto.firstname == null || $scope.accountParam.dto.length == 0) ||
                    ($scope.accountParam.dto.lastname == null || $scope.accountParam.dto.lastname.length == 0) ||
                    ($scope.accountParam.dto.email == null || $scope.accountParam.dto.email.length == 0) ||
                    ($scope.accountParam.dto.gender == null || $scope.accountParam.dto.gender.length == 0)) {
                    $scope.accountParam.disabled = false;
                    $flash.info('--.registration.facebook.someDataEmpty');
                }
                else {
                    //if all required data are present, the user need to accept the SLA
                    $flash.info('--.registration.facebook.validSLAMessage');
                }
            }
        });
    };


    $scope.getUrlParam = function (name, url) {
        if (!url) url = location.href
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    };

    //try to catch facebook connection
    //mobile version
    if (location.href.indexOf('access_token') != -1) {
        var access_token = $scope.getUrlParam('access_token', location.href);
        //window.location.hash = '#';

        if (access_token != null) {
            $scope.facebookSuccess(access_token);
        }
    }

    $scope.loading = function (b) {
        if (b === true) {
            modalService.openLoadingModal();
        }
        else {
            modalService.closeLoadingModal();
        }
    };

    $scope.fusion = function (accountFusion) {

        modalService.openFacebookFusionModal(accountFusion, $scope.close);
    };

    $scope.save = function () {

        if (!$scope.accountParam.isValid) {
            $scope.accountParam.displayErrorMessage = true;
        }
        else {

            var dto = {
                accountRegistration: $scope.accountParam.dto,
                facebookAuthentication: facebookAuthentication
            };

            $scope.loading(true);
            accountService.registration(dto, function () {
                    $scope.loading(false);
                    $flash.success(translationService.get("--.login.flash.success"));
                    $location.url('/');
                },
                function () {
                    $scope.loading(false);
                });
        }
    }


});