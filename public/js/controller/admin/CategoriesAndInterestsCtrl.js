myApp.controller('CategoriesAndInterestsCtrl', function($scope, superAdminService, $flash) {
  return superAdminService.getCategoriesAndInterests(function(data) {
    $scope.importTranslation = function() {
      $scope.translationLoading = true;
      return superAdminService.importTranslation(function() {
        $scope.translationLoading = false;
        return $flash.success('les traductions ont bien été importées');
      }, function() {
        return $scope.translationLoading = false;
      });
    };
    $scope.interests = data.interests;
    $scope.categories = data.categories;
    $scope.disabled = true;
    $scope.getPriority = function(category, interestToFind) {
      var interest, _i, _len, _ref;
      _ref = category.interests;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        interest = _ref[_i];
        if (interest.interest.name === interestToFind.name) {
          return interest.priority;
        }
      }
      return null;
    };
    $scope.$watch('search', function() {
      var category, search, _i, _len, _ref;
      search = $scope.search;
      _ref = $scope.categories;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        category = _ref[_i];
        if ((search != null) && search !== '' && category.name.indexOf(search) === -1) {
          category.hide = true;
        } else {
          category.hide = false;
        }
      }
      return;
    });
    $scope.getCategoryList = function() {
      var category, list, _i, _len, _ref;
      list = [];
      _ref = $scope.categories;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        category = _ref[_i];
        if (!category.hide === true) {
          list.push(category);
        }
      }
      return list;
    };
    return $scope.save = function(event, category, interest) {
      var newValue;
      newValue = event.currentTarget.value;
      return superAdminService.saveNewCategoryInterestRelation(category.name, interest.name, newValue);
    };
  });
});