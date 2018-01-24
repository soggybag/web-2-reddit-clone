// api-route.test.js

// npm run test-watch

const app       = require('../server'); // Import server.js
const chai      = require('chai');      // Import chai
const chaiHTTP  = require('chai-http'); // Import chaiHTTP
const expect    = chai.expect;          // define expect
const should    = chai.should();        // define should

chai.use(chaiHTTP);                         // Tell chai to user chaiHTTP

const agent   = chai.request.agent(app);    // set the request agent to use your express app

const User = require('../models/user');
const Post = require('../models/post');

describe('Testing API', () => {

  // Title of the Test post. Will use this more than once
  // so it's good to keep it in a variable.
  const postTitle = "Post Title - API"

  // Before the tests create a user agent. This is required to
  // perform requests with the same authenication.
  before((done) => {
    const credentials = {
      username: 'Test',
      password: 'test'
    }
    agent
    .post('/api/login')
    .send(credentials)
    .end((err, res) => {
      done(err)
    })
  })

  // After tests run clean up. This removes all of the
  // test posts that were created.
  after((done) => {
    Post.remove({ title: postTitle }).then((posts) => {
      done()
    }).catch((err) => {
      done(err)
    })
  });

  // Run Tests

  // Get posts
  it('Should return an array of posts', (done) => {
    agent.get('/api/posts').end((err, res) => {
      res.should.have.status(200)
      res.body.should.be.a('array')
      done(err)
    })
  })

  // Create new Post
  it('Should create a new post', (done) => {
    const newPost = {
      title: postTitle,
      content: "Test content for post. From api test.",
      category: "tests-api"
    }
    agent
    .post('/api/posts/new')
    .send(newPost)
    .end((err, res) => {
      const { body } = res
      res.should.have.status(200)
      body.should.be.a('object')
      body.should.have.property('title')
      body.should.have.property('content')
      body.should.have.property('author')
      done(err)
    })
  })

  // Get posts with category
  it('Should fetch posts with category: tests-api', (done) => {
    agent.get('/api/posts/category/tests-api')
    .end((err, res) => {
      const { body } = res
      body.should.be.a('array')
      expect(body.length).to.be.above(0)
      done(err)
    })
  })

  // Find post with id
  it('Should find post with id', (done) => {
    // Define some data to create a new post
    const newPost = {
      title: postTitle,
      content: "Test content for post. From api test.",
      category: "tests-api"
    }
    agent
    .post('/api/posts/new') // Create a post with data
    .send(newPost)
    .end((err, res) => {
      // After the new post was created find it via it's id
      agent
      .get(`/api/posts/${res.body._id}`)
      .end((err, res) => {
        // Check the post found make sure it looks valid
        const { body } = res
        res.should.have.status(200)
        body.should.be.a('object')
        body.should.have.property('title')
        body.should.have.property('content')
        body.should.have.property('author')
        done(err)
      })
    })
  })

  // Delete post with id
  it('Should delete post with id', (done) => {
    // Define some data to create a new post
    const newPost = {
      title: postTitle,
      content: "Test content for post. From api test.",
      category: "tests-api"
    }
    agent
    .post('/api/posts/new') // Create a post with data
    .send(newPost)
    .end((err, res) => {
      // After the new post was created find it via it's id
      agent
      .delete(`/api/posts/delete/${res.body._id}`)
      .end((err, res) => {
        // Check the post found make sure it looks valid
        const { body } = res
        res.should.have.status(200)
        done(err)
      })
    })
  })

  it('Should sign up user with name and password', () => {

  })

  it('Should logout')
  it('Should return status ??? on a failed login')
  it('Should return status ??? when creating a post when not logged in')
  // ... Research status codes ...


});
