var savor = require('savor');
var main  = require('../../src/main');

savor.add('should create a valid greeting', function(context, done) {
  var greeting = main.createGreeting('Dan');
  context.expect(greeting).to.equal("Hello, Dan");
  done();
}).

run('Greeting Tests');
