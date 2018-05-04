const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema= new Schema({
    account:   String,
    content:  String,
})

const FeedSchema = new Schema({
    account:   String,
    timeStamp: Date,
    contents:  String,
    upvotes:   Number,
    usersLike:[String],
    location:  String,
    image:     String,
    comments:   [CommentSchema]
})

const UserSchema = new Schema({
    account: String,
    password: String,
    followers: [String],
    followings:[String],
    feeds: [FeedSchema]
}); 





module.exports = mongoose.model('User',UserSchema);