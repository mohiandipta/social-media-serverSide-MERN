const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')

//.env
require('dotenv').config()
const port = process.env.PORT || 8000

//db connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
}).then(() => console.log('db connected'))
    .catch((err) => console.log('db connection error =>', err))

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(logger('combined'));
app.use(
    cors({
        origin: ["http://localhost:3000"]
    }))


app.post('/api/register', (req, res) => {
    console.log("REGISTER ENDPOINT => ", req.body);
})

//server    
app.listen(port, () => {
    console.log(`server alive at localhost: ${port}`)
})