const { Schema, model, Types: {ObjectId} } = require('mongoose');

const CommentSchema = new Schema({
    content: { 
        type: String,
        required: true
    },
    user: {
        type: ObjectId, 
        required: true,
        ref: "User",
        index: true
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

CommentSchema.index({ blog: 1, createdAt: -1 });

const Comment = model('Comment', CommentSchema);
module.exports = { Comment, CommentSchema };