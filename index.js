const movies = require('./routes/movies')
const home = require('./routes/home')
const express = require('express');
const app = express();

app.use(express.json());
//Home Page 

app.use('/', home)
app.use('/api/movies/', movies)

// GET all movies


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Lisiting on " + port + "..."))