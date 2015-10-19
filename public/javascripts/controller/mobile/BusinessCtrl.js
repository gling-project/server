myApp.controller('BusinessCtrl', function ($rootScope, $scope, $routeParams, businessService, geolocationService, addressService, $timeout, $flash, followService, $filter, modalService, accountService) {


    $scope.loading = true;
    $scope.myBusiness = false;

    $scope.displayBack = function () {
        return window.history.length > 0;
    };

    $scope.back = function () {
        window.history.back();
    };

    $scope.descriptionLimitBase = 200;
    $scope.descriptionLimit = $scope.descriptionLimitBase;

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
        $rootScope.$broadcast('DISPLAY_PICTURE_IN_GALLERY', {list: $scope.business.galleryPictures, first: image});
    };

    $scope.displaySchedule = function () {
        if ($scope.business != null && $scope.business.schedules != null) {
            for (var i in $scope.business.schedules) {
                if ($scope.business.schedules[i].length > 0) {
                    return true;
                }
            }
        }
        return false;
    };

    businessService.getBusiness($routeParams.businessId,
        function (data) {

            if (accountService.getMyself() != null && accountService.getMyself().businessId == $routeParams.businessId) {
                $scope.myBusiness = true;
                accountService.setMyBusiness(data);
            }

            //stop loading icons
            $rootScope.$broadcast('PROGRESS_BAR_STOP');
            modalService.closeLoadingModal();


            $scope.loading = false;
            $scope.business = data;

            $scope.interfaceToDisplay = 'home';

            $scope.categoryLineParams = {
                categories: $scope.business.categories
            };

            //address
            $scope.googleMapParams.address = $scope.business.address;
            $scope.googleMapParams.mobile = true;

            $scope.$watch('interfaceToDisplay', function () {
                if ($scope.interfaceToDisplay == 'info') {
                    $timeout(function () {
                        $scope.googleMapParams.refreshNow();
                    }, 1);
                }
            });

            $scope.displaySocialNetwork = function () {
                var s = $scope.business.socialNetwork;
                if (s == null) {
                    return false;
                }
                return s.facebookLink != null ||
                    s.twitterLink != null ||
                    s.instagramLink != null ||
                    s.deliveryLink != null ||
                    s.opinionLink != null ||
                    s.reservationLink != null;
            };

            $scope.actions = [{
                name: 'home',
                translatableName: '--.business.action.home',
                icon: 'gling-icon-home',
                action: function () {
                    $scope.interfaceToDisplay = 'home'
                },
                display: function () {
                    return true;
                }
            }, {
                name: 'info',
                translatableName: '--.business.action.info',
                icon: 'gling-icon-info',
                action: function () {
                    $scope.interfaceToDisplay = 'info'
                },
                display: function () {
                    return true;
                }
            }, {
                name: 'gallery',
                icon: 'gling-icon-images',
                translatableName: '--.business.action.gallery',
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
            //initialize
            $scope.computeDistance();

            $scope.$on('POSITION_CHANGED', function () {
                $scope.computeDistance();
            });


            $scope.$on('POSITION_CHANGED', function () {
                $scope.$broadcast('RELOAD_PUBLICATION');
            });


            $scope.refreshPublications = function () {
                $scope.$broadcast('RELOAD_PUBLICATION');
                $scope.interfaceToDisplay ='home';
            };

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


    $scope.createPromotion = function(){
        $scope.navigateTo('/promotion');
    }

});