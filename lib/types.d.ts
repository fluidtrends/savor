export interface Context {
    expect: any;
    assert: any;
    stub: any;
    dir: string;
    replace: any;
    replaceGetter: any;
    replaceSetter: any;
    spy: any;
    clock: any;
}
export interface Command {
    bin: string;
    args: string[];
}
export declare type Completion = (error?: TypeError) => void;
export declare type ResultError = (error: TypeError) => any;
export declare type Result = (data?: any) => any;
