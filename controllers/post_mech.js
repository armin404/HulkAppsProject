const Post = require('../models/post_sch');
const ErrorResponse = require('../utils/errorResponse');


//Description     get all posts
//Route           GET /hi.api/v1/posts
//Access          Public
exports.getPosts = async(req, res, next) => {

    try {
        const posts = await Post.find()

        res.status(200).json({
            success:true,
            numberOfPosts:posts.length,
            data:posts
        });
    } catch (error) {
        next(error);
    }
};


//Description     get single post
//Route           GET /hi.api/v1/posts/:id
//Access          Public
exports.getPost = async (req, res, next) => {
    
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
        }

        res.status(200).json({success:true, data:post});
    } catch (error) {
        next(error);
    }
};

//Description     create new post
//Route           POST /hi.api/v1/posts
//Access          Private (User must be registerd)
exports.createNewPost = async (req, res, next) => {    
    try {
        const post = await Post.create(req.body);

    res.status(201).json({
        success: true,
        data: post
    });
    } catch (error) {
        next(error);
    }
};

//Description     update post
//Route           PUT /hi.api/v1/posts/:id
//Access          Private (User must be registerd, User must be author of the post)
exports.updatePost = async (req, res, next) => {
    
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        });
        
        if(!post){
            return next(new ErrorResponse(`Post not found with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success:true, data:post});
    } catch (error) {
        next(error);
    }
};


//Description     delete post
//Route           DELETE /hi.api/v1/posts/:id
//Access          Private (User must be registerd, User must be author of the post)
exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id, req.body);
    
        if(!post){
            return res.status(400).json({success: false });
        }
        res.status(200).json({success:true, data:{}});
    } catch (error) {
        next(error);
    }
};



