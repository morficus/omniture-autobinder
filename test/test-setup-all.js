/**
 * This file is loaded by all test runners, including
 * karma. If you need to include a library for use in your tests:
 *
 *   1. Make sure the library is provided as an AMD module(if not, shim it, see
 *      how sinon is shimed in test/main.js for an example).
 *   2. Require the module using the `require('moduleName')` syntax below.
 *   3. Optionally export a property provided by the module to mocha's global
 *      object, e.g, `global.expect = require('chai').expect`.
 *
 * This file is itself a module and it will not be resolved to it's consumer until
 * all modules it consumes are themselves resolved.
 *
 */

define(function(require) {

    var chai = require('chai');
    global.expect = chai.expect;
    global.AssertionError = chai.AssertionError;

    require("sinon");
    require("sinon.spy");
    require("sinon.call");
    var sinonChai = require("sinon-chai");
    chai.use(sinonChai);


});