const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'Please enter your name']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email adress'
        ]
    },
    role:{
        type:String,
        enum:['user', 'publisher'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minlenght:6,
        select:false
    },
    resetPasswordToken:String,
    ResetPasswordExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now
    }
    
});

//Encrypt password
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

//Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id},'1',{expiresIn:'10h'});
}

//Match password to hashed password in DB
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);