const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports = (app) => {

  /**********************************************
  /
  / Add new comment to post
  /
  /*********************************************/
  app.post('/post/:postId/comments', (req, res) => {
    const currentUser = req.user;
    if (currentUser === null) {
      return res.redirect('/login');
    }
    const postId = req.params.postId;
    Post.findById(postId).then((post) => {
      const author = req.user;
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
      return res.redirect('/post/'+postId);
    }).catch((err) => {

    });
  });

  /*
  app.post('/post/:postId/comments', (req, res) => {
    const postId = req.params.postId;
    const content = req.body.postContent;

    Post.findById(postId).then((post) => {
      const author = req.user;
      const authorId = author._id;

      const comment = new Comment({
        content,
        author: authorId
      });

      comment.save().then((comment) => {
        post.comments.unshift(comment);
        post.save().then((post) => {
          return res.redirect(`/post/${post._id}`);
        });
      });
    });
  });
  */
};
