const express = require('express');
const error = require('../middleware/error')
const auth = require('../routes/auth')
const users = require('../routes/users')
const movies = require('../routes/movies')
const home = require('../routes/home')

module.exports = function(app){
    app.use(express.json());
    //Home Page
    app.use('/', home)
    app.use('/api/movies/', movies)
    app.use('/api/users/', users)
    app.use('/api/auth/', auth)
    app.use(error)
}