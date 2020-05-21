"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
exports.test = {
    bin: "./node_modules/.bin/mocha",
    args: [
        "--recursive",
        "test/specs/**/*.ts",
        "--require",
        "ts-node/register"
    ]
};
//# sourceMappingURL=test.js.map