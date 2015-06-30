myApp.controller('BusinessCtrl', function ($scope, modalService, businessService, $routeParams, accountService, $window, addressService, geolocationService) {


    $scope.displayError = false;
    $scope.loading = true;
    $scope.business = null;
    $scope.edit = false;
    $scope.editDisplay = false;


    //$scope.business.landscape.link = '/file/13';

    //loading
    businessService.getBusiness($routeParams.businessId,
        function (data) {
            $scope.loading = false;
            $scope.business = data;
            //edit mode ?
            if (accountService.getMyself().businessId == $routeParams.businessId) {
                $scope.edit = true;
                $scope.editDisplay = true;
            }
            //illustration
            if ($scope.business.illustration != null) {
                $scope.business.illustration.link = '/file/' + $scope.business.illustration.id;
            }
            //landscape
            if ($scope.business.landscape != null) {

                $scope.business.landscape.link = "url('/file/" + $scope.business.landscape.id + "')";
            }

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


            //edit name
            $scope.editName = function () {

            };

            //edit description
            $scope.editName = function () {

            };

            //edit illustration
            $scope.editIllustration = function () {
                modalService.basicModal("image-form-ctrl",
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
                modalService.basicModal("image-form-ctrl",
                    {dto: $scope.business, sizex: 800, sizey: 300, fieldName: 'landscape'},
                    function (close) {
                        businessService.editLandscape($scope.business.landscape, function () {
                            $scope.business.landscape.link = '/file/' + $scope.business.landscape.id;
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
                url += "/@" + address.posx + ",+" + address.posy + "," + 16 + "z?hl=" + accountService.getMyself().lang.code;
                $window.open(url, '_blank');
            };

            //edit address
            $scope.editAddress = function () {
                var address = angular.copy($scope.business.address);
                modalService.basicModal("address-form-ctrl",
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

                modalService.basicModal("business-category-form-ctrl",
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

            }


        }, function () {
            $scope.loading = false;
            $scope.displayError = true;

        });

})
;