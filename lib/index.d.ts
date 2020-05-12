import { Context, ResultError, Result, Completion } from './types';
declare function promiseShouldFail(promise: Promise<any>, done: Completion, handler: ResultError): void;
declare function promiseShouldSucceed(promise: Promise<any>, done: Completion, handler: Result): void;
declare const savor: {
    context: Context;
    src: (name: string) => any;
    capture: (stream: any) => {
        release: () => string;
    };
    add: (name: any, exec: any) => any;
    run: (name: any, done: Completion) => void;
    promiseShouldSucceed: typeof promiseShouldSucceed;
    promiseShouldFail: typeof promiseShouldFail;
    allTests: any[];
    reset: () => void;
    addAsset: (src: any, dest: any, context: any) => void;
};
export * from './types';
export default savor;
