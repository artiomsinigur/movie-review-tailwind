const movieService = require('../services/movieModel')

// Handles the HTTP layer. Extracts data, calls the service, sends the response.
exports.createMovie = async (req, res) => {
    try {
        // 1. Extract data from request
        const movieData = req.body

        // 2. Pass to the Service layer (The Brain)
        const newMovie = await movieService.addMovie(movieData)

        // 3 Send HTTP response
        res.status(201).json({
            success: true,
            data: newMovie
        })
    } catch (error) {
        // 4. Handle errors
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getMovies = async (req, res) => {
    try {
        // This would be replaced by actual controller logic
        const movies = movieService.getMovies();
        res.json({ data: movies, error: null, message: "Movies retrieved successfully" });
    } catch (error) {
        res.status(500).json({ data: null, error: error.message, message: "Failed to retrieve movies" });
    }
}