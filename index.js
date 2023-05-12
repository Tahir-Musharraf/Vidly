const express = require('express');
const app = express();

// app.use(express.json());

const movies = [
    { id: 1, name: 'Jhon Wick', genres: 'Action'},
    { id: 2, name: 'IronMan', genres: 'Action, Thriller'},
    { id: 3, name: 'Avengers', genres: 'Action, Adventure'},
    { id: 4, name: 'Ant Man', genres: 'Sci-fi'},
    { id: 5, name: 'Intestaller', genres: 'Adventure, Sci-fi'},
    { id: 5, name: 'God Zila', genres: 'Action'}
]
//Home Page 
app.get("/", (req, res) => {
    res.send("Welcome!")
})

// GET all movies
app.get("/api/movies/", (req, res) => {
    res.send(movies)
})
// GET single movie
app.get("/api/movies/:genre", (req, res) => {
    const movie = movies.filter(movie => movie.genres.includes(req.params.genre))
    console.log(movie)
    if (!movie) return res.status(404).send("The required genre not found!")

    res.send(movie)
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Lisiting on " + port + "..."))