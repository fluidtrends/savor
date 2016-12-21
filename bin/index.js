#!/usr/bin/env node

'use strict'

let commands = require('./commands')
let cli = require('./cli')

cli.exec(commands, __dirname)
