const express = require('express');

//Inporting controller files
const {
    getComments
} = require('../controllers/comment_mech');

//Router setup
const router = express.Router({mergeParams: true});

//Routes
router                     //Routes that dont require id
    .route('/')
    .get(getComments)

module.exports = router;