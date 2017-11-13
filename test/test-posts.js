const chai = require('chai')
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const Post = require('../models/post');

describe('Posts', () => {
  it('should create with valid attributes at POST /posts', (done) => {
    let count;

    Post.find({}).then((posts) => {
      count = posts.count;
      const newPost = {
        title: "Test Post",
        url: "test://url.com",
        summary: "Test Content"
      };
      chai.request('localhost:3000')
        .post('/posts', newPost)
        .end((err, res) => {

        })
    }).catch(err => done(err));
 });
});
