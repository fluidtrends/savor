var testBin = "./node_modules/.bin/mocha";
var coverageBin = "./node_modules/.bin/istanbul";
var lintBin = "./node_modules/.bin/eslint";
var coverallsBin = "sh";
var codacyBin = "sh";
var codeclimateBin = "sh";
var rmBin = "rm";
var testArgs = ['--recursive', 'test/specs/**/*.js'];
var coverageLocalArgs = ['cover', './node_modules/.bin/_mocha', '--', '--report', 'lcovonly', 'test/specs/**/*.js'];
var coverageArgs = ['cover', './node_modules/.bin/_mocha', '--', '--report', 'lcovonly', 'test/specs/**/*.js'];
var coverallsArgs = ['-c', 'cat ./coverage/lcov.info | ./node_modules/.bin/coveralls'];
var codacyArgs = ['-c', 'cat ./coverage/lcov.info | ./node_modules/.bin/codacy-coverage'];
var codeclimateArgs = ['-c', './node_modules/.bin/codeclimate-test-reporter < ./coverage/lcov.info'];
var removeCoverageArgs = ['-rf', './coverage'];
var lintArgs = ['src/**/*.js', 'test/specs/**/*.js'];

var test = [{
    bin: testBin,
    args: testArgs
}]

var coverage = [{
    bin: coverageBin,
    args: coverageLocalArgs
}]

var lint = [{
    bin: lintBin,
    args: lintArgs
}]

var coveralls = [
    {
        bin: coverageBin,
        args: coverageArgs
}, {
        bin: coverallsBin,
        args: coverallsArgs
}, {
        bin: rmBin,
        args: removeCoverageArgs
}]

var codeclimate = [
    {
        bin: coverageBin,
        args: coverageArgs
}, {
        bin: codeclimateBin,
        args: codeclimateArgs
}, {
        bin: rmBin,
        args: removeCoverageArgs
}]

var codacy = [{
    bin: codacyBin,
    args: codacyArgs
}, {
    bin: codacyBin,
    args: codacyArgs
}, {
    bin: rmBin,
    args: removeCoverageArgs
}]

module.exports = {
    rntest: test,
    test: test,
    coverage: coverage,
    lint: lint,
    coveralls: coveralls,
    codacy: codacy,
    codeclimate: codeclimate
}
