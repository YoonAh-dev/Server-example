const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dev = require('./dev');
const { userRouter, blogRouter } = require('./routes');
const { generateFakeData } = require('../faker2');

const server = async() => {
    try {
        await mongoose.connect(dev.mongoURI, 
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
            if(err) console.log({ err })
        });
        // mongoose.set("debug", true);
        console.log('MongoDB connected...')

        app.use(express.json())

        app.use('/user', userRouter);
        app.use('/blog', blogRouter);

        app.listen(3000, async () => {
            try {
                console.log('server listening on port 3000');
                // await generateFakeData(10, 2, 10);
            } catch (err) {
                console.log({ err })
            }
        })
    } catch(err) {
        console.log({ err })
    }
}

server();

