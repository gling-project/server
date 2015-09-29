myApp.controller('BusinessCtrl', function ($rootScope,$scope, $routeParams, businessService, geolocationService, addressService, $timeout,$flash,followService,$filter) {


    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.loading = true;

    $scope.displayBack = function(){
        return window.history.length>0;
    };

    $scope.back = function () {
        window.history.back();
    };

    //address
    $scope.googleMapParams = {};


    $scope.followed = function () {
        var followed = $scope.business.following;
        followService.addFollow(!followed, $scope.business.id, function () {
            $scope.business.following = !followed;
            if ($scope.business.following) {
                $flash.success($filter('translateText')('--.followWidget.message.add'));
            }
            else {
                $flash.success($filter('translateText')('--.followWidget.message.remove'));
            }
        });
    };

    $scope.openGallery = function (image) {
        $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY',{list:$scope.business.galleryPictures,first:image});
    };

    businessService.getBusiness($routeParams.businessId,
        function (data) {
            $scope.loading = false;
            $scope.business = data;

            $scope.interfaceToDisplay = 'home';

            //address
            $scope.googleMapParams.address = $scope.business.address;
            $scope.googleMapParams.mobile=true;

            $scope.$watch('interfaceToDisplay', function () {
                if ($scope.interfaceToDisplay == 'info') {
                    $timeout(function () {
                        $scope.googleMapParams.refreshNow();
                    }, 1);
                }
            });

            $scope.actions = [{
                name:'home',
                icon: 'gling-icon-home',
                action: function () {
                    $scope.interfaceToDisplay = 'home'
                },
                display: function () {
                    return true;
                }
            }, {
                name:'info',
                icon: 'gling-icon-info',
                action: function () {
                    $scope.interfaceToDisplay = 'info'
                },
                display: function () {
                    return true;
                }
            }, {
                name:'gallery',
                icon: 'gling-icon-images',
                action: function () {
                    $scope.interfaceToDisplay = 'gallery'
                },
                display: function () {
                    return $scope.business.galleryPictures != null && $scope.business.galleryPictures.length > 0
                }
            }
            ];

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


            $scope.$on('POSITION_CHANGED', function () {
                $scope.$broadcast('RELOAD_PUBLICATION');
            });

            $scope.$on('RELOAD_PUBLICATION', function () {
                $scope.publicationListParam.refresh();
            });

            //initialization
            if (geolocationService.currentPosition != null) {
                $scope.$broadcast('RELOAD_PUBLICATION');
            }

        });
    $scope.publicationListParam = {
        businessId: $routeParams.businessId
        //scrollTo: $scope.publicationIdToGo,
        //displayRemoveIcon: $scope.edit
    };

});