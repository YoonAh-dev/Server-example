const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { userRouter, blogRouter } = require('./routes');
const { generateFakeData } = require('../faker2');



const server = async() => {
    try {
        const { MONGO_URI, PORT } = process.env;
        if(!MONGO_URI) throw new Error("MONGO_URI is required!!")
        if(!PORT) throw new Error("PORT is required!!")

        await mongoose.connect(MONGO_URI, 
            { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, (err) => {
            if(err) console.log({ err })
        });
        // mongoose.set("debug", true);
        console.log('MongoDB connected...')

        app.use(express.json())

        app.use('/user', userRouter);
        app.use('/blog', blogRouter);

        app.listen(PORT, async () => {
            try {
                console.log(`server listening on port ${PORT}`);
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

