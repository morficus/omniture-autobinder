/**
 * This file is used by mocha in the browser and by karma(which also uses mocha)
 *
 * The JavaScript functions contained within this file all have to do with
 * detecting karma and adjusting the final requirejs configuration based
 * on whether karma is present or not.
 *
 * When karma is present some differences are added:
 *   - all modules ending .spec are required as a part of our test suite
 *   - the basePath is adjust to take advantage of karma's server which provides
 *     amazing watching and caching of files it's been told about in karma.conf.js
 *   - the callback option will kick off the mocha test runner inside the
 *     inside an iframe of our chosen browsers and spit out via websocket
 *     to our terminal window
 *   - require test/test-setup-all.js + all AMD modules ending in .spec
 *
 * When karma is not used, spec are still run in the browser but must
 * be manually included within test-setup-browser.js.
 *
 */


function isKarma() {
    return typeof window.__karma__ !== "undefined";
}

var pathPrefix;
if (isKarma()) {
    pathPrefix = '/base/';
} else {
    pathPrefix = '../';
}

function configDeps() {
    // include this module with all test runners,
    // e.g., browser, mocha_phantomjs, karma
    if (!isKarma()) {
        global = window;
    }
    var testSetupAll = [];

    // not running karma? return an array with test-setup-all plus
    // include test-setup-browser for browser/mocha_phantomjs test runners only
    if (!isKarma()) {
        return testSetupAll.concat(['test/test-setup-browser', 'test-setup-all.js']);
    }else{
        testSetupAll = ['/base/test/test-setup-all.js'];
    }

    // still here?, means we're using karma
    // grab all the test files karma is serving in karma.conf.js
    var tests = [];
    for (var file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            if (/\.spec\.js$/.test(file)) {
                tests.push(file);
            }
        }
    }

    // include test-setup-all
    // plus all files served by karma that contain .spec in their name
    return testSetupAll.concat(tests);
}

function configCallback() {
    // if using karma, start the runner from requirejs.config callback option
    if (isKarma()) { return window.__karma__.start; }
}

function configUrlArgs() {
    if (isKarma()) { return ''; } // karma handles all caching concerns
    return "bust=" +  (new Date()).getTime();
}

require.config({
    baseUrl: pathPrefix,
    deps: configDeps(),
    callback: configCallback(),
    paths: {
        'underscore': 'bower_components/underscore/underscore',
        'jquery': 'bower_components/jquery/dist/jquery',
        'mocha': 'bower_components/mocha/mocha',
        'sinon': 'bower_components/sinon/lib/sinon',
        'sinon.spy': 'bower_components/sinon/lib/sinon/spy',
        'sinon.call': 'bower_components/sinon/lib/sinon/call',
        'sinon-chai': 'bower_components/sinon-chai/lib/sinon-chai',
        'chai': 'bower_components/chai/chai',
        'omniture':  'test/mock_s-code',
        'omniture-facade': 'src/omniture-facade',
        'omniture-autobinder': 'src/omniture-autobinder'
    },
    urlArgs: configUrlArgs()
});
