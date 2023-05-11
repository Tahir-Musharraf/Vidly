const express = require('express');
const app = express();

const movies = [
    { id: 1, name: 'Jhon Wick', genres: 'Action'},
    { id: 2, name: 'IronMan', genres: 'Action & Thriller'},
    { id: 3, name: 'Avengers', genres: 'Action & Adventure'},
    { id: 4, name: 'Ant Man', genres: 'Sci-fi'},
    { id: 5, name: 'Intestaller', genres: 'Adventure & Sci-fi'}
]

// GET all movies
app.get("/api/movies/", (req, res) => {
    res.send(movies)
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Lisiting on " + port + "..."))