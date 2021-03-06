const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dev = require('./dev');

const users = [];

const server = async() => {
    try {
        await mongoose.connect(dev.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if(err) console.log({ err })
        });
        console.log('MongoDB connected...')

        app.use(express.json())

        app.get('/user', (req, res) => {
            return res.send({ users: users })
        })

        app.post('/user', (req, res) => {
            users.push({ name: req.body.name, age: req.body.age })
            return res.send({ success: true })
        })

        app.listen(3000, () => {
            console.log('server listening on port 3000');
        })
    } catch(err) {
        console.log({ err })
    }
    
}

server();

