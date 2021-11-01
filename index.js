const express = require('express')
const app = express();

app.get(`/api`, (req, res) => {
    res.send('Hello Node.js')
})

app.listen('3000', (req, res) => {
    console.log('server is live on localhost:3000')
})