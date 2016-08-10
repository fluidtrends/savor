<p align="center">
  <a href="https://github.com/idancali/savor">
    <img height="256" src="https://raw.githubusercontent.com/idancali/savor/master/logo.png">
  </a>
  <p align="center"> <b> Savor </b> Adds Delicious Flavors To Your Node Module, Like Tests, Coverage and Analysis. </p>
</p>

# Savor

[![Version](https://img.shields.io/npm/v/savor.svg)](https://www.npmjs.com/package/savor)
[![Build Status](https://travis-ci.org/idancali/savor.svg?branch=master)](https://travis-ci.org/idancali/savor)
[![Coverage Status](https://coveralls.io/repos/github/idancali/savor/badge.svg?branch=master)](https://coveralls.io/github/idancali/savor?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1b29488825be41f0874f45f8b428b753)](https://www.codacy.com/app/dancali/savor?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=idancali/savor&amp;utm_campaign=Badge_Grade)
[![Author](https://img.shields.io/badge/say%20hi-%40idancali-green.svg)](https://twitter.com/idancali)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fidancali%2Fsavor&via=idancali&text=Add%20more%20flavor%20to%20your%20Node%20module%20%28test%2C%20coverage%2C%20analysis%29.&hashtags=savor%2C%20opensource&)

# Installation

**STEP 1**

Add Savor to your module as a development dependency:

```javascript
npm install --save-dev savor
```

**STEP 2**

Add Savor to your module scripts:

```javascript
"scripts": {
  "savor": "./node_modules/.bin/savor"
}
```

If you'd like more granularity over your scripts you can also install single Savor commands:

```javascript
"scripts": {
  "savor": "./node_modules/.bin/savor",
  "test": "./node_modules/.bin/savor test",
  "lint": "./node_modules/.bin/savor lint",
  "cover": "./node_modules/.bin/savor cover",
  "coveralls": "./node_modules/.bin/savor coveralls",
  "codacy": "./node_modules/.bin/savor codacy"
}
```

**STEP 3**

Make sure your code resides under a ```src``` directory and all your tests under a ```test``` directory, like so:

```javascript
package.json
node_modules/
src/
test/
```

# Adding Tests

You can now write tests under your ```test``` directory, like so:

```javascript
var savor = require('savor');

savor.add('this is a test', function(done, context) {
  console.log('My test is running');

  // The test finished successfully
  done && done();

  // Or throw an error if the test fails
  // done && done(new Error('ddd'));
}).

// You can keep adding tests here with savor.add

run();
```

# Running Tests

You can now simply run your tests like so:

```javascript
npm test
```

or like this:

```javascript
npm run test
```

or even like this:

```javascript
npm run savor test
```

![Example](https://raw.githubusercontent.com/idancali/savor/master/examples/example.main.1.gif)

# Test coverage

You can check your coverage like this:

```javascript
npm run coverage
```

or like this:

```javascript
npm run savor coverage
```

![Example](https://raw.githubusercontent.com/idancali/savor/master/examples/example.main.3.gif)

# Static analysis

You can lint your code like this:

```javascript
npm run lint
```

or like this:

```javascript
npm run savor lint
```

![Example](https://raw.githubusercontent.com/idancali/savor/master/examples/example.main.2.gif)

# Working Example

[Take a look at the example](https://raw.githubusercontent.com/idancali/savor/master/examples/main) for more details on how to integrate Savor within your module.

In our example, we have a simple module in ```src/main.js``` that generates a greeting, like so:

```javascript
var main = {
  createGreeting: function(name) {
    return "Hello, " + name;
  }
}

module.exports = main;
```

And here's how it is to test this with Savor. First, add the Savor hooks in your ```scripts``` field:

```javascript
"scripts": {
  "savor": "./node_modules/.bin/savor",
  "test": "./node_modules/.bin/savor test",
  "lint": "./node_modules/.bin/savor lint",
  "coverage": "./node_modules/.bin/savor coverage",
  "coveralls": "./node_modules/.bin/savor coveralls",
  "codacy": "./node_modules/.bin/savor codacy"
}
```

Next, write your test in ```test/main.js```:

```javascript
var savor = require('savor');
var main  = require('../src/main');

savor.add('should create a valid greeting', function(test, done) {
  var greeting = main.createGreeting('Dan');
  test.expect(greeting).to.equal("Hello, Dan");
  done && done();
}).

run('Greeting Tests');
```

Then just sit back and enjoy the show:

![Example](https://raw.githubusercontent.com/idancali/savor/master/examples/example.main.1.gif)
![Example](https://raw.githubusercontent.com/idancali/savor/master/examples/example.main.2.gif)
![Example](https://raw.githubusercontent.com/idancali/savor/master/examples/example.main.3.gif)

# License

Copyright (c) 2016 I. Dan Calinescu

 Licensed under the The MIT License (MIT) (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://raw.githubusercontent.com/idancali/savor/master/LICENSE

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
