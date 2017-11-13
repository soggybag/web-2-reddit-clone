// Validate your forms with express-validator
const express = require('express');
const { check, validationResult } = require('express-validator/check'); // import check, validationResult
const { matchedData } = require('express-validator/filter');            // matched data

const Post = require('../models/post');
const User = require('../models/user');

module.exports = (app) => {

  /**********************************************
  /
  / Home Route: Get
  /
  /**********************************************/
  app.get('/', (req, res) => {
    const currentUser = req.user;
    let message = "";
    let loggedin = "";
    if (currentUser !== null) {
      message = `Welcome back ${currentUser.username}`;
      loggedin = "loggedin"
    }

    res.render('home.hbs', {
      ...req.user,
      bodyClass: `home ${loggedin}`,
      pageTitle: "Home",
      currentUser,
      message: message
    });
  });

  /**********************************************
  /
  / Get Posts
  /
  /*********************************************/
  app.get('/posts', (req, res) => {
    Post.find({}).populate('author').then((posts) => {
      const currentUser = req.user;
      let loggedin = "";
      if (currentUser !== null) {
        loggedin = "loggedin"
      }
      res.render('posts.hbs', {
        ...req.user,
        bodyClass: `posts ${loggedin}`,
        pageTitle: "Posts",
        posts,
        currentUser
      });
    }).catch((err) => {
      console.log("Error finding posts:", err);
    });
  });

  /**********************************************
  /
  / Get Post by Id
  /
  /*********************************************/
  // localhost:3000/post/1234
  app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    const currentUser = req.user;
    let loggedin = "";
    if (currentUser !== null) {
      loggedin = "loggedin"
    }
      Post.findById(id)
        /*

      .populate({
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'author',
          model: 'user'
        }
      })

      */
      // .populate('comments.author')
      // .populate({path:"comment.author", model: 'user'})
      .populate('author')
      .then((post) => {
      const currentUser = req.user;

      res.render('post.hbs', {
        ...req.user,
        bodyClass: `post ${loggedin}`,
        pageTitle: "Post",
        post
      });
    }).catch((err) => {
      console.log("Error finding posts:", err);
    });
  });

  // Get new Post form
  app.get('/posts/new', (req, res) => {
    const currentUser = req.user;
    let loggedin = "";
    if (currentUser === null) {
      return res.redirect('/login');
    } else {
      loggedin = "loggedin";
    }

    res.render('posts-new.hbs', {
      ...req.user,
      bodyClass: `post-new ${loggedin}`,
      pageTitle: "Posts New",
      currentUser
    });
  });

  /**********************************************
  /
  / Get posts in category
  /
  /*********************************************/

  app.get('/n/:category', (req, res) => {
    const category = req.params.category;
    const currentUser = req.user;
    let loggedin = "";
    if (currentUser !== null) {
      loggedin = "loggedin"
    }
    Post.find({ category }).then((posts) => {
      const currentUser = req.user;
      res.render('posts', {
        ...req.user,
        bodyClass: `category ${category} ${loggedin}`,
        pageTitle: `Posts: ${category}`,
        posts,
        currentUser
      });
    }).catch((err) => {
      console.log("Post Category error:", err);
    });
  });

  /**********************************************
  /
  / Add a new Post
  /
  / Second parameter an array of validations
  /
  /*********************************************/
  app.post('/posts/new', [
    check('postTitle', 'Title must not be empty').isLength({ min: 1 }),
    check('postContent', "Don't you want to include some content?").isLength({ min: 1 })
  ], (req, res) => {
    // Check user redirect if not logged in
    const currentUser = req.user;
    let loggedin = "";
    if (currentUser === null) {
      return res.redirect('/login');
    } else {
      loggedin = "loggedin";
    }

    // Validate this request
    const errors = validationResult(req); // Validate the req obj

    // Check for errors
    if (!errors.isEmpty()) {
      // Handle an invalid form
      return res.status(422).json({ errors: errors.mapped() });
    }

    // Render when no errors.

    const title = req.body.postTitle;
    const content = req.body.postContent;
    const category = req.body.postCategory;
    const author = req.user;
    const authorId = author._id;

    // Post.create().then().then().catch();

    Post.create({
      title,
      content,
      category,
      author: authorId
    }).then((post) => {
      console.log("Post created");
      return post.save();
    }).then((post) => {
      console.log("Post Saved");
      return res.redirect(`/post/${post._id}`);
    }).catch((err) => {
      console.log("Post Error", err);
    });
  });


  /**********************************************
  /
  / Up / Down vote
  /
  /*********************************************/
  app.put('/posts/:id/vote-up', (req, res) => {
    const user = req.user;
    if (user === null) {
      return;
    }

    Post.findById(req.params.id).then((post) => {
      post.downVotes.pull(user._id);
      post.upVotes.addToSet(user._id);
      post.voteTotal = post.upVotes.length - post.downVotes.length;

      post.save();

      res.status(200).json({ voteScore: post.voteScore });
    }).catch((err) => {
      console.log(err);
    });
  });

  app.put('/posts/:id/vote-down', (req, res) => {
    const user = req.user;
    if (user === null) {
      return;
    }

    Post.findById(req.params.id).then((post) => {
      post.upVotes.pull(user._id);
      post.downVotes.addToSet(user._id);
      post.voteTotal = post.upVotes.length - post.downVotes.length;

      post.save();

      res.status(200).json({ voteScore: post.voteScore });
    }).catch((err) => {
      console.log(err);
    });
  })
};

// Might use this -> https://github.com/cristiandouce/mongoose-voting
