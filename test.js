exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['public/javascripts/tests/testIntegration.js'],
    getPageTimeout:60000,
    allScriptsTimeout:60000
};