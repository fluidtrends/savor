var testBin      = "./node_modules/.bin/mocha";
var coverageBin  = "./node_modules/.bin/istanbul";
var lintBin      = "./node_modules/.bin/eslint";
var coverallsBin = "cat ./coverage/lcov.info | ./node_modules/.bin/coveralls";
var codacyBin    = "cat ./coverage/lcov.info | ./node_modules/.bin/codacy-coverage";
var rmBin        = "rm";

var testArgs           = ['--recursive', 'test/**/*.js'];
var coverageArgs       = ['cover', './node_modules/.bin/_mocha', '--', '--report', 'lcovonly', 'test/**/*.js'];
var coverallsArgs      = [];
var codacyArgs         = [];
var removeCoverageArgs = ['-rf', './coverage'];
var lintArgs           = ['src/**/*.js', 'test/**/*.js'];

var test = [{
  bin: testBin,
  args: testArgs
}]

var coverage = [{
  bin: coverageBin,
  args: coverageArgs
}]

var lint = [{
  bin: lintBin,
  args: lintArgs
}]

var coveralls = [
{
//   bin: coverageBin,
//   args: coverageArgs
// }, {
  bin: coverallsBin,
  args: coverallsArgs
// }, {
//   bin: rmBin,
//   args: removeCoverageArgs
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
  test: test,
  coverage: coverage,
  lint: lint,
  coveralls: coveralls,
  codacy: codacy
}
