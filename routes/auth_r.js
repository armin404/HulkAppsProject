const express = require('express');

//Inporting controller files
const {
    register,
    login,
    getMe
} = require('../controllers/auth_mech');
const {protect} = require('../middleware/auth');

//Router setup
const router = express.Router();

//Routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe)
 

module.exports = router;