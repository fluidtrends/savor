"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewcov = exports.cov = void 0;
exports.cov = {
    bin: "./node_modules/.bin/nyc",
    args: [
        "--reporter=lcov",
        "npm",
        "run",
        "test"
    ]
};
exports.viewcov = {
    bin: "open",
    args: [
        "coverage/lcov-report/index.html"
    ]
};
//# sourceMappingURL=coverage.js.map