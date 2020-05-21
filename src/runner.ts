import { spawnSync } from 'child_process'
import * as commands from './commands'

let _cmdName = 'test'
let _cwd = process.cwd()
let _command = (commands as any)[_cmdName]

export function run () {
  if (process.argv.length >= 3) {
      _cmdName = process.argv[2]
      _command = (commands as any)[_cmdName]
  }

  if (!_command) {
      process.stderr.write('Savor: invalid command\n')
      process.exit(1)
  }

  spawnSync(_command.bin, _command.args, {
    cwd: _cwd,
    stdio: "inherit"
  })
}
