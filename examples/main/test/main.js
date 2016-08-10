var savor = require('savor');
var main  = require('../src/main');

savor.add('should create a valid greeting', function(test, done) {
  var greeting = main.createGreeting('Dan');
  test.expect(greeting).to.equal("Hello, Dan");
  done && done();
}).

run('Greeting Tests');
