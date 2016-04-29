myApp.controller('SearchPageCtrl', function($rootScope, $scope, searchService, $routeParams, searchBarService, geolocationService) {
  var param;
  param = $routeParams.param;
  searchBarService.setCurrentSearch(param);
  $scope.businessTab = {
    currentPage: 0
  };
  $scope.categoryTab = {
    currentPage: 0
  };
  $scope.publicationTab = {
    currentPage: 0
  };
  $scope.results = null;
  $scope.init = function() {
    return searchService.searchByString(0, param, function(result) {
      var alreadyOneTabActive, cat, cat2, cat3, i, selectedCounter;
      $scope.businessTab.display = false;
      $scope.categoryTab.display = false;
      $scope.publicationTab.display = false;
      selectedCounter = 0;
      for (i in searchBarService.searchCriteria) {
        if (searchBarService.searchCriteria[i].selected) {
          if (searchBarService.searchCriteria[i].key === 'business') {
            $scope.businessTab.display = true;
          } else if (searchBarService.searchCriteria[i].key === 'category') {
            $scope.categoryTab.display = true;
          } else if (searchBarService.searchCriteria[i].key === 'publication') {
            $scope.publicationTab.display = true;
          }
          selectedCounter++;
        }
      }
      if (selectedCounter === 0) {
        $scope.businessTab.display = true;
        $scope.categoryTab.display = true;
        $scope.publicationTab.display = true;
      }
      $scope.results = result;
      alreadyOneTabActive = false;
      if ($scope.businessTab.display) {
        $scope.businessTab.total = $scope.results.businesses.length;
        if (!alreadyOneTabActive && $scope.businessTab.total > 0) {
          $scope.businessTab.active = true;
          alreadyOneTabActive = true;
        }
        $scope.businessTab.totalToDisplay = $scope.businessTab.total;
        if ($scope.results.businesses.length === 20) {
          $scope.businessTab.totalToDisplay += '+';
        }
      }
      if ($scope.publicationTab.display) {
        $scope.publicationTab.total = $scope.results.publications.length;
        if (!alreadyOneTabActive && $scope.publicationTab.total > 0) {
          $scope.publicationTab.active = true;
          alreadyOneTabActive = true;
        }
        $scope.publicationTab.totalToDisplay = $scope.publicationTab.total;
        if ($scope.results.publications.length === 20) {
          $scope.publicationTab.totalToDisplay += '+';
        }
      }
      if ($scope.categoryTab.display) {
        $scope.categoryTab.total = 0;
        for (cat in $scope.results.categoriesMap) {
          for (cat2 in $scope.results.categoriesMap[cat]) {
            for (cat3 in $scope.results.categoriesMap[cat][cat2]) {
              $scope.categoryTab.total += $scope.results.categoriesMap[cat][cat2][cat3].length;
              if ($scope.results.categoriesMap[cat][cat2][cat3].length === 20) {
                $scope.categoryTab.loadCategory = true;
              }
            }
          }
        }
        if (!alreadyOneTabActive && $scope.categoryTab.total > 0) {
          $scope.categoryTab.active = true;
          alreadyOneTabActive = true;
        }
        $scope.categoryTab.totalToDisplay = $scope.categoryTab.total;
        if ($scope.categoryTab.total >= 20) {
          $scope.categoryTab.totalToDisplay += '+';
        }
      }
      $scope.businessTab.data = $scope.results.businesses;
      $scope.publicationTab.data = $scope.results.publications;
      $scope.categoryTab.data = $scope.results.categoriesMap;
      $scope.loadSemaphore = false;
      $(window).on('scroll', function() {
        var scrollBottom;
        scrollBottom = $(window).scrollTop() + $(window).height();
        if ($('.container-content').height() - scrollBottom < 200) {
          $scope.search();
        }
        return;
      });
      return $scope.search = function() {
        var s, tabToLoad;
        if ($scope.loadSemaphore === false) {
          $scope.loadSemaphore = true;
          tabToLoad = void 0;
          if ($scope.businessTab.active) {
            tabToLoad = $scope.businessTab;
          } else if ($scope.publicationTab.active) {
            tabToLoad = $scope.publicationTab;
          } else if ($scope.categoryTab.active) {
            tabToLoad = $scope.categoryTab;
          }
          if (tabToLoad.total === 20 && tabToLoad.allLoaded !== true) {
            s = searchBarService.currentSearch;
            if (s.indexOf(':') !== -1) {
              s = s.split(':')[1];
            }
            tabToLoad.currentPage++;
            if ($scope.businessTab.active) {
              s = 'business:' + s;
              return searchService.searchByString(tabToLoad.currentPage, s, function(data) {
                var key;
                $scope.loadSemaphore = false;
                if (data.businesses.length === 0) {
                  tabToLoad.allLoaded = true;
                } else {
                  for (key in data.businesses) {
                    tabToLoad.data.push(data.businesses[key]);
                  }
                }
                return;
              });
            } else if ($scope.publicationTab.active) {
              s = 'publication:' + s;
              return searchService.searchByString(tabToLoad.currentPage, s, function(data) {
                var key;
                $scope.loadSemaphore = false;
                if (data.publications.length === 0) {
                  tabToLoad.allLoaded = true;
                } else {
                  for (key in data.publications) {
                    tabToLoad.data.push(data.publications[key]);
                  }
                }
                return;
              });
            } else if ($scope.categoryTab.active && $scope.categoryTab.loadCategory === true) {
              s = 'category:' + s;
              return searchService.searchByString(tabToLoad.currentPage, s, function(data) {
                var total;
                $scope.loadSemaphore = false;
                total = $scope.fusionCategories(data.categoriesMap);
                if (total === 0) {
                  return tabToLoad.allLoaded = true;
                }
              });
            }
          }
        }
      };
    });
  };
  $scope.fusionCategories = function(newMap) {
    var b, cat, catFounded, newCat, newSCat, newSSCat, sCat, sCatFounded, ssCat, ssCatFounded, totalToAdd;
    totalToAdd = 0;
    for (newCat in newMap) {
      catFounded = false;
      for (cat in $scope.results.categoriesMap) {
        if (cat === newCat) {
          catFounded = true;
          break;
        }
      }
      if (!catFounded) {
        $scope.results.categoriesMap.newCat = newMap[newCat];
      } else {
        for (newSCat in newMap[newCat]) {
          sCatFounded = false;
          for (sCat in $scope.results.categoriesMap[newCat]) {
            if (sCat === newSCat) {
              sCatFounded = true;
              break;
            }
          }
          if (!sCatFounded) {
            $scope.results.categoriesMap[newCat].newSCat = newMap[newCat][newSCat];
          } else {
            for (newSSCat in newMap[newCat][newSCat]) {
              ssCatFounded = false;
              for (ssCat in $scope.results.categoriesMap[newCat][newSCat]) {
                if (ssCat === newSSCat) {
                  ssCatFounded = true;
                  break;
                }
              }
              if (!ssCatFounded) {
                $scope.results.categoriesMap[newCat][newSCat].newSSCat = newMap[newCat][newSCat][newSSCat];
              } else {
                for (b in newMap[newCat][newSCat][newSSCat]) {
                  $scope.results.categoriesMap[newCat][newSCat][newSSCat].push(newMap[newCat][newSCat][newSSCat][b]);
                  totalToAdd++;
                }
              }
            }
          }
        }
      }
    }
    return totalToAdd;
  };
  $(window).scrollTop(0);
  $rootScope.$broadcast('PROGRESS_BAR_STOP');
  $scope.init();
  return $scope.$on('POSITION_CHANGED', function() {
    return $scope.init();
  });
});