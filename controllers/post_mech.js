const Post = require('../models/post_sch');



//Description     get all posts
//Route           GET /hi.api/v1/posts
//Access          Public
exports.getPosts = (req, res, next) => {
    res.status(200).json({success:true, msg:"Show all posts" });
};


//Description     get single post
//Route           GET /hi.api/v1/posts/:id
//Access          Public
exports.getPost = (req, res, next) => {
    res.status(200).json({success:true, msg:`Get specific bootcamp ${req.params.id}` });
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
        res.status(400).json({
            success:false
        });
    }
    
};

//Description     update post
//Route           PUT /hi.api/v1/posts/:id
//Access          Private (User must be registerd, User must be author of the post)
exports.updatePost = (req, res, next) => {
    res.status(200).json({success:true, msg:`Edit existing post ${req.params.id}` });
};


//Description     delete post
//Route           DELETE /hi.api/v1/posts/:id
//Access          Private (User must be registerd, User must be author of the post)
exports.deletePost = (req, res, next) => {
    res.status(200).json({success:true, msg:`delete post ${req.params.id}` });
};



