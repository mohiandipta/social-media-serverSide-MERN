const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('morgan')
import { readdirSync } from "fs"

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


//autoload routes
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))


//server    
app.listen(port, () => {
    console.log(`server alive at localhost: ${port}`)
})