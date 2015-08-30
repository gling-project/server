//delete from session;
//delete from logincredential where account_id = (select id from account where email ='john@snow.com' or email = 'paul@fire.com');
//delete from address WHERE  account_id  = (select id from account where email ='john@snow.com' or email = 'paul@fire.com');
//delete from account where email ='john@snow.com' or email = 'paul@fire.com';

describe('Business test', function () {

    //var target = 'http://lynk-test.herokuapp.com/';
    var target = 'http://localhost:9000/';

    //variables
    //customer account
    var businessAccountFirstName = 'Roy',
        businessAccountLastName = 'Thebig',
        businessAccountGender = 'Homme',
        businessAccountEmail = 'roy@belgique.be',
        businessAccountPassword = 'password';

    //business
    var businessName = 'My rol society',
        businessDescription = 'Nous sommes le pouvoir de la Belgique!! éèàÊê ôö123=:;$$ù$',
        businessPhone = '+32.478.23.12.12',
        businessEmail = 'king@belgium.com',
        businessWeb = 'http://king.be',
        businessName2 = 'My royal society',
        businessDescription2 = 'Nous sommes le pouvoir de la Belgique!! éèàÊê ôö123=:;$$ù$ ;=:;=:;',
        businessPhone2 = '+32.478.23.65.12',
        businessEmail2 = 'king@belgique.com',
        businessWeb2 = 'http://kingandqueen.be',
        businessAddressStreet = 'Rue Brederode 16',
        businessAddressCity = 'Bruxelles',
        businessAddressZip = '1000',
        businessAddressStreet2 = 'Avenue du Parc Royal',
        businessAddressCity2 = 'Bruxelles',
        businessAddressZip2 = '1020',
        businessAddressCountry = 'BELGIUM',
        businessCategory = 'administrations_publiques',
        businessSubCategory = 'federal__international',
        businessSubSubCategory = 'ambassade',
        businessSubSubCategoryB = 'justice',
        businessSubSubCategory2 = 'mobilite',
        businessSubSubCategory2B = 'emploi',
        businessSubSubCategoryTranslate = 'Ambassade',
        businessSubSubCategoryBTranslate = 'Justice',
        businessSubSubCategory2Translate = 'Mobilité',
        businessSubSubCategory2BTranslate = 'Emploi';

    //function
    var writeField = function (fieldName, content) {
        element(by.name(fieldName)).clear().then(function () {
            element(by.name(fieldName)).sendKeys(content);
        });
    };

    it('Business test web', function () {

        browser.get(target);

        //control page name
        expect(browser.getTitle()).toEqual('Gling');

        // ********************
        // Registration
        // ********************

        //open modal
        element(by.id('welcome-btn-registration')).click();
        element(by.css(".modal-login-link")).click();

        //complete form
        writeField('firstname',businessAccountFirstName);
        writeField('lastname',businessAccountLastName);
        element(by.cssContainingText('option', businessAccountGender)).click();
        writeField('email',businessAccountEmail);
        writeField('password',businessAccountPassword);
        writeField('repeatPassword',businessAccountPassword);
        element(by.id('business-registration-btn-next')).click();

        //add busines data
        writeField('name',businessName);
        writeField('description',businessDescription);
        writeField('phone',businessPhone);
        writeField('website',businessWeb);
        writeField('business-email',businessEmail);
        writeField('street',businessAddressStreet);
        writeField('zip',businessAddressZip);
        writeField('city',businessAddressCity);
        element(by.id('business-registration-btn-next')).click();

        //select category
        element(by.name(businessCategory)).click();
        element(by.name(businessSubCategory)).click();
        element(by.name(businessSubSubCategory)).click();
        element(by.name(businessSubSubCategoryB)).click();
        element(by.id('business-registration-btn-save')).click();

        //control connection
        expect(element(by.id('dropdownMenu1')).getText()).toEqual(businessAccountFirstName + " " + businessAccountLastName);
        element(by.css('.messenger-close')).click();

        //logout
        element(by.id('dropdownMenu1')).click();
        element(by.id('welcome-btn-logout')).click();

        // ********************
        // Login
        // ********************
        element(by.id('welcome-btn-login')).click();
        writeField('email',businessAccountEmail);
        writeField('password',businessAccountPassword);

        //login
        element(by.id('login-modal-btn-save')).click();
        element(by.css('.messenger-close')).click();

        //control connection
        expect(element(by.id('dropdownMenu1')).getText()).toEqual(businessAccountFirstName + " " + businessAccountLastName);

        // ********************
        // Edit business
        // ********************

        //navigate to business
        element(by.id('dropdownMenu1')).click();
        element(by.id('welcome-btn-business')).click();

        //control
        expect(element(by.css('.business-page-name span')).getText()).toEqual(businessName);
        expect(element(by.css('.business-page-description span')).getText()).toEqual(businessDescription);
        expect(element(by.id('welcome-contact-data-phone')).getText()).toContain(businessPhone);
        expect(element(by.id('welcome-contact-data-website')).getText()).toContain(businessWeb);
        expect(element(by.id('welcome-contact-data-email')).getText()).toContain(businessEmail);
        //category
        expect(element(by.css('.category-line-tree table td:nth-child(2)')).getText()).toContain(businessSubSubCategoryTranslate);
        expect(element(by.css('.category-line-tree table td:nth-child(2)')).getText()).toContain(businessSubSubCategoryBTranslate);
        //address
        expect(element(by.css('.business-address div:nth-child(1)')).getText()).toEqual(businessAddressStreet + ", " + businessAddressZip + ", " + businessAddressCity);

        //edit business
        element(by.id("business-btn-name-edit")).click();
        writeField('name',businessName2);
        writeField('description',businessDescription2);
        writeField('phone',businessPhone2);
        writeField('website',businessWeb2);
        writeField('business-email',businessEmail2);
        element(by.id("basic-modal-btn-save")).click();

        //control
        expect(element(by.css('.business-page-name span')).getText()).toEqual(businessName2);
        expect(element(by.css('.business-page-description span')).getText()).toEqual(businessDescription2);
        expect(element(by.id('welcome-contact-data-phone')).getText()).toContain(businessPhone2);
        expect(element(by.id('welcome-contact-data-website')).getText()).toContain(businessWeb2);
        expect(element(by.id('welcome-contact-data-email')).getText()).toContain(businessEmail2);

        //edit address
        element(by.id("business-btn-address-edit")).click();
        writeField('street',businessAddressStreet2);
        writeField('zip',businessAddressZip2);
        writeField('city',businessAddressCity2);
        element(by.id("basic-modal-btn-save")).click();

        //controll
        expect(element(by.css('.business-address div:nth-child(1)')).getText()).toEqual(businessAddressStreet2 + ", " + businessAddressZip2 + ", " + businessAddressCity2);

        //edit category
        element(by.id("business-btn-category-edit")).click();
        element(by.name(businessSubSubCategory)).click();
        element(by.name(businessSubSubCategoryB)).click();
        element(by.name(businessSubSubCategory2)).click();
        element(by.name(businessSubSubCategory2B)).click();

        //control
        expect(element(by.css('.category-line-tree table td:nth-child(2)')).getText()).toContain(businessSubSubCategory2Translate);
        expect(element(by.css('.category-line-tree table td:nth-child(2)')).getText()).toContain(businessSubSubCategory2BTranslate);

        //edit social network

        //edit schedule

        //edit gallery

        //submit

        //switch to admin interface

        //login with admin

        //accept business request

        //logout, login with business, to go commerce page

        //edit data editable

        //control non-editable option

        //create a publication

        //edit (?)

        //create a promotion

        //edit (?)

        //cancel page publication

        //try to edit something

        //try to find publication and business, test result


    });
});