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
                .when('/admin/business', {
                    templateUrl: '/assets/js/view/admin/adminBusiness.html',
                    controller: 'AdminBusinessCtrl',
                    resolve: {
                        a: function (accountService, $location) {
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/admin/categories_and_interests', {
                    templateUrl: '/assets/js/view/admin/CategoriesAndInterests.html',
                    controller: 'CategoriesAndInterestsCtrl',
                    resolve: {
                        a: function (accountService, $location) {
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/admin/stat', {
                    templateUrl: '/assets/js/view/admin/adminStat.html',
                    controller: 'AdminStatCtrl',
                    resolve: {
                        //a: function (accountService, $location) {
                        //    if (test(accountService) == 'NOT_CONNECTED') {
                        //        $location.path('/');
                        //    }
                        //}
                    }
                })
                .when('/admin/contact', {
                    templateUrl: '/assets/js/view/admin/adminContact.html',
                    controller: 'AdminContactCtrl',
                    resolve: {
                        a: function (accountService, $location) {
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/admin/map', {
                    templateUrl: '/assets/js/view/admin/adminMap.html',
                    controller: 'AdminMapCtrl',
                    resolve: {
                        a: function (accountService, $location) {
                            if (test(accountService) == 'NOT_CONNECTED') {
                                $location.path('/');
                            }
                        }
                    }
                })
                .when('/admin/', {
                    redirectTo: '/admin/stat'
                })
                .otherwise({
                    redirectTo: '/admin/'
                });
        });
};