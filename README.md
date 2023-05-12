# Vidly-A-Movie-Filter-Node-API

This Node.js API provides movie filtering functionality based on certain criteria such as genre, rating, and release year.

## Prerequisites

- Node.js (v10 or higher)
- npm package manager

## Getting started

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install the dependencies.
3. Start the server by running `npm start`.
4. The API is now ready to accept requests.

## API documentation

### Endpoints

#### GET /api/movies

Returns an array of all movies in the database.

#### GET /api/movies/:genre

Returns an array of movies that match the specified genre.

##### Parameters

- `genre` - The genre to filter by.

#### GET /api/movies/:rating

Returns an array of movies that match the specified rating.

##### Parameters

- `rating` - The rating to filter by.

#### GET /api/movies/:year

Returns an array of movies that match the specified release year.

##### Parameters

- `year` - The release year to filter by.

### Response format

The API returns a JSON object with the following properties:

- `data` - An array of movie objects that match the specified criteria.

#### Movie object

Each movie object in the `data` array has the following properties:

- `id` - The unique identifier of the movie.
- `name` - The title of the movie.
- `genres` - An string of genres that the movie belongs to seprated by comma like 'Action, Thriller'.
- `rating` - The rating of the movie.
- `releaseYear` - The year the movie was released.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository to your own GitHub account.
2. Clone the repository to your local machine.
3. Create a new branch for your changes.
4. Make your changes and commit them with clear commit messages.
5. Push your changes to your fork.
6. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
