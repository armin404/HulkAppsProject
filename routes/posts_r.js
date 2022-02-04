const express = require('express');

//Inporting controller files
const {
    getPosts,
    getPost,
    createNewPost,
    updatePost,
    deletePost
} = require('../controllers/post_mech');

//Router setup
const router = express.Router();

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

module.exports = router;