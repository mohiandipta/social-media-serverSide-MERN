const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

const morgan = require('morgan')
require('dotenv').config()

//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
}).then(() => console.log('db connected'))
    .catch((err) => console.log('db connection error =>', err))

app.get(`/user`, (req, res) => {
    let user = {
        fName: 'mohian',
        lName: 'dipta',
        email: 'mohian@gmail.com',
        password: '123456'
    }
    res.send(user)
})

app.listen('8000', (req, res) => {
    console.log('server is live on localhost:8000')
})