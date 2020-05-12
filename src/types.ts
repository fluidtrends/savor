import Sinon from "sinon"
import Chai from "chai"

export interface Context {
    expect: any,
    assert: any,
    stub: any,
    dir: string;
    replace: any,
    replaceGetter: any,
    replaceSetter: any,
    spy: any,
    clock: any
}

export type Completion = (error?: Error) => void;
export type ResultError = (error: Error) => any;
export type Result = (data?: any) => any;