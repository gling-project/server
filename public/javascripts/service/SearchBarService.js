myApp.service("searchBarService", function ($timeout, $rootScope) {

    this.currentSearch = "";
    this.searchCriteria = data.searchCriterias;

    var self = this;

    var suspendBinding = false;
    this.displaySearchResult = true;

    this.setCurrentSearch = function (search) {
        self.displaySearchResult = false;
        this.currentSearch = search;
        $timeout(function () {
            self.displaySearchResult = true;
        }, 1);
    };

    $rootScope.$watch(function () {
        return self.searchCriteria;
    }, function watchCallback(newValue, oldValue) {
        if (!suspendBinding && newValue != oldValue) {
            suspendBinding = true;
            self.currentSearch = '';
            var first = true;
            for (var key in self.searchCriteria) {
                if (self.searchCriteria[key].selected === true) {
                    if (first) {
                        first = false;
                    }
                    else {
                        self.currentSearch += "|";
                    }
                    self.currentSearch += self.searchCriteria[key].key;
                }
            }
            if (!first) {
                self.currentSearch += ":";
                $(".search-bar").focus();
            }
            $timeout(function () {
                suspendBinding = false;
            }, 1);
        }
    }, true);


    $rootScope.$watch(function () {
        return self.currentSearch;
    }, function watchCallback(newValue, oldValue) {

        if (!suspendBinding) {
            suspendBinding = true;

            for (var j in self.searchCriteria) {
                self.searchCriteria[j].selected = false;
            }

            if (self.currentSearch.indexOf(":") != -1) {
                var criterias = self.currentSearch.split(":")[0].split("|");
                for (var j in self.searchCriteria) {
                    var founded=false;
                    for (var i in criterias) {
                        if (criterias[i] == self.searchCriteria[j].key) {
                            self.searchCriteria[j].selected = true;
                            founded=true;
                        }
                    }
                }
            }
            $timeout(function () {
                suspendBinding = false;
            }, 1);
        }
    });

});