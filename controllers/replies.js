const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports = function(app) {

  // Show the reply to comment form.
  app.get('/posts/:postId/comments/:commentId/replies/new', (req, res) => {

    // redirect if not logged in
    const currentUser = req.user;
    if (currentUser === null) {
      return res.redirect('/login');
    }

    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const author = req.user;

    // TODO: Prevent post if not logged in...

    res.render('replies-new', {
      bodyClass: "reply",
      pageTitle: "Reply to comment:",
      postId,
      commentId
    });
  });

  app.post('/posts/:postId/comments/:commentId/replies', (req, res, next) => {
    // redirect if not logged in
    const currentUser = req.user;
    if (currentUser === null) {
      return res.redirect('/login');
    }

    const username = currentUser.username;

    const postId = req.params.postId;
    const commentId = req.params.commentId;

    Post.findById(postId).then((post) => {
      // console.log(">>> Found post:", post);
      const findComment = (id, comments) => {
        if (comments.length > 0) {
          for (var index = 0; index < comments.length; index++) {
            const comment = comments[index];
            if (comment._id == id) {
              console.log(">>> FOUND <<<<");
              return comment;
            }
            const foundComment = findComment(id, comment.comments);
            if (foundComment) {
              return foundComment;
            }
          }
        }
      };

      console.log("Step 1 find comment id -------------------");
      // console.log(">>> find nested Comment in post");
      // console.log(post.comments);
      const comment = findComment(commentId, post.comments); // post.comments.id(commentId);
      // const comment = post.comments.id(commentId);
      console.log(comment);
      // console.log(comment);
      // make a new comment
      const commentNew = new Comment({
        content: req.body.content,
        author: currentUser._id,
        postId,
        authorName: username
      });

      console.log(req.body.content);
      console.log("Step 2 unshift new comment ---------------------------");
      comment.comments.unshift(commentNew);
      post.markModified('comments');
      return post.save();
    }).then((post) =>{
      console.log("Step 3 Save post ---------------------------");
      console.log(post);
      res.redirect('/post/'+post._id);
    }).catch((err)=>{
      console.log(err);
    });
  })
}
