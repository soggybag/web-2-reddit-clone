// Validate your forms with express-validator
const express = require('express')
const jwt = require('jsonwebtoken')

const Post = require('../models/post')
const User = require('../models/user')

const { getPosts, getPost, removePost } = require('./post-methods')

// Notes:
// https://nordicapis.com/best-practices-api-error-handling/

const handleError = (res, status, message) => {
  // TODO: Handle errors here
  // ...
}

module.exports = (app) => {
  // Get Posts
  app.get('/api/posts', (req, res) => {
    getPosts().then((posts) => {
      res.status(200).json(posts)
    }).catch((err) => {
      // TODO: Errors need developement
      const status = 500
      const message = "oops"
      res.status(status).json({ status, message })
    })
  });

  // Get single post
  app.get('/api/posts/:id', (req, res) => {
    getPost(req.params.id).then((post) => {
      res.status(200).json(post)
    }).catch((err) => {
      // TODO: Errors need developement
      const status = 500
      const message = "oops"
      res.status(status).json({ status, message })
    })
  });

  // Edit post
  app.put('/api/posts/edit/:id', (req, res) => {
    // TODO: ...
  });

  // Delete post
  app.delete('/api/posts/delete/:id', (req, res) => {
    const { _id } = req.params
    const { user } = req
    removePost({ _id, author: user }).then((post) => {
      res.status(200).json({})
    }).catch((err) => {
      res.json(err)
    })
  })

  // New post
  app.post('/api/posts/new', (req, res) => {
    const { user } = req
    const newPost = new Post(req.body)
    newPost.author = user

    newPost.save().then((post) => {
      res.status(200).json(post)
    }).catch((err) => {
      // TODO: Errors need developement
      const status = 500
      const message = "oops"
      // res.status(status).json({ status, message })
      res.status(status).json(err)
    })
  })

  // Get Posts in category
  app.get('/api/posts/category/:category', (req, res) => {
    const { category } = req.params
    Post.find({ category }).then((posts) => {
      res.status(200).json(posts)
    }).catch((err) => {
      // TODO: Errors need developement
      const status = 500
      const message = "oops"
      res.status(status).json({ status, message })
    })
  });

  // Vote Post up
  app.put('/api/posts/vote-up/:id', (req, res) => {
    const { user } = req
    const { id } = req.params

    if (user === null) {
      // TODO: Return an error here.
      return;
    }

    Post.findById(id).then((post) => {
      post.downVotes.pull(user._id);
      post.upVotes.addToSet(user._id);
      post.voteTotal = post.upVotes.length - post.downVotes.length;

      post.save();

      res.status(200).json({ voteScore: post.voteScore });
    }).catch((err) => {
      // TODO: Errors need developement
      const status = 500
      const message = "oops"
      res.status(status).json({ status, message })
    });
  });

  // Vote Post down
  app.put('/api/posts/vote-down/:id', (req, res) => {
    const { user } = req;
    const { id } = req.params

    if (user === null) {
      // TODO: Return a json error here
      return;
    }

    Post.findById(id).then((post) => {
      post.upVotes.pull(user._id);
      post.downVotes.addToSet(user._id);
      post.voteTotal = post.upVotes.length - post.downVotes.length;

      post.save();

      res.status(200).json({ voteScore: post.voteScore });
    }).catch((err) => {
      // TODO: Errors need developement
      const status = 500
      const message = "oops"
      res.status(status).json({ status, message })
    });
  });

  // Comment new on post
  app.post('/api/comment/new', (req, res) => {
    const { postId } = req.body
    const { user } = req

    if (user === null) {
      return res.redirect('/login');
    }

    Post.findById(postId).then((post) => {
      const author = user;
      const authorId = author._id;
      const content = req.body.postContent;
      const authorName = author.username;

      const comment = new Comment({
        content,
        postId,
        author: authorId,
        authorName
      });

      post.comments.unshift(comment);
      post.save();
      return res.status(200).json(post)
    }).catch((err) => {
      // TODO: Need to develop errors
      const status = 500
      const message = "oops"
      res.status(status).json({ status, message })
    });
  });

  // Comment new reply
  app.post('/api/comment/reply', (req, res) => {

  });

  // Log in
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Find this user name
    User.findOne({ username }, 'username password').then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password" });
        }
        // Create a token
        const token = jwt.sign({
          _id: user._id,
          username: user.username,
          age: user.age,
          firstName: user.firstName,
          sign: user.sign
        }, process.env.SECRET,
          { expiresIn: "60 days" }
        );
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      });
    }).catch((err) => {
      res.json(err)
    });
  });

  // Log out
  app.post('/api/logout', (req, res) => {
    // TODO: What to return ???
    const status = 200
    const message = "Logged out"
    res.clearCookie('nToken');
    res.status(200).json({ status, message })
  });

  // Sign up
  app.post('/api/signup', (req, res) => {
    const { username, password } = req.body

    // Look up username

    User.findOne({ username }).then((user) => {
      console.log('----------------')
      console.log(user)
      console.log('----------------')
      if (user === null) {
        // This user name already exists
        const status = 500
        const message = "that user name exists"
        res.status(status).json({ status, message })
        return res.status(500).json({ status, message })
      }
      // Make a new user
    }).catch((err) => {
      // TODO: Improve error handling...
      const status = 500
      const message = "oops"
      res.status(status).json({ status, message })
    })

    // Create a new user
    const user = new User({
      username,
      password
    });

    // Save the user
    user.save().then((user) => {
      // Create a new jwt token
      const token = jwt.sign({ _id: user._id, loggedin: "loggedin" }, process.env.SECRET, {
        expiresIn: "60 days"
      });
      // Set a cookie
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
      // Redirect to root
      res.redirect('/');
    }).catch((err) => {
      console.log("Sign up", err);
      res.status(400).send({ err });
    });
  });

};

// Might use this -> https://github.com/cristiandouce/mongoose-voting
