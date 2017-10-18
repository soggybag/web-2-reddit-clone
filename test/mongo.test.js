const mongoose = require('mongoose');

const chai = require('chai');
const expect = chai.expect;
const User = require('../models/user');
const Post = require('../models/post');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/redditclone', { useMongoClient: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));

describe('Testing Mongo', () => {

  let testUser;
  let testPost;

  before(() => {
    testUser = new User({ username: "Test user", password: "Test user" });
    return testUser.save((user) => {
      return new Post({
        title: "Test Post",
        content: "Test Post",
        category: "test",
        author: testUser
      }).save();
    })
  })

  after(() => {
    return User.find({ username: "Test user" }).remove().then(() => {
      // console.log("Removes test users");
    }).then(() => {
      return Post.find({title: "Test Post"}).remove();
    })
  });

  it('Should create a new user', () => {
    const newUser = new User({username: "Test user", password:"abc"});
    return newUser.save()
    .then((user) => {
      return User.findById(user._id);
    }).then((user) => {
      if (user._id.toString() !== newUser._id.toString()) {
        throw new Error('User not created');
      }
    });
  });

  it('Should return an array of posts', () => {
    return Post.find({}).then((posts) => {
      expect(posts).to.be.an('array');
    })
  });

  it('Should add a new post', () => {
    let postCount;

    return Post.count().then((count) => {
      postCount = count;
      return new Post({
        title: "Test Post",
        content: "Test Post",
        category: "test",
        author: testUser
      }).save();
    }).then(() => {
      return Post.count()
    }).then((count) => {
      if (count !== postCount + 1) {
        throw new Error(`Count of ${count} isn't one greater than ${postCount}`);
      }
    })
  });

  it('Should fetch a post with valid properties', () => {
    return Post.findOne({title: "Test Post"}).then((post) => {
      expect(post).to.have.property('title');
      expect(post).to.have.property('content');
      expect(post).to.have.property('author');
    });
  });

  it('Should create a new user', () => {
    // Cheating - I created a user in the before() hook above. If that user
    // was created and we can find it here it must work.
    return User.findById(testUser._id).then((user) => {
      expect(testUser._id.toString()).to.be.equal(user._id.toString());
    });
  });

  it('Should find a user with an id', () => {
    // Cheating again - just need to find the test user created in before()
    return User.findById(testUser._id).then((user) => {
      expect(testUser._id.toString()).to.be.equal(user._id.toString());
    });
  });

  it('Should find a user with valid properties', () => {
    // Maybe this test could be folded in with the two above.
    return User.findById(testUser._id).then((user) => {
      expect(user).to.have.property('username');
      expect(user).to.have.property('password');
      expect(user).to.have.property('createdAt');
      expect(user).to.have.property('updatedAt');
    });
  });

  it('Should remove a user', () => {
    let userToRemove;
    return new User({ username: "Test user", password: "test" }).save().then((user) => {
      userToRemove = user;
      return user.remove();
    }).then(() => {
      return User.find({ _id: userToRemove._id });
    }).then((users) => {
      expect(users.length).to.be.equal(0);
    });
  });

});
