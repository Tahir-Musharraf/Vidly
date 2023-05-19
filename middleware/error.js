const winston = require('winston')
module.exports = function( err, req, res, next){
    winston.error( err.message, err)
    // Log the exceptions
    return res.status(500).send("Something went wrong!")
}