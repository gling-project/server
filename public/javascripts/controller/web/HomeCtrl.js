myApp.controller('HomeCtrl', function ($scope, modalService, customerInterestService, searchService,$rootScope,geolocationService,accountService) {


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


    $rootScope.$watch(function () {
        return geolocationService.position;
    }, function watchCallback(newValue, oldValue) {
        $scope.publicationListCtrl.loading=true;

        if (geolocationService.position != null) {
            if($scope.followedMode) {
                searchService.byFollowed(function (data) {
                    $scope.publicationListCtrl.loading = false;
                    $scope.publicationListCtrl.data = data;
                });
            }
            else{
                searchService.default(function (data) {
                    $scope.publicationListCtrl.loading = false;
                    $scope.publicationListCtrl.data = data;
                });
            }
        }
    });

    $scope.$watch('followedMode',function(){
        $scope.publicationListCtrl.loading=true;
        if($scope.followedMode){
            searchService.byFollowed(function (data) {
                $scope.publicationListCtrl.loading = false;
                $scope.publicationListCtrl.data = data;
            });
        }
        else{
            for( var i in $scope.customerInterests){
                $scope.customerInterests[i].selected=false;
            }
            searchService.default(function (data) {
                $scope.publicationListCtrl.loading = false;
                $scope.publicationListCtrl.data = data;
            });
        }
    });

    $scope.searchByInterest = function(interest){
        $scope.publicationListCtrl.loading = true;
        if(interest.selected == true){
            interest.selected=false;
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
    }

});