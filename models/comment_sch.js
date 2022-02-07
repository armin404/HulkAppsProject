const mongoose = require("mongoose");

//Coment Schema
const CommentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: [true, "Enter coment"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //This part i enableing us to pull post id when creating comment
  //And letting mongoose know that this is reffering to the Post schema
  post: {
    type: mongoose.Schema.ObjectId, //Adding ref. to the Post Schema
    ref: "Post",
    required: true,
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
