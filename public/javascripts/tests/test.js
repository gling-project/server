describe('BusinessRegistrationCtrl', function () {
    //it('sorts in descending order by default', function() {
    //    expect(true).toEqual(true);
    //});
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('BusinessRegistrationCtrl', function () {
        it('sets the strength to "strong" if the password length is >8 chars', function () {
            //WelcomeCtrl
            var $scope = {};
            var controller = $controller('BusinessRegistrationCtrl', {$scope: $scope});
        });
    });

});