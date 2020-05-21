#!/usr/bin/env node

const commands = require('../lib/commands')
const runner = require('../lib/runner')

runner.run(commands, __dirname)
