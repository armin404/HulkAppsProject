const User = require('../models/user_sch');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


//Description     Register User
//Route           GET /hi.api/v1/auth/register
//Access          Public

exports.register = asyncHandler(async (req, res, next)=>{
    const {name, email, password, role} = req.body;


    const user = await User.create({
        name,
        email,
        password,
        role
    });

    sendTokenResponse(user, 200, res);
});


//Description     Login User
//Route           POST /hi.api/v1/auth/login
//Access          Public

exports.login = asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body;

    //Validate Email and password
    if(!email || !password){
        return next(new ErrorResponse('Please provide an email and password', 400));
    }

    //Check for user
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorResponse('Invalid Credentails', 401));//Fix Error handler
    }

    //Check Password
    const isMatched = await user.matchPassword(password);

    if(!isMatched){
        return next(new ErrorResponse('Invalid Credentails', 401));
    }

    sendTokenResponse(user, 200, res);
});

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) =>{
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now + 10 * 60 * 60 * 1000),//This brings time to 10h same as our JWT
        httpOnly:true
    };
    res.status(statusCode).cookie('token', token,options).json({succes:true, token});
}

//Description     Current Logged in user
//Route           POST /hi.api/v1/auth/me
//Access          Private
exports.getMe = asyncHandler(async (req, res, next) => {
    // user is already available in req due to the protect middleware
    const user = req.user;
  
    res.status(200).json({
      success: true,
      data: user,
    });
  });