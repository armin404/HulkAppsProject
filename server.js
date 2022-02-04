const express = require('express');
const morgan = require('morgan');

//Files
const posts = require('./routes/posts_r'); //Route Files
const logger = require('./middleware/logger');//Logger Files
const connectDB = require('./config/dataBase')//DB Files

//App
const app = express();

//DBconnection
connectDB();

//Loger
//NOTE: for development only
app.use(logger);
app.use(morgan('dev'));
//Ruters
app.use('/ha.api/v1/posts', posts);








const PORT = 5000;
const server = app.listen(PORT, console.log(`Server running on port ${PORT}`));

//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //When DB fails to connect server crashes
    server.close(() => process.exit(1))
})


