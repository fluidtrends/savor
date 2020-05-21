import savor, {
    Context, 
    Completion
} from '../../src'

import chai from 'chai'

savor.

add('a promise that is expected to fail',  (context: Context, finish: Completion) => {
    savor.promiseShouldFail(Promise.reject(new Error('failed')), finish, (error) => {
        chai.expect(error).to.exist
        chai.expect(error.message).to.equal('failed')
    })    
}).

add('a promise that is expected to fail but actually succeeds',  (context: Context, finish: Completion) => {
    savor.promiseShouldFail(Promise.resolve('success'), (error) => {
        chai.expect(error).to.exist
        finish()
    }, (error) => {
        finish(error)
    })
}).


add('a promise that is expected to fail but fails because of its handler', (context: Context, finish: Completion) => {
    savor.promiseShouldFail(Promise.reject(new Error('failed')), (error?: TypeError) => {
        chai.expect(error).to.exist
        chai.expect(error?.message).to.equal('failed handler')
        finish()
    }, (error) => {
        throw new Error('failed handler')
    })
}).

add('a promise that is expected to succeed',  (context: Context, finish: Completion) => {
    savor.promiseShouldSucceed(Promise.resolve('success'), finish, (result: any) => {
        chai.expect(result).to.exist
        chai.expect(result).to.equal('success')
    })
}).

add('a promise that is expected to succeed but fails because of its handler',  (context: Context, finish: Completion) => {
    savor.promiseShouldSucceed(Promise.resolve('success'), (error?: TypeError) => {
        chai.expect(error).to.exist
        chai.expect(error?.message).to.equal('failed handler')
        finish()
    }, (error: TypeError) => {
        throw new Error('failed handler')
    })
}).

run("Promises")