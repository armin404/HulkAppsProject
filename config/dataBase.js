const mongoose = require('mongoose');

const connectToDataBase = async () =>{
    const connection = await mongoose.connect('mongodb+srv://armin404:123123gg@maincluster.2ikel.mongodb.net/HulkAppsProject?retryWrites=true&w=majority');
    console.log(`MongoDB Connected: ${connection.connection.host}`);
    console.log('-Connection successful-')
};

module.exports = connectToDataBase;