const winston = require('winston')
require('winston-mongodb')
// require('express-async-errors')
const config = require('config')

const express = require('express');
const { reject } = require('lodash')
const app = express();
require('./startup/routers')(app)
require('./startup/mongoDb')

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    winston.error('Uncaught Exception:', err);
    process.exit(1); // Terminate the process
});

process.on('unhandledRejection', (err) => {
    console.error('unhandledRejection:', err);
    winston.error('unhandledRejection:', err);
    process.exit(1); // Terminate the process
});
  
winston.add(new winston.transports.File({ filename: 'logger.log', format: winston.format.simple() }));
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Lisiting on " + port + "..."))