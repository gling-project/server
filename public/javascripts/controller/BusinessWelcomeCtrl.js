myApp.controller('BusinessWelcomeCtrl', function ($scope,accountService) {

    $scope.business = accountService.getMyself().business;
});