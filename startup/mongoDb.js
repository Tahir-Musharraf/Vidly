const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function(){
    // Connect to the MongoDB database
    mongoose
    .connect('mongodb://localhost/movies')
    .then(() => {
    console.log('Connected to db');
    winston.info('Connected to db');
    })
    .catch(() => {
    console.log('Failed to connect db');
    winston.error('Failed to connect db');
    });

}