myApp.controller('AdminBusinessCtrl', function ($scope, superAdminService, ngTableParams, $filter, $window, modalService, $flash) {

    $scope.displayMap = false;

    $scope.setDisplayMap = function () {
        $scope.displayMap = !$scope.displayMap;
    };


    $scope.refresh = function() {
        $scope.businesses=[];
        superAdminService.getAllBusinesses(function (data) {
            $scope.businesses = data.list;

            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            }, {
                total: $scope.businesses.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.businesses, params.orderBy()) : $scope.businesses;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });
    }
    $scope.refresh();

    $scope.toBusiness = function (businessId) {
        $window.open("/#business/" + businessId, '_blank');
    };

    $scope.confirmPublication = function (business) {
        modalService.messageModal('--.admin.business.confirmPublication.modal.title', '--.admin.business.confirmPublication.modal.message', function (close) {
            close();
            superAdminService.confirmPublication(business.id, function () {
                business.businessStatus = 'PUBLISHED';
            });
        });

    };


    $scope.map = {
        center: {
            latitude: 50.8471417,
            longitude: 4.3528959
        }
    };

    $scope.importBusinessInput = "uopclibrairie";
    $scope.importBusinessLoading = false;
    $scope.importBusinessStart = function () {
        $scope.importBusinessLoading = true;
        superAdminService.importBusiness($scope.importBusinessInput, function () {
            //success
            $scope.importBusinessLoading = false;
            $flash.success('le commerce a bien été importé');
            $scope.refresh();
        }, function () {
            $scope.importBusinessLoading = false;
        });
    }

});