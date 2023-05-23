const winston = require('winston')
const express = require('express');
const { reject } = require('lodash')
const app = express();
winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true }))
winston.add(new winston.transports.File({ filename: 'logger.log' }))
require('./startup/routers')(app)
require('./startup/mongoDb')()
require('./startup/config')()

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info("Lisiting on " + port + "..."))