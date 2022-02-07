const express = require('express');
const {protect, authorize} = require('../middleware/auth');//Works the same for other routes that we want to protect

//Inporting controller files
const {
    getPosts,
    getPost,
    createNewPost,
    updatePost,
    deletePost
} = require('../controllers/post_mech');

const commentRouter = require('./comments_r');

//Router setup
const router = express.Router();

//Re-route into other resource routers
router.use('/:postId/comments', commentRouter)

//Routes
router                    
    .route('/')
    .get(getPosts)
    .post(protect,authorize('publisher'), createNewPost)//This route is only one protected for testing

router                   
    .route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)

module.exports = router;