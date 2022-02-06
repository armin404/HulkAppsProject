const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = ('express-fileupload');
const cookieParser = require('cookie-parser');

//Files
const posts = require('./routes/posts_r'); //Route Files
const comments = require('./routes/comments_r'); //Route Files
const auth = require('./routes/auth_r'); //Route Files
const logger = require('./middleware/logger');//Logger Files
const connectDB = require('./config/dataBase');//DB Files
const errorHandler = require('./middleware/error');//Costum error handler

//App
const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//DBconnection
connectDB();

//Loger
//NOTE: for development only
// app.use(logger);
app.use(morgan('dev'));


//File Upload
// app.use(fileupload());

//Ruters
app.use('/ha.api/v1/posts', posts);
app.use('/ha.api/v1/comments', comments);
app.use('/ha.api/v1/auth', auth);

//Error Hendler
app.use(errorHandler);












const PORT = 5000;
const server = app.listen(PORT, console.log(colors.green(`Server running on port ${PORT}`)));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(colors.red.underline(`Error: ${err.message}`));
    //When DB fails to connect server crashes
    server.close(() => process.exit(1))
})


