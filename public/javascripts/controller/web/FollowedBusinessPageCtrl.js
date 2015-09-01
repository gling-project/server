myApp.controller('FollowedBusinessPageCtrl', function ($rootScope, $scope, businessService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.businessListParams = {
        loading: true
    };

    //loading
    businessService.getFollowedBusinesses(
        function (data) {

            $scope.businesses = data;

            $scope.businessListParams.data = $scope.businesses;
            $scope.businessListParams.loading=false;


        }, function () {
            $scope.loading = false;
            $scope.displayError = true;

        });

})
;