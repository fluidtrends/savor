#!/usr/bin/env node

var spawn    = require('child_process').spawn;
var commands = require('./commands');

var command  = commands.test;
var cwd      = process.cwd();

if (process.argv.length >= 3) {
  command = process.argv[2];
  command = commands[command];
}

if (!command) {
  process.stderr.write('Savor: invalid command\n');
  process.exit(1);
}

spawn(command.bin, command.args, { cwd: cwd, stdio: "inherit" });
