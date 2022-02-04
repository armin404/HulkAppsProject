const express = require('express');
const morgan = require('morgan');

//Files
const posts = require('./routes/posts_r'); //Route Files
const logger = require('./middleware/logger');//Logger Files

//App
const app = express();

//Loger

//NOTE: for development only
app.use(logger);
app.use(morgan('dev'));
//Ruters
app.use('/ha.api/v1/posts', posts);








const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));


