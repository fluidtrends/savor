/**
 *  We're using Chai.JS as our BDD assertion library, and specifically,
 *  we want to write our specs using the expect assert style.
 **/
var chai  = require('chai');

/**
 *  Enable http testing
 **/
var supertest = require('supertest');
chai.use(require('chai-http'));

/**
 *  For all our mocking needs as well as stubbing needs, we will
 *  want to make use of Sinon.JS as our framework of choice for these needs.
 **/
var sinon = require('sinon');

/**
 *  General-purpose library dependencies for tasks such as file I/O
 **/
var path   = require('path');
var fs     = require('fs-extra');
var tmp    = require('tmp');

/**
 *  All the tests we want to run.
 **/
var tests = [];

/**
 *   Add a test to be run.
 **/
function addTest(name, exec) {
  tests.push({ name: name, exec: exec });
}

/**
 *  Setup before each test
 **/
function beforeEach(done) {
  done && done();
}

/**
 *  Clean up after each test
 **/
function afterEach(done) {
  done && done();
}

/**
 *  We look at all our tests and describe them here and set them
 *  up so as to pass the execution over to the test framework.
 **/
function runAllTests () {

  // We're going to create a single, flat list of scenarios
  describe("All Tests", () => {

      // Correctly setup each test
      beforeEach(function(done) { beforeEach(done) });

      // Clean up each test
      afterEach(function(done)  {  afterEach(done) });

      tests.forEach(function(test) {
        // Have a look at all tests and define each test,
        // and pass it all the required dependencies to enable it
        // to perform work without worrying about dependencies
        it(test.name, function(done) {
          // Increase the timeout so that we can handle slower CI cycles if necessary
          this.timeout(60000);

          // Run the actual test and give the test all the tools it needs for optimal execution
          test.exec(done, {expect: chai.expect, assert: chai.assert, http: supertest, stub: sinon.stub,
                spec: this, chai: chai});
        });
      });
  });
}

var savor = {
  add: function(name, exec) {
    addTest(name, exec);
    return savor;
  },
  run: function() {
    runAllTests();
  }
}

module.exports = savor;
