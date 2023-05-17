const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Define the movie schema
const movieSchema = new mongoose.Schema({
  id: Number,
  name: String,
  genres: String,
  rating: Number,
  year: Number
});
const movies = [
    { name: 'Jhon Wick', genres: 'Action', rating: 7.4, year: 2012},
    { name: 'IronMan', genres: 'Action, Thriller', rating: 8.1, year: 2015},
    { name: 'Avengers', genres: 'Action, Adventure', rating: 9.1, year: 2017},
    { name: 'Ant Man', genres: 'Sci-fi', rating: 7.5, year: 2019},
    { name: 'Intestaller', genres: 'Adventure, Sci-fi', rating: 8.5 , year: 2021},
    { name: 'God Zila', genres: 'Action', rating: 8.4, year: 2023},
]
// Create the Movie model
const Movie = mongoose.model('movies_list', movieSchema);

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost/movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to the database');
    // Save the movies data in the collection
    Movie.insertMany(movies)
      .then(() => {
        console.log('Movies data stored successfully');
        // Close the database connection
        mongoose.connection.close();
      })
      .catch(error => {
        console.error('Error storing movies data:', error);
        mongoose.connection.close();
      });
  })
  .catch(error => {
    console.error('Error connecting to the database:', error);
  });
