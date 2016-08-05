var test = {
  bin: "./node_modules/.bin/mocha",
  args: ['--recursive', 'test/**/*.js']
}

var coverage = {
  bin: "./node_modules/.bin/istanbul",
  args: ['cover', './node_modules/.bin/_mocha', '--', '--report', 'lcovonly', 'test/**/*.js']
}

var lint = {
  bin: "./node_modules/.bin/eslint",
  args: ['src/**/*.js', 'test/**/*.js']
}

var coveralls = {
  bin: "./node_modules/.bin/istanbul",
  args: ['cover', './node_modules/.bin/_mocha', '--', '--report', 'lcovonly', 'test/**/*.js', '&&', 'cat', './coverage/lcov.info', '|', './node_modules/.bin/coveralls', '&&', 'rm', '-rf', './coverage']
}

var codacy = {
  bin: "./node_modules/.bin/istanbul",
  args: ['cover', './node_modules/.bin/_mocha', '--', '--report', 'lcovonly', 'test/**/*.js', '&&', 'cat', './coverage/lcov.info', '|', './node_modules/.bin/codacy-coverage', '&&', 'rm', '-rf', './coverage']
}

module.exports = {
  test: test,
  coverage: coverage,
  lint: lint,
  coveralls: coveralls,
  codacy: codacy
}
