// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");

// const userSchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: [true, "Your email address is required"],
  //   unique: true,
  // },
  // username: {
  //   type: String,
  //   required: [true, "Your username is required"],
  // },
  // password: {
  //   type: String,
  //   required: [true, "Your password is required"],
  // },
  // createdAt: {
  //   type: Date,
  //   default: new Date(),
  // },
// });

// userSchema.pre("save", async function () {
//   this.password = await bcrypt.hash(this.password, 12);
// });

// module.exports = mongoose.model("User", userSchema);

// user.js
const mongoose = require('mongoose');
const pdfSchema = require('./pdf').schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  // username: {
  //   type: String,
  //   required: true,
  //   unique: true
    
  // },
  pdfs: [pdfSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
