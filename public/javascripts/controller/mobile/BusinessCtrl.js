myApp.controller('BusinessCtrl', function ($scope, $routeParams, businessService,geolocationService,addressService) {

    $scope.loading = true;

    //address
    $scope.googleMapParams = {}

    businessService.getBusiness($routeParams.businessId,
        function (data) {
            $scope.loading = false;
            $scope.business = data;

            console.log(data);


            $scope.interfaceToDisplay = 'home';

            //address
            $scope.googleMapParams.address = $scope.business.address

            $scope.actions = [{
                icon: '/assets/images/action/home.png',
                action: function () {
                    $scope.interfaceToDisplay = 'home'
                },
                display: function () {
                    return true;
                }
            }, {
                icon: '/assets/images/action/info.png',
                action: function () {
                    $scope.interfaceToDisplay = 'info'
                },
                display: function () {
                    return true;
                }
            }, {
                icon: '/assets/images/action/gallery.png',
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

        });
    $scope.publicationListParam = {
        businessId: $routeParams.businessId
        //scrollTo: $scope.publicationIdToGo,
        //displayRemoveIcon: $scope.edit
    };

});