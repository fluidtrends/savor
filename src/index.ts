import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import path from 'path'
import fs from 'fs-extra'
import tmp from 'tmp'
import {
    Context,
    ResultError,
    Result,
    Completion
} from './types'

chai.use(chaiAsPromised);

var tests: any[] = [];
var cwdDir = process.cwd();
var testDir = path.join(cwdDir, 'test');
var srcDir = path.join(cwdDir, 'src');

function addTest(name: string, exec: any) {
    tests.push({
        name: name,
        exec: exec
    });
}

function beforeEach(test: string, context: Context, done: Completion) {
    context.dir = tmp.dirSync().name;
    process.chdir(context.dir);
    done && done();
}

function promiseShouldFail(promise: Promise<any>, done: Completion, handler: ResultError) {
    promise.then(() => done(new Error('Promise expected to fail'))).
    catch((error: Error) => {
        handler(error)
        done()
    }).
    catch((error: Error) => done(error))
}

function promiseShouldSucceed(promise: Promise<any>, done: Completion, handler: Result) {
    promise.then((result: any) => {
        handler(result)
        done()
    }).
    catch((error: Error) => done(error))
}

function afterEach(test: any, context: Context) {
    fs.removeSync(context.dir);
}

function runTest(test: any, done: Completion) {
    beforeEach(test, savor.context, function() {
        // Run the actual test and give the test all the tools it needs for optimal execution
        test.exec(savor.context, function(error: Error) {
            // Clean up the context
            afterEach(test, savor.context);

            // Finish up the test
            done && done(error)
        });
    });
}

function runAllTests(name: any, allDone: any) {

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

function copyAssetToContext(src: any, dest: any, context: Context) {
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

const savor = {
    context: {
        expect: chai.expect,
        assert: chai.assert,
        stub: sinon.stub,
        replace: sinon.replace,
        replaceGetter: sinon.replaceGetter,
        replaceSetter: sinon.replaceSetter,
        spy: sinon.spy,
        dir: process.cwd(),
        clock: sinon.useFakeTimers
    } as Context,
    src: function(name: string) {
        return require(path.join(srcDir, name));
    },
    capture: function(stream: any) {
        var original = stream.write;
        var content = '';

        stream.write = function(string: string) {
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
    add: function(name: any, exec: any) {
        addTest(name, exec);
        return savor;
    },
    run: function(name: any, done: Completion) {
        runAllTests(name, done);
    },
    promiseShouldSucceed: promiseShouldSucceed,
    promiseShouldFail: promiseShouldFail,
    allTests: tests,
    reset: function() {
        tests = []
    },
    addAsset: function(src: any, dest: any, context: any) {
        copyAssetToContext(src, dest, context);
    }
}

export * from './types'
export default savor