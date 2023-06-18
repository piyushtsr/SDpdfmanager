// comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
