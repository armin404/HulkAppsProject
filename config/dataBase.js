const mongoose = require('mongoose');
const colors = require('colors');

//DB Connection setup
const connectToDataBase = async () =>{
    const connection = await mongoose.connect('');
    console.log(colors.bgMagenta(`MongoDB Connected: ${connection.connection.host}`));
    console.log(colors.bold('-Connection successful-'))
};

module.exports = connectToDataBase;
