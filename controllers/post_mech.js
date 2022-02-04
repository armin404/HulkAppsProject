



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
exports.createNewPost = (req, res, next) => {
    res.status(200).json({success:true, msg:"Create new post" });
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



