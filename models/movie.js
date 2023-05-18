const mongoose = require('mongoose');
const Joi = require('joi');

// Define the movie schema
const movieSchema = new mongoose.Schema({
    id: Number,
    name: String,
    genres: String,
    rating: Number,
    year: Number
});

function validateMovie(movie){
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        genres: Joi.string().min(3).required(),
        rating: Joi.number().min(1).max(10).required(),
        year: Joi.number().min(1900).max(2100).required(),
    });
    return schema.validate(movie);
}

exports.movieSchema = movieSchema;
exports.validate = validateMovie;