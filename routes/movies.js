const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');

// Define the movie schema
const movieSchema = new mongoose.Schema({
    id: Number,
    name: String,
    genres: String,
    rating: Number,
    year: Number
});

// Create the Movie model
const Movie = mongoose.model('movies_list', movieSchema);

router.get("/", async (req, res) => { 
    const MoviesList = await Movie.find().sort('name');
    res.send(MoviesList)
})
// GET single movie:Genre
router.get("/:genre", (req, res) => {
    const movie = movies.filter(movie => movie.genres.includes(req.params.genre))
    if (!movie) return res.status(404).send("The required genre not found!")
    res.send(movie)
})
// GET single movie:rating
router.get("/rating/:rating", (req, res) => {
    const movie = movies.find(movie => movie.rating === parseFloat(req.params.rating) )
    if (!movie) return res.status(404).send("The required ratting movie not found!")

    res.send(movie)
})
// GET single movie:year
router.get("/year/:year", (req, res) => {
    const movie = movies.find(movie => movie.year === parseFloat(req.params.year) )
    if (!movie) return res.status(404).send("The required movie year not found!")

    res.send(movie)
})


// SET/Update single movie
router.put("/:id", (req, res) => {
    // If movie is found,
    const movie = movies.find(movie => movie.id === parseFloat(req.params.id) )
    if (!movie) return res.status(404).send("The required movie not found! Can't update!")
    // Validating 
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // // Update it 
    movie.name = req.body.name;
    movie.genres = req.body.genres
    movie.rating = req.body.rating
    movie.year = req.body.year
    // Return the updated movie to user
    res.send(movie);
})

// Add/POST single movie
router.post("/", (req, res) => {
    const { error } = validateMovie(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    // Add it 
    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        genres: req.body.genres,
        rating: req.body.rating,
        year: req.body.year
    }
    movies.push(movie);
    // Return the added movie to user
    res.send(movie);
})
// Delete Sigle Movie
router.delete("/:id", (req, res) => {
    // If movie is found,
    const index = movies.findIndex(movie => movie.id === parseFloat(req.params.id) )
    const movie = movies.find(movie => movie.id === parseFloat(req.params.id) )
    if (index === -1 ) return res.status(404).send("The required movie not found! Can't Delete it!")
    movies.splice(index, 1)
    // Return the updated movie to user
    res.send(movie);
})
function validateMovie(movie){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        genres: Joi.string().min(3).required(),
        rating: Joi.number().min(1).max(10).required(),
        year: Joi.number().min(1900).max(2100).required(),
    });
    return schema.validate(movie);
}

module.exports = router