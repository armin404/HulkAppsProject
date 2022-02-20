const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

//Files
const posts = require("./routes/posts_r"); //Route Files
const comments = require("./routes/comments_r"); //Route Files
const auth = require("./routes/auth_r"); //Route Files
const logger = require("./middleware/logger"); //Logger Files
const connectDB = require("./config/dataBase"); //DB Files
const errorHandler = require("./middleware/error"); //Costum error handler

//App
const app = express();


//Body parser
app.use(express.json());

app.use(cors());

//Cookie parser
app.use(cookieParser());

//DBconnection
connectDB();

//Loger
//NOTE: for development only
// app.use(logger);   This is my logger
app.use(morgan("dev"));

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//XSS Protection
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowsMs: 10*60*1000,//10 Minutes
  max:100
});

app.use(limiter);

//Prevent HPP
app.use(hpp());

app.use(express.static(path.join(__dirname, 'public')));

//Ruters
app.use("/ha.api/v1/posts", posts);
app.use("/ha.api/v1/comments", comments);
app.use("/ha.api/v1/auth", auth);

//Error Hendler
app.use(errorHandler);

// var port = process.env.PORT || 3000;
app.listen(process.env.PORT || 5000, function() {
  console.log("Listening on Port 3000");
  });

//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(colors.red.underline(`Error: ${err.message}`));
  //When DB fails to connect server crashes
  server.close(() => process.exit(1));
});
