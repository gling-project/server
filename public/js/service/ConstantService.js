myApp.service("constantService", function () {

    this.compareNumber = function (a, b) {
        return parseFloat(a) === parseFloat(b);
    }

});