myApp.service("modalService", function ($modal) {

    this.openCustomerRegistrationModal = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/CustomerRegistrationModal/view.html",
            controller: "CustomerRegistrationModalCtrl",
            size: "lg"
        });
    };

    this.openBusinessRegistrationModal = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/BusinessRegistrationModal/view.html",
            controller: "BusinessRegistrationModalCtrl",
            size: "lg"
        });
    };

    this.openEditProfileModal = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/EditProfileModal/view.html",
            controller: "EditProfileModalCtrl",
            size: "l"
        });
    };

    this.openLoginModal = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/LoginModal/view.html",
            controller: "LoginModalCtrl",
            size: "l"
        });
    }

    this.openHelpModal = function (message) {
        var resolve = {
            message: function () {
                return message;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/HelpModal/view.html",
            controller: "HelpModalCtrl",
            size: 'sm',
            resolve: resolve
        });
    }

    this.openCalculatorModal = function(callbackResult){
        var resolve = {
            setResult: function () {
                return function(result){
                    callbackResult(result);
                };
            }
        };

        $modal.open({
            templateUrl: "/assets/javascripts/modal/Calculator/view.html",
            controller: "CalculatorModalCtrl",
            size:"sm",
            resolve: resolve
        });
    };

    this.openFacebookFusionModal = function(accountFusion){
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
    };

    this.openEditPasswordModal = function(){
        $modal.open({
            templateUrl: "/assets/javascripts/modal/ChangePassword/view.html",
            controller: "ChangePasswordModalCtrl",
            size:"l"
        });
    };

    this.openEditCustomerInterest = function(){
        $modal.open({
            templateUrl: "/assets/javascripts/modal/EditCustomerInterestModal/view.html",
            controller: "EditCustomerInterestModalCtrl",
            size:"lg"
        });
    };

    this.addressModal = function(addName,address){
        var resolve = {
            dto: function () {
                return address;
            }
            ,addName : function(){
                return addName;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/AddressModal/view.html",
            controller: "AddressModalCtrl",
            size:"l",
            resolve: resolve
        });
    };

    this.openForgotPasswordModal = function(email){
        var resolve = {
            email: function () {
                return email;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/ForgotPasswordModal/view.html",
            controller: "ForgotPasswordModalCtrl",
            size:"l",
            resolve: resolve
        });
    };

});