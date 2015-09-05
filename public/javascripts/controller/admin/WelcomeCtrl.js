myApp.controller('WelcomeCtrl', function ($scope, $flash, accountService, facebookService, translationService, modalService, $location, businessService, addressService) {

    if (accountService.getMyself() == null || accountService.getMyself().role != 'SUPERADMIN') {
        modalService.openLoginModal();
    }



});