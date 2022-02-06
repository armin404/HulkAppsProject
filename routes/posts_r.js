const express = require('express');

//Inporting controller files
const {
    getPosts,
    getPost,
    createNewPost,
    updatePost,
    deletePost,
    postPhotoUpload
} = require('../controllers/post_mech');

const commentRouter = require('./comments_r');

//Router setup
const router = express.Router();

//Re-route into other resource routers
router.use('/:postId/comments', commentRouter)

//Routes
router                     //Routes that dont require id
    .route('/')
    .get(getPosts)
    .post(createNewPost)

router                    //Routes that require id
    .route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost)

// router
//     .route('/:id/photo')
//     .put(postPhotoUpload)

module.exports = router;