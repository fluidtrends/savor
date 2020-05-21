"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var chai_as_promised_1 = __importDefault(require("chai-as-promised"));
var sinon_1 = __importDefault(require("sinon"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var tmp_1 = __importDefault(require("tmp"));
chai_1.default.use(chai_as_promised_1.default);
var tests = [];
var cwdDir = process.cwd();
var testDir = path_1.default.join(cwdDir, 'test');
var srcDir = path_1.default.join(cwdDir, 'lib');
function addTest(name, exec) {
    tests.push({
        name: name,
        exec: exec
    });
}
function beforeEach(test, context, done) {
    context.dir = tmp_1.default.dirSync().name;
    process.chdir(context.dir);
    done && done();
}
function promiseShouldFail(promise, done, handler) {
    promise.then(function () { return done(new Error('Promise expected to fail')); }).
        catch(function (error) {
        handler(error);
        done();
    }).
        catch(function (error) { return done(error); });
}
function promiseShouldSucceed(promise, done, handler) {
    promise.then(function (result) {
        handler(result);
        done();
    }).
        catch(function (error) { return done(error); });
}
function afterEach(test, context) {
    fs_extra_1.default.removeSync(context.dir);
}
function runTest(test, done) {
    beforeEach(test, savor.context, function () {
        // Run the actual test and give the test all the tools it needs for optimal execution
        test.exec(savor.context, function (error) {
            // Clean up the context
            afterEach(test, savor.context);
            // Finish up the test
            done && done(error);
        });
    });
}
function runAllTests(name, allDone) {
    // We're going to create a single, flat list of scenarios
    describe(name, function () {
        after(function () {
            // Tell the caller when all tests have finished running
            tmp_1.default.setGracefulCleanup();
            allDone && allDone();
        });
        tests.forEach(function (test) {
            // Have a look at all tests and define each test,
            // and pass it all the required dependencies to enable it
            // to perform work without worrying about dependencies
            it(test.name, function (done) {
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
function copyAssetToContext(src, dest, context) {
    var sourceAsset = path_1.default.resolve(testDir, src);
    var targetAsset = path_1.default.resolve(context.dir, dest);
    if (!fs_extra_1.default.existsSync(sourceAsset)) {
        // The source asset requested is missing
        throw new Error("The test asset is missing");
    }
    // Attempt to copy the asset
    fs_extra_1.default.copySync(sourceAsset, targetAsset);
    if (!fs_extra_1.default.existsSync(targetAsset)) {
        // The target asset was not copied successfully
        throw new Error("The test asset could not be copied");
    }
}
var savor = {
    context: {
        expect: chai_1.default.expect,
        assert: chai_1.default.assert,
        stub: sinon_1.default.stub,
        replace: sinon_1.default.replace,
        replaceGetter: sinon_1.default.replaceGetter,
        replaceSetter: sinon_1.default.replaceSetter,
        spy: sinon_1.default.spy,
        dir: process.cwd(),
        clock: sinon_1.default.useFakeTimers
    },
    src: function (name) {
        return require(path_1.default.join(srcDir, name));
    },
    capture: function (stream) {
        var original = stream.write;
        var content = '';
        stream.write = function (string) {
            // Keep track of the stream's data
            content += string.toString();
            return true;
        };
        return {
            release: function () {
                stream.write = original;
                return content;
            }
        };
    },
    add: function (name, exec) {
        addTest(name, exec);
        return savor;
    },
    run: function (name, done) {
        runAllTests(name, done);
    },
    promiseShouldSucceed: promiseShouldSucceed,
    promiseShouldFail: promiseShouldFail,
    allTests: tests,
    reset: function () {
        tests = [];
    },
    addAsset: function (src, dest, context) {
        copyAssetToContext(src, dest, context);
    }
};
__exportStar(require("./types"), exports);
exports.default = savor;
//# sourceMappingURL=index.js.map