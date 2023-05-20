const config = require('config')
const express = require('express');
const { reject } = require('lodash')
const app = express();
require('./startup/routers')(app)
require('./startup/mongoDb')()

 



if (config.get('jwtPrivateKey')){
    console.error("FATAL ERROR: jwtPrivateKey is not Defined!")
    process.exit(1); 
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Lisiting on " + port + "..."))