exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['testIntegration.js'],
    getPageTimeout:60000,
    allScriptsTimeout:600000,
    defaultTimeoutInterval: 360000,
    jasmineNodeOpts: {
        defaultTimeoutInterval: 360000
    }
};