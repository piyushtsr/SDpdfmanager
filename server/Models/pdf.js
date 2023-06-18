// pdf.js
const mongoose = require('mongoose');
const commentSchema = require('./comment').schema;
// const {commentSchema} = require(__dirname +'/comment.js').schema;

const pdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  comments: [commentSchema]
});

const PDF = mongoose.model('PDF', pdfSchema);

module.exports = PDF;
