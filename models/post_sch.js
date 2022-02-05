const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add Title'],
        unique: true,  //Uniqu is set to true because there can not be more posts with same name
        trim: true,//This removes empity spaces on front and back of string entered
        maxlength: [120, 'Title can not be longer than 120 characters']
    },
    description: {
        type: String,
        maxlength: [5000, 'Post can not be longer than 500 characters'], //It can be longer this is just for this Test
        required: [true, 'Write your post here']
    },
    title_photo:{
        type:String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', PostSchema);