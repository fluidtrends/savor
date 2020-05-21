import savor, {
    Context, 
    Completion
} from '../../src'

import chai from 'chai'
import sinon from 'sinon'
import fs from 'fs-extra'

savor.

add('an empty test', (context: Context, finish: Completion) => {
    finish()
}).

add('a missing asset test',  (context: Context, finish: Completion) => {
    chai.expect(() => savor.addAsset("one", "one", context)).to.throw(Error);
    finish();
}).

add('a failed asset test',  (context: Context, finish: Completion) => {
    const stub = sinon.stub(fs, 'copySync').callsFake(() => {});
    chai.expect(() => savor.addAsset("assets/empty.txt", "asset.txt", context)).to.throw(Error);
    stub.restore();
    finish();
}).

add('an asset test',  (context: Context, finish: Completion) => {
    savor.addAsset("assets/empty.txt", "asset.txt", context);
    finish();
}).

run("Assets")