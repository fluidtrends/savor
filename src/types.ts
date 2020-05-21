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

export interface Command {
    bin: string;
    args: string[];
}

export type Completion = (error?: TypeError) => void;
export type ResultError = (error: TypeError) => any;
export type Result = (data?: any) => any;