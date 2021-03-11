const { Router } = require('express');
const blogRouter = Router();
const { isValidObjectId } = require('mongoose');
const { Blog, User, Comment } = require('../models');
const { commentRouter } = require('./commentRoute');

blogRouter.use("/:blogId/comment", commentRouter);

blogRouter.post('/', async (req, res) => {
    try {
        const { title, content, isLive, userId } = req.body;
        if(typeof title !== 'string') 
            return res.status(400).send({ err: 'title is required' });
        if(typeof content !== 'string') 
            return res.status(400).send({ err: 'content is required' });
        if(isLive && typeof isLive !== 'boolean') 
            return res.status(400).send({ err: 'isLive must be boolean' });
        if(!isValidObjectId(userId)) 
            return res.status(400).send({ err: 'userId is invalid' });
        let user = await User.findById(userId);
        if(!user) res.status(400).send({ err: 'user does not exist' });

        let blog = new Blog({ ...req.body, user });
        await blog.save();
        return res.send({ blog });
    } catch (err) {
        console.log({ err });
        return res.status(500).send({ err: err.message });
    }
})

blogRouter.get('/', async (req, res) => {
    try {
        let { page } = req.query;
        page = parseInt(page);
        console.log({ page })
        const blogs = await Blog.find({})
            .sort({ updateAt: 1 })
            .skip(page * 3)
            .limit(3);
        //     .populate([
        //         { path: "user" }, 
        //         { path: "comments", populate: { path: "user" } }
        //     ]);

        return res.send({ blogs });
    } catch (err) {
        console.log({ err });
        return res.status(500).send({ err: err.message });
    }
})

blogRouter.get('/:blogId', async (req, res) => {
    try {
        const { blogId } = req.params;
        if(!isValidObjectId(blogId)) {
            return res.status(400).send({ err: "invalid blogId" });
        }

        const blog = await Blog.findOne({ _id: blogId });
        // const commentCount = await Comment.find({ blog: blogId }).countDocuments();

        return res.send({ blog, commentCount })
    } catch (err) {
        console.log({ err });
        return res.status(500).send({ err: err.message });
    }
})

blogRouter.put('/:blogId', async (req, res) => {
    try {
        const { blogId } = req.params;
        if(!isValidObjectId(blogId)) {
            return res.status(400).send({ err: "invalid blogId" });
        }

        const { title, content } = req.body;
        if(typeof title !== 'string') 
            res.status(400).send({ err: 'title is required' });
        if(typeof content !== 'string') 
            res.status(400).send({ err: 'content is required' });

        const blog = await Blog.findOneAndUpdate({ _id: blogId }, { title, content }, { new: true });
        return res.send({ blog });
    } catch (err) {
        console.log({ err });
        return res.status(500).send({ err: err.message });
    }
})

blogRouter.patch('/:blogId/live', async (req, res) => {
    try {
        const { blogId } = req.params;
        if(!isValidObjectId(blogId)) {
            return res.status(400).send({ err: "invalid blogId" });
        }

        const { isLive } = req.body;
        if(typeof isLive !== 'boolean') res.status(400).send({ err: 'Boolean isLive is required' });

        const blog = await Blog.findByIdAndUpdate(blogId, { isLive }, { new: true });
        return res.send({ blog });
    } catch (err) {
        console.log({ err });
        return res.status(500).send({ err: err.message });
    }
})

module.exports = { blogRouter };