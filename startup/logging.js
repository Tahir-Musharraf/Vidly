const winston = require('winston')
require('winston-mongodb')
// require('express-async-errors')

module.exports = function(){
    // Configure Winston transports
    winston.add(new winston.transports.Console()); // Add Console transport for logging to the console
    // winston.add(new winston.transports.File({ filename: 'logger.log' })); // Add File transport for logging to a file
    winston.add(new winston.transports.MongoDB({
    level: 'info',
    db: 'mongodb://localhost:27017/movies',
    options: {
        useUnifiedTopology: true,
    },
    collection: 'logs',
    }));

    process.on('uncaughtException', (err) => {
        winston.error('Uncaught Exception:', err);
        process.exit(1); // Terminate the process
    });

    process.on('unhandledRejection', (err) => {
        winston.error('unhandledRejection:', err);
        process.exit(1); // Terminate the process
    });
    
}