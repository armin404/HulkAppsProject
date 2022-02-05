const Comment = require('../models/comment_sch');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandeler = require('../middleware/async');


//Description     get all comments
//Route           GET /hi.api/v1/comments
//Route           GET /hi.api/v1/posts/:postId/comment
//Access          Public
exports.getComments = asyncHandeler(async (req, res, next) => {
    
    let query;

    if(req.params.postId){
        query = Comment.find({post: req.params.postId})
    }else{
        query = Comment.find()
    }
  
    const comments = await query
  
    res.status(200).json({ success: true,numberOfComments:comments.length, data: comments });
  });