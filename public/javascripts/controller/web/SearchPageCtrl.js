myApp.controller('SearchPageCtrl', function ($scope,searchService) {
    var param = $routeParams.param;

    searchService.searchByString(param,function(result){
       $scope.result = result;
    });
});