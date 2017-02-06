<p align="center">
  <a href="https://github.com/idancali/react-native-savor">
    <img height="256" src="https://raw.githubusercontent.com/idancali/react-native-savor/master/logo.png">
  </a>
  <p align="center"> <b> React Native react-native-savor </b> Adds Delicious Flavors To Your React Native App, Like Tests, Coverage and Analysis. </p>
</p>

[![Version](https://img.shields.io/npm/v/react-native-savor.svg)](https://www.npmjs.com/package/react-native-savor)
[![Build Status](https://travis-ci.org/idancali/react-native-savor.svg?branch=master)](https://travis-ci.org/idancali/react-native-savor)
[![CC](https://codeclimate.com/github/idancali/react-native-savor/badges/gpa.svg)](https://codeclimate.com/github/idancali/react-native-savor)
[![TC](https://codeclimate.com/github/idancali/react-native-savor/badges/coverage.svg)](https://codeclimate.com/github/idancali/react-native-savor)
[![Author](https://img.shields.io/badge/say%20hi-%40idancali-green.svg)](https://twitter.com/idancali)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Fidancali%2Freact-native-savor&via=idancali&text=Add%20more%20flavor%20to%20your%20Node%20module%20%28test%2C%20coverage%2C%20analysis%29.&hashtags=react-native-savor%2C%20opensource&)

# Overview

React Native Savor gives you all you need to write amazing tests for your React Native Apps, right out of the box, all in one place: a test framework, BDD and TDD assertions, stubbing/mocking, code coverage and static analysis.

Savor uses the following Open-Source libraries to make that happen:

 - [Enzyme](http://airbnb.io/enzyme) as the React testing framework
 - [Mocha](https://mochajs.org) as the test framework
 - [Chai](http://chaijs.com) as the assertion library (both for BDD and for TDD)
 - [Sinon](http://sinonjs.org) as the stubbing library
 - [Istanbul](http://gotwarlost.github.io/istanbul) as the code coverage tool
 - [ESLint](http://eslint.org) as the static analyzer

Savor also gives you the ability to plug your tests into your continuous integration process via [Coveralls](https://coveralls.io) for code coverage and [Codacy](https://www.codacy.com) for code analysis. It also support [CodeClimate](https://codeclimate.com) which is a tool that offers both static analysis and code coverage. To integrate with your CI tool, make sure you add a post-execution script that runs the following:
```
npm run coveralls
npm run codacy
npm run codeclimate
```

For [Travis CI](https://travis-ci.org) for example, this is what your ```.travis.yml``` file might look like:
```yaml
language: node_js
node_js:
  - "5.0"
after_success:
  - npm run coveralls
  - npm run codacy
  - npm run codeclimate
```

# Installation

**STEP 1**

Add react-native-savor to your module as a development dependency:

```javascript
npm install --save-dev react-native-savor
```

**STEP 2**

Add react-native-savor to your module scripts:

```javascript
"scripts": {
  "savor": "react-native-savor"
}
```

If you'd like more granularity over your scripts you can also install single react-native-savor commands:

```javascript
"scripts": {
    "savor": "react-native-savor",
    "test": "react-native-savor test",
    "lint": "react-native-savor lint",
    "coverage": "react-native-savor coverage",
    "coveralls": "react-native-savor coveralls",
    "codacy": "react-native-savor codacy",
    "codeclimate": "react-native-savor codeclimate"
}
```

**STEP 3**

Make sure your code resides under a ```src``` directory and all your specs under a ```test/specs``` directory:

```javascript
package.json
node_modules/
src/
  main.js
test/
  assets/
    BasicComponent.js
  specs/
    main.js
```

# Adding Tests

You can now write tests under your ```test``` directory, like so:

```javascript
vimport React, {
    View,
    Text,
    StyleSheet
} from 'react-native'
import savor from '../../../..'
import BasicComponent from '../assets/BasicComponent'

const TestText = (<Text>test</Text>)
const TestComponent = (<BasicComponent/> )

savor.add('should mount a basic React Native component', function(context, done) {
  const wrapper = context.shallow(TestComponent)
  context.expect(wrapper.length).to.equal(1)
  context.expect(wrapper).to.contain(TestText)
  done()
}).

run('My React Native Tests')
```

# The Savor Context

When you add a test, you are given a ```context``` that contains the following:

```javascript
  context.expect  // Using Chai
  context.assert  // Using Chai
  context.stub    // Using Sinon
  context.shallow // Using Enzyme
  context.mount   // Using Enzyme
  context.render  // Using Enzyme
  context.dir     // The temporary test location
```

# Running Tests

You can now simply run your tests like so:

```javascript
npm test
```

![Example](https://raw.githubusercontent.com/idancali/react-native-savor/master/examples/example.main.1.gif)

# Test Coverage

You can check your coverage like this:

```javascript
npm run coverage
```

# Static Analysis

You can lint your code like this:

```javascript
npm run lint
```

Enjoy!

# License

Copyright (c) 2016 I. Dan Calinescu

 Licensed under the The MIT License (MIT) (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 https://raw.githubusercontent.com/idancali/react-native-savor/master/LICENSE

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
