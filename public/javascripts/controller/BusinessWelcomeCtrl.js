myApp.controller('BusinessWelcomeCtrl', function ($scope, $modal,modelService) {

    $scope.business = modelService.get(modelService.MY_SELF).business;
});