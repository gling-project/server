myApp.controller('BusinessCtrl', function ($scope, modalService, businessService, $routeParams, accountService, $window, addressService, geolocationService, translationService, $flash, followService,$timeout) {


    if ($routeParams.publicationId != null) {
        $scope.publicationIdToGo = $routeParams.publicationId;
    }


    $scope.displayError = false;
    $scope.loading = true;
    $scope.business = null;
    $scope.edit = false;
    $scope.myBusiness = false;
    $scope.businessId = $routeParams.businessId;
    //publication
    $scope.publicationListParam = {
        businessId: $scope.businessId,
        scrollTo: $scope.publicationIdToGo,
        displayRemoveIcon: $scope.edit
    };
    $scope.$watch('edit', function () {
        $scope.publicationListParam.displayRemoveIcon = $scope.edit;
    });
    //address
    $scope.googleMapParams = {}


    //loading
    businessService.getBusiness($routeParams.businessId,
        function (data) {
            $scope.loading = false;
            $scope.business = data;
            //edit mode ?
            $scope.$watch('business.businessStatus', function () {

                    if (accountService.getMyself() != null && accountService.getMyself().businessId == $routeParams.businessId) {
                        if ($scope.business.businessStatus != 'WAITING_CONFIRMATION') {
                            $scope.edit = true;
                        }
                        $scope.myBusiness = true;
                    }
                }
            );

            //distance
            $scope.computeDistance = function () {
                addressService.distance($scope.business.address.id, function (data) {
                    $scope.business.distance = data.distance;
                });
            };
            if (geolocationService.position != null) {
                $scope.computeDistance();
            }
            $scope.$on('POSITION_CHANGED', function () {
                $scope.computeDistance();
            });

            $scope.publish = function () {

                modalService.messageModal("--.business.page.askPublication.window.title", "--.business.page.askPublication.window.message",
                    function (close) {
                        businessService.publishBusiness();
                        close();
                        $flash.info(translationService.get("--.business.page.askPublication.window.flash"));
                        $scope.business.businessStatus = 'WAITING_CONFIRMATION';
                    });
            };

            $scope.cancelPublishRequest = function () {

                modalService.messageModal("--.business.page.cancelPublishRequest.window.title", "--.business.page.cancelPublishRequest.window.message",
                    function (close) {
                        businessService.cancelPublishRequest();
                        close();
                        $flash.info(translationService.get("--.business.page.cancelPublishRequest.window.flash"));
                        $scope.business.businessStatus = 'NOT_PUBLISHED';
                    });
            };

            $scope.stopPublish = function () {

                modalService.messageModal("--.business.page.stopPublication.window.title", "--.business.page.stopPublication.window.message",
                    function (close) {
                        businessService.stopPublication();
                        close();
                        $flash.info(translationService.get("--.business.page.stopPublication.window.flash"));
                        $scope.business.businessStatus = 'NOT_PUBLISHED';
                    });
            };


            //edit name
            $scope.editbusiness = function () {
                var business = angular.copy($scope.business);
                modalService.basicModal("--.business.edit.data.modal.title", "business-form-ctrl",
                    {dto: business},
                    function (close, setLoading) {
                        businessService.edit(business, function (data) {
                            $scope.business.name = data.name;
                            $scope.business.description = data.description;
                            $scope.business.phone = data.phone;
                            $scope.business.website = data.website;
                            $scope.business.email = data.email;
                            close();
                        }, function () {
                            setLoading(false);
                        });
                    });
            };

            //edit illustration
            $scope.editIllustration = function () {
                modalService.basicModal("--.business.edit.illustration.modal.title", "image-form-ctrl",
                    {dto: $scope.business, sizex: 80, sizey: 80, fieldName: 'illustration'},
                    function (close, setLoading) {
                        businessService.editIllustration($scope.business.illustration, function () {
                            $scope.business.illustration.link = '/rest/file/' + $scope.business.illustration.id;
                            close();
                        }, function () {
                            setLoading(false);
                        });
                    });
            };

            //edit landscape
            $scope.editLandscape = function () {
                //$scope.business.landscape={}
                modalService.basicModal("--.business.edit.landscape.modal.title", "image-form-ctrl",
                    {dto: $scope.business, sizex: 800, sizey: 300, fieldName: 'landscape'},
                    function (close, setLoading) {
                        businessService.editLandscape($scope.business.landscape, function () {
                            //$scope.business.landscape.link = "url('/file/" + $scope.business.landscape.id + "')";
                            close();
                        }, function () {
                            setLoading(false);
                        });
                    });
            };

            //address
            $scope.googleMapParams.address = $scope.business.address;
            $timeout(function(){
                $scope.googleMapParams.refreshNow();
            },1);

            //edit address
            $scope.editAddress = function () {
                var address = angular.copy($scope.business.address);
                modalService.basicModal("--.business.edit.address.modal.title", "address-form-ctrl",
                    {
                        dto: address,
                        addName: false
                    },
                    function (close, setLoading) {
                        //scope.business
                        businessService.editAddress(address, function (data) {
                            $scope.business.address = data;
                            $scope.centerMap();
                            close();
                        }, function () {
                            setLoading(false);
                        });
                    });
            };

            $scope.categoryLineParams = {
                categories: $scope.business.categories
            };

            //edit category
            $scope.editCategory = function () {
                var catList = [];
                for (var key1 in $scope.business.categories) {
                    var lev2 = $scope.business.categories[key1];
                    for (var key2 in lev2) {
                        var lev3 = lev2[key2];
                        for (var key3 in lev3) {
                            catList.push(lev3[key3]);
                        }
                    }
                }

                modalService.basicModal("--.business.edit.category.modal.title", "business-category-form-ctrl",
                    {
                        value: catList
                    },
                    function (close, setLoading) {
                        //scope.business
                        businessService.editBusinessCategory(catList, function (data) {
                            $scope.business.categories = data.categories;
                            $scope.categoryLineParams.categories = $scope.business.categories;
                            close();
                        }, function () {
                            setLoading(false);
                        });
                    });

            };

            $scope.follow = function () {
                if (accountService.getMyself() != null) {
                    $scope.followed();
                }
                else {
                    modalService.openLoginModal($scope.followed);
                }
            };

            $scope.followed = function () {
                var followed = $scope.business.following;
                followService.addFollow(!followed, $scope.business.id, function () {
                    $scope.business.following = !followed;
                    if ($scope.business.following) {
                        $scope.business.totalFollowers++;
                    }
                    else {
                        $scope.business.totalFollowers--;
                    }
                });
            };


            //schedule
            $scope.editSchedule = function () {
                var schedules = angular.copy($scope.business.schedules);
                modalService.basicModal("--.business.edit.schedule.modal.title", "schedule-form-ctrl",
                    {
                        dto: schedules,
                        disabled: false
                    },
                    function (close, setLoading) {
                        businessService.createSchedule({schedules: schedules}, function (data) {
                            $scope.business.schedules = schedules;
                            close();
                        }, function () {
                            setLoading(false);
                        });
                    });

            };

            $scope.editGallery = function () {
                var business = angular.copy($scope.business);
                modalService.basicModal("--.business.edit.address.modal.title", "dir-field-image-mutiple",
                    {
                        fieldTitle: "--.business.modal.gallery.title",
                        validationMessage: '--.error.validation.image',
                        sizex: 60,
                        sizey: 60,
                        field: business,
                        multiple: true,
                        fieldName: 'galleryPictures'
                    },
                    function (close, setLoading) {
                        //scope.business
                        businessService.editGallery({list: business.galleryPictures}, function (data) {
                            $scope.business.galleryPictures = data;
                            close();
                        }, function () {
                            setLoading(false);
                        });
                    });
            };


            //edit social network
            $scope.editSocialNetwork = function () {
                var socialNetwork = angular.copy($scope.business.socialNetwork);
                if (socialNetwork == undefined || socialNetwork == null) {
                    socialNetwork = {};
                }
                modalService.basicModal("--.business.edit.address.modal.title", "business-social-network-ctrl",
                    {
                        dto: socialNetwork
                    },
                    function (close, setLoading) {
                        //scope.business
                        businessService.editSocialNetwork(socialNetwork, function (data) {
                            $scope.business.socialNetwork = socialNetwork;
                            close();
                        }, function () {
                            setLoading(false);
                        });
                    });
            };

            //create publication
            $scope.createPromotion = function () {
                modalService.openPromotionModal(null, function () {
                    $scope.$broadcast('RELOAD_PUBLICATION');
                });

            };
            $scope.createNotification = function () {
                modalService.openBusinessNotificationModal(null, function () {
                    $scope.$broadcast('RELOAD_PUBLICATION');
                });
            };
            $scope.$on('POSITION_CHANGED', function () {
                $scope.$broadcast('RELOAD_PUBLICATION');
            });

            $scope.$on('RELOAD_PUBLICATION', function () {
                $scope.publicationListParam.refresh();
            });

            //initialization
            if(geolocationService.currentPosition!=null){
                $scope.$broadcast('RELOAD_PUBLICATION');
            }

            $scope.displaySchedule = function () {
                for (var i in $scope.business.schedules) {
                    if ($scope.business.schedules[i].length > 0) {
                        return true;
                    }
                }
                return false;
            }


        }, function () {
            $scope.loading = false;
            $scope.displayError = true;

        });

})
;