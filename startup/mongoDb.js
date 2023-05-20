const mongoose = require('mongoose')

module.exports = function(){
    // Connect to the MongoDB database
    mongoose.connect('mongodb://localhost/movies')
    .then( () => console.log("Connected to db") )
    .catch( () => console.log("Failed to connect db") )

}