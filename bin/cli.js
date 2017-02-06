'use strict'

var spawn = require('child_process').spawnSync
var fs = require('fs-extra')
var path = require('path')

function cliContext (commands, dir) {
  return {
    cmdName:'test',
    command: commands.test,
    cwd: process.cwd(),
    resDir: path.join(dir, '../res'),
    resources: { lint: ['.eslintrc'] },
  }
}

function copyResourcesToTarget(context) {
    var allResources = context.resources[context.cmdName];
    if (!allResources) {
        return;
    }

    allResources.forEach(function(res) {
        var srcFile = path.join(context.resDir, res);
        var targetFile = path.join(context.cwd, res);
        fs.copySync(srcFile, targetFile);
    });
}

function cleanTargetResources(context) {
    var allResources = context.resources[context.cmdName];
    if (!allResources) {
        return;
    }

    allResources.forEach(function(res) {
        var targetFile = path.join(context.cwd, res);
        fs.removeSync(targetFile);
    });
}

function exec (commands, dir) {

  let context = cliContext(commands, dir)

  if (process.argv.length >= 3) {
      context.cmdName = process.argv[2]
      context.command = commands[context.cmdName]
  }

  if (!context.command) {
      process.stderr.write('Savor: invalid command\n')
      process.exit(1)
  }

  copyResourcesToTarget(context)

  context.command.forEach(function(subcommand) {
      spawn(subcommand.bin, subcommand.args, {
          cwd: context.cwd,
          stdio: "inherit"
      })
  })

  cleanTargetResources(context)
}

module.exports = {
  exec
}
