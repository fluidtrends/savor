"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seecov = exports.cov = void 0;
exports.cov = {
    bin: "./node_modules/.bin/nyc",
    args: [
        "--reporter=lcov",
        "npm",
        "run",
        "test"
    ]
};
exports.seecov = {
    bin: "open",
    args: [
        "coverage/lcov-report/index.html"
    ]
};
//# sourceMappingURL=cov.js.map