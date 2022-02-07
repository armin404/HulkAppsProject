
//Logs requests to console
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol} ://${req.get('host')}${req.originalUrl} `);
    next();
};

module.exports = logger;

//This is my logger, I used morgan for this API, but this one is still functional