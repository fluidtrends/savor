import {
    Command
} from '..'

export const test = {
    bin: "./node_modules/.bin/mocha",
    args: [
        "--recursive", 
        "test/specs/**/*.ts", 
        "--require", 
        "ts-node/register"
    ]
} as Command