const express = require('express');

//Inporting controller files
const {
    getComments,
    createNewComment,
    getComment
} = require('../controllers/comment_mech');

//Router setup
const router = express.Router({mergeParams: true});

//Routes
router                     
    .route('/')
    .get(getComments)
    .post(createNewComment)
    

router
    .route('/:id')
    .get(getComment)

module.exports = router;