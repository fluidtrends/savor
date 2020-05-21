import savor from '../../src'
import chai from 'chai'

describe("Main", () => {
    beforeEach(function(done) {
        done();
    });

    afterEach(function(done) {
        savor.reset();
        done();
    });

    it("should be able to add a test", function(done) {
        savor.add('an non-running test');
        chai.expect(savor.allTests).to.exist;
        chai.expect(savor.allTests.length).to.equal(4);
        done();
    });

    it("should be able to capture a stream", function(done) {
        var stream = process.stdout;
        var stdout = savor.capture(stream);
        stream.write('just a test');
        var content = stdout.release();
        chai.expect(content).to.equal('just a test');
        done();
    });
});