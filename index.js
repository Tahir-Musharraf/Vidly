const winston = require('winston')
require('winston-mongodb')
// require('express-async-errors')
const error = require('./middleware/error')
const config = require('config')
const mongoose = require('mongoose')
const auth = require('./routes/auth')
const users = require('./routes/users')
const movies = require('./routes/movies')
const home = require('./routes/home')
const express = require('express');
const app = express();

winston.add(new winston.transports.File({ filename: 'logger.log' }));
winston.add(new winston.transports.MongoDB({
    level: 'info', // Log level
    db: 'mongodb://localhost:27017/movies', // MongoDB connection URI
    options: {
        useUnifiedTopology: true, // MongoDB driver options
    },
    collection: 'logs', // Collection name to store logs
}));
if (config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not Defined!")
    process.exit(1); 
}

app.use(express.json());
//Home Page 
// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/movies')
.then( () => console.log("Connected to db") )
.catch( () => console.log("Failed to connect db") )

app.use('/', home)
app.use('/api/movies/', movies)
app.use('/api/users/', users)
app.use('/api/auth/', auth)
app.use(error)
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Lisiting on " + port + "..."))