myApp.controller('HomeCtrl', function ($scope, modalService, customerInterestService, searchService,$rootScope,geolocationService) {


//login open modal
    $scope.customerRegistration = function () {
        modalService.openCustomerRegistrationModal();
    };

    $scope.businessInfoParam = {};


    customerInterestService.getAll(function (value) {
        $scope.customerInterests = value;
    });

    $scope.publicationListCtrl = {};


    $rootScope.$watch(function () {
        return geolocationService.position;
    }, function watchCallback(newValue, oldValue) {

        if (geolocationService.position != null) {

            searchService.default(function (data) {
                $scope.publicationListCtrl.data = data;
            });
        }
    });

    $scope.searchByInterest = function(interest){
        searchService.byInterest(interest.id,function(result){
            $scope.publicationListCtrl.data = result;
        });
        for( var i in $scope.customerInterests){
            $scope.customerInterests[i].selected=false;
        }
        interest.selected=true;
    }

});