myApp.service("modalService", function ($modal) {


    this.basicModal = function (title, directiveName, param, save) {
        var resolve = {
            directiveName: function () {
                return directiveName;
            },
            param: function () {
                return param;
            },
            title: function () {
                return title;
            },
            save: function () {
                return save;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/BasicModal/view.html",
            controller: "BasicModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };

    this.alertModal = function (type, message) {
        var resolve = {
            message: function () {
                return message;
            }
        };
        var classes = "modal-alert-content";
        if (type == 'info') {
            classes += " modal-alert-content-info";
        }
        else if (type == 'success') {
            classes += " modal-alert-content-success";
        }
        else {
            classes += " modal-alert-content-error";
        }


        $modal.open({
            templateUrl: "/assets/javascripts/modal/mobile/AlertModal/view.html",
            controller: "AlertMessageCtrl",
            size: "l",
            windowClass: classes,
            resolve: resolve
        });
    };


    this.openLoadingModal = function () {
        this.loadingModal = $modal.open({
            templateUrl: "/assets/javascripts/modal/mobile/LoadingModal/view.html",
            controller: "LoadingModalCtrl",
            size: "l",
            windowClass: 'loading-modal',
            backdrop: 'static'
        });
    };
    this.closeLoadingModal = function () {
        if (this.loadingModal != undefined && this.loadingModal != null) {
            this.loadingModal.close();
        }
    };

    this.messageModal = function (title, message, save) {
        var resolve = {
            message: function () {
                return message;
            },
            title: function () {
                return title;
            },
            save: function () {
                return save;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/MessageModal/view.html",
            controller: "MessageModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };

    this.openCustomerRegistrationModal = function (fctToExecute, fctToExecuteParams) {
        var resolve = {
            fctToExecute: function () {
                return fctToExecute;
            },
            fctToExecuteParams: function () {
                return fctToExecuteParams;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/CustomerRegistrationModal/view.html",
            controller: "CustomerRegistrationModalCtrl",
            size: "lg",
            resolve: resolve
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

    this.openLoginModal = function (fctToExecute, fctToExecuteParams, helpMessage) {
        var resolve = {
            fctToExecute: function () {
                return fctToExecute;
            },
            fctToExecuteParams: function () {
                return fctToExecuteParams;
            },
            helpMessage: function () {
                return helpMessage;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/LoginModal/view.html",
            controller: "LoginModalCtrl",
            size: "l",
            resolve: resolve
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

    this.openCalculatorModal = function (callbackResult) {
        var resolve = {
            setResult: function () {
                return function (result) {
                    callbackResult(result);
                };
            }
        };

        $modal.open({
            templateUrl: "/assets/javascripts/modal/Calculator/view.html",
            controller: "CalculatorModalCtrl",
            size: "sm",
            resolve: resolve
        });
    };

    this.openFacebookFusionModal = function (accountFusion, closeRegistrationModal) {
        var resolve = {
            accountFusion: function () {
                return accountFusion;
            },
            closeRegistrationModal: function () {
                return closeRegistrationModal;
            }
        };

        $modal.open({
            templateUrl: "/assets/javascripts/modal/AccountFusionFacebookModal/view.html",
            controller: "AccountFusionFacebookModalCtrl",
            size: "l",
            resolve: resolve
        });
    };

    this.openEditPasswordModal = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/ChangePassword/view.html",
            controller: "ChangePasswordModalCtrl",
            size: "l"
        });
    };

    this.openEditCustomerInterest = function () {
        $modal.open({
            templateUrl: "/assets/javascripts/modal/EditCustomerInterestModal/view.html",
            controller: "EditCustomerInterestModalCtrl",
            size: "lg"
        });
    };

    this.addressModal = function (addName, address, isBusiness, callback) {
        var resolve = {
            dto: function () {
                return address;
            }
            , addName: function () {
                return addName;
            },
            isBusiness: function () {
                return isBusiness;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/AddressModal/view.html",
            controller: "AddressModalCtrl",
            size: "l",
            resolve: resolve
        });
    };

    this.openForgotPasswordModal = function (email) {
        var resolve = {
            email: function () {
                return email;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/ForgotPasswordModal/view.html",
            controller: "ForgotPasswordModalCtrl",
            size: "l",
            resolve: resolve
        });
    };


    this.openPromotionModal = function (promotion, business, callback) {
        var resolve = {
            dto: function () {
                return promotion;
            },
            business: function () {
                return business;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/PromotionModal/view.html",
            controller: "PromotionModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };


    this.openBusinessNotificationModal = function (businessNotification, business, callback) {
        var resolve = {
            dto: function () {
                return businessNotification;
            },
            business: function () {
                return business;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/BusinessNotificationModal/view.html",
            controller: "BusinessNotificationModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };


    this.openOneFieldModal = function (field, callback) {
        var resolve = {
            field: function () {
                return field;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/OneFieldModal/view.html",
            controller: "OneFieldModalCtrl",
            size: "l",
            resolve: resolve
        });
    };

    this.galleryModal = function (image, images) {
        var resolve = {
            image: function () {
                return image;
            },
            images: function () {
                return images;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/GalleryModal/view.html",
            controller: "GalleryModalCtrl",
            windowClass: 'modal-gallery-content',
            size: "lg",
            resolve: resolve
        });
    };

    this.openSla = function (title, url) {
        var resolve = {
            title: function () {
                return title;
            },
            url: function () {
                return url;
            }
        };
        $modal.open({
            templateUrl: "/assets/javascripts/modal/IframeModal/view.html",
            controller: "iframeModalCtrl",
            size: "lg",
            resolve: resolve
        });
    }

});