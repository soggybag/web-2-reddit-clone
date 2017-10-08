const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../server');
const should = chai.should();

chai.use(chaiHTTP);

const agent = chai.request.agent(app);


describe("Testing App", () => {
  it('Can get /api', (done) => {
    agent
      .get('/api')
      .end((err, res) => {
        if (err) return done(err);
        res.body.hello.should.be.equal("world");
        done();
      })
  })
});
