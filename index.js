
const express = require('express');
const { reject } = require('lodash')
const app = express();

require('./startup/routers')(app)
require('./startup/mongoDb')()
require('./startup/config')()

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Lisiting on " + port + "..."))