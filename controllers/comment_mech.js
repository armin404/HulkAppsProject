const Comment = require("../models/comment_sch");
const Post = require("../models/post_sch");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandeler = require("../middleware/async");


//Description     get all comments
//Route           GET /hi.api/v1/comments
//Route           GET /hi.api/v1/posts/:postId/comment
//Access          Public

exports.getComments = asyncHandeler(async (req, res, next) => {
  let query;

  if (req.params.postId) {
    query = Comment.find({ post: req.params.postId });
  } else {
    query = Comment.find();
  }

  const comments = await query;

  res
    .status(200)
    .json({ success: true, numberOfComments: comments.length, data: comments });
});


//Description     get all comments
//Route           GET /hi.api/v1/comment/:id
//Access          Public

exports.getComment = asyncHandeler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).populate({
    path: "post",
    select: "title",
  });

  if (!comment) {
    new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404);
  }

  res
    .status(200)
    .json({ success: true, numberOfComments: comments.length, data: comments });
});


//Description     create new comment
//Route           POST /hi.api/v1/posts/:postId/comments
//Access          Private (User must be registerd)

exports.createNewComment = asyncHandeler(async (req, res, next) => {
  req.body.post = req.params.postId;

  console.log(req.params.postId);

  const post = await Post.findById(req.params.postId);
  console.log(post);
  //There is a bug here that I dont have time to solve, but it is not major
  //Basicly it will let you comment on post that dont exist, but since
  //it pulls ID from url it means that you wuld need to open post that dont exist
  //to comment on it witch is not possible

  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment,
  });
});
