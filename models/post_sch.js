const mongoose = require('mongoose');
const slugify = require('slugify');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add Title'],
        unique: true,  //Uniqu is set to true because there can not be more posts with same name
        trim: true,//This removes empity spaces on front and back of string entered
        maxlength: [120, 'Title can not be longer than 120 characters']
    },
    slug:String,
    description: {
        type: String,
        maxlength: [5000, 'Post can not be longer than 500 characters'], //It can be longer this is just for this Test
        required: [true, 'Please write your post here']
    },
    title_photo:{
        type:String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
    // comments:{
    //     //Add comment author
    //     type:[String],
    //     required:[false, 'Enter your Comment'],
    //     maxlength:1000,
    //     trim:true,
    //     date: Date.now,
    //     default:''
    // }
    //Add post author to post schema 
},{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
});

//Create slug from the title
PostSchema.pre('save', function(next) {
    this.slug = slugify(this.title, {lower:true})
    next();
});

//Reverse populate with virtuals
PostSchema.virtual('comments',{
    ref:'Comment',
    localField:'_id',
    foreignField:'post',
    justOne:false
});

module.exports = mongoose.model('Post', PostSchema);