myApp.controller('HomeCtrl', function ($scope, modalService, customerInterestService, searchService, $rootScope, geolocationService, accountService) {


//login open modal
    $scope.customerRegistration = function () {
        modalService.openCustomerRegistrationModal();
    };

    $scope.followedMode = false;

    $scope.businessInfoParam = {};


    $scope.accountService = accountService.model;


    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;
    });

    $scope.publicationListCtrl = {};


    $scope.publicationListCtrl.loading = true;
    if ($scope.followedMode) {
        searchService.byFollowed(function (data) {
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

    $scope.$watch('followedMode', function () {
        $scope.publicationListCtrl.loading = true;
        if ($scope.followedMode) {
            searchService.byFollowed(function (data) {
                $scope.publicationListCtrl.loading = false;
                $scope.publicationListCtrl.data = data;
            });
        }
        else {
            for (var i in $scope.customerInterests) {
                $scope.customerInterests[i].selected = false;
            }
            searchService.default(function (data) {
                $scope.publicationListCtrl.loading = false;
                $scope.publicationListCtrl.data = data;
            });
        }
    });

    $scope.searchByInterest = function (interest) {

        $scope.publicationListCtrl.loading = true;
        if (interest.selected == true) {
            interest.selected = false;
            searchService.default(function (result) {
                $scope.publicationListCtrl.loading = false;
                $scope.publicationListCtrl.data = result;
            });
        }
        else {
            searchService.byInterest(interest.id, function (result) {
                $scope.publicationListCtrl.loading = false;
                $scope.publicationListCtrl.data = result;
            });
            for (var i in $scope.customerInterests) {
                $scope.customerInterests[i].selected = false;
            }
            interest.selected = true;
        }
    };

    $scope.$on('POSITION_CHANGED', function () {

        var interest = null;
        for (var i in $scope.customerInterests) {
            if ($scope.customerInterests[i].selected) {
                interest = $scope.customerInterests[i];
            }
        }
        console.log("interest");
        console.log(interest);

        $scope.publicationListCtrl.loading = true;
        if (interest != null) {
            searchService.byInterest(interest.id, function (result) {
                $scope.publicationListCtrl.loading = false;
                $scope.publicationListCtrl.data = result;
            });
        }
        else {
            searchService.default(function (result) {
                $scope.publicationListCtrl.loading = false;
                $scope.publicationListCtrl.data = result;
            });
        }
    });


});