myApp.controller('FollowedBusinessPageCtrl', function ($rootScope, $scope, businessService,ngTableParams,$filter,followService) {

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    $scope.businessListParams = {
        loading: true
    };

    //loading
    businessService.getFollowedBusinesses(
        function (data) {

            $scope.businesses = data;

            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                counts: [], // hides page sizes
                total: $scope.businesses.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.businesses, params.orderBy()) : $scope.businesses;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });

            $scope.setNotification = function(business){
                followService.setNotification(business.id,business.followingNotification);
            };

            $scope.stopFollow = function(business){
                followService.addFollow(false,business.id,function(){
                   for(var key  in $scope.businesses){
                       if($scope.businesses[key] == business){
                           $scope.businesses.splice(key,1);
                       }
                   }
                    $scope.tableParams.reload();
                });
            };


        }, function () {
            $scope.loading = false;
            $scope.displayError = true;

        });

})
;