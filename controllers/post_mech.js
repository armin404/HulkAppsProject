const Post = require('../models/post_sch');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandeler = require('../middleware/async');


//Description     get all posts
//Route           GET /hi.api/v1/posts
//Access          Public
exports.getPosts = asyncHandeler(async (req, res, next) => {
  
  /////////////////////////////////////////////////////////

  let query;

  let reqQuery = {...req.body};

  let queryStr = JSON.stringify(req.query);

  const removeFields = ['select', 'page', 'limit'];

  removeFields.forEach(param => delete reqQuery[param]);

  queryStr = queryStr.replace(/\b(ge|gte|lt|lte|in)\b/g, match => `$${match}`);
  
  query = Post.find(JSON.parse(queryStr)).populate('comments');


    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 2) || 2;
    const startIndex = (page - 1) * limit;
    const endIndex = page*limit;
    const total = await Post.countDocuments();

    query = query.skip(startIndex).limit(limit);
    const posts = await query;

    //pagination result
    const pagination = {};

    if(endIndex<total){
        pagination.next={
            page:page+1,
            limit
        }
    }
    if(endIndex>0){
        pagination.prev={
            page:page-1,
            limit
        }
    }
  /////////////////////////////////////////////////////////
  
  
  
    // const posts = await query();

  res.status(200).json({
    success: true,
    numberOfPosts: posts.length,
    pagination,
    data: posts,
  });
  
});


//Description     get single post
//Route           GET /hi.api/v1/posts/:id
//Access          Public
exports.getPost = asyncHandeler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: post });
});


//Description     create new post
//Route           POST /hi.api/v1/posts
//Access          Private (User must be registerd)
exports.createNewPost = asyncHandeler(async (req, res, next) => {
  //Add publisher
  req.body.user=req.user.id;

  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    data: post,
  });
});


//Description     update post
//Route           PUT /hi.api/v1/posts/:id
//Access          Private (User must be registerd, User must be author of the post)
exports.updatePost = asyncHandeler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  //Check if user is the publicher of the post
  if(post.user.toString() !== req.user.id && req.user.role !== 'admin'){
    return next(new ErrorResponse(`User ${req.params.id} is not authorized to update this post`, 404));
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body,{
      new:true,
      runValidators:true
  });

  res.status(200).json({ success: true, data: post });
});


//Description     delete post
//Route           DELETE /hi.api/v1/posts/:id
//Access          Private (User must be registerd, User must be author of the post)
exports.deletePost = asyncHandeler(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id, req.body);

  if (!post) {
    return res.status(400).json({ success: false });
  }
  res.status(200).json({ success: true, data: {} });
});

// //Description     Upload Photo for post
// //Route           PUT /hi.api/v1/posts/:id/photo
// //Access          Private (User must be registerd, User must be author of the post)
// exports.postPhotoUpload = asyncHandeler(async (req, res, next) => {
//   const post = await Post.findById(req.params.id);

//   if (!post) {
//     return res.status(400).json({ success: false });
//   }

//   if(!req.files){
//     return next(
//       new ErrorResponse(`Please upload the file`, 400)
//     );
//   }

//   res.status(200).json({ success: true, data: {} });
// });


