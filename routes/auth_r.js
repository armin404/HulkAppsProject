const express = require('express');

//Inporting controller files
const {
    register
} = require('../controllers/auth_mech');

//Router setup
const router = express.Router();

//Routes
router                     
    .post('/register', register);
 

module.exports = router;