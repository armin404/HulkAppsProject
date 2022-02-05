const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentText: {
        type:String,
        required: [true, 'Enter coment'],
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref:'Post',
        required:true
    }
});

module.exports = mongoose.model('Comment',CommentSchema);