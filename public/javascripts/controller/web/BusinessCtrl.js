myApp.controller('BusinessCtrl', function ($scope, modalService, businessService, $routeParams, accountService, $window, addressService, geolocationService, translationService, $flash, followService) {


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
        scrollTo: $scope.publicationIdToGo
    };
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
                    function (close) {
                        businessService.edit(business, function (data) {
                            $scope.business.name = data.name;
                            $scope.business.description = data.description;
                            $scope.business.phone = data.phone;
                            $scope.business.website = data.website;
                            $scope.business.email = data.email;
                            close();
                        });
                    });
            };

            //edit illustration
            $scope.editIllustration = function () {
                modalService.basicModal("--.business.edit.illustration.modal.title", "image-form-ctrl",
                    {dto: $scope.business, sizex: 80, sizey: 80, fieldName: 'illustration'},
                    function (close) {
                        businessService.editIllustration($scope.business.illustration, function () {
                            $scope.business.illustration.link = '/file/' + $scope.business.illustration.id;
                            close();
                        });
                    });
            };

            //edit landscape
            $scope.editLandscape = function () {
                //$scope.business.landscape={}
                modalService.basicModal("--.business.edit.landscape.modal.title", "image-form-ctrl",
                    {dto: $scope.business, sizex: 800, sizey: 300, fieldName: 'landscape'},
                    function (close) {
                        businessService.editLandscape($scope.business.landscape, function () {
                            //$scope.business.landscape.link = "url('/file/" + $scope.business.landscape.id + "')";
                            close();
                        });
                    });
            };

            //address
            $scope.googleMapParams.address = $scope.business.address

            //edit address
            $scope.editAddress = function () {
                var address = angular.copy($scope.business.address);
                modalService.basicModal("--.business.edit.address.modal.title", "address-form-ctrl",
                    {
                        dto: address,
                        addName: false
                    },
                    function (close) {
                        //scope.business
                        businessService.editAddress(address, function (data) {
                            $scope.business.address = data;
                            $scope.centerMap();
                            close();
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
                    function (close) {
                        //scope.business
                        businessService.editBusinessCategory(catList, function (data) {
                            $scope.business.categories = data.categories;
                            $scope.categoryLineParams.categories = $scope.business.categories;
                            close();
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
                    function (close) {
                        businessService.createSchedule({schedules: schedules}, function (data) {
                            $scope.business.schedules = schedules;
                            close();
                        });
                    });

            };


            //edit social network
            $scope.editSocialNetwork = function () {
                var business = angular.copy($scope.business);
                modalService.basicModal("--.business.edit.address.modal.title", "business-social-network-ctrl",
                    {
                        dto: business
                    },
                    function (close) {
                        //scope.business
                        businessService.editSocialNetwork(business, function (data) {
                            $scope.business = data;
                            close();
                        });
                    });
            };

            //create publication
            $scope.createPromotion = function () {
                modalService.openPromotionModal(null, function () {
                    console.log('je usi callback');
                    $scope.publicationListParam.refresh();
                });

            };
            $scope.createNotification = function () {
                modalService.openBusinessNotificationModal(null, function () {
                    console.log('je usi callback');
                    $scope.publicationListParam.refresh();
                });
            };
            $scope.$on('POSITION_CHANGED',function(){
                $scope.publicationListParam.refresh();
            });

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