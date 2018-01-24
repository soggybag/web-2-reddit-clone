const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = require('./comment');

const PostSchema = new Schema({
  title:      { type: String, required: true },
  content:    { type: String, required: true },
  createdAt:  { type: Date },
  updatedAt:  { type: Date },
  category:   { type: String, required: true },
  comments:   [Comment.schema],
  author:     { type: Schema.Types.ObjectId, ref: 'user', required: true },
  upVotes:    [ String ], // [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
  downVotes:  [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
  voteTotal:  { type: Number, default: 0 }
});

// Use a regular function here to avoid issues with this! () => {} DOES NOT bind this

PostSchema.pre('save', function(next) {
  const date = new Date();
  this.updatedAt = date;
  if ( !this.createdAt ) {
    this.createdAt = date;
  }
  next();
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
