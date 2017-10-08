const chai = require('chai');
const chaiHTTP = require('chai-http');
const app = require('../server');
const should = chai.should();

chai.use(chaiHTTP);

const agent = chai.request.agent(app);
const User = require('../models/user');

describe('Auth Test:', function() {
  const testUsername = "testUsername";
  const testPassword = "testPassword";

  // after(function(done) {
  //   User.findOne({ username: testUsername }).then((user) => {
  //     return User.findByIdAndRemove(user._id);
  //   }).then(() => {
  //     done();
  //   })
  // });

  // Should not be able to log in
  it('Should not be able to login with wrong user name and password', function(done) {
    agent
      .post('/login')
      .type('form')
      .send({
        username: "wrongusername",
        password: "wrongpassword"
      })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.status.should.be.equal(401);
        done();
      });
  });

  // signup
  it('Should be able to signup', function(done) {
    agent
      .post('/sign-up')
      .type('form')
      .send({
        postUsername: testUsername,
        postPassword: testPassword,
        postPasswordConfirm: testPassword
      })
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        res.should.have.cookie("nToken");
        done();
      });
  });

  // login
  // it('should be able to logout', function (done) {
  //  agent
  //    .get('/logout')
  //    .end(function (err, res) {
  //      res.should.have.status(200);
  //      res.should.not.have.cookie("nToken");
  //      done();
  //    });
  // });

  // login
  // it('should be able to login', function (done) {
  //  agent
  //    .post('/login')
  //    .send({ email: "username", password: "password" })
  //    .end(function (err, res) {
  //      res.should.have.status(200);
  //      res.should.have.cookie("nToken");
  //      done();
  //    });
  // });
});
