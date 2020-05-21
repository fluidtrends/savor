import {
    Command
} from '..'

export const cov = {
    bin: "./node_modules/.bin/nyc",
    args: [
        "--reporter=lcov", 
        "npm", 
        "run", 
        "test"
    ]
} as Command

export const viewcov = {
    bin: "open",
    args: [
        "coverage/lcov-report/index.html"
    ]
} as Command