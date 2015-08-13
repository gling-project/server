myApp.controller('HomeCtrl', function ($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService) {

    //variable
    $scope.followedMode = false;
    $scope.businessInfoParam = {};
    $scope.accountService = accountService.model;
    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;
    });
    $scope.publicationListCtrl = {};

    //open registration modal
    $scope.customerRegistration = function () {
        modalService.openCustomerRegistrationModal();
    };

    //initialisation
    $scope.search();

    //functions
    //search by interest
    $scope.searchByInterest = function (interest) {

        if (interest.selected == true) {
            interest.selected = false;
        }
        else {
            for (var i in $scope.customerInterests) {
                $scope.customerInterests[i].selected = false;
            }
            interest.selected = true;
        }
        $scope.search();
    };

    //watch on change position
    $scope.$on('POSITION_CHANGED', function () {
        $scope.search();
    });

    //watch in follow mode
    $scope.$watch('followedMode', function () {
        $scope.search();
    });

    $scope.$on('LOGOUT', function () {
        if ($scope.followedMode) {
            $scope.followedMode = false;
        }
    });

    //search function
    $scope.search = function () {
        if (geolocationService.position != null) {
            $scope.publicationListCtrl.loading = true;
            if ($scope.followedMode) {
                searchService.byFollowed(function (data) {
                    $scope.publicationListCtrl.loading = false;
                    $scope.publicationListCtrl.data = data;
                });
            }
            else {
                var interestSelected = null;
                for (var i in $scope.customerInterests) {
                    if ($scope.customerInterests[i].selected) {
                        interestSelected = $scope.customerInterests[i];
                    }
                }
                if (interestSelected != null) {
                    searchService.byInterest(interestSelected.id, function (data) {
                        $scope.publicationListCtrl.loading = false;
                        $scope.publicationListCtrl.data = data;
                    });

                }
                else {
                    searchService.default(function (data) {
                        $scope.publicationListCtrl.loading = false;
                        $scope.publicationListCtrl.data = data;
                    });
                }
            }
        }
    };


});