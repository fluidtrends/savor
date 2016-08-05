#!/usr/bin/env node

var spawn     = require('child_process').spawnSync;
var commands  = require('./commands');
var fs        = require('fs-extra');
var path      = require('path');

var resources = { lint: ['.eslintrc'] };

var cmdName   = 'test';
var command   = commands.test;
var cwd       = process.cwd();
var resDir    = path.join(__dirname, '../res');

if (process.argv.length >= 3) {
  cmdName = process.argv[2];
  command = commands[cmdName];
}

if (!command) {
  process.stderr.write('Savor: invalid command\n');
  process.exit(1);
}

copyResourcesToTarget();

command.forEach(function(subcommand) {
  spawn(subcommand.bin, subcommand.args, { cwd: cwd, stdio: "inherit" });
});

cleanTargetResources();

///// HELPERS /////

function copyResourcesToTarget() {
  var allResources = resources[cmdName];
  if (!allResources) {
    return;
  }

  allResources.forEach(function(res){
    var srcFile    = path.join(resDir, res);
    var targetFile = path.join(cwd, res);
    fs.copySync(srcFile, targetFile);
  });
}

function cleanTargetResources() {
  var allResources = resources[cmdName];
  if (!allResources) {
    return;
  }

  allResources.forEach(function(res){
    var targetFile = path.join(cwd, res);
    fs.removeSync(targetFile);
  });
}
