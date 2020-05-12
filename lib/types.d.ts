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
export declare type Completion = (error?: Error) => void;
export declare type ResultError = (error: Error) => any;
export declare type Result = (data?: any) => any;
