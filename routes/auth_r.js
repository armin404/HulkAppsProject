const express = require('express');

//Inporting controller files
const {
    register,
    login,
    getMe,
    forgotPassword,
    resetPassword
} = require('../controllers/auth_mech');
const {protect} = require('../middleware/auth');

//Router setup
const router = express.Router();

//Routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword);
 

module.exports = router;