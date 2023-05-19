const winston = require('winston')
module.exports = function( err, req, res, next){
    // winston.error( err.message, err)
    winston.error(err.message, { error: err });

    // Log the exceptions
    return res.status(500).send("Something went wrong!")
}