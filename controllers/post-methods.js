const Post = require('../models/post');

module.exports.getPosts = () => {
  return Post.find().populate('author')
}

module.exports.getPost = (id) => {
  return Post.findById(id).populate('author')
}

module.exports.removePost = (_id, user) => {
  return Post.remove({ _id, author: user })
}

module.exports.newPost = () => {
  newPost.save().then((post) => {
    res.status(200).json(post)
  }).catch((err) => {
    // TODO: Errors need developement
    const status = 500
    const message = "oops"
    // res.status(status).json({ status, message })
    res.status(status).json(err)
  })
}
