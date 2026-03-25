const movieService = require('../services/movieService')

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
            data: newMovie,
            message: 'Movie created successfully'
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
        const movies = await movieService.getMovies();
        res.json({ data: movies, error: null, message: "Movies retrieved successfully" });
    } catch (error) {
        res.status(500).json({ data: null, error: error.message, message: "Failed to retrieve movies" });
    }
}

exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params;

        const movie = await movieService.getMovie(id);
        res.status(200).json({ 
            success: true, 
            data: movie, 
            message: "Movie retrieved successfully" 
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};

exports.updateMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movieData = req.body;

        // Security: Ensure the user isn't trying to change the ID itself
        delete movieData.id;
        const updatedMovie = await movieService.updateMovie(id, movieData);

        res.status(200).json({
            success: true,
            data: updatedMovie,
            message: 'Movie updated successfully'
        });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        await movieService.deleteMovie(id);
        
        // 204 No Content for successful deletion
        res.status(204).send({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(error.status || 500).json({
            success: false,
            message: error.message
        });
    }
};