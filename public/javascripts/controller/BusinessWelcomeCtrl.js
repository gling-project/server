myApp.controller('BusinessWelcomeCtrl', function ($scope, modelService) {

    $scope.business = modelService.get(modelService.MY_SELF).business;
});