//delete from session;
//delete from logincredential where account_id = (select id from account where email ='john@snow.com');
//delete from address WHERE  account_id  = (select id from account where email ='john@snow.com');
//delete from account where email ='john@snow.com';


describe('Integration test', function () {
    it('Customer test web', function () {


        //variables
        //customer account
        var customerFirstName = 'John';
        var customerLastName = 'Snow';
        var customerGender = 'Homme';
        var customerEmail = 'john@snow.com';
        var customerPassword = 'password';
        //address
        var customerAddressName = 'Mon domicile',
            customerAddressStreet = '1 Grand place',
            customerAddressCity = 'Brussel',
            customerAddressZip = '1000',
            customerAddressCountry = 'BELGIUM',
            customerAddress2Street = '3 rue des Bouchers',
            customerAddress2City = 'Brussel',
            customerAddress2Zip = '1000';

        browser.get('http://localhost:9000/');

        //control page name
        expect(browser.getTitle()).toEqual('Gling');

        // ********************
        // Registration
        // ********************

        //open modal
        element(by.id('welcome-btn-registration')).click();

        //complete form
        element(by.name('firstname')).sendKeys(customerFirstName);
        element(by.name('lastname')).sendKeys(customerLastName);
        element(by.cssContainingText('option', customerGender)).click();
        element(by.name('email')).sendKeys(customerEmail);
        element(by.name('password')).sendKeys(customerPassword);
        element(by.name('repeatPassword')).sendKeys(customerPassword);

        //skip address and interest
        element(by.id('customer-registration-modal-btn-next')).click();
        element(by.id('customer-registration-modal-btn-skip')).click();
        element(by.id('customer-registration-modal-btn-skip')).click();

        //control connection
        expect(element(by.id('dropdownMenu1')).getText()).toEqual(customerFirstName + " " + customerLastName);

        //logout
        element(by.id('dropdownMenu1')).click();
        element(by.id('welcome-btn-logout')).click();

        // ********************
        // Login
        // ********************
        element(by.id('welcome-btn-login')).click();
        element(by.name('email')).sendKeys(customerEmail);
        element(by.name('password')).sendKeys(customerPassword);

        //login
        element(by.id('login-modal-btn-save')).click();

        //control connection
        expect(element(by.id('dropdownMenu1')).getText()).toEqual(customerFirstName + " " + customerLastName);

        // ********************
        // Edit profile
        // ********************

        //navigate to profile
        element(by.id('dropdownMenu1')).click();
        element(by.id('welcome-btn-profile')).click();

        //open add address modal
        element(by.id('profile-btn-address-add')).click();
        element(by.cssContainingText('option', customerAddressName)).click();
        element(by.name('street')).sendKeys(customerAddressStreet);
        element(by.name('zip')).sendKeys(customerAddressZip);
        element(by.name('city')).sendKeys(customerAddressCity);

        //save
        element(by.id('profile-btn-save')).click();

        //control
        element(by.css('.pull-right')).click();
        expect(element(by.css('.address-box > div:nth-child(1) > span:nth-child(2)')).getText()).toEqual(customerAddressStreet);
        expect(element(by.css('.address-box > div:nth-child(2) > span:nth-child(2)')).getText()).toEqual(customerAddressZip);
        expect(element(by.css('.address-box > div:nth-child(3) > span:nth-child(2)')).getText()).toEqual(customerAddressCity);
        expect(element(by.css('.address-box > div:nth-child(4) > span:nth-child(2)')).getText()).toEqual(customerAddressCountry);

        element(by.css('.address-container .glyphicon-edit')).click();
        element(by.name('street')).clear().then(function () {
            element(by.name('street')).sendKeys(customerAddress2Street);
        });
        element(by.name('zip')).clear().then(function () {
            element(by.name('zip')).sendKeys(customerAddress2Zip);
        });
        element(by.name('city')).clear().then(function () {
            element(by.name('city')).sendKeys(customerAddress2City);
        });

        //save
        element(by.id('profile-btn-save')).click();

        //control
        element(by.css('.pull-right')).click();
        expect(element(by.css('.address-box > div:nth-child(1) > span:nth-child(2)')).getText()).toEqual(customerAddress2Street);
        expect(element(by.css('.address-box > div:nth-child(2) > span:nth-child(2)')).getText()).toEqual(customerAddress2Zip);
        expect(element(by.css('.address-box > div:nth-child(3) > span:nth-child(2)')).getText()).toEqual(customerAddress2City);


    });
});