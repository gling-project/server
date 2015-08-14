myApp.service("languageService", function ($flash, $window, $http,$rootScope) {

    this.languages;
    this.languagesStructured = [];
    this.currentLanguage;
    var self= this;

    this.setLanguages = function (currentLanguage, languages) {
        this.currentLanguage = currentLanguage;
        this.languages = languages;

        for (var key in languages) {
            lang = languages[key];
            this.languagesStructured.push({
                key: lang.code,
                value: lang.language
            });
        }
    };

    $rootScope.$watch(function() {
        return self.currentLanguage;
    }, function watchCallback(newValue, oldValue) {
        if(newValue != oldValue) {
            self.changeLanguage(self.currentLanguage,true);
        }
    });

    this.changeLanguage = function (lang,forced) {
        if (lang != this.currentLanguage ||forced) {

            $http({
                'method': "PUT",
                'url': "/rest/language/" + lang,
                'headers': "Content-Type:application/json;charset=utf-8"
            }).success(function (data, status) {
                $window.location.reload();
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                });
        }
    }
});
