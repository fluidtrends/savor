#!/usr/bin/env node

var spawn    = require('child_process').spawn;
var commands = require('./commands');
var fs       = require('fs-extra');
var path     = require('path');

var command  = commands.test;
var cwd      = process.cwd();
var resDir   = path.join(__dirname, '../res');

if (process.argv.length >= 3) {
  command = process.argv[2];
  command = commands[command];
}

if (!command) {
  process.stderr.write('Savor: invalid command\n');
  process.exit(1);
}

var srcLintFile    = path.join(resDir, '.eslintrc');
var targetLintFile = path.join(cwd, '.eslintrc');

fs.copySync(srcLintFile, targetLintFile);

var cmd = spawn(command.bin, command.args, { cwd: cwd, stdio: "inherit" });
cmd.on('close', (code) => {
  fs.removeSync(targetLintFile);
});
