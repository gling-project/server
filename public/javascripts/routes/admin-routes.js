var test = function (accountService) {
    var myself = accountService.getMyself();
    if (myself == null) {
        return 'NOT_CONNECTED';
    }
    else {
        return myself.type;
    }
};


var initializeCommonRoutes = function () {
    myApp
        .config(function ($routeProvider) {
            $routeProvider
                .when('/business', {
                    templateUrl: '/assets/javascripts/view/admin/adminBusiness.html',
                    controller: 'AdminBusinessCtrl',
                    resolve: {
                        a: function (accountService, $location) {
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/', {
                    templateUrl: '/assets/javascripts/view/admin/welcome.html',
                    controller: 'WelcomeCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
};