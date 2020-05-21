"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
var child_process_1 = require("child_process");
var commands = __importStar(require("./commands"));
var _cmdName = 'test';
var _cwd = process.cwd();
var _command = commands[_cmdName];
function run() {
    if (process.argv.length >= 3) {
        _cmdName = process.argv[2];
        _command = commands[_cmdName];
    }
    if (!_command) {
        process.stderr.write('Savor: invalid command\n');
        process.exit(1);
    }
    child_process_1.spawnSync(_command.bin, _command.args, {
        cwd: _cwd,
        stdio: "inherit"
    });
}
exports.run = run;
//# sourceMappingURL=runner.js.map