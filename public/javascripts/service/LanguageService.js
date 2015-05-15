myApp.service("languageService", function ($flash, $window, $http) {

    this.languages;
    this.languagesStructured = [];
    this.currentLanguage;

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


    this.changeLanguage = function (lang) {
        if (lang != this.currentLanguage) {

            $http({
                'method': "GET",
                'url': "/changeLanguage/" + lang,
                'headers': "Content-Type:application/json"
            }).success(function (data, status) {
                $window.location.reload();
            })
                .error(function (data, status) {
                    $flash.error(data.message);
                });
        }
    }
});
