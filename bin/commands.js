var testBin = "./node_modules/.bin/mocha";
var testArgs = ['--recursive', 'test/specs/**/*.ts', '--require', 'ts-node/register'];

var coverageBin = "./node_modules/.bin/nyc";
var coverageLocalArgs = ['--reporter=lcov', 'npm', 'run', 'test'];

var test = [{
    bin: testBin,
    args: testArgs
}]

var coverage = [{
    bin: coverageBin,
    args: coverageLocalArgs
}]

module.exports = {
    test: test,
    coverage: coverage
}
