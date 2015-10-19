myApp.controller('CategoriesAndInterestsCtrl', function ($scope, superAdminService) {

    superAdminService.getCategoriesAndInterests(function (data) {

        $scope.interests = data.interests;
        $scope.categories = data.categories;


        $scope.getPriority = function (category, interest) {
            for (var key in category.interests) {
                if (category.interests[key].interest.name == interest.name) {
                    return category.interests[key].priority;
                }
            }
            return null;
        };

        $scope.$watch('search', function () {
            var search = $scope.search;
            for (var key in $scope.categories) {
                if (search != null && search != "" && $scope.categories[key].name.indexOf(search) == -1) {
                    $scope.categories[key].hide = true;
                }
                else {
                    $scope.categories[key].hide = false;
                }
            }
        });

        $scope.getCategoryList = function () {
            var list = [];
            for (var key in $scope.categories) {
                if (!$scope.categories[key].hide === true) {
                    list.push($scope.categories[key]);
                }
            }
            return list;
        };

        $scope.save = function (event, category, interest) {
            var newValue = event.currentTarget.value;
            superAdminService.saveNewCategoryInterestRelation(category.name, interest.name, newValue);

        };


        $scope.disabled = true;

        $scope.setDisabled = function () {
            $scope.disabled = !$scope.disabled;
        }

    });

});