describe('Protractor Demo App', function() {
    it('should have a title', function() {
        browser.get('http://localhost:9000/');

        //control page name
        expect(browser.getTitle()).toEqual('Gling');

        // ********************
        // Registration
        // ********************

        //open modal
        element(by.id('welcome-btn-registration')).click();

        //complete form
        element(by.name('firstname')).sendKeys('John');
        element(by.name('lastname')).sendKeys('Snow');
        element(by.cssContainingText('option', 'Homme')).click();
        element(by.name('email')).sendKeys('john@snow.com');
        element(by.name('password')).sendKeys('password');
        element(by.name('repeatPassword')).sendKeys('password');

        //skip address and interest
        element(by.id('customer-registration-modal-btn-next')).click();
        element(by.id('customer-registration-modal-btn-skip')).click();
        element(by.id('customer-registration-modal-btn-skip')).click();

        //control connection
        expect(element(by.id('dropdownMenu1')).getText()).toEqual("John Snow");

        //logout
        element(by.id('dropdownMenu1')).click();
        element(by.id('welcome-btn-logout')).click();

        // ********************
        // Login
        // ********************
        element(by.id('welcome-btn-login')).click();
        element(by.name('email')).sendKeys('john@snow.com');
        element(by.name('password')).sendKeys('password');

        //login
        element(by.id('login-modal-btn-save')).click();

        //control connection
        expect(element(by.id('dropdownMenu1')).getText()).toEqual("John Snow");

    });
});