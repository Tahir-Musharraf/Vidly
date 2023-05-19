const auth = require('../middleware/auth')
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
const { movieSchema, validate } = require('../models/movie')

// Create the Movie model
const Movie = mongoose.model('movies_list', movieSchema);

router.get("/", async (req, res) => { 
    const MoviesList = await Movie.find().sort('name');
    res.send(MoviesList)
})
// GET single movie:Genre
router.get("/:genre", async (req, res) => {
    const MoviesList = await Movie.find().sort('name');
    const movie = MoviesList.filter(movie => movie.genres.includes(req.params.genre))
    if (!movie) return res.status(404).send("The required genre not found!")
    res.send(movie)
})
// GET single movie:rating
router.get("/rating/:rating", async (req, res) => {
    const MoviesList = await Movie.find().sort('name');
    const movie = MoviesList.find(movie => movie.rating === parseFloat(req.params.rating) )
    if (!movie) return res.status(404).send("The required ratting movie not found!")

    res.send(movie)
})
// GET single movie:year
router.get("/year/:year", async (req, res) => {
    const MoviesList = await Movie.find().sort('name');
    const movie = MoviesList.find(movie => movie.year === parseFloat(req.params.year) )
    if (!movie) return res.status(404).send("The required movie year not found!")

    res.send(movie)
})


// SET/Update single movie
router.put("/:id", auth, async (req, res) => {
    // If movie is found,
    const movie = await Movie.findById(req.params.id).exec()
    console.log(movie)
    if (!movie) return res.status(404).send("The required movie not found! Can't update!")
    // Validating 
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // // Update it 
    movie.name = req.body.name;
    movie.genres = req.body.genres
    movie.rating = req.body.rating
    movie.year = req.body.year

    movie.save();
    // Return the updated movie to user
    res.send(movie);
})

// Add/POST single movie
router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Add it 
    let movie = new Movie({ 
        name: req.body.name,
        genres: req.body.genres,
        rating: req.body.rating,
        year: req.body.year
    })
    movie = await movie.save();
    // Return the added movie to user
    res.send(movie);
})
// Delete Sigle Movie
router.delete("/:id", async (req, res) => {
    // If movie is found
    const movie = await Movie.findByIdAndRemove(req.params.id).exec();
    console.log(movie)
    if (!movie) return res.status(404).send("The required movie was not found! Can't delete it!");
    
    // Return the deleted movie to the user
    res.send(movie);
});



module.exports = router