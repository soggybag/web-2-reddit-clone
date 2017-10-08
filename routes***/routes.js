// Validate your forms with express-validator
const express = require('express');
const { check, validationResult } = require('express-validator/check'); // import check, validationResult
const { matchedData } = require('express-validator/filter');            // matched data
const router = express.Router();

const Post = require('../models/post');

// Routes
router.all('/', (req, res, next) => {
  console.log("All routes handled");
  next(); // pass control to the next handler.
});

router.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: "Home"
  });
});

router.get('/posts', (req, res) => {
  Post.find({}).then((posts) => {
    res.render('posts.hbs', {
      pageTitle: "Posts",
      posts
    });
  }).catch((err) => {
    console.log("Error finding posts:", err);
  });

});

// Get a post by passing a query string.
router.get('/post/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  Post.findById(id).then((post) => {
    console.log("Found post:", post);
    res.render('post.hbs', {
      pageTitle: "Post",
      post
    });
  }).catch((err) => {
    console.log("Error finding posts:", err);
  });
});


router.get('/posts/new', (req, res) => {
  res.render('posts-new.hbs', {
    pageTitle: "Posts New"
  });
});

router.get('/n/:category', (req, res) => {
  const category = req.params.category;
  console.log(category);
  Post.find({ category }).then((posts) => {
    res.render('posts', {
      pageTitle: `Posts: ${category}`,
      posts
    });
  }).catch((err) => {
    console.log("Post Category error:", err);
  });
});

// Add a new second parameter an array of validations
router.post('/posts/new', [
  check('postTitle', 'Title must not be empty').isLength({ min: 1 }),
  check('postContent', "Don't you want to include some content?").isLength({ min: 1 })
], (req, res) => {
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

  Post.create({
    title,
    content,
    category
  }).then((post) => {
    console.log("Post created");
    return post.save();
  }).then((post) => {
    console.log("Post Saved");
    res.render('post-sent', {
      pageTitle: 'Post Saved!',
      message: `Your post was successfully created id: ${post._id}`
    });
  }).catch((err) => {
    console.log("Post Error", err);
  });
});

module.exports = router;
