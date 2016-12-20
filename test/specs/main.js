'use strict'

var savor = require('../..');
var chai = require('chai');
var sinon = require('sinon');
var fs = require('fs-extra');

describe("Main Tests", () => {
    beforeEach(function(done) {
        done();
    });

    afterEach(function(done) {
        savor.reset();
        done();
    });

    it("should be able to add a test", function(done) {
        savor.add('an non-running test');
        chai.expect(savor.allTests).to.exist;
        chai.expect(savor.allTests.length).to.equal(1);
        done();
    });

    it("should be able to run a test", function(done) {
        savor.add('an empty test', (context, finish) => finish()).
        run("Empty test", () => {});
        done();
    });

    it("should not copy a missing asset", function(done) {
        savor.add('a missing asset test', (context, finish) => {
            chai.expect(() => savor.addAsset("one", "one", context)).to.throw(Error);
            finish();
        }).
        run("Missing asset test", () => {});
        done();
    });

    it("should handle a failed asset copy operation", function(done) {
        savor.add('a failed asset test', (context, finish) => {
            sinon.stub(fs, 'copySync');
            chai.expect(() => savor.addAsset("assets/empty.txt", "asset.txt", context)).to.throw(Error);
            fs.copySync.restore();
            finish();
        }).
        run("Failed asset test", () => {});
        done();
    });

    it("should be able to copy an asset", function(done) {
        savor.add('an asset test', (context, finish) => {
            savor.addAsset("assets/empty.txt", "asset.txt", context);
            finish();
        }).
        run("Asset test", () => {});
        done();
    });

    it("should be able to capture a stream", function(done) {
        var stream = process.stdout;
        var stdout = savor.capture(stream);
        stream.write('just a test');
        var content = stdout.release();
        chai.expect(content).to.equal('just a test');
        done();
    });

    it("should be able to load a source module", function(done) {
        var main = savor.src('main');
        chai.expect(main).to.equal(savor);
        done();
    });

    it("should be able to handle promises", function(done) {
        var failedPromise = Promise.reject(new Error('failed'))
        var successfulPromise = Promise.resolve('success')

        savor.add('a promise that is expected to fail', (context, finish) => {
            savor.promiseShouldFail(failedPromise, finish, (error) => {
                chai.expect(error).to.exist
                chai.expect(error.message).to.equal('failed')
            })
        }).
        add('a promise that is expected to fail but actually succeeds', (context, finish) => {
            savor.promiseShouldFail(successfulPromise, (error) => {
                chai.expect(error).to.exist
                finish()
            }, (error) => {
                chai.expect(result).to.not.exist
                finish(error)
            })
        }).
        add('a promise that is expected to fail but fails because of its handler', (context, finish) => {
            savor.promiseShouldFail(failedPromise, (error) => {
                chai.expect(error).to.exist
                chai.expect(error.message).to.equal('failed handler')
                finish()
            }, (error) => {
                throw new Error('failed handler')
            })
        }).
        add('a promise that is expected to succeed', (context, finish) => {
            savor.promiseShouldSucceed(successfulPromise, finish, (result) => {
                chai.expect(result).to.exist
                chai.expect(result).to.equal('success')
            })
        }).
        add('a promise that is expected to succeed but fails because of its handler', (context, finish) => {
            savor.promiseShouldSucceed(successfulPromise, (error) => {
                chai.expect(error).to.exist
                chai.expect(error.message).to.equal('failed handler')
                finish()
            }, (error) => {
                throw new Error('failed handler')
            })
        }).
        run("Promises test", () => {});
        done();
    });

});
