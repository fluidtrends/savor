var savor = require('../../../..');
var main  = require('../../src/main');

savor.add('should create a valid greeting', function(context, done) {
  var greeting = main.createGreeting('bob');
  context.expect(greeting).to.equal("Hello, bob");
  done();
}).

run('Greeting Tests');
