myApp.controller('FollowedBusinessPageCtrl', function ($rootScope, $scope, businessService, ngTableParams, $filter, followService,modalService) {

    //back to the top of the page
    $(window).scrollTop(0);

    $rootScope.$broadcast('PROGRESS_BAR_STOP');

    modalService.closeLoadingModal();

    $scope.businessListParams = {
        loading: true
    };

    //loading
    businessService.getFollowedBusinesses(
        function (data) {

            $scope.businesses = data;

            //$scope.$watch("filter.$", function (o, n) {
            //    if (n != o) {
            //        $scope.tableParams.reload();
            //    }
            //});
            //
            //$scope.tableParams = new ngTableParams({
            //    page: 1,            // show first page
            //    count: 10,          // count per page
            //    sorting: {
            //        name: 'asc'     // initial sorting
            //    }
            //}, {
            //    counts: [], // hides page sizes
            //    total: $scope.businesses.length, // length of data
            //    getData: function ($defer, params) {
            //
            //        var filteredData = $filter('filter')($scope.businesses, $scope.filter);
            //        var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
            //
            //        //var filteredData = $filter('filter')(data, $scope.filter);
            //        //// use build-in angular filter
            //        //var orderedData = params.sorting() ? $filter('orderBy')($scope.businesses, params.orderBy()) : $scope.businesses;
            //
            //        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            //    }
            //});
            //
            //$scope.checkAll = function (check) {
            //    for (var key  in $scope.businesses) {
            //        if ($scope.businesses[key].followingNotification != check) {
            //            $scope.businesses[key].followingNotification = check;
            //            $scope.setNotification($scope.businesses[key]);
            //        }
            //    }
            //};
            //
            $scope.setNotification = function (business) {
                business.followingNotification=!business.followingNotification;
                followService.setNotification(business.id, business.followingNotification);
            };

            $scope.stopFollow = function (business) {
                for (var key  in $scope.businesses) {
                    if ($scope.businesses[key] == business) {
                        $scope.businesses.splice(key, 1);
                    }
                }
                followService.addFollow(false, business.id);
            };


        }, function () {
            $scope.loading = false;
            $scope.displayError = true;

        });

})
;