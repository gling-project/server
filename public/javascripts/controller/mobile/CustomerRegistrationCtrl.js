myApp.controller('CustomerRegistrationCtrl', function ($rootScope, $scope, $flash, accountService, facebookService, translationService, modalService, $location) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');


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
    //
    $scope.facebookSuccess = function (access_token) {

        console.log('facebook registrtion');
        console.log(data);

        //send request
        var dto = {
            token: access_token,
            accountType: 'CUSTOMER'
        };
        console.log(dto);

        accountService.testFacebook(dto, function (data2) {

            $scope.loading(false);

            if (data2.status == 'ALREADY_REGISTRERED') {
                $flash.success('--.customer.registrationModal.alredyRegistred.success');
                accountService.setMyself(data2.myself);
                $location.url('/');
            }
            else if (data2.status == 'ACCOUNT_WITH_SAME_EMAIL') {
                $scope.fusion(data2.accountFusion);
            }
            else if (data2.status == 'OK') {
                dto.userId = data2.userId;
                $scope.accountParam.dto.firstname = data2.firstname;
                $scope.accountParam.dto.lastname = data2.lastname;
                $scope.accountParam.dto.email = data2.email;
                $scope.accountParam.dto.gender = data2.gender;
                $scope.accountParam.dto.password = '*********';
                $scope.accountParam.maskPassword();
                facebookAuthentication = dto;
                if (($scope.accountParam.dto.firstname == null || $scope.accountParam.dto.length == 0) ||
                    ($scope.accountParam.dto.lastname == null || $scope.accountParam.dto.lastname.length == 0) ||
                    ($scope.accountParam.dto.email == null || $scope.accountParam.dto.email.length == 0) ||
                    ($scope.accountParam.dto.gender == null || $scope.accountParam.dto.gender.length == 0)) {
                    $scope.accountParam.disabled = false;
                    $flash.info('--.registration.facebook.someDataEmpty');
                }
                else {
                    $flash.info('--.registration.facebook.validSLAMessage');
                }
            }
            //$location.url('/customer_registration');
            //history.replaceState({}, document.title, "/customer_registration");
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