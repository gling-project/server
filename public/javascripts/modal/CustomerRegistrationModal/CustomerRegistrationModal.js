myApp.controller('CustomerRegistrationModalCtrl', function ($scope, $http, $flash, $modalInstance, translationService, accountService,facebookService) {

    $scope.badgeSelected = 1;

    $scope.addressFormParam = {
        addName: true
    };

    $scope.customerInterestParam = {};

    $scope.accountParam = {};

    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.next = function () {
        var notValid = false;
        if ($scope.badgeSelected == 1) {
            if (!$scope.accountParam.isValid) {
                $scope.accountParam.displayErrorMessage = true;
                $flash.error(translationService.get("--.customer.registrationModal.account.notValid"));
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
                //TODO test fusion
                //TODO binding with form
                $scope.loading = false;
                $scope.accountParam.disabled = false;
                $scope.accountParam.dto.firstname = data.first_name;
                $scope.accountParam.dto.lastname = data.last_name;
                $scope.accountParam.dto.email= data.email;
                $scope.accountParam.dto.male= data.gender=='male';
                $scope.accountParam.dto.password= '*********';
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
    }

    $scope.previous = function () {
        $scope.badgeSelected--;
    };

    $scope.save = function () {

    }


});