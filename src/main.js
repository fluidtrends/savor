'use strict'

/**
 *  We're using Chai.JS as our BDD assertion library, and specifically,
 *  we want to write our specs using the expect assert style.
 **/
var chai = require('chai');

/**
 *  Enable smart promise assertions
 **/
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

/**
 *  For all our mocking needs as well as stubbing needs, we will
 *  want to make use of Sinon.JS as our framework of choice for these needs.
 **/
var sinon = require('sinon');

/**
 *  General-purpose library dependencies for tasks such as file I/O
 **/
var path = require('path');
var fs = require('fs-extra');
var tmp = require('tmp');

/**
 *  All the tests we want to run.
 **/
var tests = [];

/**
 *  Directories of interest
 **/
var cwdDir = process.cwd();
var testDir = path.join(cwdDir, 'test');
var srcDir = path.join(cwdDir, 'src');

/**
 *   Add a test to be run.
 **/
function addTest(name, exec) {
    tests.push({
        name: name,
        exec: exec
    });
}

/**
 *  Setup before each test
 **/
function beforeEach(test, context, done) {
    context.dir = tmp.dirSync().name;
    process.chdir(context.dir);
    done && done();
}

/**
 *  Test a promise for failure
 **/
function promiseShouldFail(promise, done, handler) {
    promise.then(result => done(new Error('Promise expected to fail'))).
    catch(error => {
        handler(error)
        done()
    }).
    catch(error => done(error))
}

/**
 *  Test a promise for success
 **/
function promiseShouldSucceed(promise, done, handler) {
    promise.then(result => {
        handler(result)
        done()
    }).
    catch(error => done(error))
}

/**
 *  Clean up after each test
 **/
function afterEach(test, context) {
    fs.removeSync(context.dir);
}

/**
 *  Execute a single test
 **/
function runTest(test, done) {
    beforeEach(test, savor.context, function() {
        // Run the actual test and give the test all the tools it needs for optimal execution
        test.exec(savor.context, function(error) {
            // Clean up the context
            afterEach(test, savor.context);

            // Finish up the test
            done && done(error)
        });
    });
}

/**
 *  We look at all our tests and describe them here and set them
 *  up so as to pass the execution over to the test framework.
 **/
function runAllTests(name, allDone) {

    // We're going to create a single, flat list of scenarios
    describe(name, function() {

        after(function() {
            // Tell the caller when all tests have finished running
            allDone && allDone();
        });

        tests.forEach(function(test) {
            // Have a look at all tests and define each test,
            // and pass it all the required dependencies to enable it
            // to perform work without worrying about dependencies
            it(test.name, function(done) {
                // Increase the timeout so that we can handle slower CI cycles if necessary
                this.timeout(60000);

                // Execute the actual test
                runTest(test, done);
            });
        });

        // Clean up the test fixture
        tests = [];
    });
}

/**
 *  Look for a test asset, and if it exists, copy it to the
 *  test context at the given location.
 **/
function copyAssetToContext(src, dest, context) {
    var sourceAsset = path.join(testDir, src);
    var targetAsset = path.join(context.dir, dest);

    if (!fs.existsSync(sourceAsset)) {
        // The source asset requested is missing
        throw new Error("The test asset is missing");
    }

    // Attempt to copy the asset
    fs.copySync(sourceAsset, targetAsset);

    if (!fs.existsSync(targetAsset)) {
        // The target asset was not copied successfully
        throw new Error("The test asset could not be copied");
    }
}

var savor = {
    context: {
        expect: chai.expect,
        assert: chai.assert,
        stub: sinon.stub,
        spy: sinon.spy
    },
    src: function(name) {
        return require(path.join(srcDir, name));
    },
    capture: function(stream) {
        var original = stream.write;
        var content = '';

        stream.write = function(string) {
            // Keep track of the stream's data
            content += string.toString();
            return true;
        }

        return {
            release: () => {
                stream.write = original;
                return content;
            }
        }
    },
    add: function(name, exec) {
        addTest(name, exec);
        return savor;
    },
    run: function(name, done) {
        runAllTests(name, done);
    },
    promiseShouldSucceed: promiseShouldSucceed,
    promiseShouldFail: promiseShouldFail,
    allTests: tests,
    reset: function() {
        tests = []
    },
    addAsset: function(src, dest, context) {
        copyAssetToContext(src, dest, context);
    }
}

module.exports = savor;
