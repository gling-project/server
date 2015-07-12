myApp.controller('BusinessCtrl', function ($scope, modalService, businessService, $routeParams, accountService, $window, addressService, geolocationService, translationService, $flash) {


    $scope.displayError = false;
    $scope.loading = true;
    $scope.business = null;
    $scope.edit = false;
    $scope.myBusiness = false;
    $scope.businessId = $routeParams.businessId;

    //loading
    businessService.getBusiness($routeParams.businessId,
        function (data) {
            $scope.loading = false;
            $scope.business = data;
            //edit mode ?
            $scope.$watch('business.businessStatus', function () {

                    if (accountService.getMyself()!=null && accountService.getMyself().businessId == $routeParams.businessId) {
                        if ($scope.business.businessStatus != 'WAITING_CONFIRMATION') {
                            $scope.edit = true;
                        }
                        $scope.myBusiness = true;
                    }
                }
            );

            //distance
            $scope.currentPosition = geolocationService.position;
            if ($scope.currentPosition != null) {
                console.log("distance immediate !")
                addressService.distance($scope.business.address.id, function (data) {
                    $scope.business.distance = data.distance;
                });
            }
            else {
                $scope.$watch('currentPosition', function () {
                    if ($scope.currentPosition != null) {
                        addressService.distance($scope.business.address.id, function (data) {
                            $scope.business.distance = data.distance;
                        });
                    }
                })
            }

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
            //test
            $scope.centerMap = function () {
                $scope.map = {
                    center: {
                        latitude: $scope.business.address.posx,
                        longitude: $scope.business.address.posy
                    }
                };
            };
            $scope.centerMap();

            $scope.toGoogleMap = function () {

                var address = $scope.business.address;
                var url = "https://www.google.be/maps/place/";
                url += address.posx + ",+" + address.posy;
                url += "/@" + address.posx + ",+" + address.posy + "," + 16 + "z";
                $window.open(url, '_blank');
            };

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

                console.log("catList");
                console.log(catList);

                modalService.basicModal("--.business.edit.category.modal.title", "business-category-form-ctrl",
                    {
                        value: catList
                    },
                    function (close) {
                        //scope.business
                        businessService.editBusinessCategory(catList, function (data) {
                            $scope.business.categories = data.categories;
                            close();
                        });
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

            //publication
            $scope.publicationListParam = {
                businessId : $scope.business.id
            };


        }, function () {
            $scope.loading = false;
            $scope.displayError = true;

        });

})
;