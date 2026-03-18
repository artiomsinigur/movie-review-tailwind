const movieModel = require('../models/movieModel')

// Handles business rules. Notice there is no req, res, or SQL here.
exports.addMovie = async (movieData) => {
    // 1. Validations
    if (!movieData.title) {
        throw new Error("Movie title is required")
    }

    // 2. Check for duplicates, etc.
    const existingMovie = await movieModel.findByTitle(movieData.title)
    if (existingMovie) {
        throw new Error("Movie already exists with this title")
    }

    // 3. Format data (e.g., stringify arrays for SQLite shortcut)
    const formattedData = {
        ...movieData,
        genre: JSON.stringify(movieData.genre || []) 
    }

    // 4. Pass to the Model layer to save (The Data Access Layer)
    const insertId = await movieModel.insert(formattedData)

    return { id: insertId, ...movieData }
}

exports.getMovies = async () => {
    return movieModel.getMovies()
}