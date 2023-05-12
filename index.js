const express = require('express');
const app = express();

// app.use(express.json());

const movies = [
    { id: 1, name: 'Jhon Wick', genres: 'Action', rating: 7.4},
    { id: 2, name: 'IronMan', genres: 'Action, Thriller', rating: 8.1},
    { id: 3, name: 'Avengers', genres: 'Action, Adventure', rating: 9.1},
    { id: 4, name: 'Ant Man', genres: 'Sci-fi', rating: 7.5},
    { id: 5, name: 'Intestaller', genres: 'Adventure, Sci-fi', rating: 8.5 },
    { id: 5, name: 'God Zila', genres: 'Action', rating: 8.4}
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