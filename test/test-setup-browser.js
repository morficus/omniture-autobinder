/**
 * This file is only run in the browser and mocha_phantomjs
 *
 * It sets up mocha and manually requires files for tests. For tests run
 * outside of karma, files must be manually required below
 *
 */


define(function(require) {

    require('mocha');
    global.mocha.setup('bdd');
    global.mocha.reporter('html');

    require("test/test-setup-all");

    require([ // require test files
        './omniture-autobinder.spec',
        './omniture-facade.spec'
    ], function() { // run mocha
        //turn off the console output from the mock s_code.js file
        window.s._printOutput = function(){};
        if (global.mochaPhantomJS) {
            global.mochaPhantomJS.run();
        }else {
            global.mocha.run();
        }
    });

});