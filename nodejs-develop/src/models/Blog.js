const { Schema, model, Types } = require('mongoose');
const { CommentSchema } = require('./Comment')

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isLive: {
        type: Boolean,
        required: true,
        default: false
    },
    user: { _id: {
            type: Types.ObjectId,
            required: true,
            ref: 'User'
        },
        username: {  
            type: String, 
            required: true 
        },
        name: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String,
                required: true
            }
        }
    },
    // comments: [ CommentSchema ]
}, { timestamps: true })

// 복합키 만드는 곳(index 하나 만드는 것)
BlogSchema.index({ 'user._id': 1, updateAt: 1 })
BlogSchema.index({ title: "text", content: "text" })

// 가상데이터
// BlogSchema.virtual("comments", {
//     ref: "Comment",
//     localField: "_id",
//     foreignField: "blog"
// });

// BlogSchema.set("toObject", { virtuals: true });
// BlogSchema.set("toJSON", { virtuals: true });

const Blog = model('Blog', BlogSchema);
module.exports = { Blog }