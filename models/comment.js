const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content:    { type: String, required: true },
  createdAt:  { type: Date },
  updatedAt:  { type: Date },
  comments:   [this], // <-- Reference to CommentSchema ???
  author:     { type: Schema.Types.ObjectId, ref: 'user', required: true },
  authorName: { type: String, required: false },
  postId:     { type: Schema.Types.ObjectId, ref: 'post', required: true },
});



// Use a regular function here to avoid issues with this!
CommentSchema.pre('save', function(next) {
  const date = new Date();
  this.updatedAt = date;
  if ( !this.createdAt ) {
    this.createdAt = date;
  }
  next();
});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
