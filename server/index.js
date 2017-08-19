// Main starting point of the application

const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

//DB Setup
mongoose.connect('mongodb://localhost:auth/auth')


// App Setup
app.use(morgan('combined'))
app.use(cors())
app.use(bodyParser.json({type: '*/*'}))
app.use(bodyParser.urlencoded({ extended: true }));
router(app)


//Server Setup

const port = process.env.PORT || 3090
const server = http.createServer(app);

server.listen(port)

console.log('Server listening on:', port)