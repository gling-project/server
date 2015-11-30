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
            templateUrl: "/assets/js/modal/BasicModal/view.html",
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
            templateUrl: "/assets/js/modal/mobile/AlertModal/view.html",
            controller: "AlertMessageCtrl",
            size: "l",
            windowClass: classes,
            resolve: resolve
        });
    };


    this.openLoadingModal = function () {
        this.loadingModal = $modal.open({
            templateUrl: "/assets/js/modal/mobile/LoadingModal/view.html",
            controller: "LoadingModalCtrl",
            size: "l",
            windowClass: 'loading-modal'
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
            templateUrl: "/assets/js/modal/MessageModal/view.html",
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
            templateUrl: "/assets/js/modal/CustomerRegistrationModal/view.html",
            controller: "CustomerRegistrationModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };

    this.openBusinessRegistrationModal = function () {
        $modal.open({
            templateUrl: "/assets/js/modal/BusinessRegistrationModal/view.html",
            controller: "BusinessRegistrationModalCtrl",
            size: "lg"
        });
    };

    this.openEditProfileModal = function () {
        $modal.open({
            templateUrl: "/assets/js/modal/EditProfileModal/view.html",
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
            templateUrl: "/assets/js/modal/LoginModal/view.html",
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
            templateUrl: "/assets/js/modal/HelpModal/view.html",
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
            templateUrl: "/assets/js/modal/Calculator/view.html",
            controller: "CalculatorModalCtrl",
            size: "sm",
            resolve: resolve
        });
    };

    this.openEditPasswordModal = function () {
        $modal.open({
            templateUrl: "/assets/js/modal/ChangePassword/view.html",
            controller: "ChangePasswordModalCtrl",
            size: "l"
        });
    };

    this.openEditCustomerInterest = function () {
        $modal.open({
            templateUrl: "/assets/js/modal/EditCustomerInterestModal/view.html",
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
            templateUrl: "/assets/js/modal/AddressModal/view.html",
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
            templateUrl: "/assets/js/modal/ForgotPasswordModal/view.html",
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
            templateUrl: "/assets/js/modal/PromotionModal/view.html",
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
            templateUrl: "/assets/js/modal/BusinessNotificationModal/view.html",
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
            templateUrl: "/assets/js/modal/OneFieldModal/view.html",
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
            templateUrl: "/assets/js/modal/GalleryModal/view.html",
            controller: "GalleryModalCtrl",
            windowClass: 'modal-gallery-content',
            size: "lg",
            resolve: resolve
        });
    };

    this.interestSelection = function (listInterest, callback) {
        var resolve = {
            listInterest:function(){
              return listInterest;
            },
            callback: function () {
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/mobile/InterestSelectionModal/view.html",
            controller: "InterestSelectionModalCtrl",
            size: "l",
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
            templateUrl: "/assets/js/modal/IframeModal/view.html",
            controller: "iframeModalCtrl",
            size: "lg",
            resolve: resolve
        });
    };



    this.successAndShare = function (businessId, publicationId) {
        var resolve = {
            businessId: function () {
                return businessId;
            },
            publicationId: function () {
                return publicationId;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/ConfirmAndShareModal/view.html",
            controller: "ConfirmAndShareModalCtrl",
            size: "l",
            resolve: resolve,
            backdrop:true
        });
    };






    this.resizeImageMobileModal = function (params,save) {
        var resolve = {
            params: function () {
                return params;
            },
            save:function(){
                return save;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/ResizeImageMobileModal/view.html",
            controller: "ResizeImageMobileModalCtrl",
            size: "l",
            resolve: resolve
        });
    };

    this.ConfirmClaimModalCtrl = function(claimBusiness,callback){
        var resolve = {
            claimBusiness: function () {
                return claimBusiness;
            },
            callback:function(){
                return callback;
            }
        };
        $modal.open({
            templateUrl: "/assets/js/modal/admin/ConfirmClaimModal/view.html",
            controller: "ConfirmClaimModalCtrl",
            size: "l",
            resolve: resolve
        });
    }
});