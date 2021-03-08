const { Schema, model, Types: {ObjectId} } = require('mongoose');

const CommentSchema = new Schema({
    content: { 
        type: String,
        required: true
    },
    user: {
        type: ObjectId, 
        required: true,
        ref: "User"
    },
    userFullName: {
        type: String,
        required: true
    },
    blog: {
        type: ObjectId,
        required: true,
        ref: "Blog"
    }
}, { timestamps: true })

const Comment = model('Comment', CommentSchema);
module.exports = { Comment, CommentSchema };