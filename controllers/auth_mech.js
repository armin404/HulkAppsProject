const User = require('../models/user_sch');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandeler = require('../middleware/async');


//Description     Register User
//Route           GET /hi.api/v1/auth/register
//Access          Public

exports.register = asyncHandeler(async (req, res, next)=>{
    const {name, email, password, role} = req.body;


    const user = await User.create({
        name,
        email,
        password,
        role
    });

    //Create Token
    const token = user.getSignedJwtToken();

    res.status(200).json({
        success:true,
        token
    });
});